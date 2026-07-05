import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  address: z.string().min(4, "Please enter your address."),
  airconType: z.string().min(1, "Please select an aircon type."),
  serviceNeeded: z.string().min(1, "Please select a service."),
  preferredDate: z.string().min(1, "Please choose a preferred date."),
  message: z.string().min(10, "Please add a short service note."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
