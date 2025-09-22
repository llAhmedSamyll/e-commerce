import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must not exceed 15 characters"),
    email: z.email("Invalid email format").nonempty("Email is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    rePassword: z
      .string()
      .nonempty("Confirm password is required")
      .min(6, "Confirm password must be at least 6 characters"),
    phone: z
      .string()
      .nonempty("Phone number is required")
      .min(11, "Phone number must be at least 11 digits")
      .max(11, "Phone number must not exceed 11 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export type registerSchemaType = z.infer<typeof registerSchema>;
