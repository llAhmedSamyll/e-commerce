"use client";
import { useContext } from "react";
import { CartContext } from "../context/CartCountContext";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export const metadata = {
  title: "Cart",
};
export default function Cart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("CartContext not provided");

  const {
    products,
    loading,
    btnDisable,
    deleteProduct,
    updateProduct,
    clear,
    clearloader,
    cartId,
  } = cart;

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
                  <div className="flex items-center gap-2">
                    <div className="p-3 rounded-s-2xl py-8 bg-[#ffffff67] text-yellow-800">
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold">Your Cart</h1>
                      <button
                        onClick={() => clear()}
                        className="p-2 bg-red-200 hover:bg-red-300 hover:text-black cursor-pointer text-red-600 rounded-e-lg font-semibold "
                      >
                        {clearloader ? (
                          <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                        ) : (
                          <i className="fas fa-trash-alt"></i>
                        )}{" "}
                        Clear Cart items
                      </button>
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
                  <ul data-aos="fade-left">
                    {products.map((product) => (
                      <li
                        data-aos="fade-left"
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
                              <button
                                onClick={() =>
                                  updateProduct(
                                    product.product.id,
                                    product.count - 1
                                  )
                                }
                                disabled={product.count < 2}
                                className="px-3 py-2 disabled:cursor-not-allowed hover:bg-red-200 bg-red-100"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <div className="px-4 py-2 min-w-[56px] text-center">
                                {product.count}
                              </div>
                              <button
                                onClick={() =>
                                  updateProduct(
                                    product.product.id,
                                    product.count + 1
                                  )
                                }
                                className="px-3 disabled:cursor-not-allowed py-2 hover:bg-red-200 bg-red-100"
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>

                          {/* action */}
                          <div className="col-span-1  md:mt-0 flex justify-end">
                            <button
                              onClick={() => deleteProduct(product.product.id)}
                              className="p-2 disabled:cursor-not-allowed  rounded-md text-red-600 bg-red-100 hover:bg-red-200 "
                            >
                              <i className="fas fa-trash-alt"></i>
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
                        className="px-2 py-2 rounded-md text-sm font-medium border bg-gray-300 hover:bg-gray-200"
                      >
                        Continue shopping
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <button
                            disabled={btnDisable}
                            className="px-2 cursor-pointer py-2 disabled:bg-yellow-100 disabled:cursor-not-allowed rounded-md text-sm font-semibold bg-yellow-400 hover:bg-amber-400"
                          >
                            Proceed to Checkout
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="overflow-hidden">
                          <div className="bg-red-500 flex  ">
                            <Link
                              href={`/onlinecheckout/${cartId}`}
                              className="w-1/2 flex flex-col justify-center items-center bg-blue-600 hover:bg-blue-700 text-white  p-5 "
                            >
                              <i className="fa-brands fa-cc-visa text-3xl text-amber-100 mb-3"></i>
                              Pay Online
                            </Link>
                            <Link
                              href={`/cashcheckout/${cartId}`}
                              className="w-1/2 flex flex-col justify-center items-center bg-green-600 hover:bg-green-700 text-white   p-5"
                            >
                              <i className="fa-solid fa-sack-dollar text-3xl mb-3"></i>
                              Cash on Delivery
                            </Link>
                          </div>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="px-4 mx-auto flex flex-col justify-center items-center ">
              <div className="w-[300px] mx-auto mt-40 ">
                <Image
                  priority
                  width={200}
                  height={200}
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
                Shopping now
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}
