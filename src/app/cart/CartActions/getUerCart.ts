"use server"


import getMyToken from "@/utilities.ts/getMyToken";

export default async function getLoggedUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("please login to access cart");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload = res.json();
  return payload;
}
