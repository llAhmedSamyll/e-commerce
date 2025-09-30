import getMyToken from "@/utilities.ts/getMyToken";

export async function removeFromWishlist(id: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first to remove product");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );
  const payload = await res.json();
  return payload;
}
