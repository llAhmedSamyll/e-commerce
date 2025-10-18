export default async function otpCode(data: { resetCode: string }) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const payload = await res.json();
  return payload;
}
