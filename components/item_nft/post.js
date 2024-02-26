import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Meta from "../Meta";
import { useMoralis } from "react-moralis";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProfileItemName from "../itemInfo/ProfileItemName";
import ProfileItem from "../itemInfo/ProfileItem";
import Footer from "../footer";
import ImageNFT from "../itemdalis/metadata/nftImage";
import User_carousel_post from "../carousel/item_carousel_post";
import Web3 from "web3";
import Share from "../modal/share_modal_nft";
import TimeAgo from "react-timeago";
import Coments from "./comentarios/coments";
import ComentsPost from "./comentarios/comentsPost";
import { useQuery } from 'react-query';
import Buy_quest from "./buy_question"
import Buy_status from "./buy_status_modal"
import ModalPost from "../../components/collectrions_upload/modal/modalPost"
import ModalNft from "../../components/collectrions_upload/modal/modalNftCreated"

const PostItem = ({ postBy, tokenId }) => {

  const { Moralis, user } = useMoralis();
  const router = useRouter();

  const [imageModal, setImageModal] = useState(false);
  const walletAddress = user?.attributes.ethAddress;

  const [BuyStatus, setBuyStatus] = useState();
  const [buyerrStatus, setBuyerrStatus] = useState("");


  const [showShare, setShowshare] = useState(false)

  const [showElementIndex, setShowElementIndex] = useState(false);
  const [showElement, setShowElement] = useState("");

  async function ComentsChat(event) {
    const a = !showElement;
    setShowElementIndex(event);
    setShowElement(a);
  }

  function handlShareClose() {
    setShowshare(false);
  }

  const [showElementPOST, setShowElementPOST] = useState("");
  const [post, setPOST] = useState();
  const [showElementIndexPost, setShowElementIndexPOST] = useState();

  function ActivePost(event) {
    const a = !showElementPOST;
    setShowElementIndexPOST(event);
    setShowElementPOST(a);
    setPOST(postBy);
    setShowshare(false);
  }

  const [showElementIndexNft, setShowElementIndexNFT] = useState();
  const [showElementNFT, setShowElementNft] = useState("");
  const [nft, setNFT] = useState();

  function ActiveNft(event) {
    const a = !showElementNFT;
    setShowElementIndexNFT(event);
    setShowElementNft(a);
    setNFT(postBy.image);
  }

  const handleNavigate = () => {
    router.push("/feed/global");
  };

  return (
    <>
      {showElementIndexPost ? (
        <ModalPost
          post={post}
          keyModal={showElementIndexPost}
          showElementPOST={showElementPOST}
        />
      ) : null}
      {showElementIndexNft ? (
        <ModalNft
          nft={nft}
          keyModal={showElementIndexNft}
          showElementNFT={showElementNFT}
        />
      ) : null}
      <Meta title={`${postBy?.name} - ${postBy?.owner}`} />
      {/*  <!-- Item --> */}
      <section className="relative lg:mt-24 lg:pt-24 lg:pb-48 mt-24 pt-12 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>
        <div className="container">
          {/* <!-- Item --> */}
          <>
            <div className="md:flex" key={tokenId}>
              {/* <!-- Image --> */}
              <div>
                <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full"
                  style={{
                    minWidth: "100%",
                    minHeight: "700px"
                  }}>
                  <button
                    className="w-full nft_desc_height"
                    onClick={() => setImageModal(true)}
                    style={{
                      height: "700px",
                      minHeight: "700px"
                    }}>
                    <ImageNFT tokenURI={postBy?.image} />
                  </button>

                  {/* <!-- Modal --> */}
                  <div
                    className={
                      imageModal ? "modal fade show block" : "modal fade"
                    }
                    onClick={() => setImageModal(false)}
                  >
                    <div className="modal-dialog m-3 flex h-full  items-center justify-center NFT_modal"
                      style={{ width: "80vw" }}>
                      <ImageNFT tokenURI={postBy?.image} />
                    </div>
                  </div>
                  {/* <!-- end modal --> */}
                </figure>
                <div className="ml-auto flex items-stretch space-x-2 relative"
                  style={{ marginBottom: "40px" }}>
                  <Likes
                    likeId={`${postBy?.owner}/${tokenId}`}
                    classes="upl_btn_3 gp-5 cursor-pointer py-2 px-4 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                  />
                  {/* <!-- Actions --> */}
                  <div className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                    style={{ padding: "10px", borderRadius: "7px" }}>
                    <button className="js-likes relative cursor-pointer"
                      onClick={ComentsChat}>
                      <svg className="mr-1 icon fill-jacarta-700 dark:fill-white h-6 w-6" >
                        <svg width="24" height="24" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.8293 6.87341C13.2041 6.87341 12.7197 7.3539 12.7197 7.94711C12.7197 8.54032 13.2041 9.02086 13.8293 9.02086C14.4004 9.02086 14.8849 8.54032 14.8849 7.94711C14.8849 7.3539 14.4004 6.87341 13.8293 6.87341ZM6.25133 6.87341C5.62614 6.87341 5.14169 7.3539 5.14169 7.94711C5.14169 8.54032 5.62614 9.02086 6.25133 9.02086C6.82239 9.02086 7.30681 8.54032 7.30681 7.94711C7.30681 7.3539 6.82239 6.87341 6.25133 6.87341Z" fill="black"
                            className="dark:fill-white">
                          </path>
                          <path d="M6.59469 14.7048L4.53763 15.3437L4.51689 13.2036L4.51512 13.0208L4.39312 12.8847L4.18319 12.6505C2.03906 10.0496 1.90019 6.30787 3.90877 3.5632C6.36016 0.229397 11.0607 -0.507337 14.4122 1.89831C17.7735 4.32204 18.5144 8.96964 16.0906 12.2774C14.0553 15.0467 10.4101 16.0728 7.2432 14.8518L6.92369 14.7197L6.76187 14.6529L6.59469 14.7048Z" stroke="black" stroke-width="0.484848"
                            className="dark:fillStrokeWhite">
                          </path>
                          <path d="M10.0403 6.87341C9.41514 6.87341 8.93073 7.3539 8.93073 7.94711C8.93073 8.54032 9.41514 9.02086 10.0403 9.02086C10.6114 9.02086 11.0959 8.54032 11.0959 7.94711C11.0959 7.3539 10.6114 6.87341 10.0403 6.87341Z" fill="black"
                            className="dark:fill-white">
                          </path>
                        </svg>
                      </svg>
                    </button>
                    <ComentsPost
                      contract={postBy?.owner}
                      tokeId={tokenId} />
                  </div>
                  {showElementIndex ? (
                    <Coments
                      showElement={showElement}
                      contract={postBy?.owner}
                      tokeId={tokenId}
                      walletAddress={walletAddress}
                      donoPoster={postBy?.owner}
                    />
                  ) : null}
                  <button className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                    onClick={() => setShowshare(!showShare)}
                    style={{ padding: '10px 16px', borderRadius: "7px" }}
                  >
                    <svg
                      width="15"
                      height="23"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_618_47)">
                        <path
                          d="M0.436351 26.7541C2.43852 19.53 6.49952 14.4257 12.4259 11.6881C14.2196 10.8842 16.3094 10.2418 18.4901 9.86122L18.6515 9.8377C19.1454 9.8377 19.1475 9.82274 19.1475 6.25453V2.67242L31.3829 14.9078L19.1475 27.1432V19.979H17.6595C13.6114 20.073 9.81332 21.0554 6.4247 22.7369L6.5797 22.6674C4.61708 23.8134 2.93452 25.1763 1.48394 26.7562L1.47004 26.7723L0.00128174 28.3265L0.43742 26.753L0.436351 26.7541Z"
                          fill="#959595"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_618_47">
                          <rect width="31" height="31" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <Link href={"/feed/global"}>
                    <button className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                      // onClick={handleNavigate}
                      style={{ padding: '10px 16px', borderRadius: "7px" }}
                    >
                      Go Social
                    </button>
                  </Link>
                </div>
              </div>
              {/* <!-- Details --> */}
              <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]
              flex flex-col flex-wrap col_details"
                style={{
                  height: "700px",
                  maxHeight: "700px"
                }}>
                {/* <!-- Collection / Likes / Actions --> */}
                <div className="mb-3 flex">
                  {/* <!-- Collection --> */}
                  <div className="flex items-center">
                    <Link href="#">
                      <a className="text-accent mr-2 text-sm font-bold">
                        <ProfileItemName address={postBy?.owner} />
                      </a>
                    </Link>
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center"
                      data-tippy-content="Verified Collection"
                    >
                      <Tippy content={<span>Verified Owner</span>}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
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
                              <stop stop-color="#BF4098" />
                              <stop offset="1" stop-color="#579AD5" />
                            </linearGradient>
                            <clipPath id="clip0_11_2">
                              <rect width="22" height="22" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Tippy>
                    </span>
                  </div>
                  {/* <!-- Likes / Actions --> */}
                </div>
                {showShare ? (
                  <Share postId={postBy?.token_address} ActivePost={ActivePost} shareClose={handlShareClose} />
                ) : null

                }
                <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
                  {postBy?.name}
                </h1>

                <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tippy content={<span>$Buzz Coin</span>}>
                      <span className=" dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md  py-1 px-2 -ml-1 mr-1">
                        <img
                          src="/images/logo_black.png"
                          className="logo_money"
                          alt=""
                        />
                      </span>
                    </Tippy>
                    <span className="text-green text-sm font-medium tracking-tight">
                      Post
                    </span>
                  </div>
                  <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                    <TimeAgo date={postBy?.createdAt} live={true} title={null} />
                  </span>
                </div>
                <div className="mb-10">
                  <div>
                    <div className="flex items-center">
                      <p className="font-display text-jacarta-700  text-md dark:text-white">
                        Description
                      </p>
                    </div>
                    <p className="dark:text-jacarta-300 mb-5 line-clamp-5"
                      style={{
                        maxWidth: "24rem",
                        overflowWrap: "break-word"
                      }}>
                      {postBy?.description}
                    </p>
                  </div>
                </div>

                {/* <!-- Creator / Owner --> */}
                <div className="lg:mb-8 flex flex-wrap mt-5">
                  <div className="mb-4 flex">
                    <figure className="mr-4 shrink-0">
                      <Link href={`/user/${postBy?.owner}`}>
                        <a className="relative block imgBorder">
                          <ProfileItem address={postBy?.owner} />
                          <div
                            className="absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center"
                            data-tippy-content="Verified Collection"
                          >
                            <Tippy
                              content={<span>Verified Collection</span>}
                            >
                              <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
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
                                    <stop stop-color="#BF4098" />
                                    <stop offset="1" stop-color="#579AD5" />
                                  </linearGradient>
                                  <clipPath id="clip0_11_2">
                                    <rect width="22" height="22" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </Tippy>
                          </div>
                        </a>
                      </Link>
                    </figure>
                    <div className="flex flex-col justify-center">
                      <span className="text-jacarta-400 block text-sm dark:text-white">
                        Owned by
                      </span>
                      <Link href={`/user/${postBy?.owner}`}>
                        <a className="text-accent block">
                          <span className="text-sm font-bold">
                            <ProfileItemName address={postBy?.owner} />
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                {postBy?.owner === walletAddress && (
                  <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8"
                    style={{
                      marginTop: "auto"
                    }}>
                    <div className="mb-8 sm:flex sm:flex-wrap">
                      <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
                      </div>
                    </div>
                    <button
                      className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all self-end bg-accent  hover:bg-accent-dark inline-block w-full rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                      onClick={ActiveNft}>
                      Mint Now!
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        </div>
      </section >
      <User_carousel_post owner={postBy?.owner} />
      {/* <!-- end item --> */}
      <Footer />
    </>
  );
};

export default PostItem;
