"use client";
import React from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CategorySwiper({ data }) {
  console.log(data);
  return (
    <>
      <section className="container lg:hidden mx-auto mt-10">
        <h1 className="font-bold text-3xl text-teal-900 text-center pb-3 ">
          Shop popular categories
        </h1>

        <div className=" bg-[#eee] p-4  rounded-3xl ">
          <Swiper
            spaceBetween={5}
            slidesPerView={2}
            modules={[Autoplay]}
            autoplay={{ delay: 1000 }}
          >
            {data.map((category) => (
              <SwiperSlide key={category._id}>
                <div className="flex flex-col justify-center  items-center    ">
                  <img
                    className="object-cover size-50 rounded-3xl "
                    src={category.image}
                    alt=""
                  />
                </div>
                <p className="font-semibold text-center ">{category.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="container hidden lg:block mx-auto mt-10">
        <h1 className="font-bold text-3xl text-teal-900 text-center pb-3 ">
          Shop popular categories
        </h1>

        <div className=" bg-[#eee] p-4  rounded-3xl ">
          <Swiper
            spaceBetween={5}
            slidesPerView={6}
            modules={[Autoplay]}
            autoplay={{ delay: 1000 }}
          >
            {data.map((category) => (
              <SwiperSlide>
                <div className="flex flex-col justify-center   items-center  cursor-grab   ">
                  <img
                    className="object-cover size-50 rounded-3xl "
                    src={category.image}
                    alt=""
                  />
                  <p className="font-semibold text-center ">{category.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
