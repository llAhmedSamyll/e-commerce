import { updateDataShcemaType } from "@/schema/updatedata";
import getMyToken from "@/utilities.ts/getMyToken";

export default async function updateInfo(value: updateDataShcemaType) {
  const token = await getMyToken();
  if (!token) throw new Error("please login first");

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
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
