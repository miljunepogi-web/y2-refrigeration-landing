create extension if not exists pgcrypto;

do $$
begin
  create type booking_status as enum (
    'new',
    'pending_confirmation',
    'confirmed',
    'assigned',
    'on_the_way',
    'in_progress',
    'completed',
    'cancelled'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type reminder_kind as enum ('24h', '1h', 'follow_up');
exception
  when duplicate_object then null;
end $$;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile_number text not null,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_mobile_idx on customers (mobile_number);
create index if not exists customers_email_idx on customers (email);
create unique index if not exists customers_mobile_uidx on customers (mobile_number);

create table if not exists technicians (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile_number text,
  email text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists technician_calendars (
  id uuid primary key default gen_random_uuid(),
  technician_id uuid not null references technicians(id) on delete cascade,
  google_calendar_id text not null,
  display_name text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists technician_calendars_google_calendar_id_uidx
  on technician_calendars (google_calendar_id);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete set null,
  full_name text not null,
  mobile_number text not null,
  email text,
  complete_address text not null,
  google_map_pin text,
  aircon_type text not null default 'unspecified',
  service_type text not null,
  number_of_aircons integer not null default 1,
  preferred_date date not null,
  preferred_time time,
  additional_notes text,
  status booking_status not null default 'new',
  assigned_technician_id uuid references technicians(id) on delete set null,
  calendar_event_id text,
  admin_notes text,
  source text not null default 'website',
  reminder_24h_sent boolean not null default false,
  reminder_1h_sent boolean not null default false,
  completed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_preferred_date_idx on bookings (preferred_date);
create index if not exists bookings_assigned_technician_idx on bookings (assigned_technician_id);
create index if not exists bookings_customer_idx on bookings (customer_id);

create table if not exists booking_assignments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  technician_id uuid not null references technicians(id) on delete restrict,
  assigned_by text,
  assignment_reason text,
  assigned_at timestamptz not null default now(),
  unassigned_at timestamptz
);

create index if not exists booking_assignments_booking_idx on booking_assignments (booking_id);
create index if not exists booking_assignments_technician_idx on booking_assignments (technician_id);

create table if not exists booking_status_history (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  old_status booking_status,
  new_status booking_status not null,
  changed_by text,
  change_reason text,
  created_at timestamptz not null default now()
);

create index if not exists booking_status_history_booking_idx on booking_status_history (booking_id);

create table if not exists automation_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references bookings(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  attempts integer not null default 0,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists automation_events_status_idx on automation_events (status);
create index if not exists automation_events_booking_idx on automation_events (booking_id);

create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  reminder_type reminder_kind not null,
  scheduled_for timestamptz not null,
  sent_at timestamptz,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create unique index if not exists reminders_unique_booking_kind
  on reminders (booking_id, reminder_type);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  rating integer,
  feedback text,
  request_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists reviews_booking_uidx on reviews (booking_id);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists activity_logs_entity_idx on activity_logs (entity_type, entity_id);

create or replace function create_booking_request(payload jsonb)
returns table (
  booking_id uuid,
  customer_id uuid,
  booking_status booking_status,
  automation_event_id uuid
)
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_phone text := regexp_replace(coalesce(payload ->> 'mobile_number', ''), '\D', '', 'g');
  normalized_local_phone text := case
    when length(normalized_phone) = 12 and left(normalized_phone, 2) = '63' then '0' || right(normalized_phone, 10)
    when length(normalized_phone) = 10 and left(normalized_phone, 1) = '9' then '0' || normalized_phone
    else normalized_phone
  end;
  normalized_email text := nullif(lower(trim(coalesce(payload ->> 'email', ''))), '');
  normalized_aircon_count integer := greatest(coalesce((payload ->> 'number_of_aircons')::integer, 1), 1);
  customer_record customers%rowtype;
  booking_record bookings%rowtype;
  event_record automation_events%rowtype;
begin
  insert into customers (full_name, mobile_number, email, updated_at)
  values (
    payload ->> 'full_name',
    normalized_local_phone,
    normalized_email,
    now()
  )
  on conflict (mobile_number) do update
    set full_name = excluded.full_name,
        email = coalesce(excluded.email, customers.email),
        updated_at = now()
  returning * into customer_record;

  insert into bookings (
    customer_id,
    full_name,
    mobile_number,
    email,
    complete_address,
    google_map_pin,
    aircon_type,
    service_type,
    number_of_aircons,
    preferred_date,
    preferred_time,
    additional_notes,
    status,
    source,
    created_at,
    updated_at
  )
  values (
    customer_record.id,
    payload ->> 'full_name',
    normalized_local_phone,
    normalized_email,
    payload ->> 'complete_address',
    nullif(payload ->> 'google_map_pin', ''),
    coalesce(nullif(payload ->> 'aircon_type', ''), 'unspecified'),
    payload ->> 'service_type',
    normalized_aircon_count,
    (payload ->> 'preferred_date')::date,
    nullif(payload ->> 'preferred_time', '')::time,
    nullif(payload ->> 'additional_notes', ''),
    'new',
    coalesce(payload ->> 'source', 'website'),
    now(),
    now()
  )
  returning * into booking_record;

  insert into booking_status_history (booking_id, old_status, new_status, changed_by, change_reason)
  values (booking_record.id, null, booking_record.status, 'system', 'Initial booking created');

  insert into automation_events (booking_id, event_type, payload)
  values (
    booking_record.id,
    'booking.created',
    jsonb_build_object(
      'booking_id', booking_record.id,
      'customer_id', customer_record.id,
      'full_name', booking_record.full_name,
      'mobile_number', booking_record.mobile_number,
      'email', booking_record.email,
      'aircon_type', booking_record.aircon_type,
      'service_type', booking_record.service_type,
      'preferred_date', booking_record.preferred_date,
      'preferred_time', booking_record.preferred_time,
      'status', booking_record.status,
      'source', booking_record.source
    )
  )
  returning * into event_record;

  return query
    select booking_record.id, customer_record.id, booking_record.status, event_record.id;
end;
$$;

revoke execute on function create_booking_request(jsonb) from public;
grant execute on function create_booking_request(jsonb) to service_role;

alter table customers enable row level security;
alter table technicians enable row level security;
alter table technician_calendars enable row level security;
alter table bookings enable row level security;
alter table booking_assignments enable row level security;
alter table booking_status_history enable row level security;
alter table automation_events enable row level security;
alter table reminders enable row level security;
alter table reviews enable row level security;
alter table activity_logs enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'bookings'
      and policyname = 'service role manages bookings'
  ) then
    create policy "service role manages bookings"
      on bookings
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'customers'
      and policyname = 'service role manages customers'
  ) then
    create policy "service role manages customers"
      on customers
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'technicians'
      and policyname = 'service role manages technicians'
  ) then
    create policy "service role manages technicians"
      on technicians
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'technician_calendars'
      and policyname = 'service role manages technician calendars'
  ) then
    create policy "service role manages technician calendars"
      on technician_calendars
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'booking_assignments'
      and policyname = 'service role manages booking assignments'
  ) then
    create policy "service role manages booking assignments"
      on booking_assignments
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'booking_status_history'
      and policyname = 'service role manages booking history'
  ) then
    create policy "service role manages booking history"
      on booking_status_history
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'automation_events'
      and policyname = 'service role manages automation events'
  ) then
    create policy "service role manages automation events"
      on automation_events
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'reminders'
      and policyname = 'service role manages reminders'
  ) then
    create policy "service role manages reminders"
      on reminders
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'reviews'
      and policyname = 'service role manages reviews'
  ) then
    create policy "service role manages reviews"
      on reviews
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'activity_logs'
      and policyname = 'service role manages activity logs'
  ) then
    create policy "service role manages activity logs"
      on activity_logs
      for all
      using (auth.role() = 'service_role')
      with check (auth.role() = 'service_role');
  end if;
end $$;
