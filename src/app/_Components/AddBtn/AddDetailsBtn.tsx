"use client";
import AddToCart from "@/app/CartActions/addToCart";
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
        className={`cursor-pointer rounded-2xl  bg-[#FFCE12] bottom-10  relative text-lg transition-all   font-bold w-full p-2 hover:bg-amber-400 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : "Add to cart"}
      </button>
    </>
  );
}
