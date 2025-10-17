"use server";

import { checkoutSchemaType } from "@/schema/checkout";
import getMyToken from "@/utilities.ts/getMyToken";

export default async function cashPayment(
  cartId: string,
  formValues: checkoutSchemaType
) {
  const token = await getMyToken();
  if (!token) throw new Error("please login first");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: formValues }),
    }
  );
  const payload = await res.json();
  return payload;
}


