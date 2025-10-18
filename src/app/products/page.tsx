"use client";

import Link from "next/link";
import getProducts from "../../api/getProducts";
import Image from "next/image";
import { ProductType } from "@/types/product.type";
import { useEffect, useState } from "react";
import AddBtn from "../_Components/AddBtn/AddBtn";
import Wishlist from "../_Components/Wishlistbtn";

export default function AllProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="container mx-auto py-5">
      {/* 🔍 مربع البحث */}
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-teal-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* 🛒 المنتجات */}
      <div className="flex flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: ProductType) => (
            <div
              key={product.id}
              className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 md:p-2 p-2 group"
              data-aos="fade-up"
            >
              <div className="rounded-lg bg-[#f3f3f3] overflow-hidden border relative hover:shadow-lg hover:scale-[1.02] border-teal-400 transition-all">
                <Link href={`/products/${product.id}`}>
                  <div className="relative border-b border-teal-400">
                    <Image
                      width={400}
                      height={400}
                      className="w-full"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    {product.priceAfterDiscount && (
                      <div className="absolute top-0 right-0 flex justify-center items-center w-1/4">
                        <Image
                          width={200}
                          height={200}
                          className="w-full"
                          src="/images/discount.png"
                          alt="discount"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between">
                      <span className="bg-blue-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
                        {product.category.name}
                      </span>
                    </div>
                    <h1 className="line-clamp-1 text-lg font-bold">
                      {product.title}
                    </h1>
                    <p className="text-teal-700 line-clamp-2 text-sm">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {product.priceAfterDiscount &&
                        product.priceAfterDiscount < product.price ? (
                          <>
                            <span className="text-gray-500 line-through text-sm">
                              $ {product.price}
                            </span>
                            <span className="text-red-600 font-bold text-lg">
                              $ {product.priceAfterDiscount}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-900 font-bold text-lg">
                            $ {product.price}
                          </span>
                        )}
                      </div>
                      {product.priceAfterDiscount &&
                        product.priceAfterDiscount < product.price && (
                          <div className="-mt-2">
                            <span className="bg-yellow-200 text-black text-xs font-semibold px-2 py-1 rounded-full">
                              -
                              {Math.round(
                                ((product.price - product.priceAfterDiscount) /
                                  product.price) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </Link>

                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-teal-900 ml-3">
                    {product.ratingsAverage}{" "}
                    <i className="fa-solid fa-star text-yellow-400" />
                  </span>
                  <div className="z-50 mr-4">
                    <Wishlist id={product.id} />
                  </div>
                </div>
                <AddBtn id={product.id} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-gray-600 text-lg mt-10">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
