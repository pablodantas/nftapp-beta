import React, { createContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import Coments from "./comentarios/coments";
import Seguir from "./seguir";
import Like from "./like";
import ComentsPost from "./comentarios/comentsPost";
import ProfileDon from "./profile/ProfileDon";
import ProfileExploreName from "./profile/ProfileExploreName";
import { CopyToClipboard } from "react-copy-to-clipboard";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageNFT from "./metadata/nftImage";
import DescriptionNFT from "./metadata/nftDescription";
import CardAnuncio from "./cardAnuncio";
import TimeAgo from "react-timeago";
import Tippy from "@tippyjs/react";
import Share from "././share_modal";

const ColGb2 = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  const [showElementIndex, setShowElementIndex] = useState(false);
  const [showElement, setShowElement] = useState("");

  const [showElementShare, setShowElementShare] = useState(false);
  const [showShare, setShowShare] = useState(false);

  async function ComentsChat(event) {
    const a = !showElement;
    setShowElementIndex(event);
    setShowElement(a);
  }

  const [isActive, setIsActive] = useState(false);
  const [showActive, setShowActive] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [imageModal, setImageModal] = useState(false);
  const [showimage, setShowImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingFeed, setLoadingFeed] = useState();
  const [post, setPOST] = useState("");

  const removeClass = (e) => {
    const a = !showActive;
    setIsActive(e);
    setShowActive(a);
  };

  const AddClass = () => {
    setIsActive(false);
  };
  const HandleImage = (e) => {
    const a = !showimage;
    setImageModal(e);
    setShowImage(a);
  };
  const { Moralis, user } = useMoralis();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);

  const fetchItem = async () => {
    const query = new Moralis.Query("Posts");
    const toSkip = (page - 1) * pageSize;
    query.descending("createdAt");
    query.skip(toSkip);
    query.limit(pageSize);
    const result = await query.find();
    const res = JSON.parse(JSON.stringify(result));
    return res;
  };
  const { data, refetch } = useQuery(`ExGlobal${pageSize}`, fetchItem, {
    // staleTime: 1000 * 90,
    cacheTime: 3600000,
  });

  useEffect(() => {
    if (data) {
      setLoading(false);
      setItem(data);
    }
  }, [data]);

  // const refetchFeed = async () => {
  //   const newData = await fetchItem();
  //   setItem([...item, ...newData]);
  //   // refetch();
  // }

  const refetchFeed = async () => {
    setLoadingFeed(true);
    const newData = await fetchItem();
    setItems(newData);
    setItem(items);
    setLoadingFeed(false);
  };

  let timerId;

  function fetchData() {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      setLoading(true);
      setPageSize(pageSize + 1);
    }, 500);
  }

  const walletAddress = user?.attributes?.ethAddress;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  function ShareShow(index, item) {
    const a = !showShare;
    setShowElementShare(index);
    setShowShare(a);
    setPOST(item.image);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemRef = useRef(null);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative col-lg-7 flex flex-col w-full">
        {/* Card do post */}
        {/* <button
          className="p-2 mb-4 self-center dark:fillHoverStrokeWhite fillHoverStrokeBlack dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col rounded-xl mt-2 hover:bg-white hover:outline hover:outline-1 hover:outline-gray-200 dark:hover:outline-gray-600 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          onClick={refetchFeed}
          style={{maxHeight: '42px'}}
        >
          Load recent
        </button> */}
        <button
          className={`goTopButton p-2 mb-4 self-center dark:fillHoverStrokeWhite fillHoverStrokeBlack dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col rounded-xl mt-2 hover:bg-white hover:outline hover:outline-1 hover:outline-gray-200 dark:hover:outline-gray-600 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ${
            showButton ? "showButtonTop" : ""
          } ${isLargeScreen ? "bottom-4" : "bottom-12"}`}
          onClick={handleClick}
        >
          Go Top
        </button>
        <InfiniteScroll
          dataLength={item.length}
          next={fetchData}
          hasMore={true}
          preserveScroll={true}
          loader={
            loading ? (
              <div className="imgpostLoading">
                <div
                  className="loader-container flex justify-center btn_disable mb-3 w-full no-scroll"
                  // style={!isLargeScreen ? { minWidth: "100vw" } : null}
                >
                  <div className="loader"></div>
                </div>
              </div>
            ) : null
          }
        >
          {Array.isArray(item) &&
            item?.map((item, index) => (
              <>
                {loadingFeed ? (
                  <div
                    className="mt-4 mb-4 loader-container flex justify-center btn_disable mb-3 w-full no-scroll"
                    // style={!isLargeScreen ? { minWidth: "100vw" } : null}
                  >
                    <div className="loader"></div>
                  </div>
                ) : null}
                <div
                  className="row flex flex-col mb-3 p-3"
                  key={index}
                  ref={itemRef}
                  id={item?.objectId}
                  style={
                    !isLargeScreen
                      ? { borderRadius: "7px", minWidth: "90vw" }
                      : { borderRadius: "7px" }
                  }
                >
                  <div className="col flex items-center">
                    <Link href={`/user/${item?.owner}`}>
                      <div className="imgBorder mr-3 cursor-pointer relative">
                        <ProfileDon address={item?.owner} />
                        <div
                          className="mt-2 cursor-pointer absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center"
                          data-tippy-content="Verified Collection"
                          title="Verified account"
                          style={{ zIndex: "5", top: "22px", right: "-5px" }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <g clipPath="url(#clip0_11_2)">
                              <path
                                d="M18 6.71429L10.087 17L5 12.4286L6.69565 10.1429L10.087 13L15.7391 5L18 6.71429Z"
                                fill="white"
                              />
                              <path
                                d="M20.0045 7.26244L20.003 7.27163L20.0105 7.2771C21.1958 8.13089 22 9.45341 22 11C22 12.5466 21.1958 13.8701 20.0105 14.7229L20.003 14.7284L20.0045 14.7376C20.2441 16.1775 19.8706 17.6904 18.78 18.78C17.6875 19.8726 16.1755 20.2361 14.7415 20.0025L14.7323 20.001L14.7269 20.0086C13.8772 21.1978 12.5426 22 11 22C9.45341 22 8.12789 21.1948 7.2761 20.0076L7.27067 20L7.26147 20.0015C5.82552 20.2361 4.31256 19.8736 3.21901 18.78C2.12644 17.6875 1.76288 16.1745 2.00453 14.7376L2.00608 14.7284L1.99849 14.7229C0.814132 13.8711 0 12.5475 0 11C0 9.45248 0.814135 8.12792 1.99848 7.2771L2.00608 7.27166L2.00453 7.26241C1.76288 5.82549 2.12644 4.31256 3.22 3.22C4.31058 2.12841 5.82456 1.75587 7.26947 1.99552L7.27872 1.99705L7.28416 1.98942C8.13089 0.802184 9.45639 0 11 0C12.5416 0 13.8742 0.801205 14.7249 1.98945L14.7303 1.99706L14.7396 1.99552C16.1794 1.75587 17.6904 2.1304 18.78 3.22C19.8706 4.30959 20.2451 5.82257 20.0045 7.26244ZM9.86855 13.4382L7.71314 11.2828L7.71293 11.2826C7.52124 11.0975 7.26451 10.995 6.99802 10.9973C6.73152 10.9997 6.47659 11.1065 6.28815 11.295C6.0997 11.4834 5.99281 11.7384 5.9905 12.0049C5.98819 12.2713 6.09063 12.5281 6.27577 12.7198L6.27595 12.72L9.28005 15.724C9.38444 15.8284 9.51031 15.9089 9.64892 15.9597C9.78753 16.0105 9.93557 16.0305 10.0827 16.0183C10.2298 16.0061 10.3725 15.962 10.5009 15.8891C10.6292 15.8162 10.7402 15.7161 10.826 15.596L15.8328 8.58643C15.9104 8.47777 15.9658 8.35494 15.9958 8.22486C16.0259 8.09481 16.0301 7.96011 16.0081 7.82844C15.9861 7.69677 15.9384 7.57075 15.8677 7.45752C15.797 7.3443 15.7046 7.24612 15.596 7.16856C15.3767 7.01183 15.1041 6.94863 14.8382 6.99285C14.5723 7.03707 14.3349 7.18508 14.1781 7.40438L9.86855 13.4382Z"
                                fill="url(#paint0_linear_11_2)"
                              />
                            </g>
                            <defs>
                              <linearGradient
                                id="paint0_linear_11_2"
                                x1="-0.0150205"
                                y1="7.60037"
                                x2="22.005"
                                y2="22.005"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#F0B90B" />
                                <stop offset="1" stop-color="#000" />
                              </linearGradient>
                              <clipPath id="clip0_11_2">
                                <rect width="22" height="22" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </Link>
                    <div className="row flex flex-col">
                      <div className="col mt-1" style={{ maxHeight: "17px" }}>
                        <Link href={`/user/${item?.owner}`}>
                          <a className="mb-1 flex items-center m-0 text-dark dark:text-white   font-semibold hover:font-bold">
                            <ProfileExploreName address={item?.owner} />
                          </a>
                        </Link>
                      </div>
                      <div className="col flex items-center">
                        <p className="m-0 mr-2 flex">
                          <small className="text-truncate">
                            <TimeAgo date={item?.createdAt} title={null} />
                          </small>
                        </p>
                        <svg
                          width="2"
                          height="2"
                          viewBox="0 0 2 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="1" cy="1" r="1" fill="#959595" />
                        </svg>
                        <p className="flex ml-1">
                          <small className="text-truncate ml-1 max-w-[10rem] select-none overflow-hidden">
                            {item?.owner.slice(0, 6)}...{item?.owner.slice(-6)}
                          </small>
                        </p>
                        <Tippy
                          hideOnClick={false}
                          content={
                            copied ? <span>copied</span> : <span>copy</span>
                          }
                        >
                          <button className="d-none_700 btn feedBtn rounded-pill flex ml-1">
                            <CopyToClipboard
                              text={item?.owner}
                              onCopy={() => setCopied(true)}
                            >
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
                            </CopyToClipboard>
                          </button>
                        </Tippy>
                        <svg
                          width="2"
                          height="2"
                          viewBox="0 0 2 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-1"
                        >
                          <circle cx="1" cy="1" r="1" fill="#959595" />
                        </svg>
                        {item?.repost && (
                          <Link href={`/post/${item?.linkRepost}`}>
                            <p className="flex items-center cursor-pointer hover:text-accent ml-2 font-display">
                              Shared
                              <span className="ml-2 mr-2 mb-1">
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3"
                                >
                                  <path
                                    d="M27.8154 17.9692V27.8154H4.18462V4.18462H14.0308L10.0923 0.246155H2.70769C1.35015 0.246155 0.246155 1.35015 0.246155 2.70769V29.2923C0.246155 30.6498 1.35015 31.7538 2.70769 31.7538H29.2923C30.6498 31.7538 31.7538 30.6498 31.7538 29.2923V21.9077L27.8154 17.9692ZM31.7538 15.0154L26.3385 9.6L17.9691 17.9694L13.8225 13.8228L22.1919 5.45342L16.9846 0.246155H31.7538V15.0154Z"
                                    fill="black"
                                    className="fill-current"
                                  />
                                </svg>
                              </span>
                            </p>
                          </Link>
                        )}
                        <svg
                          width="2"
                          height="2"
                          viewBox="0 0 2 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-1"
                        >
                          <circle cx="1" cy="1" r="1" fill="#959595" />
                        </svg>
                        <Seguir
                          userPost={item?.owner}
                          walletAddress={walletAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="font-display text-truncate mt-4 text-dark dark:text-white">
                    {item?.name.split(" ").map((word, i) => {
                      if (word.startsWith("@") || word.startsWith("#")) {
                        return (
                          <React.Fragment key={i}>
                            <span className="text-accent">
                              <a href="#" className="underline_hover">
                                {word}
                              </a>
                            </span>{" "}
                          </React.Fragment>
                        );
                      } else {
                        return <React.Fragment key={i}>{word} </React.Fragment>;
                      }
                    })}
                  </p>

                  <div
                    className="col flex my-2 flex-col w-550 items-end"
                    style={{
                      maxHeight: isExpanded ? "none" : "3em",
                      alignItems: "flex-start",
                      flexDirection: "row",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "flex",
                      WebkitBoxOrient: "vertical",
                      width: "100%",
                      textAlign: isExpanded ? "start" : "justify",
                      whiteSpace: isExpanded ? "break-spaces" : "inherit",
                    }}
                  >
                    <p
                      id="textpost"
                      className={"text-dark dark:text-white m-0 flex"}
                      style={{
                        display: isExpanded ? "inline-block" : "inline-block",
                      }}
                    >
                      {item?.description}
                      {isExpanded && (
                        <button
                          style={{
                            maxWidth: "80px",
                            minWidth: "80px",
                            marginTop: "auto",
                            marginLeft: "5px",
                          }}
                          onClick={toggleExpand}
                          className="text-accent mt-1 text-start"
                        >
                          ...See less
                        </button>
                      )}
                    </p>
                    {!isExpanded && item?.description.length > 150 && (
                      <button
                        style={{
                          maxWidth: "80px",
                          minWidth: "80px",
                          marginTop: "auto",
                          whiteSpace: "nowrap",
                          marginLeft: "5px",
                        }}
                        onClick={toggleExpand}
                        className="text-accent mt-1  text-start"
                      >
                        ...See more
                      </button>
                    )}
                  </div>
                  <div className="col">
                    <div className="row flex flex-col">
                      <div className="col">
                        <div className="row flex">
                          <div className="col relative">
                            <Link href={`/post/${item?.objectId}`}>
                              <button
                                className="w-full h-full absolute"
                                // onClick={() => HandleImage(page)}
                              ></button>
                            </Link>
                            <ImageNFT tokenURI={item.image} />
                            {showElementIndex === index ? (
                              <Coments
                                showElement={showElement}
                                contract={item?.owner}
                                tokeId={item?.objectId}
                                walletAddress={walletAddress}
                                donoPoster={item?.owner}
                              />
                            ) : null}
                            {/* <!-- Modal --> */}
                            <div
                              className={
                                imageModal === index
                                  ? "modal fade show block"
                                  : "modal fade"
                              }
                              onClick={(event) => {
                                if (event.target === event.currentTarget) {
                                  setImageModal(false);
                                }
                              }}
                            >
                              <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center NFT_modal">
                                <ImageNFT tokenURI={item.image} />
                              </div>

                              <button
                                type="button"
                                className="btn-close absolute top-6 right-6"
                                onClick={() => setImageModal(false)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="h-6 w-6 fill-white"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                                </svg>
                              </button>
                            </div>
                            {/* <!-- end modal --> */}
                          </div>
                          <div className="col-auto mx-2">
                            <div className="row flex flex-col">
                              <Like
                                userPost={item?.owner}
                                walletAddress={walletAddress}
                                contract={item?.owner}
                                tokeId={item?.objectId}
                                donoPoster={item?.owner}
                              />
                              <div className="col mb-3 mw-100">
                                <div className="row flex flex-col flex-center-500">
                                  <button
                                    className="col-auto rounded-pill flex_important items-center justify-center"
                                    onClick={() => ComentsChat(index)}
                                  >
                                    <svg
                                      className="btnAnimated fill-black dark:fill-white"
                                      width="22"
                                      height="21"
                                      viewBox="0 0 22 21"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M22 9.4888C22 14.7293 17.0748 18.9776 11 18.9776C9.91052 18.9791 8.82556 18.8396 7.77287 18.5628C6.96987 18.9641 5.126 19.734 2.024 20.2356C1.749 20.2789 1.54 19.997 1.64863 19.7448C2.13538 18.6116 2.57537 17.1015 2.70737 15.7243C1.023 14.057 0 11.8746 0 9.4888C0 4.24827 4.92525 0 11 0C17.0748 0 22 4.24827 22 9.4888ZM6.875 9.4888C6.875 9.12929 6.73013 8.7845 6.47227 8.53029C6.21441 8.27608 5.86467 8.13326 5.5 8.13326C5.13533 8.13326 4.78559 8.27608 4.52773 8.53029C4.26987 8.7845 4.125 9.12929 4.125 9.4888C4.125 9.84832 4.26987 10.1931 4.52773 10.4473C4.78559 10.7015 5.13533 10.8443 5.5 10.8443C5.86467 10.8443 6.21441 10.7015 6.47227 10.4473C6.73013 10.1931 6.875 9.84832 6.875 9.4888ZM12.375 9.4888C12.375 9.12929 12.2301 8.7845 11.9723 8.53029C11.7144 8.27608 11.3647 8.13326 11 8.13326C10.6353 8.13326 10.2856 8.27608 10.0277 8.53029C9.76987 8.7845 9.625 9.12929 9.625 9.4888C9.625 9.84832 9.76987 10.1931 10.0277 10.4473C10.2856 10.7015 10.6353 10.8443 11 10.8443C11.3647 10.8443 11.7144 10.7015 11.9723 10.4473C12.2301 10.1931 12.375 9.84832 12.375 9.4888ZM16.5 10.8443C16.8647 10.8443 17.2144 10.7015 17.4723 10.4473C17.7301 10.1931 17.875 9.84832 17.875 9.4888C17.875 9.12929 17.7301 8.7845 17.4723 8.53029C17.2144 8.27608 16.8647 8.13326 16.5 8.13326C16.1353 8.13326 15.7856 8.27608 15.5277 8.53029C15.2699 8.7845 15.125 9.12929 15.125 9.4888C15.125 9.84832 15.2699 10.1931 15.5277 10.4473C15.7856 10.7015 16.1353 10.8443 16.5 10.8443Z" />
                                    </svg>
                                  </button>
                                  <div className="col pt-1 text-center dark:text-white name_light ">
                                    <h6 className="grayfeed mb-0 text-md">
                                      <small>
                                        <ComentsPost
                                          contract={item?.owner}
                                          tokeId={item?.objectId}
                                        />
                                      </small>
                                    </h6>
                                  </div>
                                </div>
                              </div>
                              <div className="col mb-3 mw-100 relative">
                                <button
                                  className="rounded-pill flex_important items-center justify-center"
                                  onClick={() => ShareShow(index, item)}
                                >
                                  <svg
                                    className="btnAnimated fill-black dark:fill-white"
                                    width="22"
                                    height="20"
                                    viewBox="0 0 22 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_2_129)">
                                      <path d="M0.310041 17.2607C1.73093 12.6 4.61294 9.30688 8.81875 7.54069C10.0917 7.02204 11.5748 6.60759 13.1224 6.36206L13.2369 6.34688C13.5874 6.34688 13.5889 6.33723 13.5889 4.03516V1.72412L22.2721 9.61792L13.5889 17.5117V12.8897H12.5329C9.66008 12.9503 6.96466 13.5841 4.55984 14.6689L4.66984 14.6241C3.27701 15.3635 2.08293 16.2428 1.05349 17.262L1.04363 17.2724L0.00128174 18.2751L0.310799 17.26L0.310041 17.2607Z" />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_2_129">
                                        <rect width="22" height="20" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </button>
                                {showElementShare === index ? (
                                  <Share
                                    postId={item.objectId}
                                    post={post}
                                    showShare={showShare}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col flex justify-content-start mt-2"></div>
                    </div>
                  </div>
                  <hr className="hrPost my-5" />
                </div>
                {index % 4 === 0 && <CardAnuncio keyPryme={index} />}
              </>
            ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ColGb2;
