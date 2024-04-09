import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import ImageNFT from "../metadata/nftImage";
import NameNFT from "../metadata/nftNameBlockchain";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ModalPost from "../modal/modalPost";
import ModalNft from "../modal/modalNft";
import TimeAgo from "react-timeago";

const My_collection_item_nftBlockChain = () => {
  const { user } = useMoralis();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [item, setItem] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const walletAddress = user?.attributes?.ethAddress;

  const fetchItem = async () => {
    const toSkip = (page - 1) * pageSize;
    const options = {
      method: "GET",
      url: "https://deep-index.moralis.io/api/v2/address/nft",

      params: {
        address: walletAddress,
        chain: "bsc",
        format: "decimal",
        skip: toSkip,
        limit: pageSize,
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "Chls3GxNualnNcfoaKHIWDlxTotOfI0zcnnGBKpnAiAdkGMq7PT84FF6qr4VXb7J",
      },
    };

    const respost = axios
      .request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    return respost;
  };

  const { data, isLoading } = useQuery(
    `user${walletAddress}myColecction${"NftsBlockchain"}page${pageSize}`,
    fetchItem,
    {
      staleTime: 1000 * 1,
      //cacheTime: 111120000,
    }
  );

  console.log(data, "test")

  useEffect(() => {
    if (data) {
      setLoading(false);
      setItem(data.result);
    }
  }, [data]);

  const fetchData = () => {
    setPageSize(pageSize + 4);
  };
  const [loading, setLoading] = useState(true);
  const [showElementIndexNft, setShowElementIndexNFT] = useState();
  const [showElementIndexPost, setShowElementIndexPOST] = useState();

  const [showElementPOST, setShowElementPost] = useState("");
  const [showElementNFT, setShowElementNft] = useState("");

  const [nft, setNFT] = useState();
  const [post, setPOST] = useState();

  const [imageModal, setImageModal] = useState(false);
  const [showimage, setShowImage] = useState("");
  const HandleImage = (e) => {
    const a = !showimage;
    setImageModal(e);
    setShowImage(a);
  };

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

  const handleClick = (index) => {
    setIsClicked((prevClicked) => {
      if (prevClicked === index) {
        return prevClicked;
      } else {
        return index;
      }
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={item?.length} //This is important field to render the next data
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
          <Link href={"/upload"}>
            <div className="w-full flex justify-center mb-8">
              <button
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
              </button>
            </div>
          </Link>
          {!isLoading && item?.length === 0 && (
            <p className="text-center mb-3 font-display w-full">
              You don't have NFTs
            </p>
          )}
          {item?.map((item, index) => (
            <article
              key={index}
              className={`max-w-xs min-w-16 ${isLargeScreen ? " height_nft_card_hover" : ""
                }`}
            >
              <div
                className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg"
                style={{ maxWidth: "263px" }}
              >
                <figure className="group overflow-hidden">
                  <span className="collection_item_img">
                    <ImageNFT tokenURI={item.token_uri} />
                  </span>
                </figure>
                <div
                  className="relative min-h-8 dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white"
                  onClick={() => handleClick(index)}
                >
                  {isLargeScreen ? (
                    <div className="row flex flex-col opacity-0 hover:opacity-100 absolute bg-jacarta-700 w-full h-full rounded-b-[1.25rem] transition-opacity delay-100 duration-500">

                      <button
                        className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col hover:bg-jacarta-600 flex items-center justify-center"
                        onClick={() => ActiveNft(index, item)}
                      >
                        <p>Listing on Marketplace</p>
                      </button>

                      <button
                        onClick={() => ActivePost(index, item.token_uri)}
                        className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col hover:bg-jacarta-600 flex items-center justify-center"
                      >
                        <p>Share on social feed</p>
                      </button>
                    </div>
                  ) : (
                    <div className="flex row flex flex-col absolute bg-jacarta-700 w-full h-full rounded-b-[1.25rem] transition-opacity delay-100 duration-500">
                      <button
                        className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col hover:bg-jacarta-600 flex items-center justify-center"
                        onClick={() => ActiveNft(index, item)}
                      >
                        <p>Listing on Marketplace</p>
                      </button>
                      <button
                        onClick={() => ActivePost(index, item.token_uri)}
                        className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col hover:bg-jacarta-600 flex items-center justify-center"
                      >
                        <p>Share on Social Feed</p>
                      </button>
                    </div>)}
                  <div className="p-5_c">
                    <div className="mb-3 flex flex-wrap items-center space-x-1">
                      <div className="col flex items-center flex-w-col items-center">
                        <p className="font-normal text-sm text-jacarta-700 dark:hover:text-accent hover:text-accent dark:text-white">
                          Owned by <span className="text-accent">you</span>
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="absolute_card">
                          {/* <Auctions_dropdown classes="dark:hover:bg-jacarta-500  dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 bg-white mt-2 dropdown_share" /> */}
                        </div>
                        {/* <Social_dropdown /> */}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-truncate font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                        <NameNFT tokenURI={item.token_uri} />
                      </h2>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                        <span>
                          <TimeAgo date={item.last_token_uri_sync} />
                        </span>
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

export default My_collection_item_nftBlockChain;
