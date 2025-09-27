"use client";
import AddToCart from "@/app/CartActions/addToCart";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../context/CartCountContext";



export default function AddBtn({ id }: { id: string }) {
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
      console.log(err);
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
        className={`cursor-pointer bg-[#FFCE12] relative text-lg translate-y-[100%] group-hover:translate-0 transition-all transton-[.3s] font-bold w-full p-2 hover:bg-amber-400 ${
          loading ? "bg-[#fff6d4] hover:bg-[#fff6d4] cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Add to cart"}
      </button>
    </>
  );
}
