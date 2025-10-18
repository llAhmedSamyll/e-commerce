export default async function newPassword(value) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    }
  );
  const payload = await res.json();
  return payload;
}
