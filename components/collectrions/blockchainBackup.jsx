import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import ProfileExplore from "./profileUser/ProfileExplore";
import ProfileExploreName from "./profileUser/ProfileExploreName";
import { useQuery } from "react-query";
import ImageNFTBuy from "./metadata/nftImageBuy";
import Coments from "./comentarios/coments";
import ComentsPost from "./comentarios/comentsPost";
import DescriptionNFT from "./metadata/nftDescription";
import NameNFT from "./metadata/nftName";
import TimeAgo from "react-timeago";

const Explore_collection_item = ({ filter, collection, quantityLikes }) => {
  const { Moralis, user } = useMoralis();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    const query = new Moralis.Query("MarketitemcreatedLogs");
    const toSkip = (page - 1) * pageSize;
    if (collection) {
      query.startsWith("address", collection.toLowerCase());
    }
    if (filter === null || filter === 3) {
      query.descending("createdAt");
    }
    if (filter === 2) {
      query.descending("price");
    }
    if (filter === 3) {
      query.ascending("price");
    }
    query.skip(toSkip);
    query.limit(pageSize);
    const result = await query.find();
    const res = JSON.parse(JSON.stringify(result));
    return res;
  };

  const { data, isLoading } = useQuery(
    `${collection}ExplorerMk${pageSize}filter${filter}`,
    fetchItem,
    {
      staleTime: 1000 * 90,
      //cacheTime: 111120000,
    }
  );

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  const fetchData = () => {
    setPageSize(pageSize + 1);
  };

  const [showElementIndex, setShowElementIndex] = useState(false);
  const [showElement, setShowElement] = useState("");
  async function ComentsChat(event) {
    const a = !showElement;
    setShowElementIndex(event);
    setShowElement(a);
  }

  const walletAddress = user?.attributes?.ethAddress;

  const abreviarEndereco = (endereco) => {
    const inicio = endereco.substring(0, 6);
    const final = endereco.substring(endereco.length - 6, endereco.length);
    return `${inicio}...${final}`;
  };

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    // adiciona o event listener para detectar a mudança de tamanho da tela
    window.addEventListener("resize", handleResize);

    // define o valor inicial do isLargeScreen
    setIsLargeScreen(window.innerWidth > 500);

    // remove o event listener quando o componente é desmontado
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-container w-full flex jutify-center">
          <div className="loader"></div>
        </div>
      ) : (
        item.map((item, index) => (
          <Link href={`/${item?.nftContract}/${item?.tokenId}`}>
            <article
              key={index}
              className={
                isLargeScreen
                  ? "article_card_mk height_nft_card_hover"
                  : "article_card_mk"
              }
            >
              <div className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
                <figure className="group overflow-hidden ">
                  <span className="collection_item_img">
                    <ImageNFTBuy
                      address={item.nftContract}
                      tokenId={item.tokenId}
                    />
                  </span>
                </figure>
                <div className="relative dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white p-5_c">
                  {showElementIndex === index ? (
                    <Coments
                      showElement={showElement}
                      contract={item?.address}
                      tokeId={item?.tokenId}
                      walletAddress={walletAddress}
                      donoPoster={item?.seller}
                    />
                  ) : null}
                  <div className="mb-3 flex flex-wrap items-center space-x-1">
                    <span className="text-accent inline-flex flex-wrap items-center space-x-1">
                      <div className="imgBorder2">
                        <ProfileExplore address={item?.seller} />
                      </div>
                    </span>
                    <div className="col flex items-center flex-w-col items-center">
                      <Link href={`/user/${item?.seller}`}>
                        <p className="font-display text-jacarta-700 dark:hover:text-accent hover:text-accent dark:text-white">
                          <ProfileExploreName address={item?.seller} />
                        </p>
                      </Link>
                      <p className="ml-2 mb-0 flex mw-130">
                        <small className="text-truncate ml-1 max-w-[10rem] select-none overflow-hidden">
                          {abreviarEndereco(item?.seller)}
                        </small>
                      </p>
                    </div>
                    <div className="flex items-center">
                      {/* <div className="absolute_card">
                        <Auctions_dropdown classes="dark:hover:bg-jacarta-500  dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 bg-white mt-2 dropdown_share" />
                      </div> */}
                      {/* <Social_dropdown /> */}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-truncate font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                      <Link href={`/user/${item?.seller}`}>
                        <NameNFT
                          address={item.nftContract}
                          tokenId={item.tokenId}
                        />
                      </Link>
                    </h2>
                    <p
                      className="dark:text-jacarta-200 mb-4"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <DescriptionNFT
                        address={item.nftContract}
                        tokenId={item.tokenId}
                      />
                    </p>
                  </div>
                  <div className="mb-2 flex items-center row bg-gray-200 dark:bg-gray-700 rounded-pill w-fit p-0.5 pr-3">
                    <div className="col-auto rounded-pill p-0.5 flex items-center bg-gray-100 dark:bg-gray-600">
                      <img
                        src="/images/logo_black.png"
                        className="w-5 h-5 mr-2 ml-0.5"
                        alt=""
                      />
                      <p className="font-medium mr-2 text-green">
                        TAP
                      </p>
                    </div>
                    <div className="col ml-2 font-medium text-dark dark:text-white">
                      {item?.price},000
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                      {/* <span>
                      <time>5 Feb</time>
                    </span>
                    <span>•</span> */}
                      <span>
                        <TimeAgo date={item?.createdAt} />
                      </span>
                    </div>
                    <div className="flex items-center mr-3">
                      <div className="flex mr-2 items-center">
                        <button
                          className="col-auto bt-none p-2 dark:bg-jacarta-900 btnAnimated"
                          // onClick={() => ComentsChat(index)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_1_9)">
                              <path
                                d="M11.8293 6.87341C11.2041 6.87341 10.7197 7.35389 10.7197 7.9471C10.7197 8.54031 11.2041 9.02085 11.8293 9.02085C12.4004 9.02085 12.8849 8.54031 12.8849 7.9471C12.8849 7.35389 12.4004 6.87341 11.8293 6.87341ZM4.25133 6.87341C3.62614 6.87341 3.14169 7.35389 3.14169 7.9471C3.14169 8.54031 3.62614 9.02085 4.25133 9.02085C4.82239 9.02085 5.30681 8.54031 5.30681 7.9471C5.30681 7.35389 4.82239 6.87341 4.25133 6.87341Z"
                                fill="url(#paint0_linear_1_9)"
                              />
                              <path
                                d="M4.59469 14.7048L2.53763 15.3437L2.51689 13.2036L2.51512 13.0208L2.39312 12.8848L2.18319 12.6505C0.0390642 10.0496 -0.0998076 6.30788 1.90877 3.56322C4.36016 0.229409 9.06071 -0.507325 12.4122 1.89832C15.7735 4.32205 16.5144 8.96965 14.0906 12.2774C12.0553 15.0467 8.41014 16.0728 5.2432 14.8518L4.92369 14.7198L4.76187 14.6529L4.59469 14.7048Z"
                                stroke="url(#paint1_linear_1_9)"
                                stroke-width="0.484848"
                              />
                              <path
                                d="M8.04034 6.87341C7.41513 6.87341 6.93072 7.35389 6.93072 7.9471C6.93072 8.54031 7.41513 9.02085 8.04034 9.02085C8.6114 9.02085 9.09586 8.54031 9.09586 7.9471C9.09586 7.35389 8.6114 6.87341 8.04034 6.87341Z"
                                fill="url(#paint2_linear_1_9)"
                              />
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_1_9"
                                x1="8.01327"
                                y1="6.87341"
                                x2="8.01327"
                                y2="9.02085"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#C93F97" />
                                <stop offset="1" stop-color="#5898D4" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_1_9"
                                x1="2"
                                y1="2.5"
                                x2="14.5"
                                y2="15"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#C73F97" />
                                <stop offset="1" stop-color="#52A4DC" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_1_9"
                                x1="8.01329"
                                y1="6.87341"
                                x2="8.01329"
                                y2="9.02085"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#C73F97" />
                                <stop offset="1" stop-color="#579DD7" />
                              </linearGradient>
                              <clipPath id="clip0_1_9">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <span className="dark:text-jacarta-200 text-sm">
                          <ComentsPost
                            contract={item?.address}
                            tokeId={item?.tokenId}
                          />
                        </span>
                      </div>
                      <div className="flex items-center">
                        <button className="js-likes relative cursor-pointer mr-1">
                          <svg
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.88487 10.1097L3.88486 10.1097C3.00996 9.21604 2.32218 8.42515 1.81591 7.73589C1.30901 7.04577 0.971164 6.43828 0.784143 5.91123C0.594035 5.37549 0.5 4.83454 0.5 4.2862C0.5 3.19726 0.86049 2.30821 1.57819 1.58494C2.29598 0.861597 3.17482 0.5 4.24827 0.5C4.89128 0.5 5.47394 0.643024 6.00505 0.92518L6.22537 0.510467L6.00505 0.925181C6.53969 1.20921 7.02311 1.62893 7.45269 2.19785L7.82948 2.69685L8.23339 2.21953C8.76034 1.59683 9.28066 1.16415 9.78991 0.898468L9.78993 0.898459C10.2971 0.633813 10.8496 0.5 11.4552 0.5C12.5429 0.5 13.4315 0.862777 14.155 1.5863L14.155 1.58631C14.8786 2.30985 15.2414 3.19847 15.2414 4.2862C15.2414 4.83453 15.1474 5.37174 14.9578 5.9001L14.9578 5.90015C14.7709 6.42133 14.4329 7.02613 13.9255 7.71697C13.4193 8.40612 12.7284 9.20005 11.8471 10.1002C10.9647 11.0013 9.85097 12.0745 8.50445 13.3205L7.8582 13.8797L7.23966 13.323C5.87879 12.0755 4.76111 11.0047 3.88487 10.1097Z"
                              stroke="url(#paint0_linear_1_7)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_1_7"
                                x1="0.87069"
                                y1="1.87759"
                                x2="13.8707"
                                y2="11.8776"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#C04098" />
                                <stop offset="0.999357" stop-color="#579AD5" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </button>
                        <span className="dark:text-jacarta-200 text-sm">
                          5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))
      )}
    </>
  );
};

export default Explore_collection_item;
