"use client";
import { createContext, useState, useEffect } from "react";
import getLoggedUserCart from "../cart/CartActions/getUerCart";
import removeItemFromCart from "../cart/CartActions/removeCartItem";
import UpdateCartQuantity from "../cart/CartActions/UpdateCartQuantity";
import clearCartItems from "../cart/CartActions/clearCartItems";
import toast from "react-hot-toast";
import { CartContextType, CartProduct } from "@/types/cartTyps";
import { useSession } from "next-auth/react";
import getWishlist from "@/api/getWishlist";
import { ProductType } from "@/types/product.type";

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [btnDisable, setbtnDisable] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [clearloader, setclearloader] = useState(false);
  const [wishlist, setwishlist] = useState<ProductType[]>([]);
  const [wishloading, setwishloading] = useState(false);

  async function getUserWishList() {
    setwishloading(true);
    const list = await getWishlist();
    if (list.status === "success") {
      setwishlist(list?.data);
      setwishloading(false);
    } else {
      console.log(list.message);
      setwishloading(false);
    }
  }

  async function getUserCart() {
    setLoading(true);
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      getUserCart();
      getUserWishList();
    }
  }, [session]);

  async function deleteProduct(id: string) {
    setbtnDisable(true);
    const prevProducts = [...products];
    setProducts(products.filter((p) => p.product.id !== id));
    const res = await removeItemFromCart(id);
    if (res.status == "success") {
      setbtnDisable(false);
    } else {
      setProducts(prevProducts);
      toast.error("Can't delete product now!");
      setbtnDisable(false);
    }
  }

  async function updateProduct(id: string, count: number) {
    setbtnDisable(true);

    if (count < 1) return;
    const prevProducts = [...products];
    setProducts(
      products.map((p) => (p.product.id === id ? { ...p, count } : p))
    );
    const res = await UpdateCartQuantity(id, count);
    if (res.status == "success") {
      setbtnDisable(false);
    } else {
      setProducts(prevProducts);
      toast.error("Can't update product quantity!");
      setbtnDisable(false);
    }
  }

  async function clear() {
    setclearloader(true);
    const res = await clearCartItems();
    if (res.message === "success") {
      toast.success("Deleted successfully");
      setclearloader(false);
      setProducts([]);
    }
  }

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        loading,
        getUserCart,
        deleteProduct,
        updateProduct,
        clear,
        btnDisable,
        clearloader,
        wishlist,
        setwishlist,
        wishloading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
