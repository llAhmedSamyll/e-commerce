import getBrands from "@/api/getBrands";
import { brandType } from "@/types/brandType";
import Image from "next/image";
import React from "react";

export default async function Brands() {
  const { data }: { data: brandType[] } = await getBrands();

  return (
    <div className="container mx-auto py-4 ">
      <div className="flex flex-wrap justify-center items-center p-4  rounded-md ">
        {data.map((brand) => (
          <div
            key={brand._id}
            className=" p-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 "
          >
            <div className="rounded-md overflow-hidden hover:shadow-xl ">
              <Image
                width={500}
                height={500}
                className="w-full"
                src={brand.image}
                alt={brand.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
