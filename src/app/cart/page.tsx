"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import getLoggedUserCart from "../CartActions/getUerCart";
import Link from "next/link";
import removeItemFromCart from "../CartActions/removeCartItem";
import toast from "react-hot-toast";

export default function Cart() {
  type CartProduct = {
    _id: string;
    price: number;
    count: number;
    product: {
      id: string;
      title: string;
      imageCover: string;
      brand: {
        name: string;
      };
    };
  };

  const [products, setproducts] = useState<CartProduct[]>([]);
  const [loading, setloading] = useState(false);
  const [delloading, setdelloading] = useState<string | null>(null);
  const [removeDis, setremoveDis] = useState(false);
  async function getUserCart() {
    setloading(true);
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        setproducts(res.data.products);
        setloading(false);
      }
    } catch (err) {
      setloading(false);
      console.log(err);
    }
  }

  async function deleteProduct(id: string) {
    setdelloading(id);
    setremoveDis(true);
    const res = await removeItemFromCart(id);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Product deleted successfully");
      setdelloading(null);
      setremoveDis(false);
    } else {
      toast.error("Can't delete this product now !");
      setdelloading(null);
      setremoveDis(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  const total = products.reduce((acc, it) => acc + it.price * it.count, 0);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center bg-[#000000a7] h-screen ">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          {products?.length > 0 ? (
            <>
              <div className="max-w-6xl mx-auto p-4">
                {/* Header */}
                <header className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-yellow-100 text-yellow-800">
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold">Your Cart</h1>
                      <p className="text-sm text-gray-500">
                        {" "}
                        {products.length} item(s)
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">total</p>
                    <p className="text-lg font-bold">
                      {" "}
                      <span className="text-teal-700">$</span>
                      {total}
                    </p>
                  </div>
                </header>

                {/* Table-like list */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  {/* table header (visible on md+) */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center p-4 border-b text-sm text-gray-600">
                    <div className="col-span-5">Product</div>
                    <div className="col-span-3">Price</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-1 text-right">Action</div>
                  </div>
                  <ul>
                    {products.map((product) => (
                      <li
                        key={product._id}
                        className="p-4 md:px-4 md:py-2 odd:bg-teal-100 even:bg-white "
                      >
                        <div className="md:grid grid-cols-12 gap-4 items-center">
                          {/* product cell */}
                          <div className="col-span-5 flex items-center gap-4">
                            <div className="w-30 h-30 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                              <Image
                                width={300}
                                height={300}
                                src={product.product.imageCover}
                                alt={product.product.imageCover}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-base font-medium">
                                {product.product.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {product.product.brand.name}
                              </div>
                            </div>
                          </div>

                          {/* price */}
                          <div className="col-span-3 hidden md:block mt-3 md:mt-0">
                            <div className="text-sm md:text-base font-medium">
                              <span className="text-teal-700">$</span>
                              {product.price}
                            </div>
                          </div>

                          {/* quantity */}
                          <div className="col-span-3  mt-2 md:mt-0 flex items-center justify-center">
                            <div className="inline-flex items-center border rounded-md overflow-hidden">
                              <button className="px-3 py-2 hover:bg-gray-200">
                                <i className="fas fa-minus"></i>
                              </button>
                              <div className="px-4 py-2 min-w-[56px] text-center">
                                {product.count}
                              </div>
                              <button className="px-3 py-2 hover:bg-gray-200">
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>

                          {/* action */}
                          <div className="col-span-1  md:mt-0 flex justify-end">
                            <button
                              disabled={removeDis}
                              onClick={() => deleteProduct(product.product.id)}
                              className="p-2 disabled:cursor-not-allowed  rounded-md text-red-600 bg-red-100 hover:bg-red-200 "
                            >
                              {delloading === product.product.id ? (
                                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                              ) : (
                                <i className="fas fa-trash-alt"></i>
                              )}
                            </button>
                          </div>

                          {/* mobile summary */}
                          <div className="md:hidden mt-3 flex items-center justify-between text-sm text-gray-600">
                            <div>Price: {product.price}</div>
                            <div>Total: {product.price * product.count}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* footer */}
                  <div className="p-4 md:p-6 border-t bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="text-sm text-gray-600">
                      <div>
                        Items:{" "}
                        <span className="font-medium">{products.length}</span>
                      </div>
                      <div>
                        total: <span className="font-semibold">{total}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href="/products"
                        className="px-4 py-2 rounded-md text-sm font-medium border hover:bg-gray-200"
                      >
                        Continue shopping
                      </Link>
                      <button className="px-5 py-2 rounded-md text-sm font-semibold bg-yellow-400 hover:bg-amber-400">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="px-4 mx-auto flex flex-col justify-center items-center ">
              <div className="w-[300px] mx-auto mt-40 ">
                <Image
                  width={300}
                  height={300}
                  src="/images/cart-embty.svg"
                  alt="embty cart"
                  className="w-full"
                />
              </div>
              <h1 className="font-semibold mt-4">No products added yet</h1>
              <Link
                href="/products"
                className="px-4 py-2 rounded-md text-sm font-medium border bg-amber-600 mt-4 text-white hover:bg-amber-500"
              >
                shopping now
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
