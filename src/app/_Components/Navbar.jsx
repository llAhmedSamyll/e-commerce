"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { data: session, status } = useSession();
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
            {session && (
              <span
                onClick={logOut}
                className="text-white cursor-pointer hidden md:block bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                <i className="fa-solid fa-right-from-bracket fa-flip-horizontal mr-2 "></i>
                Logout
              </span>
            )}
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
                  <span className="text-white  font-medium rounded-lg text-sm px-4 py-2 text-center">
                    Hi , {session?.user.name}
                  </span>
                )}
              </>
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
            {session && (
              <li className={path === "/cart" ? "active" : ""}>
                <Link
                  href="/cart"
                  className="block py-2 px-3  text-md font-medium text-white rounded-sm md:bg-transparent   "
                >
                  Cart
                </Link>
              </li>
            )}
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
            <li >
              {session && (
                <span
                  onClick={logOut}
                  className=" w-full block  cursor-pointer text-white md:hidden bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 text-center"
                >
                  <i className="fa-solid fa-right-from-bracket fa-flip-horizontal mr-2 "></i>
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
