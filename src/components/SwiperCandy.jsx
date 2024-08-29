import React from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";

const SwiperComponent = ({ items, handleItem }) => {

  return (
    <Swiper
      breakpoints={{
        340: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        700: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="max-w-[90%] mx-auto pb-8"
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <article
            className="flex flex-col gap-3 mb-20 group relative shadow-lg text-foreground rounded-xl px-1 py-8 h-[350px] w-[270px] 2xl:h-[400px] 2xl:w-[320px] overflow-hidden cursor-pointer mx-auto"
            onClick={() => handleItem(item)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-black text-foreground opacity-10 group-hover:opacity-50" />
            <div className="relative flex flex-col gap-3">
              <h1 className="text-xl lg:text-2xl uppercase font-bold text-secondary-color group-hover:text-third-color mx-auto">
                {item.name}
              </h1>
              <p className="lg:text-lg text-transparent group-hover:text-third-color w-10/12 mx-auto">
                {item.content}
              </p>
              <p className="lg:text-lg fixed left-[280px] top-[320px] md:left-[220px] md:top-[320px] lg:left-48 lg:top-[320px] xl:left-[200px] xl:top-[320px] 2xl:left-[250px] 2xl:top-[370px]">
                ${item.price}
              </p>
            </div>
            <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-third-color group-hover:text-primary-color group-hover:rotate-45 duration-100" />
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
