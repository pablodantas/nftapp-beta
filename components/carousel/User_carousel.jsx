// import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, EffectCoverflow, Ally } from "swiper";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Like from "./like";
import ComentsPost from "./comentarios/comentsPost";
import Coments from "./comentarios/coments";

const User_carousel = () => {
  return (
    <div className="overflow-hidden relative pt-40">
      <div>
        <h2 className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-2xl dark:text-white text-center">More items from this user</h2>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={190}
        autoplay={true}
        loop={true}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-4",
          prevEl: ".swiper-button-prev-4",
        }}
        breakpoints={{
          // when window width is >= 640px
          100: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          700: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 100,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 100,
          },
        }}
        className="card-slider-4-columns !py-5 w-full mb-20"
        // style={{ transform: "scaleX(1.2)" }}
      >
        <SwiperSlide>
          <Link href={"#"}>
            <div className="col cardpost card-m">
              <div className="row flex">
                <div className="col">
                  <div className="row flex flex-col">
                    <div className="col p-0">
                      <div className="row flex flex-row">
                        <div className="col-auto flex items-start">
                          <div className="mt-4"></div>
                        </div>
                        <div className="col flex justify-between ">
                          {/* <Seguir /> */}
                        </div>
                      </div>
                    </div>
                    <div className="col flex items-center">
                      <div className="row flex flex-col">
                        <div className="col mt-2 mx-w">
                          <p className="textpost dark:text-white name_light"></p>
                        </div>
                        <div className="col mx-w">
                          <div className="row flex col-reverse_500">
                            <div className="col relative col_img_feed">
                              <article className="article_card article_card_mk">
                                <div className="article_card_mk rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
                                  <figure className="group overflow-hidden ">
                                    <a href="/single_post/post_1">
                                      <img
                                        src="/images/Doodles-Guide-Feature-Image.png"
                                        alt="Mint your own Tezos collections"
                                        className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105 "
                                      />
                                    </a>
                                  </figure>
                                  <div className="relative dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white p-5_c">
                                    <h2 className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                                      <a href="/single_post/post_1">
                                        Mint your own Tezos collections
                                      </a>
                                    </h2>
                                    <p className="dark:text-jacarta-200 mb-8">
                                      Since we launched Tezos at the end of
                                      2021, many awesome creators...
                                    </p>
                                    <div className="flex justify-between">
                                      <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                                        <span>
                                          <time>5 Feb</time>
                                        </span>
                                        <span>•</span>
                                        <span>3 min read</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                          </div>
                        </div>
                        <div className="col flex justify-content-start mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
      <div className="swiper-button-prev-4 group absolute top-1/2 left-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="fill-jacarta-700 group-hover:fill-accent"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
        </svg>
      </div>
      <div className="swiper-button-next-4 group absolute top-1/2 right-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-base shadow-white-volume">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="fill-jacarta-700 group-hover:fill-accent"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
        </svg>
      </div>
    </div>
  );
};

export default User_carousel;
