import * as z from "zod";

export const updateDataShcema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must not exceed 15 characters"),
  email: z.email("Invalid email format").nonempty("Email is required"),
  phone: z
    .string()
    .nonempty("phone cant be empty")
    .regex(/^01[1250][0-9]{8}$/, "please enter egyptian phone number"),
});

export type updateDataShcemaType = z.infer<typeof updateDataShcema>;
