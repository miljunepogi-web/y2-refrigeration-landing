"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, MessageSquareMore, PhoneCall } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { airconTypes, contactHighlights, serviceOptions } from "@/lib/content";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      airconType: "",
      serviceNeeded: "",
      preferredDate: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    const response = await fetch("/api/book-service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      setSubmitError(result?.message ?? "Unable to send your request right now. Please try again.");
      return;
    }

    setSubmitSuccess(result?.message ?? "Booking request sent successfully.");
    reset();
  };

  return (
    <section id="contact" className="py-20 md:py-24 xl:py-28">
      <div className="section-shell grid gap-10 xl:grid-cols-[0.88fr_1.12fr]">
        <Reveal>
          <SectionTitle
            badge="Contact"
            align="left"
            title="Book a Service or Request a Free Quote"
            description="This contact block is structured for real business use, with validated fields and room for future webhook, CRM, email, and scheduling integrations."
          />

          <div className="mt-8 space-y-4">
            {contactHighlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <div key={highlight.label} className="glass-panel rounded-[1.5rem] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{highlight.label}</p>
                      <p className="mt-1 text-sm text-[#9fb0d1]">{highlight.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
              <input type="hidden" {...register("airconType")} />
              <input type="hidden" {...register("serviceNeeded")} />
              <Field label="Name" error={errors.name?.message}>
                <Input {...register("name")} placeholder="Your full name" className="h-12 rounded-2xl border-white/10 bg-[#0d1f44]" />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <Input {...register("phone")} placeholder="09XXXXXXXXX" className="h-12 rounded-2xl border-white/10 bg-[#0d1f44]" />
              </Field>
              <Field label="Address" error={errors.address?.message}>
                <Input {...register("address")} placeholder="Street, barangay, city" className="h-12 rounded-2xl border-white/10 bg-[#0d1f44]" />
              </Field>
              <Field label="Aircon Type" error={errors.airconType?.message}>
                <Select onValueChange={(value) => setValue("airconType", String(value), { shouldValidate: true })}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-[#0d1f44]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {airconTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Service Needed" error={errors.serviceNeeded?.message}>
                <Select onValueChange={(value) => setValue("serviceNeeded", String(value), { shouldValidate: true })}>
                  <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-[#0d1f44]">
                    <SelectValue placeholder="Choose service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Preferred Date" error={errors.preferredDate?.message}>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#9fb0d1]" />
                  <Input
                    {...register("preferredDate")}
                    type="date"
                    className="h-12 rounded-2xl border-white/10 bg-[#0d1f44] pl-11"
                  />
                </div>
              </Field>
              <Field label="Message" error={errors.message?.message} className="md:col-span-2">
                <Textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us about the issue, unit count, or preferred schedule."
                  className="rounded-[1.4rem] border-white/10 bg-[#0d1f44]"
                />
              </Field>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-gradient h-14 w-full rounded-full text-base font-semibold text-[#081227] shadow-[0_18px_48px_rgba(217,164,65,0.28)] hover:brightness-105"
                >
                  {isSubmitting ? "Sending Request..." : "Book Cleaning Now"}
                </Button>
              </div>

              {submitSuccess && isSubmitSuccessful ? (
                <div className="md:col-span-2 rounded-[1.4rem] border border-primary/20 bg-primary/10 p-4 text-sm text-[#f8e5b7]">
                  {submitSuccess}
                </div>
              ) : null}
              {submitError ? (
                <div className="md:col-span-2 rounded-[1.4rem] border border-[#ffb3b3]/20 bg-[#3d1218]/60 p-4 text-sm text-[#ffd6d6]">
                  {submitError}
                </div>
              ) : null}
            </form>

            <div className="mt-8 grid gap-4 border-t border-white/8 pt-6 md:grid-cols-3">
              <QuickContact
                icon={<PhoneCall className="size-4 text-primary" />}
                label="Call us"
                value={siteConfig.phoneDisplay}
              />
              <QuickContact
                icon={<MessageSquareMore className="size-4 text-primary" />}
                label="Messenger"
                value="Fast social replies"
              />
              <QuickContact
                icon={<CalendarDays className="size-4 text-primary" />}
                label="Booking slots"
                value="Available every week"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-[#dce8ff]">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs text-[#ffb3b3]">{error}</span> : null}
    </label>
  );
}

function QuickContact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-medium text-white">{label}</p>
      </div>
      <p className="mt-2 text-sm text-[#9fb0d1]">{value}</p>
    </div>
  );
}
