import Link from "next/link";
import getProducts from "../api/getProducts";
import Image from "next/image";
import { ProductType } from "@/types/product.type";
export default async function AllProducts() {
  const data = await getProducts();

  return (
    <>
      <div className="container mx-auto flex   flex-wrap">
        {data.map((product: ProductType) => (
          <div
            key={product.id}
            className=" w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 md:p-2 p-2  "
            data-aos="fade-up"
          >
            <div className="   rounded-lg bg-[#f3f3f3]   overflow-hidden  border group relative hover:shadow-lg shadow-teal-600 hover:scale-[1.02] border-teal-400 transition-all  ">
              <Link href={`/products/${product.id}`}>
                <div className="relative  border-b border-teal-400 ">
                  <Image
                    width={400}
                    height={400}
                    className="w-full "
                    src={product.imageCover}
                    alt={product.title}
                  />
                  {product.priceAfterDiscount && (
                    <div className="absolute  top-0 right-0   flex justify-center items-center w-1/4">
                      <Image
                        width={200}
                        height={200}
                        className="w-full "
                        src="/images/discount.png"
                        alt="discount"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="p-3">
                    <span className="bg-blue-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">
                      {product.category.name}
                    </span>
                    <h1 className="line-clamp-1 text-lg font-bold ">
                      {product.title}
                    </h1>
                    <p className="text-teal-700 line-clamp-2 text-sm ">
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
                      <div className="mt-3">
                        {product.priceAfterDiscount &&
                          product.priceAfterDiscount < product.price && (
                            <div>
                              <span className="bg-yellow-200 text-black text-xs font-semibold px-2 py-1 rounded-full">
                                -
                                {Math.round(
                                  ((product.price -
                                    product.priceAfterDiscount) /
                                    product.price) *
                                    100
                                )}
                                %
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                    <span className="font-bold text-teal-900 ">
                      {product.ratingsAverage}{" "}
                    </span>
                    <i className="fa-solid fa-star text-yellow-400" />
                  </div>
                </div>
              </Link>
              <button className=" cursor-pointer bg-[#FFCE12] relative text-lg translate-y-[100%]  group-hover:translate-0 transition-all transton-[.3s] font-bold w-full p-2 hover:bg-amber-400 ">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
