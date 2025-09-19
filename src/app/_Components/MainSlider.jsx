"use client";
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
            <img
              className="w-full object-cover  h-[20vh] lg:h-[40vh]"
              src="/images/slider-2.jpeg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
              src="/images/grocery-banner.png"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
              src="/images/grocery-banner-2.jpeg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
              src="/images/blog-img-2.jpeg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full object-cover h-[20vh] lg:h-[40vh]"
              src="/images/blog-img-1.jpeg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full lg:w-1/4  flex  lg:block ">
        <div>
          <img
            className="w-full object-cover h-[15vh] lg:h-[20vh]"
            src="/images/slider-image-2.jpeg"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-full object-cover h-[15vh] lg:h-[20vh]"
            src="/images/slider-image-3.jpeg"
            alt=""
          />
        </div>
        <div className="lg:hidden" >
          <img
            className="w-full object-cover h-[15vh] lg:h-[20vh]"
            src="/images/slider-image-1.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
