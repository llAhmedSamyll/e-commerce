"use server";

import getMyToken from "@/utilities.ts/getMyToken";

export default async function clearCartItems() {
  const token = await getMyToken();
  if (!token) throw new Error("login first");
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "DELETE",
    headers: {
      token,
    },
  });

  const payload = res.json();
  return payload
}
