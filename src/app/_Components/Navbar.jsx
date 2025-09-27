"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "../context/CartCountContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { data: session, status } = useSession();
  const { products } = useContext(CartContext);

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className=" bg-gray-900 fixed w-full z-20 top-0 start-0  ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto p-4">
        {/* Logo */}
        <Link href="/" className=" hidden lg:flex w-45 items-center space-x-3 ">
          <img src="/images/logo.png" alt="logo" />
        </Link>
        <Link href="/" className=" flex lg:hidden w-16 items-center space-x-3 ">
          <img src="/images/logo2.png" alt="logo" />
        </Link>

        {/* Right section (button + toggle) */}
        <div className="flex md:order-2 space-x-2 md:space-x-0 ">
          <div className=" flex">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className={
                    path === "/login"
                      ? "hidden"
                      : " text-white ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  }
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                {session && (
                  <span className="text-white  font-medium rounded-lg text-sm px-4 py-2   flex justify-center items-center ">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-white flex items-center gap-1 cursor-pointer outline-none ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-chevron-down size-4 opacity-50 text-white "
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                        Hi , {session?.user.name}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="z-50" disableScrollLock >
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer " >
                          
                          {session && (
                            <span
                              onClick={logOut}
                              className="text-red-500 px-2 flex justify-center items-center  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center"
                            >
                              <i className="fa-solid text-red-400 fa-right-from-bracket fa-flip-horizontal mr-2 "></i>
                              Logout
                            </span>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                )}
              </>
            )}
            {session && (
              <span
                className={`${
                  path === "/cart" ? "active" : ""
                } flex items-center   `}
              >
                <Link
                  href="/cart"
                  className=" p-2   block justify-center relative  text-md font-medium text-white rounded-sm md:bg-transparent   "
                >
                  <i className=" text-white text-2xl fa-solid fa-cart-shopping"></i>
                  {products.length > 0 && (
                    <span className="bg-orange-500 text-xs font-sans font-semibold size-5 absolute  bottom-8 left-8 flex justify-center items-center rounded-full rounded-bl-none ">
                      {products.length}
                    </span>
                  )}
                </Link>
              </span>
            )}
          </div>
          {/* Toggle button */}
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`${
            open ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col  md:items-center p-3 md:p-0 mt-4 font-medium border  rounded-lg md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700">
            <li className={path === "/" ? "active" : ""}>
              <Link
                href="/"
                className="block py-2 px-3  text-md font-medium text-white  rounded-sm md:bg-transparent   "
              >
                Home
              </Link>
            </li>

            <li className={path === "/products" ? "active" : ""}>
              <Link
                href="/products"
                className="block py-2 px-3  text-md font-medium text-white rounded-sm md:bg-transparent  "
              >
                Products
              </Link>
            </li>
            <li className={path === "/categories" ? "active" : ""}>
              <Link
                href="/categories"
                className="block py-2 px-3  text-md font-medium text-white rounded-sm md:bg-transparent  "
              >
                Categories
              </Link>
            </li>
            <li className={path === "/brands" ? "active" : ""}>
              <Link
                href="/brands"
                className="block py-2 px-3  text-md font-medium text-white rounded-sm md:bg-transparent   "
              >
                Brands
              </Link>
            </li>
            <li>
              {session && (
                <span
                  onClick={logOut}
                  className=" w-full block  cursor-pointer text-red-200 md:hidden bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 text-center"
                >
                  <i className="fa-solid text-red-400  fa-right-from-bracket fa-flip-horizontal mr-2 "></i>
                  Logout
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
