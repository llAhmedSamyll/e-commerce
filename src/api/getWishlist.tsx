import getMyToken from "@/utilities.ts/getMyToken";

export default async function getWishlist() {
  const token = await getMyToken();
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token: String(token),
    },
    method: "GET",
    next: { revalidate: 120 },
  });
  const data = await res.json();
  return data;
}
