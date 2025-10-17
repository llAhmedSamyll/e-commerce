import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import getProductDetails from "@/api/getProductDetails";
import Image from "next/image";
import AddDetailsBtn from "@/app/_Components/AddBtn/AddDetailsBtn";
import Wishlist from "@/app/_Components/Wishlistbtn";
import getRelatedProducts from "@/ProductCategoryActions/relatedProducts";
import AddBtn from "@/app/_Components/AddBtn/AddBtn";
import Link from "next/link";
import { ProductType } from "@/types/product.type";

export default async function productDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getProductDetails(id);
  if (!data) return <h1>no ptoducts here</h1>;
  const RelatedProducts = await getRelatedProducts(data.category._id);
  console.log(RelatedProducts);

  return (
    <>
      <div className=" bg-[#eee] container min-h-[80vh] mx-auto rounded-2xl mt-30 p-4  flex flex-col md:flex-row justify-center items-center gap-10 ">
        <div className="md:w-1/3  ">
          <div className="w-fit mx-auto p-1 text-xs font-bold text-teal-500  mb-2 rounded-md">
            {data.images.length} pictures
          </div>
          <Carousel className="cursor-grab rounded-2xl overflow-hidden shadow-lg ">
            <CarouselContent>
              {data.images.map((img: string) => (
                <CarouselItem key={img}>
                  <Image
                    priority
                    className="w-full"
                    width={1000}
                    height={1000}
                    src={img}
                    alt="product images"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="md:w-2/3">
          <span className="bg-blue-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">
            {data.category.name}
          </span>
          <div className="flex justify-between items-center ">
            <h1 className="font-bold text-2xl p-4">{data.title}</h1>
          </div>
          <p className="font-mono text-teal-700  "> {data.description}</p>
          <div>
            <span className="font-bold text-teal-900  ">
              {data.ratingsAverage}
            </span>
            <i className="fa-solid fa-star text-yellow-400 mt-5 ms-1 mr-8" />
            <span className="text-teal-700 ">
              {data.ratingsQuantity} Ratings
            </span>
          </div>
          <span className="text-red-600 text-xs ">
            Sold <span className="font-bold">{data.sold}</span> times
          </span>
          <hr className="border-teal-500 mt-2" />
          <div className="flex items-center mt-2 gap-3">
            {data.priceAfterDiscount && data.priceAfterDiscount < data.price ? (
              <>
                <span className="text-gray-500 line-through text-sm">
                  $ {data.price}
                </span>

                <span className="text-red-600 font-bold text-2xl">
                  $ {data.priceAfterDiscount}
                </span>
              </>
            ) : (
              <span className="text-red-600 font-bold text-2xl">
                $ {data.price}
              </span>
            )}
          </div>
          <div className="">
            {data.priceAfterDiscount &&
              data.priceAfterDiscount < data.price && (
                <div>
                  <span className="bg-yellow-200 text-black text-xs font-semibold px-2 py-1 rounded-full">
                    -
                    {Math.round(
                      ((data.price - data.priceAfterDiscount) / data.price) *
                        100
                    )}
                    %
                  </span>
                </div>
              )}
          </div>
          <h1 className="font-bold text-xl mt-5">About this item</h1>
          <div className=" p-3 flex ">
            <div className="w-fit ">
              <p className="font-medium "> category : </p>
              <p className="font-medium">Brand :</p>
              <p className="font-medium">Available quantity : </p>
              <p className="font-medium">First availability : </p>
            </div>
            <div className=" w-fit  ms-3">
              <p>{data.category.name}</p>
              <p>{data.brand.name}</p>
              <p>{data.quantity}</p>
              <p>{new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-5  mt-20 ">
            <AddDetailsBtn id={data.id} />
            <div className="mr-10 mb-19">
              <Wishlist id={data.id} />
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-10 border-teal-400" />
      <h1 className="text-center text-3xl font-semibold text-teal-800 mt-10">
        Related Products
      </h1>

      <div className="container mx-auto flex py-5  flex-wrap">
        {RelatedProducts.data.map((product: ProductType) => (
          <div
            key={product.id}
            className=" w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 md:p-2 p-2 group "
            data-aos="fade-up"
          >
            <div className="   rounded-lg bg-[#f3f3f3]   overflow-hidden  border  relative hover:shadow-lg shadow-teal-600 hover:scale-[1.02] border-teal-400 transition-all  ">
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
                    <div className="flex justify-between">
                      <span className="bg-blue-100 text-teal-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">
                        {product.category.name}
                      </span>
                    </div>
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
                      {product.priceAfterDiscount !== 0 && (
                        <div className="mt-3">
                          {product.priceAfterDiscount &&
                            product.priceAfterDiscount < product.price && (
                              <div className="-mt-2">
                                <span className="bg-yellow-200 text-black text-xs font-semibold px-2 py-1  rounded-full">
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
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-teal-900 ml-3 ">
                  {product.ratingsAverage}{" "}
                  <i className="fa-solid fa-star text-yellow-400" />
                </span>
                <div className="z-50 mr-4 ">
                  <Wishlist id={product.id} />
                </div>
              </div>
              <AddBtn id={product.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
