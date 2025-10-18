"use server";
export default async function forgetPass(formValues: { email: string }) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }
  );
  const payload = await res.json();
  return payload;
}
