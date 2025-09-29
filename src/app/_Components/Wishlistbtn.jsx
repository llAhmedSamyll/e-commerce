"use client";

import React, { useContext } from "react";
import { addToWishList } from "../wishlist/wishListActions/addtowishlist";
import { CartContext } from "../context/CartCountContext";

export default function Wishlist({ id }) {
  const data = useContext(CartContext);
  if (!data) throw new Error("wishlist not provided");

  const { wishlist, setwishlist } = data;

  function wishlisttoggle() {
    const exists = wishlist.includes(id);
    if (exists) {
      setwishlist(wishlist.filter((item) => item !== id));
    } else {
      setwishlist([...wishlist, id]);
      addToWishList(id);
    }
  }
  return (
    <div>
      <i
        onClick={wishlisttoggle}
        className={`fa-solid fa-heart cursor-pointer ${
          wishlist.includes(id) ? "text-red-500" : "text-gray-400"
        }`}
      ></i>
    </div>
  );
}
