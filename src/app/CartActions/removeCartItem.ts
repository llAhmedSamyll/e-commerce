"use server"

import getMyToken from "@/utilities.ts/getMyToken";

export default async function removeItemFromCart(id: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = res.json();
  return payload;
}
