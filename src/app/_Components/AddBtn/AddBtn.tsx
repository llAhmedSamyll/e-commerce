"use client";
import AddToCart from "@/app/CartActions/addToCart";
import React from "react";
import toast from "react-hot-toast";

export default function AddBtn({ id }: { id: string }) {
  async function checkAddProduct(id: string) {
    const res = await AddToCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Product Added Successfully");
    } else {
      toast.error("Can't Add product !");
    }
  }
  return (
    <>
      <button
        onClick={() => checkAddProduct(id)}
        className=" cursor-pointer bg-[#FFCE12] relative text-lg translate-y-[100%]  group-hover:translate-0 transition-all transton-[.3s] font-bold w-full p-2 hover:bg-amber-400 "
      >
        Add to cart
      </button>
    </>
  );
}
