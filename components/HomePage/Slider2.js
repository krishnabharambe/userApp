import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



export default function Slider2({ data2 }) {


  return (
    <div
    className="w-full select-none max-w-7xl mx-auto relative"
  >

    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >

      {data2.map((item, i) => (
 <li key={i}>
   <SwiperSlide> <div className="aspect-w-16 aspect-h-6 md:aspect-h-7 "><img
          src={
            'https://krishnabharambe.pythonanywhere.com/' +
            item.image
          }
          alt=""
        /></div></SwiperSlide>
 </li>
 ))}

    </Swiper>
    </div>
  );
}
