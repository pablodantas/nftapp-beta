import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, Ally, Autoplay } from "swiper";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import React, { useState, useEffect, useMemo, useRef } from "react";
import ImageNFTBuy from "./metadata/nftImageBuyOff";
import ProfileExplore from "./userProfile/ProfileExplore";
import ProfileExploreName from "./userProfile/ProfileExploreName";

const Explore_carousel = () => {
  const { Moralis, user } = useMoralis();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    const query = new Moralis.Query("Marketplace");
    const toSkip = (page - 1) * pageSize;
    query.skip(toSkip);
    query.limit(pageSize);
    query.ascending("random");
    const result = await query.find();
    const res = JSON.parse(JSON.stringify(result));
    return res;
  };

  const { data, isLoading } = useQuery(`ExplorerMk${pageSize}`, fetchItem, {
    staleTime: 1000 * 90,
  });

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="overflow-hidden relative dark:boxsh_light_none boxsh_light"
      style={
        isLargeScreen
          ? {
              // height: "500px",
              paddingTop: "100px",
              borderRadius: "20px",
              margin: "10px 20px",
            }
          : {
              paddingTop: "100px",
              borderRadius: "20px",
              margin: "10px 20px",
            }
      }
    >
      <Swiper
        slidesPerView="auto"
        spaceBetween={190}
        loop={true}
        pagination={true}
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        navigation={{
          nextEl: ".swiper-button-next-4",
          prevEl: ".swiper-button-prev-4",
        }}
        breakpoints={{
          // when window width is >= 640px
          100: {
            pagination: false,
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // when window width is >= 768px
          700: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 1,
            spaceBetween: 150,
          },
          1200: {
            slidesPerView: 1,
            spaceBetween: 250,
          },
          1900: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        className="card-slider-4-columns pt-24 w-full"
        // style={{ transform: "scaleX(1.2)" }}
        style={isLargeScreen ? { height: "500px" } : {}}
      >
        {item.map((item, index) => (
          <SwiperSlide>
            <Link href={"#"}>
              <div className="row flex">
                <div
                  className={`col relative ${
                    !isLargeScreen ? "col_img_feed" : ""
                  }`}
                >
                  <article
                    className="article_card bg_article"
                    style={
                      isLargeScreen
                        ? { maxHeight: "500px" }
                        : { maxHeight: "400px" }
                    }
                  >
                    <div
                      className=" transition-shadow hover:shadow-lg"
                      style={{
                        width: "100vw",
                        maxHeight: "500px",
                      }}
                    >
                      <figure className="relative group overflow-hidden">
                        <ImageNFTBuy tokenURI={item.image} />
                      </figure>
                    </div>
                  </article>
                  <div
                    className="absolute flex items-end justify-between bg_black_linear"
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: isLargeScreen ? "62px 43px" : "",
                    }}
                  >
                    <div className="flex-col flex">
                      <div className="flex items-center cursor-pointer">
                        <Link href={`/user/${item?.owner}`}>
                          <div className="w_h imgBorder2 mr-10-i">
                            <ProfileExplore address={item?.owner} />
                          </div>
                        </Link>
                        <Link href={`/user/${item?.owner}`}>
                          <h2
                            className="cursor-pointer text-truncate_feed  mr-2 font-display text-jacarta-700 dark:hover:text-accent hover:text-accent text-white"
                            style={{ fontSize: "20px", maxWidth: "80px" }}
                          >
                            <ProfileExploreName address={item?.owner} />
                          </h2>
                        </Link>
                        <span>
                          <svg
                            className="h-4 w-4"
                            width="734"
                            height="734"
                            viewBox="0 0 734 734"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="198"
                              y="229"
                              width="386"
                              height="322"
                              fill="white"
                            />
                            <path
                              d="M666.407 242.251L666.356 242.557L666.608 242.739C706.064 271.16 732.833 315.184 732.833 366.667C732.833 418.149 706.064 462.207 666.608 490.594L666.356 490.776L666.407 491.082C674.384 539.013 661.95 589.376 625.647 625.646L626 626L625.646 625.646C589.277 662.016 538.947 674.118 491.214 666.34L490.907 666.29L490.727 666.543C462.441 706.13 418.017 732.833 366.667 732.833C315.184 732.833 271.06 706.031 242.706 666.509L242.525 666.257L242.219 666.307C194.419 674.118 144.056 662.049 107.654 625.646C71.2847 589.278 59.1824 538.915 67.2264 491.083L67.278 490.776L67.0253 490.594C27.6007 462.239 0.5 418.181 0.5 366.667C0.5 315.153 27.6008 271.061 67.0251 242.739L67.2781 242.558L67.2264 242.25C59.1824 194.418 71.2847 144.056 107.687 107.687L107.687 107.687C143.99 71.3503 194.387 58.9491 242.485 66.9266L242.793 66.9776L242.974 66.7237C271.16 27.203 315.283 0.5 366.667 0.5C417.984 0.5 462.341 27.1704 490.66 66.7244L490.841 66.9777L491.149 66.9266C539.079 58.9493 589.376 71.4164 625.646 107.687L626 107.333L625.647 107.687C661.95 143.957 674.417 194.321 666.407 242.251ZM329.003 447.829L257.254 376.08L257.247 376.074C250.866 369.911 242.32 366.5 233.449 366.578C224.578 366.655 216.092 370.213 209.819 376.486C203.546 382.759 199.988 391.245 199.911 400.116C199.834 408.987 203.244 417.533 209.407 423.914L209.413 423.92L309.413 523.92C312.888 527.395 317.078 530.072 321.692 531.764C326.306 533.455 331.234 534.121 336.131 533.716C341.029 533.31 345.78 531.842 350.052 529.414C354.325 526.986 358.018 523.657 360.874 519.657L527.54 286.324C530.122 282.707 531.966 278.618 532.967 274.288C533.968 269.959 534.107 265.475 533.375 261.092C532.643 256.709 531.054 252.514 528.701 248.745C526.347 244.976 523.274 241.708 519.657 239.126C512.358 233.909 503.284 231.805 494.433 233.277C485.582 234.749 477.678 239.676 472.46 246.976L472.867 247.267L472.46 246.976L329.003 447.829Z"
                              fill="url(#paint0_linear_12_7)"
                              stroke="black"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_12_7"
                                x1="4.3784e-06"
                                y1="253.5"
                                x2="733"
                                y2="733"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#C73F97" />
                                <stop offset="1" stopColor="#2898FF" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                      </div>
                      <div>
                        <p className="mt-1 text-white font-display text-truncate">
                          {item?.name}
                        </p>
                      </div>
                      <div>
                        <p>
                          <small
                            className="line-clamp-2 mb-1"
                            style={{
                              maxWidth: "140px",
                              color: "rgb(230 231 247)",
                            }}
                          >
                            {item?.description}
                          </small>
                        </p>
                      </div>
                      <Link href={`/${item?.token_address}/${item?.token_id}`}>
                        <button
                          className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                          style={{ width: "50%", padding: "2%" }}
                        >
                          Buy
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* {isLargeScreen && (
        <>
          <div className="swiper-button-prev-4 group absolute top-1/2 left-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full p-3 text-base">
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
          <div className="swiper-button-next-4 group absolute top-1/2 right-4 z-10 -mt-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full  p-3 text-base">
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
        </>
      )} */}
    </div>
  );
};

export default Explore_carousel;
