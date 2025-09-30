"use client";
import Image from "next/image";
import AddListBtn from "../_Components/AddBtn/AddListBtn";
import { useContext } from "react";
import { CartContext } from "../context/CartCountContext";
import { removeFromWishlist } from "./WishListActions/removeFromWishlist";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Page() {
  const data = useContext(CartContext);
  if (!data) return <div>Loading wishlist...</div>;

  const { wishlist, setwishlist, wishloading } = data;

  async function deleteWishList(id: string) {
    const prevwishlist = [...wishlist];
    setwishlist(wishlist.filter((p) => p.id !== id));
    const res = await removeFromWishlist(id);
    if (res.status === "success") {
      toast.success("Deleted");
    } else {
      setwishlist(prevwishlist);
      toast.error("Can't delete item");
    }
  }

  return (
    <div className="container mx-auto mt-40">
      {wishlist?.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="items-center p-4 border-b text-sm text-gray-600">
            <div className="col-span-12 text-center font-bold text-2xl">
              Your Wish List
            </div>
          </div>
          {wishloading ? (
            <div className="flex justify-center items-center bg-[#0000006b] h-80 ">
              <span className="loader"></span>
            </div>
          ) : (
            <ul
              className="flex flex-col xl:flex-row flex-wrap w-full"
              data-aos="fade-left"
            >
              {wishlist?.map((list) => (
                <li
                  key={list._id}
                  data-aos="fade-left"
                  className="px-4 xl:w-1/2 py-2 md:px-4 md:py-2 border-b-2 xl:border-s odd:bg-teal-100 even:bg-white"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="xl:w-1/2 flex items-center gap-4">
                      <div className="w-30 h-30 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <Image
                          width={300}
                          height={300}
                          src={list.imageCover}
                          alt={list.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-base font-medium">
                          {list.title}
                        </div>
                        <div className="mt-3">
                          <div className="text-sm md:text-base font-medium">
                            <span className="text-teal-700">$</span>
                            {list.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-1 md:mt-0 flex justify-between md:gap-5 border-t-1 md:border-none pt-2 md:justify-end items-center">
                      <button
                        onClick={() => deleteWishList(list.id)}
                        className="bg-red-500 relative transition-all text-md lg:text-lg font-semibold w-fit cursor-pointer rounded-lg px-2 py-1 lg:px-4 lg:py-2 hover:bg-red-800"
                      >
                        <i className="fas fa-trash-alt text-white"></i>
                      </button>
                      <AddListBtn id={list._id} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="px-4 mx-auto flex flex-col justify-center items-center ">
          <div className="w-[200px] mx-auto xl:mt-40 ">
            <Image
              priority
              width={200}
              height={200}
              src="/images/emptywishlist.svg"
              alt="embty cart"
              className="w-full"
            />
          </div>
          <h1 className="font-bold text-2xl mt-4 text-red-800">
            Your WishList is empty !
          </h1>
          <Link
            href="/products"
            className="px-4 py-2 rounded-md text-sm font-medium border bg-amber-600 mt-4 text-white hover:bg-amber-500"
          >
            Shopping now
          </Link>
        </div>
      )}
    </div>
  );
}
