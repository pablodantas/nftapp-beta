import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Meta from "../Meta";
import { useMoralis } from "react-moralis";
import { Tabs, TabPanel } from "react-tabs";
import ProfileItemName from "../itemInfo/ProfileItemName";
import ProfileItem from "../itemInfo/ProfileItem";
import Footer from "../footer";
import ImageNFT from "../itemdalis/metadata/nftImage";
import User_carousel from "../carousel/item_carousel";
import Web3 from "web3";
import Share from "../modal/share_modal_nft";
import TimeAgo from "react-timeago";
import Coments from "./comentarios/coments";
import ComentsPost from "./comentarios/comentsPost";
import { useQuery } from 'react-query';
import Buy_quest from "./buy_question"
import Buy_status from "./buy_status_modal"
import ModalPost from "../../components/collectrions_upload/modal/modalPost"

const NftItem = ({ nft, tokenId, contract, history }) => {

  const { Moralis, user } = useMoralis();
  const [analyticsData, setAnalyticsData] = useState([]);

  const [showShare, setShowshare] = useState(false)
  const [imageModal, setImageModal] = useState(false);
  const walletAddress = user?.attributes.ethAddress;
  const [ganhador, setGanhador] = useState();
  const [Perd, setPerde] = useState();

  const [BuyStatus, setBuyStatus] = useState();
  const [buyerrStatus, setBuyerrStatus] = useState("");
  const [CloseOk, setCloseOk] = useState(false);

  const fetchOwner = async () => {
    if (nft) {
      const query = new Moralis.Query("IfUser");
      query.equalTo("postOwner", nft.owner);
      const result = await query.find();
      const a = JSON.parse(JSON.stringify(result))
      const b = a[0].carteira;
      return b;
    }
  }

  const { data: Owner } = useQuery(`user${nft}profile`, fetchOwner, {
    staleTime: 1000 * 50,
    //cacheTime: 111120000,
  })

  const fetchComprador = async () => {
    if (walletAddress) {
      const query = new Moralis.Query("IfUser");
      query.equalTo("postOwner", walletAddress);
      const result = await query.find();
      const a = JSON.parse(JSON.stringify(result))
      const b = a[0].carteira;
      return b;
    }
  }

  const { data: comprador } = useQuery(`user${walletAddress}profile`, fetchComprador, {
    staleTime: 1000 * 50,
    //cacheTime: 111120000,
  })

  useEffect(() => {
    if (comprador) {
      setPerde(comprador)
    }
  }, [comprador]);

  useEffect(() => {
    if (Owner) {
      setGanhador(Owner)
    }
  }, [Owner]);

  useEffect(() => {
    if (history) {
      const analyticsDataCopy = JSON.parse(JSON.stringify(history));
      setAnalyticsData(analyticsDataCopy);
    }
    if (nft?.minter_address) {
      setAnalyticsData(prevAnalyticsData => prevAnalyticsData.concat([{ Mint: nft.minter_address, price: '-', from: nft.minter_address, createdAt: '-' }]));
    }
  }, [history, nft]);

  async function buy() {
    setShowElementBuy(false);
    setBuyStatus(true);
    try {
      if (!ganhador || !Perd || !nft) {
        console.error("Erro: informações incompletas");
        return;
      }

      const Ganha = Moralis.Object.extend("IfUser");
      const ganhaDin = new Moralis.Query(Ganha);
      ganhaDin.equalTo("postOwner", nft.owner);
      const ganhadorObj = await ganhaDin.first();
      if (!ganhadorObj) {
        console.error("Erro: ganhador não encontrado");
        return;
      }
      setBuyerrStatus("10%");
      const newWalletBalance = parseInt(ganhador) + parseInt(nft.valor); // converte o valor para Number
      ganhadorObj.set("carteira", newWalletBalance);

      const Perder = Moralis.Object.extend("IfUser");
      const perderDin = new Moralis.Query(Perder);
      perderDin.equalTo("postOwner", walletAddress);
      const perdObj = await perderDin.first();
      if (!perdObj) {
        console.error("Erro: perdedor não encontrado");
        return;
      }
      setBuyerrStatus("30%");
      const newWalletBalan = parseInt(Perd) - parseInt(nft.valor); // converte o valor para Number
      perdObj.set("carteira", newWalletBalan);

      await ganhadorObj.save();
      await perdObj.save();

      if (!contract || !tokenId || !nft.valor || !walletAddress || !nft.owner) {
        console.error("Erro: informações incompletas");
        return;
      }
      setBuyerrStatus("60%");
      const HistoryNft = Moralis.Object.extend("HistoryNft");
      const queryHistory = new HistoryNft();
      queryHistory.set("token_address", contract);
      queryHistory.set("token_id", tokenId);
      queryHistory.set("event", 'Sale');
      queryHistory.set("from", nft.owner);
      queryHistory.set("valor", nft.valor);

      const NFTs = Moralis.Object.extend("NFTs");
      const queryNft = new Moralis.Query(NFTs);
      queryNft.equalTo("token_address", contract);
      queryNft.equalTo("token_id", tokenId);
      const myDetails = await queryNft.first();
      if (!myDetails) {
        console.error("Erro: NFT não encontrado");
        return;
      }
      if (!walletAddress) {
        console.error("Erro: endereço da carteira não informado");
        return;
      }
      myDetails.set("owner", walletAddress);
      myDetails.set("buy", false);
      await myDetails.save();
      setBuyerrStatus("80%");
      const Marketplace = Moralis.Object.extend("Marketplace");
      const query = new Moralis.Query(Marketplace);
      query.equalTo("token_address", contract);
      query.equalTo("token_id", tokenId);
      const uploadDelete = await query.first();
      if (uploadDelete) {
        await uploadDelete.destroy();
        console.log("Excluído com sucesso!");
      } else {
        console.log("Não foi possível encontrar o item no mercado.");
      }
      await queryHistory.save();
      setBuyerrStatus("100%");
    } catch (err) {
      console.error(err);
    }
    setBuyerrStatus("100% - Purchase made successfully!");
  }

  const HandleShare = () => {
    if (showShare === false) {
      setShowshare(true);
    } else {
      setShowshare(false)
    }
  }
  const [showElementIndex, setShowElementIndex] = useState(false);
  const [showElement, setShowElement] = useState("");

  async function ComentsChat(event) {
    const a = !showElement;
    setShowElementIndex(event);
    setShowElement(a);
  }



  const [buyQuest, setBuyQuest] = useState("");
  const [showElementBuy, setShowElementBuy] = useState(false);

  async function buyModal(event) {
    const a = !buyQuest;
    setBuyQuest(event);
    setShowElementBuy(a);
  }

  const [showElementPOST, setShowElementPOST] = useState("");
  const [post, setPOST] = useState();
  const [showElementIndexPost, setShowElementIndexPOST] = useState();

  function ActivePost(event) {
    const a = !showElementPOST;
    setShowElementIndexPOST(event);
    setShowElementPOST(a);
    setPOST(nft);
    setShowshare(false);
  }

  const router = useRouter();

  const handleNavigate = () => {
    router.push("/feed/global");
  };

  return (
    <>
      {BuyStatus && <Buy_status status={buyerrStatus} />}
      {showElementBuy && <Buy_quest close={buyModal} buy={buy} />}
      {showElementIndexPost ? (
        <ModalPost
          post={post}
          keyModal={showElementIndexPost}
          showElementPOST={showElementPOST}
        />
      ) : null}
      <Meta title={`${nft?.name} - ${contract}${tokenId}`} />
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
                    <ImageNFT tokenURI={nft?.image} />
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
                      <ImageNFT tokenURI={nft?.image} />
                    </div>
                  </div>
                  {/* <!-- end modal --> */}
                </figure>
                <div className="ml-auto flex items-stretch space-x-2 relative"
                  style={
                    { marginBottom: "40px" }
                  }>
                  <Likes
                    likeId={`like${nft?.token_address}tokenlike${nft?.token_id}`}
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
                      contract={nft?.token_address}
                      tokeId={nft?.token_id} />
                  </div>
                  {showElementIndex ? (
                    <Coments
                      showElement={showElement}
                      contract={nft?.token_address}
                      tokeId={nft?.token_id}
                      walletAddress={walletAddress}
                      donoPoster={nft?.owner}
                    />
                  ) : null}
                  <button className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                    onClick={HandleShare}
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
                  <Link href={"/collection/explore_collection"}>
                    <button className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                      style={{ padding: '10px 16px', borderRadius: "7px" }}
                    >
                      Shop
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
                        {nft?.collection}
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
                  <Share postId={nft?.token_address} ActivePost={ActivePost} />
                ) : null

                }
                <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
                  {nft?.name}
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
                      {nft?.valor} $Buzz Coin
                    </span>
                  </div>
                  <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                    <TimeAgo date={nft?.createdAt} live={true} title={null} />
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
                      {nft?.description}
                    </p>
                  </div>
                </div>

                {/* <!-- Creator / Owner --> */}
                <div className="lg:mb-8 flex flex-wrap mt-5">
                  <div className="mb-4 flex">
                    <figure className="mr-4 shrink-0">
                      <Link href={`/user/${nft?.owner}`}>
                        <a className="relative block imgBorder">
                          <ProfileItem address={nft?.owner} />
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
                      <Link href={`/user/${nft?.owner}`}>
                        <a className="text-accent block">
                          <span className="text-sm font-bold">
                            <ProfileItemName address={nft?.owner} />
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Bid --> */}
                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8"
                  style={{
                    marginTop: "auto"
                  }}>
                  <div className="mb-8 sm:flex sm:flex-wrap">
                    <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
                      {/* <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                          By{" "}
                        </span>
                        <Link href={`/user/${nft?.owner}`}>
                          <a className="text-accent text-sm font-bold">
                            {nft?.address}
                          </a>
                        </Link>
                      </div> */}
                      <div className="mt-3 flex">
                        <div>
                          <div className="flex items-center whitespace-nowrap">
                            <Tippy content={<span>$Buzz Coin</span>}>
                              <span className=" dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md  py-1 px-2 -ml-1 mr-1">
                                <img
                                  src="/images/logo_black.png"
                                  className="logo_money"
                                  alt=""
                                />
                              </span>
                            </Tippy>
                            <span className="text-green text-lg font-medium leading-tight tracking-tight">
                              {nft?.valor} $Buzz Coin
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Countdown --> */}
                  </div>
                  <button
                    onClick={buyModal}
                    // onClick={() => buy()}
                    className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all self-end bg-accent  hover:bg-accent-dark inline-block w-full rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                  >
                    Buy
                  </button>
                </div>
                {/* <!-- end bid --> */}
              </div>
              {/* <!-- end details --> */}
            </div>
            <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10 no-scrollbar mt-14 overflow-x-auto rounded-lg">
              <div className="border-b dark:border-jacarta-600 border-jacarta-100  mb-5">
                <h2 className="font-display text-center mb-5"
                  style={{ fontSize: "20px" }}>History of this NFT</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="table_space">
                    <th className="table_padding">Event</th>
                    <th className="table_padding">Price</th>
                    <th className="table_padding">From</th>
                    <th className="table_padding">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.map((data, index) => (
                    <tr key={index}>
                      <td className="table_padding">
                        {data.event === "Sale" && (
                          <span className="inline-flex items-center mr-2">
                            <svg
                              width="22"
                              height="23"
                              viewBox="0 0 22 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-2"
                            >
                              <path
                                d="M9.27656 12.3713C9.24795 12.3099 9.20948 12.2472 9.16524 12.1898L8.90661 11.8543C8.89685 11.8667 8.88719 11.879 8.87767 11.8914C8.43693 12.4629 8.33998 12.9167 8.58945 13.2402C8.76666 13.47 8.98192 13.4652 9.16528 13.2275C9.33995 13.0011 9.38632 12.651 9.27832 12.3752L9.27656 12.3713Z"
                                fill="url(#paint0_linear_4_3)"
                              />
                              <path
                                d="M11.2733 6.65923C10.9891 7.02786 11.0807 7.53822 11.2978 7.88048L12.1761 6.74142C12.0955 6.63687 11.6728 6.1412 11.2733 6.65923Z"
                                fill="url(#paint1_linear_4_3)"
                              />
                              <path
                                d="M21.8516 5.7233C21.5897 4.66794 20.9911 3.81352 20.1721 3.24795C19.4932 2.69371 18.6207 2.38335 17.6436 2.38335C17.3951 2.38335 17.1428 2.40121 16.8891 2.44156C16.8891 2.44156 16.5746 2.50067 16.4179 2.54198C16.3978 2.54707 16.3777 2.55247 16.3576 2.5578C16.3568 2.55804 16.3561 2.55822 16.3552 2.55846C15.9488 2.66691 15.5438 2.8244 15.1508 3.02913C14.9717 3.12247 14.7238 3.27247 14.6271 3.33428C14.5899 3.35802 14.3468 3.44771 14.1861 3.05977C14.0881 2.81175 14.2032 2.55217 14.4474 2.38059C15.2104 1.84463 16.0492 1.43397 16.8805 1.31785L16.8801 1.27582C16.8766 0.864203 16.6202 0.531658 16.3028 0.527222L10.4673 0.555518C10.3103 0.55324 10.1592 0.633154 10.0482 0.777155L0.170614 13.5855C-0.0573595 13.8811 -0.0573595 14.3604 0.170614 14.6559L6.06976 22.3055C6.29773 22.6011 6.66732 22.6011 6.89529 22.3055L14.0506 13.0271C14.5426 13.2081 15.0818 13.3051 15.6531 13.3051C16.3884 13.3051 17.1346 13.1492 17.8709 12.8421C19.2188 12.2797 20.3755 11.2678 21.1278 9.99291C21.9373 8.62107 22.1944 7.10474 21.8516 5.7233ZM15.6531 11.5065C15.5092 11.5065 15.3684 11.4989 15.2313 11.4839L16.7174 9.497C16.8284 9.353 16.89 9.15708 16.8883 8.95355L16.8961 4.35164C17.1435 4.30853 17.3899 4.28563 17.6342 4.28563C19.0944 4.28563 20.2316 5.06619 20.5313 6.27413C20.9662 8.02708 19.5534 10.2508 17.4461 11.13C16.8472 11.3799 16.244 11.5065 15.6531 11.5065ZM7.91528 15.3591C7.89304 15.9392 7.65684 16.5249 7.21323 17.1002C6.84259 17.5808 6.4191 17.8915 6.16902 18.0115C6.11895 18.0356 6.06278 18.0102 6.03513 17.9508L5.68825 17.2075C5.67119 17.171 5.66749 17.1264 5.67817 17.0861C5.6888 17.0457 5.71275 17.0135 5.74354 16.998C6.08285 16.8288 6.41221 16.557 6.64716 16.2523C6.97412 15.8284 7.03616 15.4025 6.81309 15.1133C6.61406 14.8552 6.3577 14.8841 5.79717 15.2277C4.97904 15.7406 4.36609 15.7115 3.92415 15.1386C3.33163 14.3703 3.43362 13.2056 4.17792 12.2404C4.46262 11.8713 4.7697 11.5938 5.09065 11.4156C5.14275 11.3867 5.20332 11.4131 5.23129 11.4771L5.55367 12.2145C5.56939 12.2505 5.57244 12.2935 5.56208 12.3327C5.55168 12.3717 5.52889 12.4033 5.49944 12.419C5.22842 12.5646 4.98413 12.7769 4.77331 13.0503C4.42069 13.5075 4.45892 13.8829 4.61228 14.0817C4.82254 14.3544 5.1011 14.2331 5.68672 13.8914C6.48391 13.4157 7.06695 13.4679 7.52073 14.0563C7.79378 14.4106 7.93391 14.8732 7.91528 15.3591ZM10.6992 12.4533L10.1872 13.1171C10.1492 13.1664 10.0896 13.1734 10.0454 13.1338L9.83865 12.9489L9.82399 12.968C9.85783 13.4137 9.71918 13.8632 9.43356 14.2335C8.92736 14.8898 8.29429 14.7558 7.93053 14.2841C7.58277 13.8332 7.49775 13.261 7.68481 12.6293C7.84107 12.1016 8.15897 11.6212 8.39818 11.311L8.41866 11.2848L8.38445 11.2404C8.26965 11.0916 8.02059 10.9149 7.64269 11.405C7.45346 11.6504 7.28859 11.9945 7.20158 12.3256C7.191 12.3662 7.167 12.3985 7.13626 12.4138C7.10547 12.4292 7.07102 12.4261 7.04217 12.4053L6.62922 12.1078C6.58179 12.0737 6.56029 12 6.57827 11.9337C6.65095 11.6659 6.83699 11.1333 7.26686 10.576C7.95323 9.6859 8.67211 9.67721 9.34572 10.5507L10.1753 11.6264C10.3159 11.8087 10.5191 12.0627 10.6896 12.2379C10.7145 12.2636 10.7297 12.3016 10.7316 12.3427C10.7334 12.384 10.7216 12.4242 10.6992 12.4533ZM11.7607 11.0768L11.1763 11.8345C11.1329 11.8908 11.0624 11.8908 11.019 11.8345L7.71158 7.54586C7.66812 7.4895 7.66812 7.39808 7.71158 7.34178L8.29591 6.58401C8.33937 6.52766 8.40987 6.52766 8.45333 6.58401L11.7607 10.8727C11.8042 10.929 11.8042 11.0205 11.7607 11.0768ZM10.8927 9.1777C10.2792 8.38222 9.99621 7.03706 10.8244 5.96316C11.1798 5.50227 11.5998 5.30413 12.039 5.3901C12.3969 5.46018 12.7662 5.7221 13.0789 6.12767C13.1715 6.24769 13.2441 6.36172 13.2888 6.43623C13.3232 6.49373 13.3192 6.57538 13.2796 6.62688L11.8102 8.53228C12.1078 8.86135 12.5502 8.7496 12.9374 8.24751C13.1478 7.9748 13.3078 7.7067 13.4412 7.40359C13.4566 7.36876 13.4825 7.3437 13.5126 7.33459C13.5427 7.32548 13.5745 7.33309 13.6002 7.35551L14.021 7.72379C14.0667 7.76377 14.083 7.84123 14.0591 7.90574C13.9119 8.30435 13.6776 8.71801 13.3816 9.10187C12.9939 9.60461 12.5599 9.87775 12.1263 9.89189C11.6904 9.90604 11.264 9.65911 10.8927 9.1777Z"
                                fill="url(#paint2_linear_4_3)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_4_3"
                                  x1="9.03202"
                                  y1="12.008"
                                  x2="8.36579"
                                  y2="12.2519"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0.00403725" stop-color="#5B94D2" />
                                  <stop offset="1" stop-color="#BE4198" />
                                </linearGradient>
                                <linearGradient
                                  id="paint1_linear_4_3"
                                  x1="11.8031"
                                  y1="6.5707"
                                  x2="11.0504"
                                  y2="6.9323"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0.00403725" stop-color="#5B94D2" />
                                  <stop offset="1" stop-color="#BE4198" />
                                </linearGradient>
                                <linearGradient
                                  id="paint2_linear_4_3"
                                  x1="14.4096"
                                  y1="2.70148"
                                  x2="1.10422"
                                  y2="11.2947"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop offset="0.00403725" stop-color="#5B94D2" />
                                  <stop offset="1" stop-color="#BE4198" />
                                </linearGradient>
                              </defs>
                            </svg>
                            Sale
                          </span>
                        )}
                        {data.event !== "Sale" && (
                          <>
                            <span className="inline-flex items-center mr-2">
                              <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6667 18.3333H3.33333C2.8913 18.3333 2.46738 18.1577 2.15482 17.8452C1.84226 17.5326 1.66666 17.1087 1.66666 16.6667V3.33333C1.66666 2.89131 1.84226 2.46738 2.15482 2.15482C2.46738 1.84226 2.8913 1.66667 3.33333 1.66667H10C10.221 1.66667 10.433 1.75446 10.5893 1.91074C10.7455 2.06702 10.8333 2.27899 10.8333 2.5C10.8333 2.72101 10.7455 2.93298 10.5893 3.08926C10.433 3.24554 10.221 3.33333 10 3.33333H3.33333V16.6667H16.6667V10C16.6667 9.77899 16.7545 9.56702 16.9107 9.41074C17.067 9.25446 17.279 9.16667 17.5 9.16667C17.721 9.16667 17.933 9.25446 18.0893 9.41074C18.2455 9.56702 18.3333 9.77899 18.3333 10V16.6667C18.3333 17.1087 18.1577 17.5326 17.8452 17.8452C17.5326 18.1577 17.1087 18.3333 16.6667 18.3333Z" fill="url(#paint0_linear_3_2)" />
                                <path d="M18.3333 1.61667C18.3159 1.42781 18.2345 1.25056 18.1027 1.1142C17.9709 0.977836 17.7965 0.890517 17.6083 0.866667C16.8196 0.795028 16.0245 0.842788 15.25 1.00833C15.0993 1.04006 14.9603 1.11292 14.8485 1.21883C14.7367 1.32475 14.6565 1.45957 14.6167 1.60833L14.4667 2.20833L13.775 1.93333C13.639 1.87594 13.4901 1.85573 13.3437 1.87477C13.1973 1.8938 13.0585 1.9514 12.9417 2.04167C12.7291 2.20792 12.5337 2.39496 12.3583 2.6C10.8333 4.29167 10.8333 6.96667 10.8333 7.98333L9.4 9.40833C9.32189 9.4858 9.2599 9.57797 9.21759 9.67952C9.17529 9.78107 9.1535 9.88999 9.1535 10C9.1535 10.11 9.17529 10.2189 9.21759 10.3205C9.2599 10.422 9.32189 10.5142 9.4 10.5917C9.47747 10.6698 9.56964 10.7318 9.67119 10.7741C9.77274 10.8164 9.88166 10.8382 9.99167 10.8382C10.1017 10.8382 10.2106 10.8164 10.3121 10.7741C10.4137 10.7318 10.5059 10.6698 10.5833 10.5917L12.0167 9.16667H12.3167C13.1496 9.20157 13.9807 9.06249 14.757 8.75832C15.5332 8.45414 16.2375 7.99153 16.825 7.4C18.6417 5.325 18.3333 1.76667 18.3333 1.61667Z" fill="url(#paint1_linear_3_2)" />
                                <defs>
                                  <linearGradient id="paint0_linear_3_2" x1="10" y1="1.66667" x2="10" y2="18.3333" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#B6499E" />
                                    <stop offset="1" stop-color="#6B87C9" />
                                  </linearGradient>
                                  <linearGradient id="paint1_linear_3_2" x1="13.7533" y1="0.834386" x2="13.7533" y2="10.8382" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#B44B9F" />
                                    <stop offset="1" stop-color="#648CCD" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              {'Mint'}
                            </span>
                          </>
                        )}
                      </td>
                      <td className="table_padding">{data.price}</td>
                      <td className="table_padding">{data.from.slice(0, 6)}...{data.from.slice(-6)}</td>
                      <td className="table_padding">{<TimeAgo date={data.createdAt} title={null} />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="no-scrollbar mt-14 overflow-x-auto rounded-lg">
              {/* <!-- Tabs Nav --> */}
              <Tabs className="min-w-fit tabs">
                <TabPanel>
                  {/* <!-- Details --> */}
                  <div
                    className="tab-pane fade"
                    id="details"
                    role="tabpanel"
                    aria-labelledby="details-tab"
                  >
                    <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10">
                      <div className="mb-2 flex items-center">
                        <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
                          Contract Address:
                        </span>
                        <a href="#" className="text-accent">
                          {`${nft?.owner?.substring(0, 6)}...${nft?.owner?.substring(nft?.owner.length - 4)}`}
                        </a>
                      </div>
                      <div className="mb-2 flex items-center">
                        <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
                          Token ID:
                        </span>
                        <span
                          className="js-copy-clipboard text-jacarta-700 cursor-pointer select-none dark:text-white"
                          data-tippy-content="Copy"
                        >
                          {tokenId}
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
                          Token Standard:
                        </span>
                        <span className="text-jacarta-700 dark:text-white">
                          ERC-721
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
                          Blockchain:
                        </span>
                        <span className="text-jacarta-700 dark:text-white">
                          {'97'}
                        </span>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
            {/* <User_carousel owner={post?.owner} /> */}
          </>
        </div>
      </section >
      <User_carousel owner={nft?.owner} />
      {/* <!-- end item --> */}
      <Footer />
    </>
  );
};

export default NftItem;
