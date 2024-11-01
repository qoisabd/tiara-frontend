"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { swiperContent } from "@/lib/swiperContent";

const BannerSwiper = () => {
  return (
    <div className="mt-10 px-4 md:px-32">
      <div className="w-full h-[500px] relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="w-full h-full"
        >
          {swiperContent.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt || `Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-next right-5 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer">
            ❯
          </div>
          <div className="swiper-button-prev left-5 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer">
            ❮
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSwiper;
