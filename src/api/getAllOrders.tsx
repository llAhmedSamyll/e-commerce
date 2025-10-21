"use server";

import getMyToken from "@/utilities.ts/getMyToken";
import { jwtDecode } from "jwt-decode";

export default async function getAllOrders() {
  const token = await getMyToken();
  if (!token) {
    console.log("No token found");
    return;
  }

  const { id } = jwtDecode<{ id: string }>(token);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    {
      method: "GET",
    }
  );
  const data = await res.json()
  return(data);
}
