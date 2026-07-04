import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  BadgeCheck,
  Building2,
  Clock3,
  Droplets,
  Flame,
  Gauge,
  MapPinned,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Wrench,
} from "lucide-react";

export type ServiceItem = {
  title: string;
  description: string;
  badge?: string;
  icon: LucideIcon;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
};

export const stats = [
  { value: 8, suffix: "+", label: "Years field experience" },
  { value: 20, suffix: "+", label: "Cavite municipalities served" },
  { value: 98, suffix: "%", label: "Repeat customer satisfaction" },
  { value: 7, suffix: "d", label: "Booking support every week" },
] as const;

export const services: ServiceItem[] = [
  {
    title: "Aircon Cleaning",
    description: "Deep-clean indoor and outdoor units for stronger airflow and cleaner cooling.",
    badge: "Most Popular",
    icon: Sparkles,
  },
  {
    title: "Same-Day Repair",
    description: "Fast troubleshooting for leaking, noisy, undercooling, and power issues.",
    badge: "Same Day",
    icon: Wrench,
  },
  {
    title: "Installation",
    description: "Precise wall-mount and split-type installation with clean finishing.",
    icon: AirVent,
  },
  {
    title: "Preventive Maintenance",
    description: "Scheduled maintenance plans to reduce breakdowns and keep units efficient.",
    icon: TimerReset,
  },
  {
    title: "Freon Refill",
    description: "Safe refrigerant top-up with pressure checks and cooling performance validation.",
    icon: Flame,
  },
  {
    title: "Commercial Service",
    description: "Service support for offices, stores, rentals, and multi-unit properties.",
    icon: Building2,
  },
] as const;

export const whyChooseUs: FeatureItem[] = [
  {
    title: "Certified Service Checklist",
    description: "Every job follows a clean diagnostic and testing workflow before turnover.",
    icon: BadgeCheck,
  },
  {
    title: "Transparent Pricing",
    description: "Straightforward service packages and quote-first work for better client trust.",
    icon: Gauge,
  },
  {
    title: "Fast Cavite Dispatch",
    description: "We serve priority areas quickly with same-day availability in most locations.",
    icon: Clock3,
  },
  {
    title: "Protected Workmanship",
    description: "Your unit, area, and wiring are handled carefully with tidy after-service cleanup.",
    icon: ShieldCheck,
  },
] as const;

export const galleryItems = [
  {
    title: "Split-Type Cleaning",
    caption: "Before-and-after cooling restoration for a residential wall-mounted unit.",
    image: "/assets/images/gallery-cleaning.svg",
  },
  {
    title: "Outdoor Unit Check",
    caption: "Pressure testing, line inspection, and condenser cleaning on-site.",
    image: "/assets/images/gallery-outdoor.svg",
  },
  {
    title: "Commercial Support",
    caption: "Multi-unit service coverage for offices and shop spaces in Cavite.",
    image: "/assets/images/gallery-commercial.svg",
  },
] as const;

export const pricingPlans: PricingPlan[] = [
  {
    name: "Basic Clean",
    price: "\u20b1799",
    description: "For regular maintenance and everyday cooling refresh.",
    features: ["Filter wash", "Evaporator cleaning", "Drain line flush", "Cooling check"],
  },
  {
    name: "Premium Deep Clean",
    price: "\u20b11,299",
    description: "A full-service cleaning package for better airflow and efficiency.",
    badge: "Most Popular",
    features: [
      "Complete indoor wash",
      "Outdoor condenser cleaning",
      "Drain pan and line treatment",
      "Performance testing",
    ],
  },
  {
    name: "Repair & Restore",
    price: "\u20b11,999",
    description: "Best for troubleshooting, leak checks, and non-cooling issues.",
    features: ["Diagnostics", "Leak inspection", "Electrical testing", "Repair quote support"],
  },
] as const;

export const serviceAreas = [
  "Bacoor",
  "Imus",
  "Dasmari\u00f1as",
  "General Trias",
  "Kawit",
  "Noveleta",
  "Rosario",
  "Silang",
  "Tagaytay",
  "Trece Martires",
  "Gen. Mariano Alvarez",
  "Carmona",
  "Tanza",
  "Naic",
  "Maragondon",
  "Indang",
  "Mendez",
  "Alfonso",
  "Magallanes",
  "Amadeo",
] as const;

export const priorityAreas = new Set(["Bacoor", "Imus", "Dasmari\u00f1as", "General Trias", "Tagaytay"]);

export const testimonialItems = [
  {
    name: "Aileen R.",
    location: "Bacoor",
    quote:
      "They arrived on time, explained the issue clearly, and our unit cooled properly again the same afternoon.",
  },
  {
    name: "Marco D.",
    location: "Dasmari\u00f1as",
    quote:
      "Clean work, fair pricing, and no mess left behind. The premium cleaning package felt worth it.",
  },
  {
    name: "Jessa M.",
    location: "Imus",
    quote:
      "Booking was easy and the technician checked everything before leaving. Highly recommended for home service.",
  },
  {
    name: "Paolo C.",
    location: "General Trias",
    quote:
      "We needed help for our small office units and Y2 handled it professionally from inspection to testing.",
  },
] as const;

export const faqs = [
  {
    question: "How often should an aircon unit be cleaned?",
    answer:
      "For most homes, every 3 to 4 months is a strong baseline. Heavy daily usage, pets, or dusty spaces can require more frequent cleaning.",
  },
  {
    question: "Do you offer same-day aircon service in Cavite?",
    answer:
      "Yes, same-day slots are available in many priority areas depending on schedule and the service type needed.",
  },
  {
    question: "What aircon types do you handle?",
    answer:
      "We support split-type, window-type, inverter, floor-mounted, and selected light commercial units.",
  },
  {
    question: "Is there a separate charge for checking or diagnostics?",
    answer:
      "We can provide an inspection-first workflow and confirm charges before any repair work proceeds, so there are no surprise add-ons.",
  },
  {
    question: "Can you service office or rental properties?",
    answer:
      "Yes. We handle residential, office, retail, and small property portfolio service requests across Cavite.",
  },
  {
    question: "How do I book a cleaning or ask for a quote?",
    answer:
      "Use the contact form, tap the Messenger button, or call directly. We will confirm your unit type, location, and preferred service window.",
  },
] as const;

export const serviceOptions = services.map((service) => service.title);

export const airconTypes = [
  "Split Type",
  "Window Type",
  "Inverter",
  "Floor Mounted",
  "Cassette",
  "Other",
] as const;

export const trustBadges = [
  "Fast Cavite Dispatch",
  "Residential & Commercial",
  "Technician-Led Diagnostics",
] as const;

export const contactHighlights = [
  { label: "Messenger support", value: "Quick booking replies", icon: Droplets },
  { label: "Call availability", value: "Morning to evening", icon: Clock3 },
  { label: "Coverage", value: "Cavite-wide service", icon: MapPinned },
] as const;
