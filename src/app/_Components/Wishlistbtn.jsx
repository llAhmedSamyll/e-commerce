"use client";

import React, { useContext } from "react";
import { addToWishList } from "../wishlist/wishListActions/addtowishlist";
import { CartContext } from "../context/CartCountContext";
import getWishlist from "@/api/getWishlist";

// Function جديدة لمسح المنتج من wishlist في السيرفر
async function removeFromWishlist(id) {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first to remove product");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );
  return res.json();
}

export default function Wishlist({ id }) {
  const data = useContext(CartContext);
  if (!data) return null; // بدل throw Error

  const { wishlist, setwishlist } = data;

  async function wishlisttoggle() {
    const exists = wishlist.some((item) => item._id === id); // صححت المقارنة
    if (exists) {
      // إزالة من السياق والسيرفر
      setwishlist(wishlist.filter((item) => item._id !== id));
      try {
        await removeFromWishlist(id);
      } catch (err) {
        console.error(err);
      }
    } else {
      setwishlist([...wishlist, { _id: id }]); // مؤقتًا ضف id
      try {
        await addToWishList(id);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div>
      <i
        onClick={wishlisttoggle}
        className={`fa-solid fa-heart cursor-pointer ${
          wishlist.some((item) => item._id === id)
            ? "text-red-500"
            : "text-gray-400"
        }`}
      ></i>
    </div>
  );
}
