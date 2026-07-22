import { z } from "zod";

const optionalText = z.string().trim().optional().transform((value) => value || undefined);
const emailValue = z.string().email();
const urlValue = z.string().url();

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  address: z.string().min(10, "Please enter a more complete address."),
  airconType: z.string().min(1, "Please select an aircon type."),
  serviceNeeded: z.string().min(1, "Please select a service."),
  preferredDate: z.string().min(1, "Please choose a preferred date."),
  message: z.string().min(10, "Please add a short service note."),
  email: optionalText.refine((value) => !value || emailValue.safeParse(value).success, {
    message: "Please enter a valid email address.",
  }),
  googleMapPin: optionalText.refine((value) => !value || urlValue.safeParse(value).success, {
    message: "Please enter a valid Google Maps link.",
  }),
  preferredTime: optionalText,
  numberOfAircons: optionalText,
  additionalNotes: optionalText,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormInput = z.input<typeof contactFormSchema>;
