"use client";
import Image from "next/image";
import React from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MainSlider() {
  return (
    <div className="container  w-full  mx-auto md:flex ">
      <div className=" w-full lg:w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          <SwiperSlide>
            <Image
              src="/images/slider-2.jpeg"
              alt="slider"
              width={1200}
              height={400}
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/grocery-banner.png"
              alt="slider"
              width={1200}
              height={400}
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/grocery-banner-2.jpeg"
              alt="slider"
              width={1200}
              height={400}
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/blog-img-2.jpeg"
              alt="slider"
              width={1200}
              height={400}
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/blog-img-1.jpeg"
              alt="slider"
              width={1200}
              height={400}
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full lg:w-1/4 flex lg:block">
        <div>
          <Image
            src="/images/slider-image-2.jpeg"
            alt="slider"
            width={400}
            height={200}
            className="w-full object-cover h-[15vh] lg:h-[20vh]"
          />
        </div>
        <div>
          <Image
            src="/images/slider-image-3.jpeg"
            alt="slider"
            width={400}
            height={200}
            className="w-full object-cover h-[15vh] lg:h-[20vh]"
          />
        </div>
        <div className="lg:hidden">
          <Image
            src="/images/slider-image-1.jpeg"
            alt="slider"
            width={400}
            height={200}
            className="w-full object-cover h-[15vh] lg:h-[20vh]"
          />
        </div>
      </div>
    </div>
  );
}
