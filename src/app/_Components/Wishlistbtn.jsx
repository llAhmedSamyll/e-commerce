"use client";

import React, { useContext } from "react";
import { CartContext } from "../context/CartCountContext";
import getWishlist from "@/api/getWishlist";
import { removeFromWishlist } from "../wishlist/wishListActions/removeFromWishlist";
import { addToWishList } from "../wishlist/wishListActions/addToWishList";

export default function Wishlist({ id }) {
  const data = useContext(CartContext);
  if (!data) return null;

  const { wishlist, setwishlist } = data;

  async function wishlisttoggle() {
    const exists = wishlist.some((item) => item._id === id);
    if (exists) {
      setwishlist(wishlist.filter((item) => item._id !== id));
      try {
        await removeFromWishlist(id);
      } catch (err) {
        console.error(err);
      }
    } else {
      setwishlist([...wishlist, { _id: id }]);
      try {
        await addToWishList(id);
        const data = await getWishlist();
        setwishlist(data.data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div onClick={wishlisttoggle} className="size-8 rounded-full bg-white border-1 border-red-400 flex items-center justify-center">
      <i
        
        className={`
    cursor-pointer transition-transform duration-200 ease-in-out
    ${
      wishlist.some((item) => item.id === id)
        ? "fa-solid fa-heart text-red-500 scale-110" // قلب ممتلئ
        : "fa-regular fa-heart text-red-500 hover:scale-125"
    } 
  `}
      ></i>
    </div>
  );
}
