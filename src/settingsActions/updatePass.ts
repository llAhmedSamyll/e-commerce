import { updatePassShcemaType } from "@/schema/updatePass";
import getMyToken from "@/utilities.ts/getMyToken";

export default async function updatePassapi(value: updatePassShcemaType) {
  const token = await getMyToken();
  if (!token) throw new Error("please login first");

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }
  );
  const payload = await res.json();
  return payload;
}
