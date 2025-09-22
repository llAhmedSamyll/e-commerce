/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <section className=" bg-gray-800 h-screen flex items-center w-[100%] ">
      <div className="mx-auto">
        <div className="mx-auto text-center">
          <div className="mb-4 p-7">
            <Image width={500} height={500} src="/images/error.png" alt="error" />
          </div>
          <p className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light  text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
