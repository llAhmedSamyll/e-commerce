"use client";
import AddToCart from "@/app/CartActions/addToCart";
import React from "react";
import toast from "react-hot-toast";

export default function AddDetailsBtn({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false);

  async function checkAddProduct(id: string) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await AddToCart(id);
      if (res.status === "success") {
        toast.success("Product Added Successfully");
      } else {
        toast.error(res.message || "Can't Add product!");
      }
    } catch (err) {
      toast.error("Please login first to add products !");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        disabled={loading}
        onClick={() => checkAddProduct(id)}
        className={`cursor-pointer rounded-2xl  bg-[#FFCE12] bottom-10  relative text-lg transition-all   font-bold w-full p-2 hover:bg-amber-400 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Add to cart"}
      </button>
    </>
  );
}
