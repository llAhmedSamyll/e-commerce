"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  let decodecToken = (await cookies()).get("next-auth.session-token")?.value;
  let token = await decode({token: decodecToken,secret: process.env.AUTH_SECRET});

  return token?.token
}
