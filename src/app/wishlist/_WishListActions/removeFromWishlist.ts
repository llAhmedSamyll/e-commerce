import getMyToken from "@/utilities.ts/getMyToken";
import toast from "react-hot-toast";

export async function removeFromWishlist(id: string) {
  const token = await getMyToken();
  if (!token)  toast.error("Please login first");

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
