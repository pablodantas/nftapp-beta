import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
import "tippy.js/dist/tippy.css";
import Link from "next/link";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import ImageNFT from "./metadata/nftImage";
import NameNFT from "./metadata/nftName";
import DescriptionNFT from "./metadata/nftDescription";
import TimeAgo from "react-timeago";
import Likes from "../likes";

const User_carousel = ({ owner }) => {
  const { Moralis, user } = useMoralis();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    const toSkip = (page - 1) * pageSize;
    const query = new Moralis.Query("Marketplace");
    query.equalTo("owner", owner?.toLowerCase());
    query.descending("createdAt");
    query.skip(toSkip);
    query.limit(pageSize);
    const result = await query.find();
    const res = JSON.parse(JSON.stringify(result));
    return res;
  };

  const { data } = useQuery(`moraItemsfrom${owner}`, fetchItem, {
    staleTime: 1000 * 90,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data, owner]);

  const fetchData = () => {
    setPageSize(pageSize + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div>
        <h2 className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-2xl dark:text-white text-center">
          More items from this user
        </h2>
      </div>
      <Swiper
        slidesPerView="auto"
        centeredSlides={true}
        spaceBetween={10}
        loop={item.length > 1} // Verifica se há mais de um item
        pagination={true}
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={{ delay: 2000 }}
        grabCursor={true}
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
            spaceBetween: 0,
          },
          900: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        className="card-slider-4-columns !py-5 w-full mb-20"
        style={{ transform: "scaleX(1)" }}
      >
        {item.map((item, index) => (
          <SwiperSlide>
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
                    <div className="col flex items-center justify-center">
                      <div className="row flex flex-col">
                        <div className="col mt-2 mx-w">
                          <p className="textpost dark:text-white name_light"></p>
                        </div>
                        <div className="col mx-w">
                          <div className="row flex col-reverse_500">
                            <div className="col relative col_img_feed">
                              <article className="article_card article_card_mk">
                                <div
                                  className="article_card_mk rounded-2xl overflow-hidden transition-shadow hover:shadow-lg"
                                  style={{
                                    maxWidth: "300px",
                                    minWidth: "300px",
                                  }}
                                >
                                  <Link
                                    href={`/${item?.token_address}/${item?.token_id}`}
                                    key={index}
                                  >
                                    <figure className="group overflow-hidden ">
                                      <a href="#" className="nft_resize">
                                        <ImageNFT tokenURI={item.image} />
                                      </a>
                                    </figure>
                                  </Link>
                                  <div className="relative dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white p-5_c">
                                    <Link
                                      href={`/${item?.token_address}/${item?.token_id}`}
                                      key={index}
                                    >
                                      <h2 className="text-truncate font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                                        <a href="#">{item?.name}</a>
                                      </h2>
                                    </Link>
                                    <p className="dark:text-jacarta-200 mb-8 text-truncate">
                                      {item?.description}
                                    </p>
                                    <div className="flex justify-between">
                                      <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                                        <small>
                                          <TimeAgo
                                            date={item?.createdAt}
                                            title={null}
                                          />
                                        </small>
                                      </div>
                                      <Likes
                                        likeId={`like${item?.token_address}tokenlike${item?.token_id}`}
                                        classes="gp-5 cursor-pointer group flex items-center justify-center transition-colors"
                                      />
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default User_carousel;
