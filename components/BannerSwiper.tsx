"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Parallax, Navigation } from "swiper/modules";
import { swiperContent } from "@/lib/swiperContent";

const BannerSwiper = () => {
  return (
    <div className="px-4 md:px-32">
      <div className="w-full h-[500px]  relative py-10">
        <Swiper
          slidesPerView={1}
          grabCursor={true}
          rewind={true}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          parallax={true}
          modules={[Autoplay, Pagination, Parallax, Navigation]}
          className="w-full h-full"
        >
          {swiperContent.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative  h-full">
                <Image
                  src={item.image}
                  alt={item.alt || `Slide ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="w-full h-full rounded-3xl bg-center object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSwiper;
