import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, EffectCoverflow, Ally, Autoplay } from "swiper";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import Like from "./like";
import ComentsPost from "./comentarios/comentsPost";
import Coments from "./comentarios/coments";

const Feed_carousel = () => {
  return (
    <div className="overflow-hidden relative">
      <Swiper
        slidesPerView="auto"
        spaceBetween={190}
        loop={true}
        pagination={false}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        navigation={{
          nextEl: ".swiper-button-next-4",
          prevEl: ".swiper-button-prev-4",
        }}
        breakpoints={{
          // when window width is >= 640px
          100: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // when window width is >= 768px
          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 150,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 250,
          },
          1900: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
        className="card-slider-4-columns !py-5 w-full h-655"
        // style={{ transform: "scaleX(1.2)" }}
      >
        <SwiperSlide>
          <Link href={"#"}>
              <div className="col cardpost">
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
                          <div className="col sm:mx-w">
                            <div className="row flex">
                              <div className="col relative col_img_feed">
                                <article className="article_card">
                                  <div className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
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
                                    < Coments/>
                                      <div className="mb-3 flex flex-wrap items-center space-x-1">
                                        <a
                                          href="#"
                                          className="dark:text-jacarta-200 text-jacarta-700 font-display hover:text-accent"
                                        >
                                          <div className="imgBorder mr-2">
                                            <img
                                              className="imgPostAuthor"
                                              src="https://ipfs.moralis.io:2053/ipfs/QmUkjfws5aESgu1XUNenpUU159zQvxytSQ5R1wJmGKwwUv/ipfs.jpg"
                                              alt="owner"
                                            />
                                          </div>
                                        </a>
                                        <span className="text-accent inline-flex flex-wrap items-center space-x-1">
                                          <a href="#" className="text_user">
                                            BlackBuzz
                                          </a>
                                        </span>
                                        <div className="col flex items-center flex-w-col items-center">
                                          <p className="ml-2 mb-0 flex">
                                            <small className="text-truncate sm:ml-1 max-w-[10rem] select-none overflow-hidden">
                                              0x5875...7cddc
                                            </small>
                                          </p>
                                          <button className="btn feedBtn rounded-pill flex p-1 ml-1">
                                            <svg
                                              width="11"
                                              height="11"
                                              viewBox="0 0 11 11"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M7.07916 1.92382H1.9655C1.48567 1.92382 1.09595 2.31354 1.09595 2.79337V10.1305C1.09595 10.6103 1.48567 11 1.9655 11H7.07916C7.55898 11 7.94871 10.6103 7.94871 10.1305V2.79337C7.94646 2.31354 7.55673 1.92382 7.07916 1.92382ZM7.33821 10.1282C7.33821 10.2724 7.22106 10.3895 7.07691 10.3895H1.96324C1.81907 10.3895 1.70193 10.2724 1.70193 10.1282V2.79337C1.70193 2.6492 1.81907 2.53206 1.96324 2.53206H7.07691C7.22106 2.53206 7.33821 2.6492 7.33821 2.79337V10.1282Z"
                                                fill="#959595"
                                              />
                                              <path
                                                d="M9.03452 0H3.92085C3.44102 0 3.0513 0.38972 3.0513 0.86955C3.0513 1.0385 3.18646 1.17366 3.35542 1.17366C3.52437 1.17366 3.65953 1.0385 3.65953 0.86955C3.65953 0.725373 3.77667 0.608234 3.92085 0.608234H9.03452C9.17867 0.608234 9.29582 0.725373 9.29582 0.86955V8.20666C9.29582 8.35081 9.17867 8.46797 9.03452 8.46797C8.86556 8.46797 8.73037 8.6031 8.73037 8.77206C8.73037 8.94102 8.86556 9.07616 9.03452 9.07616C9.51434 9.07616 9.90407 8.68648 9.90407 8.20666V0.86955C9.90407 0.38972 9.51434 0 9.03452 0Z"
                                                fill="#959595"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <h2 className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                                        <a href="/single_post/post_1">
                                          Mint your own Tezos collections
                                        </a>
                                      </h2>
                                      <p className="dark:text-jacarta-200 mb-8">
                                        Since we launched Tezos at the end of
                                        2021, many awesome creators...
                                      </p>
                                      <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                                        <span>
                                          <time>5 Feb</time>
                                        </span>
                                        <span>•</span>
                                        <span>3 min read</span>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </div>
                              <div className="col-auto mx-2">
                                <div className="row flex flex-col">
                                  <Like/>
                                  <div className="col mb-3 mw-100">
                                    <div className="row flex flex-col flex-center-500">
                                      <button
                                        className="col-auto rounded-pill flex_important items-center justify-center"
                                        // onClick={() => ComentsChat(index)}
                                      >
                                        <svg className="btnAnimated fill-black dark:fill-white" width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M22 9.4888C22 14.7293 17.0748 18.9776 11 18.9776C9.91052 18.9791 8.82556 18.8396 7.77287 18.5628C6.96987 18.9641 5.126 19.734 2.024 20.2356C1.749 20.2789 1.54 19.997 1.64863 19.7448C2.13538 18.6116 2.57537 17.1015 2.70737 15.7243C1.023 14.057 0 11.8746 0 9.4888C0 4.24827 4.92525 0 11 0C17.0748 0 22 4.24827 22 9.4888ZM6.875 9.4888C6.875 9.12929 6.73013 8.7845 6.47227 8.53029C6.21441 8.27608 5.86467 8.13326 5.5 8.13326C5.13533 8.13326 4.78559 8.27608 4.52773 8.53029C4.26987 8.7845 4.125 9.12929 4.125 9.4888C4.125 9.84832 4.26987 10.1931 4.52773 10.4473C4.78559 10.7015 5.13533 10.8443 5.5 10.8443C5.86467 10.8443 6.21441 10.7015 6.47227 10.4473C6.73013 10.1931 6.875 9.84832 6.875 9.4888ZM12.375 9.4888C12.375 9.12929 12.2301 8.7845 11.9723 8.53029C11.7144 8.27608 11.3647 8.13326 11 8.13326C10.6353 8.13326 10.2856 8.27608 10.0277 8.53029C9.76987 8.7845 9.625 9.12929 9.625 9.4888C9.625 9.84832 9.76987 10.1931 10.0277 10.4473C10.2856 10.7015 10.6353 10.8443 11 10.8443C11.3647 10.8443 11.7144 10.7015 11.9723 10.4473C12.2301 10.1931 12.375 9.84832 12.375 9.4888ZM16.5 10.8443C16.8647 10.8443 17.2144 10.7015 17.4723 10.4473C17.7301 10.1931 17.875 9.84832 17.875 9.4888C17.875 9.12929 17.7301 8.7845 17.4723 8.53029C17.2144 8.27608 16.8647 8.13326 16.5 8.13326C16.1353 8.13326 15.7856 8.27608 15.5277 8.53029C15.2699 8.7845 15.125 9.12929 15.125 9.4888C15.125 9.84832 15.2699 10.1931 15.5277 10.4473C15.7856 10.7015 16.1353 10.8443 16.5 10.8443Z"/>
                                        </svg>

                                      </button>
                                      <div className="col pt-1 text-center dark:text-white name_light ">
                                        <h6 className="grayfeed mb-0 text-md">
                                          <small>
                                            <ComentsPost/>
                                          </small>
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col flex justify-center mb-3">
                                    <button>
                                      <svg className="btnAnimated fill-black dark:fill-white" width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_2_129)">
                                        <path d="M0.310041 17.2607C1.73093 12.6 4.61294 9.30688 8.81875 7.54069C10.0917 7.02204 11.5748 6.60759 13.1224 6.36206L13.2369 6.34688C13.5874 6.34688 13.5889 6.33723 13.5889 4.03516V1.72412L22.2721 9.61792L13.5889 17.5117V12.8897H12.5329C9.66008 12.9503 6.96466 13.5841 4.55984 14.6689L4.66984 14.6241C3.27701 15.3635 2.08293 16.2428 1.05349 17.262L1.04363 17.2724L0.00128174 18.2751L0.310799 17.26L0.310041 17.2607Z"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_2_129">
                                        <rect width="22" height="20"/>
                                        </clipPath>
                                        </defs>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
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
        <SwiperSlide>
          <Link href={"#"}>
              <div className="col cardpost">
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
                          <div className="col sm:mx-w">
                            <div className="row flex col-reverse_500">
                              <div className="col relative col_img_feed">
                                <article className="article_card">
                                  <div className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
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
                                    < Coments/>
                                      <div className="mb-3 flex flex-wrap items-center space-x-1">
                                        <a
                                          href="#"
                                          className="dark:text-jacarta-200 text-jacarta-700 font-display hover:text-accent"
                                        >
                                          <div className="imgBorder mr-2">
                                            <img
                                              className="imgPostAuthor"
                                              src="https://ipfs.moralis.io:2053/ipfs/QmUkjfws5aESgu1XUNenpUU159zQvxytSQ5R1wJmGKwwUv/ipfs.jpg"
                                              alt="owner"
                                            />
                                          </div>
                                        </a>
                                        <span className="text-accent inline-flex flex-wrap items-center space-x-1">
                                          <a href="#" className="text_user">
                                            BlackBuzz
                                          </a>
                                        </span>
                                        <div className="col flex items-center flex-w-col items-center">
                                          <p className="ml-2 mb-0 flex">
                                            <small className="text-truncate sm:ml-1 max-w-[10rem] select-none overflow-hidden">
                                              0x5875...7cddc
                                            </small>
                                          </p>
                                          <button className="btn feedBtn rounded-pill flex p-1 ml-1">
                                            <svg
                                              width="11"
                                              height="11"
                                              viewBox="0 0 11 11"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M7.07916 1.92382H1.9655C1.48567 1.92382 1.09595 2.31354 1.09595 2.79337V10.1305C1.09595 10.6103 1.48567 11 1.9655 11H7.07916C7.55898 11 7.94871 10.6103 7.94871 10.1305V2.79337C7.94646 2.31354 7.55673 1.92382 7.07916 1.92382ZM7.33821 10.1282C7.33821 10.2724 7.22106 10.3895 7.07691 10.3895H1.96324C1.81907 10.3895 1.70193 10.2724 1.70193 10.1282V2.79337C1.70193 2.6492 1.81907 2.53206 1.96324 2.53206H7.07691C7.22106 2.53206 7.33821 2.6492 7.33821 2.79337V10.1282Z"
                                                fill="#959595"
                                              />
                                              <path
                                                d="M9.03452 0H3.92085C3.44102 0 3.0513 0.38972 3.0513 0.86955C3.0513 1.0385 3.18646 1.17366 3.35542 1.17366C3.52437 1.17366 3.65953 1.0385 3.65953 0.86955C3.65953 0.725373 3.77667 0.608234 3.92085 0.608234H9.03452C9.17867 0.608234 9.29582 0.725373 9.29582 0.86955V8.20666C9.29582 8.35081 9.17867 8.46797 9.03452 8.46797C8.86556 8.46797 8.73037 8.6031 8.73037 8.77206C8.73037 8.94102 8.86556 9.07616 9.03452 9.07616C9.51434 9.07616 9.90407 8.68648 9.90407 8.20666V0.86955C9.90407 0.38972 9.51434 0 9.03452 0Z"
                                                fill="#959595"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <h2 className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                                        <a href="/single_post/post_1">
                                          Mint your own Tezos collections
                                        </a>
                                      </h2>
                                      <p className="dark:text-jacarta-200 mb-8">
                                        Since we launched Tezos at the end of
                                        2021, many awesome creators...
                                      </p>
                                      <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                                        <span>
                                          <time>5 Feb</time>
                                        </span>
                                        <span>•</span>
                                        <span>3 min read</span>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </div>
                              <div className="col-auto mx-2">
                                <div className="row flex flex-col">
                                  <Like/>
                                  <div className="col mb-3 mw-100">
                                    <div className="row flex flex-col flex-center-500">
                                      <button
                                        className="col-auto rounded-pill flex_important items-center justify-center"
                                        // onClick={() => ComentsChat(index)}
                                      >
                                        <svg className="btnAnimated fill-black dark:fill-white" width="22" height="21" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M22 9.4888C22 14.7293 17.0748 18.9776 11 18.9776C9.91052 18.9791 8.82556 18.8396 7.77287 18.5628C6.96987 18.9641 5.126 19.734 2.024 20.2356C1.749 20.2789 1.54 19.997 1.64863 19.7448C2.13538 18.6116 2.57537 17.1015 2.70737 15.7243C1.023 14.057 0 11.8746 0 9.4888C0 4.24827 4.92525 0 11 0C17.0748 0 22 4.24827 22 9.4888ZM6.875 9.4888C6.875 9.12929 6.73013 8.7845 6.47227 8.53029C6.21441 8.27608 5.86467 8.13326 5.5 8.13326C5.13533 8.13326 4.78559 8.27608 4.52773 8.53029C4.26987 8.7845 4.125 9.12929 4.125 9.4888C4.125 9.84832 4.26987 10.1931 4.52773 10.4473C4.78559 10.7015 5.13533 10.8443 5.5 10.8443C5.86467 10.8443 6.21441 10.7015 6.47227 10.4473C6.73013 10.1931 6.875 9.84832 6.875 9.4888ZM12.375 9.4888C12.375 9.12929 12.2301 8.7845 11.9723 8.53029C11.7144 8.27608 11.3647 8.13326 11 8.13326C10.6353 8.13326 10.2856 8.27608 10.0277 8.53029C9.76987 8.7845 9.625 9.12929 9.625 9.4888C9.625 9.84832 9.76987 10.1931 10.0277 10.4473C10.2856 10.7015 10.6353 10.8443 11 10.8443C11.3647 10.8443 11.7144 10.7015 11.9723 10.4473C12.2301 10.1931 12.375 9.84832 12.375 9.4888ZM16.5 10.8443C16.8647 10.8443 17.2144 10.7015 17.4723 10.4473C17.7301 10.1931 17.875 9.84832 17.875 9.4888C17.875 9.12929 17.7301 8.7845 17.4723 8.53029C17.2144 8.27608 16.8647 8.13326 16.5 8.13326C16.1353 8.13326 15.7856 8.27608 15.5277 8.53029C15.2699 8.7845 15.125 9.12929 15.125 9.4888C15.125 9.84832 15.2699 10.1931 15.5277 10.4473C15.7856 10.7015 16.1353 10.8443 16.5 10.8443Z"/>
                                        </svg>

                                      </button>
                                      <div className="col pt-1 text-center dark:text-white name_light ">
                                        <h6 className="grayfeed mb-0 text-md">
                                          <small>
                                            <ComentsPost/>
                                          </small>
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col flex justify-center mb-3">
                                    <button>
                                      <svg className="btnAnimated fill-black dark:fill-white" width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_2_129)">
                                        <path d="M0.310041 17.2607C1.73093 12.6 4.61294 9.30688 8.81875 7.54069C10.0917 7.02204 11.5748 6.60759 13.1224 6.36206L13.2369 6.34688C13.5874 6.34688 13.5889 6.33723 13.5889 4.03516V1.72412L22.2721 9.61792L13.5889 17.5117V12.8897H12.5329C9.66008 12.9503 6.96466 13.5841 4.55984 14.6689L4.66984 14.6241C3.27701 15.3635 2.08293 16.2428 1.05349 17.262L1.04363 17.2724L0.00128174 18.2751L0.310799 17.26L0.310041 17.2607Z"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_2_129">
                                        <rect width="22" height="20"/>
                                        </clipPath>
                                        </defs>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
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
    </div>
  );
};

export default Feed_carousel;