import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Scrollbar } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import Link from "next/link";

export default function mainServicesView({ data2 }) {
  console.log("MainServices->", data2);
  return (
    <>
    <div className="w-full select-none max-w-7xl mx-auto relative md:hidden px-1">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        slidesPerView={4}
        spaceBetween={5}
        className="mySwiper"
      >
        {data2.map((item, i) => (
          <li key={i}>
           
            <SwiperSlide>
            <Link href={`/mservice/${item.id}`}>
              <a>
              <div className="aspect-w-4 aspect-h-4 md:aspect-w-1 md:aspect-h-1 my-2">
                <img
                  src={
                    "https://krishnabharambe.pythonanywhere.com/" + item.icon
                  }
                  alt=""
                  className="p-4"
                />
              </div>
              <p className="prose prose-sm font-medium text-center">{item.title}</p></a></Link>
            </SwiperSlide>
          </li>
        ))}
       
      </Swiper>
    </div>


    <div className="w-full select-none max-w-7xl mx-auto relative hidden md:block">
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        slidesPerView={10}
        spaceBetween={5}
        className="mySwiper"
      >
        {data2.map((item, i) => (
          <li key={i}>
            <SwiperSlide>
            <Link href={`/mservice/${item.id}`}>
              <a>
              <div className="aspect-w-4 aspect-h-4 md:aspect-w-1 md:aspect-h-1">
                <img
                  src={
                    "https://krishnabharambe.pythonanywhere.com/" + item.icon
                  }
                  alt=""
                  className="p-4"
                />
              </div>
              <p className="prose prose-sm font-medium text-center">{item.title}</p></a></Link>
            </SwiperSlide>
          </li>
        ))}
      </Swiper>
    </div>

    </>
  );
}
