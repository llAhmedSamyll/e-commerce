"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <nav className=" bg-gray-900 fixed w-full z-20 top-0 start-0  ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        ></Link>

        {/* Right section (button + toggle) */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Login
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Register
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Signout
          </button>

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
          <ul className="flex flex-col  md:items-center p-4 md:p-0 mt-4 font-medium border  rounded-lg md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700">
            <li className={path === "/" ? "active" : ""}>
              <Link
                href="/"
                className="block py-2 px-3  text-md font-medium text-white  rounded-sm md:bg-transparent   "
              >
                Home
              </Link>
            </li>
            <li className={path === "/cart" ? "active" : ""}>
              <Link
                href="/cart"
                className="block py-2 px-3  text-md font-medium text-white rounded-sm md:bg-transparent   "
              >
                Cart
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
