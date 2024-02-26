import React, { useState } from "react";
import HeadLine from "../headLine";
import Auctions_category_data from "../../data/auctions_category_data";
import Tippy from "@tippyjs/react";
import Countdown_timer from "../Countdown_timer";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import Link from "next/link";
import { bidsModalShow } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";
import "tippy.js/themes/light.css";
import Image from "next/image";
import auctions_category_data from "../../data/auctions_category_data";
import Likes from "../likes";

const Auctions_categories = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(Auctions_category_data.slice(0, 8));
  const [loadMoreBtn, setLoadMoreBtn] = useState(true);

  const handleloadMore = () => {
    setData(auctions_category_data);
    setLoadMoreBtn(false);
  };
  return (
    <div>
      <section className="py-24">
        <div className="container">
          <h2 className="text_space font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white">
            Last NFTs Over <span className="text-accent">1min</span>
          </h2>
          <div className="flex flex-wrap grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4 col_mkt_flex">
          <article key={1} className="article_card_mk height_nft_card_hover">
            <div className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
              <figure className="group overflow-hidden ">
                <Link href={``}>
                  <a href="/single_post/post_1">
                    <span className="collection_item_img">
                      <img
                        className="height_nft w-full object-cover"
                        src={
                          "https://ipfs.moralis.io:2053/ipfs/QmbcTmWSgFrAE8HPrm3QhnX6bvTir3wMKG4jtanndRSLGr"
                        }
                        alt="owner"
                      />
                    </span>
                  </a>
                </Link>
              </figure>
              <div className="relative dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white p-5_c">
                <div className="mb-3 flex flex-wrap items-center space-x-1">
                  <span className="text-accent inline-flex flex-wrap items-center space-x-1">
                    <a href="#">
                      <div className="imgBorder2">
                        <img
                          src={
                            "images/NFT_6.jpg"
                          }
                          alt="item 1"
                          className="h-6 w-6 rounded-full imageCardProfile"
                          loading="lazy"
                        />
                      </div>
                    </a>
                  </span>
                  <div className="col flex items-center flex-w-col items-center">
                    <Link href={``}>
                      <p className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent dark:text-white">
                        PuuushhhyMans
                      </p>
                    </Link>
                    <p className="ml-2 mb-0 flex mw-130">
                      <small className="text-truncate ml-1 max-w-[10rem] select-none overflow-hidden">
                        0x24de...4d12bf
                      </small>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="absolute_card">
                      <Auctions_dropdown classes="dark:hover:bg-jacarta-500  dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 bg-white mt-2 dropdown_share" />
                    </div>
                    {/* <Social_dropdown /> */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                    <Link href={``}>
                      <a href="/single_post/post_1">
                        Polyamor Saudável
                      </a>
                    </Link>
                  </h2>
                  <p className="dark:text-jacarta-200 mb-4"
                  style={{ 
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    Poliamor é a prática ou desejo de ter mais de um relacionamento, seja sexual ou romântico, simultaneamente com o conhecimento e consentimento de todos os envolvidos.
                  </p>
                </div>
                <div className="mb-2 flex items-center row bg-gray-200 dark:bg-gray-700 rounded-pill w-fit p-0.5 pr-3">
                  <div className="col-auto rounded-pill p-0.5 flex items-center bg-gray-100 dark:bg-gray-600">
                    <img src="/images/socialverse.png" className="w-5 h-5 mr-2 ml-0.5" alt="" />
                  <p className="font-medium mr-2 text-accent dark:text-accent-lighter">TAP</p>
                  </div>
                  <div className="col ml-2 font-medium text-dark dark:text-white">
                    69,691
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                    {/* <span>
                      <time>5 Feb</time>
                    </span>
                    <span>•</span> */}
                    <span>29 secs ago</span>
                  </div>
                  <div className="flex items-center mr-3">
                    <Likes
                      like={"0"}
                      classes="dark:bg-jacarta-700 flex items-center space-x-1 dropdown_share bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article key={1} className="article_card_mk height_nft_card_hover">
            <div className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
              <figure className="group overflow-hidden ">
                <Link href={``}>
                  <a href="/single_post/post_1">
                    <span className="collection_item_img">
                      <img
                        className="height_nft w-full object-cover"
                        src={
                          "images/NFT_4.png"
                        }
                        alt="owner"
                      />
                    </span>
                  </a>
                </Link>
              </figure>
              <div className="relative dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white p-5_c">
                <div className="mb-3 flex flex-wrap items-center space-x-1">
                  <span className="text-accent inline-flex flex-wrap items-center space-x-1">
                    <a href="#">
                      <div className="imgBorder2">
                        <img
                          src={
                            "images/NFT_1.webp"
                          }
                          alt="item 1"
                          className="h-6 w-6 rounded-full imageCardProfile"
                          loading="lazy"
                        />
                      </div>
                    </a>
                  </span>
                  <div className="col flex items-center flex-w-col items-center">
                    <Link href={``}>
                      <p className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent dark:text-white">
                        Purplewhite
                      </p>
                    </Link>
                    <p className="ml-2 mb-0 flex mw-130">
                      <small className="text-truncate ml-1 max-w-[10rem] select-none overflow-hidden">
                        0xb7cd...ad71f3
                      </small>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="absolute_card">
                      <Auctions_dropdown classes="dark:hover:bg-jacarta-500  dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 bg-white mt-2 dropdown_share" />
                    </div>
                    {/* <Social_dropdown /> */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                    <Link href={``}>
                      <a href="/single_post/post_1">
                        Clareador Dental
                      </a>
                    </Link>
                  </h2>
                  <p className="dark:text-jacarta-200 mb-4"
                    style={{ 
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    Basear na teoria das cores. o amarelo e o roxo são cores opostas. e quando elas se juntam. elas se neutralizam. deixamos os dentes totalmente brancos.
                  </p>
                </div>
                <div className="mb-2 flex items-center row bg-gray-200 dark:bg-gray-700 rounded-pill w-fit p-0.5 pr-3">
                  <div className="col-auto rounded-pill p-0.5 flex items-center bg-gray-100 dark:bg-gray-600">
                    <img src="/images/socialverse.png" className="w-5 h-5 mr-2 ml-0.5" alt="" />
                  <p className="font-medium mr-2 text-accent dark:text-accent-lighter">TAP</p>
                  </div>
                  <div className="col ml-2 font-medium text-dark dark:text-white">
                    4,500
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                    {/* <span>
                      <time>5 Feb</time>
                    </span>
                    <span>•</span> */}
                    <span>14 secs ago</span>
                  </div>
                  <div className="flex items-center mr-3">
                    <Likes
                      like={"0"}
                      classes="dark:bg-jacarta-700 flex items-center space-x-1 dropdown_share bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article key={1} className="article_card_mk height_nft_card_hover">
            <div className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
              <figure className="group overflow-hidden ">
                <Link href={``}>
                  <a href="/single_post/post_1">
                    <span className="collection_item_img">
                      <img
                        className="height_nft w-full object-cover"
                        src={
                          "images/NFT_2.webp"
                        }
                        alt="owner"
                      />
                    </span>
                  </a>
                </Link>
              </figure>
              <div className="relative dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white p-5_c">
                <div className="mb-3 flex flex-wrap items-center space-x-1">
                  <span className="text-accent inline-flex flex-wrap items-center space-x-1">
                    <a href="#">
                      <div className="imgBorder2">
                        <img
                          src={
                            "https://ipfs.moralis.io:2053/ipfs/QmbcTmWSgFrAE8HPrm3QhnX6bvTir3wMKG4jtanndRSLGr"
                          }
                          alt="item 1"
                          className="h-6 w-6 rounded-full imageCardProfile"
                          loading="lazy"
                        />
                      </div>
                    </a>
                  </span>
                  <div className="col flex items-center flex-w-col items-center">
                    <Link href={``}>
                      <p className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent dark:text-white">
                        Roger Investidor
                      </p>
                    </Link>
                    <p className="ml-2 mb-0 flex mw-130">
                      <small className="text-truncate ml-1 max-w-[10rem] select-none overflow-hidden">
                        0x73b9...1f67ad
                      </small>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="absolute_card">
                      <Auctions_dropdown classes="dark:hover:bg-jacarta-500  dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 bg-white mt-2 dropdown_share" />
                    </div>
                    {/* <Social_dropdown /> */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                    <Link href={``}>
                      <a href="/single_post/post_1">
                        #1 Investidor Socialverse
                      </a>
                    </Link>
                  </h2>
                  <p className="dark:text-jacarta-200 mb-4"
                  style={{ 
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    Investir é o melhor caminho para os empreendedores aumentarem as suas chances de serem bem-sucedidos em suas atividades econômicas. 
                  </p>
                </div>
                <div className="mb-2 flex items-center row bg-gray-200 dark:bg-gray-700 rounded-pill w-fit p-0.5 pr-3">
                  <div className="col-auto rounded-pill p-0.5 flex items-center bg-gray-100 dark:bg-gray-600">
                    <img src="/images/socialverse.png" className="w-5 h-5 mr-2 ml-0.5" alt="" />
                  <p className="font-medium mr-2 text-accent dark:text-accent-lighter">TAP</p>
                  </div>
                  <div className="col ml-2 font-medium text-dark dark:text-white">
                    479,980
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                    {/* <span>
                      <time>5 Feb</time>
                    </span>
                    <span>•</span> */}
                    <span>3 secs ago</span>
                  </div>
                  <div className="flex items-center mr-3">
                    <Likes
                      like={"0"}
                      classes="dark:bg-jacarta-700 flex items-center space-x-1 dropdown_share bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

          {loadMoreBtn && (
            <div className="mt-10 text-center">
              <button
                onClick={handleloadMore}
                className="bg_button  inline-block rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Auctions_categories;
