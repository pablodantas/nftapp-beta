import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Feature_collections_data from "../../../data/Feature_collections_data";
import { useMoralis } from "react-moralis";
import ProfileExplore from "../profileUser/ProfileExplore";
import ProfileExploreName from "../profileUser/ProfileExploreName";
import { useQuery } from "react-query";
import Auctions_dropdown from "../../dropdown/Auctions_dropdown";
import Likes from "../../likes";
import ImageAnuncio from "../metadata/nftImageAnuncio";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import TimeAgo from "react-timeago";
import Share from "./share_modal_anuncio";
import ModalPost from "../modal/modalPost";
import ModalNft from "../modal/modalNft_nft";

const My_collection_item_anuncio = () => {
  const dispatch = useDispatch();

  const { Moralis, user } = useMoralis();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [item, setItem] = useState([]);
  const walletAddress = user?.attributes?.ethAddress;
  const [loadingBTN, setLoadingBTN] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const [showElementPOST, setShowElementPost] = useState("");
  const [showElementNFT, setShowElementNft] = useState("");
  const [showElementIndexNft, setShowElementIndexNFT] = useState();
  const [showElementIndexPost, setShowElementIndexPOST] = useState();

  const [nft, setNFT] = useState();
  const [post, setPOST] = useState();

  const fetchItem = async () => {
    if (walletAddress) {
      const toSkip = (page - 1) * pageSize;
      const query = new Moralis.Query("Announcement");
      query.equalTo("owner", walletAddress);
      query.descending("createdAt");
      query.skip(toSkip);
      query.limit(pageSize);
      const result = await query.find();
      const res = JSON.parse(JSON.stringify(result));
      return res;
    }
  };

  const { data, isLoading } = useQuery(
    `user${walletAddress}myColecction${"adverts"}page${pageSize}`,
    fetchItem,
    {
      staleTime: 1000 * 90,
      //cacheTime: 111120000,
    }
  );

  useEffect(() => {
    if (data) {
      setLoading(false);
      setItem(data);
    }
  }, [data]);

  const fetchData = () => {
    setPageSize(pageSize + 1);
  };
  const [showElementIndexDEL, setShowElementIndexDEL] = useState();
  const [showElementDelete, setShowElementDEL] = useState("");
  const [del, setDEL] = useState();

  function DeleteModal(index, item) {
    const a = !showElementDelete;
    setShowElementIndexDEL(index);
    setShowElementDEL(a);
    setDEL(item);
  }

  function ActivePost(index, item) {
    const a = !showElementPOST;
    setShowElementIndexPOST(index);
    setShowElementPost(a);
    setPOST(item);
  }

  function ActiveNft(index, item) {
    const a = !showElementNFT;
    setShowElementIndexNFT(index);
    setShowElementNft(a);
    setNFT(item);
  }

  async function DeleteUpload(objectId, key) {
    try {
      const Upload = Moralis.Object.extend("Announcement");
      const query = new Moralis.Query(Upload);
      query.equalTo("objectId", objectId);
      const uploadToDelete = await query.first();
      if (uploadToDelete) {
        await uploadToDelete.destroy();
        const newUser = item.filter((_, i) => i !== key);
        setItem(newUser);
      }
      setShowElementIndexDEL(false);
    } catch (error) {
      console.log(error);
    } finally {
      setShowElementDEL(false);
    }
  }

  const handleClickads = () => {
    setLoadingBTN(true);
    setTimeout(() => {
      setLoadingBTN(false);
      window.history.pushState(null, null, "/myprofile?defaultIndex=6");
      window.location.href = "/create";
    }, 2000);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showShare, setShowshare] = useState(false);

  const HandleShare = () => {
    if (showShare === false) {
      setShowshare(true);
    } else {
      setShowshare(false);
    }
  };

  return (
    <>
      {showShare ? <Share /> : null}
      <InfiniteScroll
        dataLength={item.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={
          loading ? (
            <div className="loader-container flex justify-center btn_disable mb-3 w-full">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="col d-flex justify-content-center"></div>
          )
        }
      >
        <div className="flex mk_gap">
          <Link href={"/create"}>
            <div className="w-full flex justify-center mb-8">
              <button
                onClick={handleClickads}
                className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] bg-jacarta-700 flex items-center"
                style={{
                  padding: "6px 10px",
                  borderRadius: "5px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Add
                {loadingBTN ? (
                  <div className="loader-container  ml-2">
                    <div className="loader h-6 w-6"></div>
                  </div>
                ) : (
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 81 79"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                  >
                    <path
                      d="M40.5 76C61.1269 76 78 59.741 78 39.5C78 19.259 61.1269 3 40.5 3C19.8731 3 3 19.259 3 39.5C3 59.741 19.8731 76 40.5 76Z"
                      stroke="#6d6fb8"
                      strokeWidth="6"
                    />
                    <line
                      x1="27"
                      y1="37.5"
                      x2="53"
                      y2="37.5"
                      stroke="#6d6fb8"
                      strokeWidth="3"
                    />
                    <line
                      x1="41.5"
                      y1="27"
                      x2="41.5"
                      y2="52"
                      stroke="#6d6fb8"
                      strokeWidth="3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </Link>
          {!isLoading && item.length === 0 && (
            <p className="text-center mb-3 font-display w-full">
              You don't have NFTs
            </p>
          )}
          {item.map((item, index) => (
            <article
              key={index}
              className={`max-w-xs min-w-16 ${
                isLargeScreen ? " height_nft_card_hover" : ""
              }`}
            >
              <div className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
                <figure className="relative group overflow-hidden ">
                  <span className="collection_item_img">
                    <ImageAnuncio tokenURI={item?.image} />
                  </span>
                  <button
                    className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:trash_bg_dark text-center font-semibold text-white  dark:trash_bg_dark text-center font-semibold text-white transition-all js-wallet border-jacarta-100  group  flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent border-jacarta-100 focus:bg-accent group js-dark-mode-trigger flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-transparent focus:border-transparent dark:border-transparent hover:fill-white  absolute"
                    style={{ top: "18px", right: "22px" }}
                    onClick={() => DeleteModal(index)}
                  >
                    {" "}
                    {/* onClick={() => DeleteUpload(item.objectId)} */}
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.4734 20.625H6.5267C6.08024 20.6256 5.65058 20.4548 5.32647 20.1477C5.00235 19.8407 4.80853 19.4209 4.78504 18.975L3.9967 4.87668H18.0034L17.215 18.975C17.1915 19.4209 16.9977 19.8407 16.6736 20.1477C16.3495 20.4548 15.9198 20.6256 15.4734 20.625Z"
                        stroke="white"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M2.24585 4.87668H19.7542"
                        stroke="white"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M9.24919 1.375H12.7509C13.2152 1.375 13.6605 1.55946 13.9889 1.88781C14.3172 2.21615 14.5017 2.66148 14.5017 3.12583V4.87667H7.49835V3.12583C7.49835 2.66148 7.68281 2.21615 8.01116 1.88781C8.3395 1.55946 8.78484 1.375 9.24919 1.375Z"
                        stroke="white"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M11 7.49832V18.0033"
                        stroke="white"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M14.5017 8.49832V15.4983"
                        stroke="white"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M7.49832 8.49832V15.4983"
                        stroke="white"
                        stroke-miterlimit="10"
                      />
                    </svg>
                  </button>
                  {showElementIndexDEL === index ? (
                    <div className={"modal fade show block"}>
                      <div className="modal-dialog max-w-2xl">
                        <div className="modal-content dark:bg-jacarta-700">
                          <div className="modal-header p-over_20">
                            <h5
                              className="font-pop modal-title text-space text-none"
                              id="placeBidLabel"
                              style={{ fontSize: "18px" }}
                            >
                              Do you want to delete this?{" "}
                            </h5>
                          </div>
                          {/* <!-- Body --> */}
                          <div className="modal-body p-over_20">
                            <div className="mb-2 flex justify-around">
                              <button
                                className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                                onClick={() =>
                                  DeleteUpload(item.objectId, index)
                                }
                                style={{ fontSize: "15px" }}
                              >
                                Yes
                              </button>
                              <button
                                className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                                onClick={() => setShowElementIndexDEL()}
                                style={{ fontSize: "15px" }}
                              >
                                No
                              </button>
                            </div>
                          </div>
                          {/* <!-- end body --> */}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </figure>

                <div className="relative min-h-8 dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white">
                  {isLargeScreen ? (
                    <div className="row flex flex-col opacity-0 hover:opacity-100 absolute bg-jacarta-700 w-full h-full rounded-b-[1.25rem] transition-opacity delay-100 duration-500">
                      <Link href={"/create"}>
                        <button
                          className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col hover:bg-jacarta-600 flex items-center justify-center"
                          // onClick={() => ActiveNft(index, item)}
                        >
                          <p>Listing on Marketplace</p>
                        </button>
                      </Link>
                      <Link href={"/create"}>
                        <button
                          onClick={() => ActivePost(index, item.token_uri)}
                          className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col hover:bg-jacarta-600 flex items-center justify-center"
                        >
                          <p>Share on social feed</p>
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex row flex flex-col absolute bg-jacarta-700 w-full h-full rounded-b-[1.25rem] transition-opacity delay-100 duration-500">
                      <Link href={"/create"}>
                        <button
                          className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col hover:bg-jacarta-600 flex items-center justify-center"
                          // onClick={() => ActiveNft(index, item)}
                        >
                          <p>Listing on Marketplace</p>
                        </button>
                      </Link>
                      <Link href={"/create"}>
                        <button
                          // onClick={() => ActivePost(index, item.token_uri)}
                          className="col hover:bg-jacarta-600 flex items-center justify-center"
                        >
                          <p>Share on Social Feed</p>
                        </button>
                      </Link>
                    </div>
                  )}
                  <div className="p-5_c">
                    <div className="mb-3 flex flex-wrap items-center space-x-1">
                      <div className="col flex items-center flex-w-col items-center">
                        <p className="font-normal text-sm text-jacarta-700 dark:hover:text-accent hover:text-accent dark:text-white">
                          Posted by{" "}
                          <span className="text-accent text-truncate">
                            <ProfileExploreName address={item?.owner} />
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col"></div>
                    <div className="mt-5 flex flex-col justify-between">
                      <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                        <h2 className="text-truncate font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-1 text-md dark:text-white">
                          {item?.name}
                        </h2>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                          <span>
                            <TimeAgo date={item.createdAt} />
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mr-3"></div>
                    </div>
                  </div>
                </div>
              </div>
              {showElementIndexNft === index ? (
                <ModalNft
                  nft={nft}
                  keyModal={showElementIndexNft}
                  showElementNFT={showElementNFT}
                />
              ) : null}
              {showElementIndexPost === index ? (
                <ModalPost
                  post={post}
                  keyModal={showElementIndexPost}
                  showElementNFT={showElementPOST}
                />
              ) : null}
            </article>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default My_collection_item_anuncio;
