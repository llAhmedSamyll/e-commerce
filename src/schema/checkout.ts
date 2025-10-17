import * as z from "zod";

export const checkoutshcema = z.object({
  city: z.string().nonempty("city cant be empty"),
  details: z.string().nonempty("datails cant be empty"),
  phone: z.string().nonempty("phone cant be empty").regex(/^01[1250][0-9]{8}$/ , "please enter egyptian phone number")
});

export type checkoutSchemaType = z.infer<typeof checkoutshcema>;
