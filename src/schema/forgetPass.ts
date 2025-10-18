import * as z from "zod";

export const forgetPassSchema = z.object({
  email: z.email("Invalid email format").nonempty("Email is required"),
});

