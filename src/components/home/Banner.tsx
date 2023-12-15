"use client";

import bongobondhuImage from "@/assets/images/bongobondhu.png";
import smrityShoudhImage from "@/assets/images/srimty-shoudh.gif";
import sangshadImage from "@/assets/images/sangsad.gif";
import Image from "next/image";

// Import Swiper styles
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Banner = () => {
  const [_, setInit] = useState<boolean>(false);

  const bannerImages = [
    {
      id: 1,
      image: bongobondhuImage,
    },
    {
      id: 2,
      image: smrityShoudhImage,
    },
    {
      id: 3,
      image: sangshadImage,
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        // pagination={{
        //   clickable: true,
        //   renderBullet: function (index, className) {
        //     return (
        //       '<span class="mt-10 ' +
        //       className +
        //       '"><img class="pagination-bullet bg-white w-3 h-2 rounded-full"/></span>'
        //     );
        //   },
        // }}
        // navigation={{
        //   prevEl: prevRef.current,
        //   nextEl: nextRef.current,
        // }}
        scrollbar={{ draggable: true }}
        onInit={() => setInit(true)}
        className="w-full"
        // breakpoints={
        //   {
        //     // when window width is >= 640px
        //     0: {
        //       slidesPerView: 1,
        //       spaceBetween: 20,
        //     },
        //     // when window width is >= 768px
        //     768: {
        //       slidesPerView: 2,
        //       spaceBetween: 40,
        //     },
        //     // when window width is >= 1200px
        //     1200: {
        //       slidesPerView: 3,
        //       spaceBetween: 50,
        //     },
        //   } as any
        // }
      >
        {bannerImages.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="relative h-64 w-full">
                <Image
                  src={item.image}
                  layout="fill"
                  objectFit="cover"
                  alt="banner image"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
