import getMyToken from "@/utilities.ts/getMyToken";

export async function addToWishList(id: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("please login first to add products ");
  }
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const payload = await res.json();
  return payload;
}
