"use server"
import getMyToken from "@/utilities.ts/getMyToken";

export default async function AddToCart(id: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("please login first to add products ");
  }

  let res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  let payload = await res.json();
  return payload;
}
 