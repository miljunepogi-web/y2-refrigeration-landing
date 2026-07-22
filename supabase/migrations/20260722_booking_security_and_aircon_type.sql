alter table bookings
  add column if not exists aircon_type text not null default 'unspecified';

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
