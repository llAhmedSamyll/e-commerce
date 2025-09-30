"use client";

import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartCountContext";
import getWishlist from "@/api/getWishlist";
import { addToWishList } from "../wishlist/_WishListActions/addToWishList";
import { removeFromWishlist } from "../wishlist/_WishListActions/removeFromWishlist";
import toast from "react-hot-toast";
import getMyToken from "@/utilities.ts/getMyToken";

export default function Wishlist({ id }) {
  const [loading, setloading] = useState(false);
  const data = useContext(CartContext);

  if (!data) return null;

  const { wishlist, setwishlist } = data;

  async function wishlisttoggle() {
    setloading(true);
    const token = await getMyToken();

    if (!token) {
      toast.error("Login first !!");
      setloading(false);
    }

    const exists = wishlist.some((item) => item._id === id);
    if (exists) {
      setwishlist(wishlist.filter((item) => item._id !== id));
      try {
        await removeFromWishlist(id);
        setloading(false);
      } catch (err) {
        console.error(err);
        setloading(false);
      }
    } else {
      setwishlist([...wishlist, { _id: id }]);
      try {
        await addToWishList(id);
        const data = await getWishlist();
        setwishlist(data.data);
      } catch (err) {
        console.log(err);
      }
      setloading(false);
    }
  }

  return (
    <div
      onClick={wishlisttoggle}
      className="size-8 rounded-full bg-white border-1 border-red-400 flex items-center justify-center"
    >
      {loading ? (
        <i className="fa-solid fa-circle-notch fa-spin"></i>
      ) : (
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
      )}
    </div>
  );
}
