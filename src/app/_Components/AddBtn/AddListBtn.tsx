"use client";
import AddToCart from "@/app/cart/CartActions/addToCart";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../context/CartCountContext";

export default function AddDetailsBtn({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(false);
  const cart = useContext(CartContext);

  if (!cart) throw new Error("CartContext not provided");
  const { getUserCart } = cart;

  async function checkAddProduct(id: string) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await AddToCart(id);
      if (res.status === "success") {
        toast.success("Product Added Successfully");
        await getUserCart();
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
        className={`  bg-[#FFCE12]  relative  transition-all text-md lg:text-lg font-semibold w-[80%] cursor-pointer rounded-lg px-2 py-1 md:px-4 md:py-2  hover:bg-amber-400 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
        ) : (
          "Add to cart"
        )}
      </button>
    </>
  );
}
