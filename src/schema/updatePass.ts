import * as z from "zod";

export const updatePassShcema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Old password is required")
      .min(6, "Password must be at least 6 characters"),
    password: z
      .string()
      .nonempty("New password is required")
      .min(6, "Confirm password must be at least 6 characters"),

    rePassword: z
      .string()
      .nonempty("Confirm new password is required")
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export type updatePassShcemaType = z.infer<typeof updatePassShcema>;
