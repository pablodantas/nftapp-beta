import React, { useEffect, useState } from "react";
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
import Share from "./share_modal";

const Following = () => {
  const [copied, setCopied] = useState(false);
  

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  const [showElementIndex, setShowElementIndex] = useState(false);
  const [showElement, setShowElement] = useState("");

  async function ComentsChat(event) {
    const a = !showElement;
    setShowElementIndex(event);
    setShowElement(a);
  }
  const [isActive, setIsActive] = useState(false);
  const [showActive, setShowActive] = useState("");

  const [imageModal, setImageModal] = useState(false);
  const [showimage, setShowImage] = useState("");

  const [ShareModal, setShareModal] = useState(false);
  const [showShare, setShowShare] = useState("");

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
  const HandleShare = (e) => {
    const a = !showShare;
    setShareModal(e);
    setShowShare(a);
  };
  const { Moralis, user } = useMoralis();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [item, setItem] = useState([]);
  const walletAddress = user?.attributes?.ethAddress;

  const [seguindo, setSeguindo] = useState([]);

  useEffect(() => {
    async function seguindo() {
      let addr = [];
      if (walletAddress) {
        const query = new Moralis.Query(`seguir`);
        query.equalTo("seguidores", walletAddress.toLowerCase());
        const likes = await query.find();
        for (let i = 0; i < likes.length; i++) {
          addr[i] = likes[i].attributes.seguindo;
          setSeguindo(addr);
        }
      }
    }
    seguindo();
  }, [walletAddress, pageSize]);

  const fetchItem = async () => {
    if (seguindo) {
      const query = new Moralis.Query("Posts");
      const toSkip = (page - 1) * pageSize;
      query.containedIn("owner", seguindo);
      query.descending("createdAt");
      query.skip(toSkip);
      query.limit(pageSize);
      const result = await query.find();
      const res = JSON.parse(JSON.stringify(result));
      return res;
    }
  };

  const { data } = useQuery(
    `ExGlobal${pageSize}Seguindo${seguindo}`,
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
  
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchData = () => {
    setPageSize(pageSize + 1);
  };

  return (
    <>
      <div className="col-lg-7 flex flex-col">
        {/* Card do post */}
        <InfiniteScroll
          dataLength={item.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<div className="col d-flex justify-content-center"></div>}
        >
          {item.length == 0 && (
            <div className="w-full flex  items-center justify-center imgpost dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10 no-scrollbar mt-14 overflow-x-auto rounded-lg">
              <span className="mr-2">
                <svg
                  width="81"
                  height="97"
                  viewBox="0 0 81 97"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M39.652 83.8864V83.7798C39.6638 82.6494 39.7822 81.7498 40.0071 81.081C40.232 80.4122 40.5516 79.8706 40.9659 79.4563C41.3802 79.042 41.8774 78.6603 42.4574 78.3111C42.8066 78.098 43.1203 77.8465 43.3984 77.5565C43.6766 77.2605 43.8956 76.9202 44.0554 76.5355C44.2211 76.1508 44.304 75.7247 44.304 75.2571C44.304 74.6771 44.1679 74.174 43.8956 73.7479C43.6233 73.3217 43.2594 72.9933 42.8036 72.7624C42.3479 72.5316 41.8419 72.4162 41.2855 72.4162C40.8002 72.4162 40.3326 72.5168 39.8828 72.718C39.433 72.9193 39.0572 73.2359 38.7553 73.668C38.4535 74.1 38.2789 74.6652 38.2315 75.3636H35.9943C36.0417 74.3575 36.3021 73.4963 36.7756 72.7802C37.255 72.064 37.8853 71.5166 38.6665 71.1378C39.4537 70.759 40.3267 70.5696 41.2855 70.5696C42.3272 70.5696 43.2327 70.7768 44.0021 71.1911C44.7775 71.6054 45.3752 72.1735 45.7955 72.8956C46.2216 73.6177 46.4347 74.4403 46.4347 75.3636C46.4347 76.0147 46.334 76.6036 46.1328 77.1303C45.9375 77.6571 45.6534 78.1276 45.2805 78.5419C44.9136 78.9562 44.4697 79.3232 43.9489 79.6428C43.428 79.9683 43.0108 80.3116 42.6971 80.6726C42.3834 81.0277 42.1555 81.4509 42.0135 81.9421C41.8714 82.4334 41.7945 83.0459 41.7827 83.7798V83.8864H39.652ZM40.7884 89.142C40.3504 89.142 39.9746 88.9852 39.6609 88.6715C39.3472 88.3578 39.1903 87.982 39.1903 87.544C39.1903 87.1061 39.3472 86.7302 39.6609 86.4165C39.9746 86.1029 40.3504 85.946 40.7884 85.946C41.2263 85.946 41.6022 86.1029 41.9158 86.4165C42.2295 86.7302 42.3864 87.1061 42.3864 87.544C42.3864 87.834 42.3124 88.1004 42.1644 88.343C42.0224 88.5857 41.83 88.781 41.5874 88.929C41.3506 89.071 41.0843 89.142 40.7884 89.142Z"
                    fill="url(#paint0_linear_3_5)"
                  />
                  <path
                    d="M40.1639 18.4756C45.6812 18.4756 50.1559 14.3397 50.1559 9.23844C50.1559 4.13719 45.6814 0 40.1639 0C34.6464 0 30.1733 4.13703 30.1733 9.23844C30.1733 14.3398 34.6466 18.4756 40.1639 18.4756Z"
                    fill="url(#paint1_linear_3_5)"
                  />
                  <path
                    d="M40.1639 35.6569C47.0272 35.6569 54.056 33.4595 52.9593 27.3759C52.5126 24.9053 50.303 21.442 48.6246 19.8914C48.4072 19.6917 47.4234 19.6395 47.156 19.7926C45.1193 20.9542 42.728 21.6314 40.1637 21.6314C37.6008 21.6314 35.2095 20.9542 33.173 19.7926C32.9054 19.6395 31.9214 19.6917 31.7042 19.8914C30.0271 21.442 27.815 24.9053 27.3695 27.3759C26.2729 33.4597 33.3019 35.6569 40.1639 35.6569Z"
                    fill="url(#paint2_linear_3_5)"
                  />
                  <path
                    d="M13.0716 62.8197C18.5889 62.8197 23.0635 58.6837 23.0635 53.5825C23.0635 48.48 18.589 44.3441 13.0716 44.3441C7.55408 44.3441 3.08081 48.48 3.08081 53.5825C3.08098 58.6837 7.55425 62.8197 13.0716 62.8197Z"
                    fill="url(#paint3_linear_3_5)"
                  />
                  <path
                    d="M21.5323 64.2365C21.3151 64.0345 20.3312 63.9847 20.0637 64.1367C18.0258 65.2983 15.6359 65.9745 13.0716 65.9745C10.5074 65.9745 8.11736 65.2984 6.08065 64.1367C5.81313 63.9848 4.8279 64.0345 4.61091 64.2365C2.93365 65.7861 0.722868 69.2494 0.277569 71.72C-0.81937 77.8037 6.20959 80 13.0716 80C19.9349 80 26.9639 77.8037 25.8668 71.72C25.4205 69.2494 23.2095 65.7861 21.5323 64.2365Z"
                    fill="url(#paint4_linear_3_5)"
                  />
                  <path
                    d="M67.2558 62.8197C72.7732 62.8197 77.2464 58.6837 77.2464 53.5825C77.2464 48.48 72.7732 44.3441 67.2558 44.3441C61.7385 44.3441 57.2639 48.48 57.2639 53.5825C57.2641 58.6837 61.7385 62.8197 67.2558 62.8197Z"
                    fill="url(#paint5_linear_3_5)"
                  />
                  <path
                    d="M80.05 71.72C79.6046 69.2494 77.3938 65.7861 75.7167 64.2365C75.4994 64.0345 74.5143 63.9847 74.2468 64.1367C72.2101 65.2983 69.8201 65.9745 67.2558 65.9745C64.6917 65.9745 62.3016 65.2984 60.2637 64.1367C59.9962 63.9848 59.0123 64.0345 58.7952 64.2365C57.1181 65.7861 54.9078 69.2494 54.4611 71.72C53.3644 77.8037 60.3925 80 67.2558 80C74.118 80 81.1468 77.8037 80.05 71.72Z"
                    fill="url(#paint6_linear_3_5)"
                  />
                  <path
                    d="M53.724 57.9645L41.8119 51.6064V38.89C41.8119 38.0483 41.0746 37.3666 40.1643 37.3666C39.2551 37.3666 38.5177 38.0483 38.5177 38.89V51.6064L26.6057 57.9645C25.8182 58.3853 25.547 59.318 26.0021 60.0461C26.4573 60.7745 27.4657 61.0239 28.2534 60.6042L40.1641 54.2449L52.0761 60.603C52.8638 61.0239 53.8712 60.7744 54.3263 60.046C54.7815 59.318 54.5115 58.3853 53.724 57.9645Z"
                    fill="url(#paint7_linear_3_5)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_3_5"
                      x1="46"
                      y1="65"
                      x2="76.3514"
                      y2="124.296"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C94098" />
                      <stop offset="1" stop-color="#618ACA" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_3_5"
                      x1="33.1946"
                      y1="4.36487"
                      x2="45.6507"
                      y2="19.1088"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C94098" />
                      <stop offset="1" stop-color="#5B94D1" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_3_5"
                      x1="31.1593"
                      y1="23.4727"
                      x2="40.5001"
                      y2="40.0161"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C94098" />
                      <stop offset="1" stop-color="#5B94D1" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_3_5"
                      x1="6.10213"
                      y1="48.7089"
                      x2="18.5582"
                      y2="63.453"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C94098" />
                      <stop offset="1" stop-color="#5B94D1" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint4_linear_3_5"
                      x1="4.06723"
                      y1="67.8166"
                      x2="13.4071"
                      y2="84.3594"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C94098" />
                      <stop offset="1" stop-color="#5B94D1" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint5_linear_3_5"
                      x1="60.2852"
                      y1="48.7089"
                      x2="72.7413"
                      y2="63.4529"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C94098" />
                      <stop offset="1" stop-color="#5B94D1" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint6_linear_3_5"
                      x1="58.2508"
                      y1="67.8166"
                      x2="67.5907"
                      y2="84.3592"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C94098" />
                      <stop offset="1" stop-color="#5B94D1" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient
                      id="paint7_linear_3_5"
                      x1="30.1306"
                      y1="42.9046"
                      x2="45.4871"
                      y2="63.5286"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C94098" />
                      <stop offset="1" stop-color="#5B94D1" />
                      <stop offset="1" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <h2
                className="font-display"
                style={{ wordWrap: "break-word", width: "50%" }}
              >
                You don't follow anyone!
                <br />
                Try the suggestions in your menu on the left.
              </h2>
            </div>
          )}
          {item.map((item, index) => (
            <div className="row flex flex-col" key={index}>
              <div className="col flex items-center">
                <Link href={`/user/${item?.owner}`}>
                  <div className="imgBorder mr-2 cursor-pointer">
                    <ProfileDon address={item?.owner} />
                  </div>
                </Link>
                <div className="row flex flex-col">
                  <div className="col">
                    <Link href={`/user/${item?.owner}`}>
                      <a className="m-0 text-dark dark:text-white mx-w-150 text-truncate font-semibold hover:font-bold">
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
                      content={copied ? <span>copied</span> : <span>copy</span>}
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
                        {" "}
                        {/*col_img_feed_2*/}
                        <button
                          className="w-full h-full absolute"
                          onClick={() => HandleImage(index)}
                        ></button>
                        <ImageNFT tokenURI={item.image} />
                        {showElementIndex === index ? (
                          <Coments
                            showElement={showElement}
                            contract={item?.address}
                            tokeId={item?.tokenId}
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
                            <ImageNFT tokenURI={item.tokenURI} />
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
                            contract={item?.address}
                            tokeId={item?.tokenId}
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
                                      contract={item?.address}
                                      tokeId={item?.tokenId}
                                    />
                                  </small>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="col mb-3 mw-100">
                            <button className="rounded-pill flex_important items-center justify-center">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col flex justify-content-start mt-2"></div>
                </div>
              </div>
              <hr className="hrPost my-5" />
              {index % 4 === 0 && <CardAnuncio keyPryme={index} />}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Following;
