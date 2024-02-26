import React, { useState, useEffect, useRef } from "react";
import "tippy.js/dist/tippy.css"; // optional
import Meta from "../../components/Meta";
import Footer from "../../components/footer";
import MoralisIPFS from "../../components/ipfsGenerete/moralisIPFS";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Ads_error from "../../components/modal/error_ads";
import Web3 from "web3";
import { base64IPFS } from "../../components/ipfsGenerete/base64";

const web3 = new Web3(Web3.givenProvider);

const Create = () => {
  const { user, Moralis } = useMoralis();
  const inputFile = useRef(null);

  const walletAddress = user?.attributes?.ethAddress;

  const router = useRouter();


  const [uploadProgress, setUploadProgress] = useState(0);


  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [placeLinks, setPlaceLinks] = useState("");
 
  const [selectedFile, setSelectedFile] = useState();
  const [preleorder, setPreleorder] = useState(false);
  const [isError, setIserror] = useState(false);
  const [showCrop, setshowCrop] = useState(false);
  const [isErrorMessage, setisErrorMessage] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isErrorName, setIserrorName] = useState(false);
  const [isErrorDes, setIserrorDes] = useState(false);
  const [isErrorLink, setIserrorLink] = useState(false);
  const [isErroPrice, setIserrorPrice] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isTermsResponsability, setIsTermsResponsability] = useState(false);




  const options = [
    "Select",
    "Cryptopunks",
    "Enjin",
    "Ether Cards",
    "Foundation",
    "Magiceden",
    "Market Decentraland",
    "Mintable",
    "Niftygateway",
    "Coinbase",
    "Nbatopshot",
    "Opensea",
    "Rarible",
    "Superrare",
    "Binance",
    "Kraken",
    "Zora",
  ];

  const optionss = [
    "Select",
    "BNB",
    "DUST",
    "ENJ",
    "ETH",
    "MANA",
    "RARE",
    "SOL",
    "USD",
  ];
  
  const [selected, setSelected] = useState(options[0]);
  const [selectedRede, setSelectedRede] = useState(options[0]);

  const changeHandler = async (event) => {
    setUploadProgress(10);
    const img = event.target.files[0];
    if (img) {
      setSelectedFile(URL.createObjectURL(img));
      const file1 = await base64IPFS(img);
      setUploadProgress(30);
      const file1url = await MoralisIPFS(img.type, file1);
      setUploadProgress(50);
      setFile(file1url);
      setTimeout(() => {
        setUploadProgress(100);
      }, 2000);
    }
  };

  console.log(file, "imagem");
  console.log(uploadProgress, "progresso");

  useEffect(() => {
    function LinksRedes() {
      if (selected != "Select") {
        setIserrorLink(false);
      } else if (selected === "rarible.com/") {
        const mk =
          "token/0xb7f7f6c52f2e2fdb1963eab30438024864c313f6:489?tab=overview";
        setPlaceLinks(mk);
      } else if (selected === "superrare.com/") {
        const mk = "0x8842c56b410215932e81848e376151cea9ce2a59/rope-the-moon-9";
        setPlaceLinks(mk);
      } else if (selected === "www.niftygateway.com/marketplace") {
        const mk =
          "itemdetail/primary/0xbfe30f7d2d207481e9c9d2e1ca28ff184d510890/1";
        setPlaceLinks(mk);
      } else if (selected === "nft.coinbase.com/") {
        const mk =
          "nft/ethereum/0x81ae0be3a8044772d04f32398bac1e1b4b215aa8/3939";
        setPlaceLinks(mk);
      } else if (selected === "mintable.app/") {
        const mk =
          "collectibles/item/mpunk-11824-MPUNKS/0x595a8974c1473717c4b5d456350cd594d9bda687:11824";
        setPlaceLinks(mk);
      } else if (selected === "foundation.app/") {
        const mk = "collection/dragon-33ed";
        setPlaceLinks(mk);
      } else if (selected === "www.niftygateway.com/") {
        const mk = "collections/balance-by-rk";
        setPlaceLinks(mk);
      } else if (selected === "cryptopunks.app/") {
        const mk = "cryptopunks/details/3100";
        setPlaceLinks(mk);
      } else if (selected === "nbatopshot.com/") {
        const mk =
          "listings/p2p/6783b9d8-44c5-49c7-87e0-be217af963e9+d9d1b13b-070c-48f7-a93c-0959d6f0ba09";
        setPlaceLinks(mk);
      } else if (selected === "ether.cards/") {
        const mk = "founder/15";
        setPlaceLinks(mk);
      } else if (selected === "market.decentraland.org/") {
        const mk =
          "contracts/0x78ac43a2d7ed748de51a8b3467b3c8e4ec37332e/items/0";
        setPlaceLinks(mk);
      } else if (selected === "magiceden.io/") {
        const mk = "marketplace/the_golden_auric";
        setPlaceLinks(mk);
      } else if (selected === "www.binance.com/en/nft/home") {
        const mk = "en/nft/item/1000002027534";
        setPlaceLinks(mk);
      } else if (selected === "opensea.io/") {
        const mk =
          "assets/ethereum/0x77372a4cc66063575b05b44481f059be356964a4/7996";
        setPlaceLinks(mk);
      } else if (selected === "your-next-nft-platform.com/") {
        const mk = "your/nft/link";
        setPlaceLinks(mk);
      }
    }
    LinksRedes();
  }, [selected]);

  useEffect(() => {
    if (!link) {
      return;
    }
    if (selected === "Cryptopunks") {
      if (link.includes("cryptopunks.app")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Enjin") {
      if (link.includes("enjin.io")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Ether Cards") {
      if (link.includes("ether.cards")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Foundation") {
      if (link.includes("foundation.app")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Magiceden") {
      if (link.includes("magiceden.io")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Market Decentraland") {
      if (link.includes("market.decentraland.org")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Mintable") {
      if (link.includes("mintable.app")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Niftygateway") {
      if (link.includes("niftygateway.com")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Coinbase") {
      if (link.includes("nft.coinbase.com")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Nbatopshot") {
      if (link.includes("nbatopshot.com")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Opensea") {
      if (link.includes("opensea.io")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Rarible") {
      if (link.includes("rarible.com")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Superrare") {
      if (link.includes("superrare.co")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Binance") {
      if (link.includes("binance.com")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Kraken") {
      if (link.includes("kraken.com")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    } else if (selected === "Zora") {
      if (link.includes("zora.co")) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    }
  }, [link, selected]);

  async function Post() {
    if (selected === "Select") {
      setPreleorder(false);
      setshowCrop(true);
      setIserrorLink(true);
      setisErrorMessage("Choose a Marketplace where your ad is hosted.");
      return;
    }
    if (selected != "Select") {
      const lin = link;
      ControllerBD(lin);
    }
  }

  async function ControllerBD(lin) {
    const Announcement = Moralis.Object.extend("Announcement");
    const newPost = new Announcement();
    newPost.set("name", name);
    newPost.set("description", description);
    newPost.set("owner", walletAddress);
    newPost.set("linkmarketplace", lin);
    newPost.set("rede", selectedRede);
    newPost.set("valor", price);
    setPreleorder(true);
    if (!file) {
      setIsImageError(true);
      setPreleorder(false);
      setshowCrop(true);
      setisErrorMessage("Please add an image to your ad.");
      return;
    }
    if (!name) {
      setPreleorder(false);
      setshowCrop(true);
      setIserrorName(true);
      setisErrorMessage("Please add a Name to your ad.");
      return;
    }
    if (!description) {
      setPreleorder(false);
      setshowCrop(true);
      setIserrorDes(true);
      setisErrorMessage("Please add a description to your ad.");
      return;
    }
    if (!lin) {
      setPreleorder(false);
      setshowCrop(true);
      setisErrorMessage("Please add a Link to your ad.");
      return;
    }
    if (!price) {
      setPreleorder(false);
      setIserrorPrice(true);
      setshowCrop(true);
      setisErrorMessage("Please add a price to your ad.");
      return;
    }
    if (file) {
      newPost.set("image", file);
    }
    await newPost.save();
    router.push("/myprofile?defaultIndex=6", undefined, { scroll: false });
  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const imageReset = () => {
    setFile("");
    setSelectedFile();
    setUploadProgress(0);
    if (inputFile.current) {
      inputFile.current.value = null;
    }
  };

  function closeModal() {
    setshowCrop(false);
  }

  function formatNumber(number) {
    const parts = number.split(".");
    const integerPart = parts[0]
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimalPart = parts[1] ? "." + parts[1].replace(/\D/g, "") : "";
    return integerPart + decimalPart;
  }

  return (
    <>
      {showCrop && (
        <Ads_error
          Error_message={isErrorMessage}
          closeButtonArea={closeModal}
        />
      )}
      <div>
        <Meta title="Create" />
        {/* <!-- Create --> */}
        <section className="relative py-24">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="container">
            <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
              Create your advisor
            </h1>

            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- File Upload --> */}
              <div className="mb-6 flex items-center image_place">
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Image or Video
                  <span className="text-red">*</span>
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  Drag or choose your file to upload
                </p>
                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                  <div className="relative cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                    </svg>
                    <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                      .bmp .gif .jpg/.jpeg .png .svg .webp .avi .m4v .mov .mp4
                      .mpeg .ogv .qt .webm .wmv
                    </p>
                  </div>
                  <div className="img-over absolute inset-4 cursor-pointer rounded">
                    <input
                      className="inp_file opacity-0 group-hover:opacity-100"
                      type="file"
                      ref={inputFile}
                      onChange={changeHandler}
                    />
                    <img
                      className="inp_img"
                      src={
                        selectedFile ||
                        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                      }
                      onClick={onImageClick}
                    />
                  </div>
                </div>
                {uploadProgress > 0 && (
                  <div className="mt-3 progress-bar" style={{ maxWidth: "23rem" }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                {uploadProgress > 0 && (
                  <small className="mb-3 ">
                    We are transforming your image into IPFS.
                    <span className="ml-1 text-accent">
                      <a
                        href="https://docs.ipfs.tech/concepts/what-is-ipfs/"
                        target="_blank"
                      >
                        What is IPFS?
                      </a>
                    </span>
                  </small>
                )}
                {selectedFile ? (
                  <button
                    className="mt-3 mb-3 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 dark:bg-white/[.15] space-x-2 rounded-xl  py-2 px-4 name_light transition-colors"
                    onClick={imageReset}
                  >
                    Reset
                  </button>
                ) : (
                  <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
                )}
                {isImageError && (
                  <p className="text-red">Please add an image to your ad.</p>
                )}
              </div>
              {/* <!-- Name --> */}
              <div className="mb-6">
                <label
                  htmlFor="item-name"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Name<span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  id="item-name"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  placeholder="Item name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {isErrorName && (
                  <p className="text-red">Please add a name to your ad.</p>
                )}
              </div>
              {/* <!-- Description --> */}
              <div className="mb-6">
                <label
                  htmlFor="item-description"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Description
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  The description will be included on the {"item's"} detail page
                  underneath its image. Markdown syntax is supported.
                </p>
                <textarea
                  id="item-description"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  rows="4"
                  required
                  placeholder="Provide a detailed description of your item."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {isErrorDes && (
                  <p className="text-red">
                    Please add a description to your ad.
                  </p>
                )}
              </div>
              {/* <!-- Blockchain --> */}
              <div className="mb-6">
                <label
                  htmlFor="item-supply"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Markeplace
                </label>

                {/* dropdown */}
                <div className="dropdown relative mb-4 cursor-pointer ">
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    Remember to paste the link according to the selected
                    marketplace
                  </p>
                  <form className="flex">
                    <select
                      className="select-padding border-select font_select dark:bg-jacarta-700 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 py-3 px-3 hover:ring-2 dark:text-white"
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      {options.map((value) => (
                        <option
                          className="option_drop dark:text-white"
                          value={value}
                          key={value}
                        >
                          {value}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      id="item-name"
                      className="border-select-camp dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                      placeholder={placeLinks}
                      required
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    {selected != "Select" && (
                      <div className="flex items-center justify-center  font_select  py-3 px-3  dark:text-white">
                        {selected === "Cryptopunks" && (
                          <svg
                            width="373"
                            height="373"
                            viewBox="0 0 373 373"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <circle
                              cx="186.5"
                              cy="186.5"
                              r="186.5"
                              fill="#EA34B0"
                            />
                            <path
                              d="M116.683 323.299C116.499 285.634 116.456 248.261 116.41 210.888C116.404 205.905 116.384 200.921 116.301 195.475C116.114 194.85 115.996 194.689 115.627 194.375C112.805 194.173 110.209 193.868 107.67 194.137C103.812 194.547 102.322 193.387 102.436 189.037C102.733 177.73 102.637 166.408 102.475 155.095C102.428 151.819 103.454 150.829 106.59 150.875C118.004 151.039 129.423 151.012 140.838 150.888C143.537 150.858 144.46 151.693 144.443 154.55C144.423 157.974 142.922 162.305 145.233 164.607C147.32 166.686 151.393 165.347 154.564 165.226C157.82 165.102 158.831 166.436 158.622 169.616C158.437 172.43 158.625 175.269 158.742 178.553C158.987 179.157 159.14 179.306 159.56 179.624C167.541 179.841 175.258 179.753 182.966 180.001C186.159 180.104 186.605 178.615 186.655 175.826C186.838 165.664 186.916 165.555 196.656 165.364C199.517 165.307 200.763 164.532 200.526 161.409C200.313 158.599 200.501 155.757 200.566 152.466C200.719 151.831 200.819 151.659 201.15 151.305C209.256 151.063 217.133 151.098 225.004 150.889C227.759 150.816 228.724 151.794 228.544 154.601C228.363 157.416 228.524 160.255 228.589 163.546C228.752 164.193 228.862 164.378 229.186 164.799C232.611 165.128 235.823 165.335 239.03 165.276C241.535 165.23 242.592 166.323 242.404 168.847C242.38 169.178 242.402 169.513 242.411 169.846C242.683 179.938 242.683 179.938 252.332 179.938C257.318 179.938 262.307 180.032 267.289 179.902C269.739 179.838 270.708 180.677 270.702 183.313C270.642 209.944 270.639 236.575 270.708 263.206C270.716 266.077 269.657 267.026 266.993 266.88C264.108 266.721 261.206 266.88 257.869 266.986C257.276 267.207 257.125 267.342 256.82 267.743C256.626 268.505 256.565 269.001 256.547 269.498C256.419 273.13 257.551 277.699 255.843 280.144C253.947 282.857 249.263 281.009 245.811 281.106C243.124 281.182 242.725 282.486 242.613 284.829C242.089 295.845 242.036 295.842 231.491 295.842C218.159 295.842 204.825 295.955 191.495 295.769C187.888 295.718 186.326 296.507 186.515 300.657C186.854 308.122 186.65 315.612 186.779 323.55C163.995 324.008 141.105 324.008 117.762 324.008C117.148 323.869 116.986 323.73 116.683 323.299Z"
                              fill="white"
                            />
                            <path
                              d="M116.697 135.266C116.504 117.354 116.513 99.7005 116.36 82.0489C116.334 79.0605 117.135 77.9471 120.156 77.9907C123.451 78.0384 127.601 79.5748 129.858 77.1434C131.916 74.9272 130.574 70.7593 130.49 67.4783C130.405 64.1924 131.9 63.7226 134.585 63.6682C144.27 63.4718 144.412 63.3881 144.357 53.5413C144.338 50.1022 145.232 48.9888 148.668 49.0036C178.603 49.1332 208.54 49.1374 238.475 49.0001C242.027 48.9839 242.722 50.3266 242.717 53.6421C242.702 63.5266 242.826 63.6696 252.193 63.6424C255.473 63.6329 256.92 64.4971 256.577 68.0914C256.326 70.7294 256.548 73.4157 256.613 76.5434C256.765 77.1799 256.864 77.3535 257.196 77.7093C258.23 77.9521 259.03 78.0541 259.831 78.0668C270.673 78.2388 270.673 78.2358 270.673 89.7187C270.673 103.702 270.573 117.687 270.741 131.668C270.783 135.18 269.696 136.151 266.358 136.144C216.974 136.033 167.59 136.049 117.757 135.963C117.154 135.77 117 135.648 116.697 135.266Z"
                              fill="white"
                            />
                          </svg>
                        )}
                        {selected === "Enjin" && (
                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <path
                              d="M50 100C22.3844 100 0 77.6156 0 50C0 22.3844 22.3844 0 50 0C77.6156 0 100 22.3844 100 50C100 77.6156 77.6156 100 50 100ZM69.7281 28.125C60.2844 28.125 50.8437 28.125 41.4406 28.1437C38.8469 28.4 36.2156 28.5188 33.6437 29.0719C26.4 30.6063 23.1094 34.0719 22.2469 41.125C22.1 42.2281 21.9969 43.35 21.875 44.4719V55.8344C22.0625 57.2719 22.2031 58.7312 22.45 60.1687C23.5438 66.3937 26.7719 69.5437 33.2531 70.825C36.0094 71.3562 38.8063 71.6906 41.6063 71.75C50.7 71.9281 59.7938 71.9062 68.8875 71.75C71.0656 71.7281 73.2688 71.5719 75.3656 70.9219C77.8156 70.1719 78.9063 67.2594 77.5063 65.1719C76.7875 64.0875 75.6313 63.9313 74.4 63.9313C64.7094 63.9313 55.0406 63.95 45.35 63.8906C42.5719 63.8719 39.7937 63.7125 37.1 62.9844C34.6719 62.3344 33.1687 60.8781 32.5531 58.5344C32.225 57.275 32.1406 55.9937 32.0375 54.6906C31.9125 53.275 31.8938 53.275 33.3969 53.275H73.9906C74.5625 53.275 75.1594 53.2563 75.7375 53.1563C77.1125 52.9 77.9187 52.1937 78 50.9125C78.1031 49.3187 78.5563 47.5844 76.7438 46.4812C76.1998 46.1666 75.5815 46.0037 74.9531 46.0094H34.2406C31.9156 46.0094 31.9156 46.0094 32.1 43.7813C32.5125 39.0375 34.3625 37.0875 39.2812 36.3187C40.75 36.0742 42.2361 35.9488 43.725 35.9437C53.6406 35.9031 63.5781 35.8844 73.4937 35.8656C74.2235 35.8633 74.9523 35.8111 75.675 35.7094C76.8875 35.5094 77.65 34.7812 77.8562 33.6C78.3687 30.6844 77.3813 29.2469 74.3563 28.675C72.8344 28.4 71.2687 28.3 69.7281 28.125Z"
                              fill="#7866D5"
                            />
                          </svg>
                        )}
                        {selected === "Ether Cards" && (
                          <svg
                            width="353"
                            height="394"
                            viewBox="0 0 353 394"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ maxWidth: "35px", maxHeight: "35px" }}
                          >
                            <ellipse
                              cx="190.5"
                              cy="205.5"
                              rx="162.5"
                              ry="166.5"
                              fill="white"
                            />
                            <path
                              d="M313.541 204.754C307.793 208.811 302.044 212.736 296.297 216.666C291.462 219.973 286.636 223.296 281.796 226.595C274.43 231.616 267.047 236.61 259.685 241.638C254.018 245.51 248.369 249.413 242.718 253.312C241.457 254.182 240.234 255.118 238.963 255.97C238.355 256.377 237.717 256.509 237.008 256.02C228.228 249.964 219.437 243.928 210.645 237.893C199.852 230.484 189.066 223.062 178.255 215.684C173.074 212.148 167.845 208.695 162.628 205.222C161.798 204.669 162.418 204.189 162.658 203.749C164.225 200.868 165.819 198.004 167.412 195.14C170.494 189.602 173.585 184.069 176.667 178.531C180.865 170.988 185.052 163.437 189.254 155.897C192.845 149.453 196.451 143.02 200.047 136.58C204.282 128.995 208.516 121.41 212.746 113.822C216.31 107.427 219.863 101.024 223.427 94.6288C227.657 87.0407 231.893 79.4571 236.128 71.8725C236.154 71.8245 236.21 71.7955 236.238 71.748C238.129 68.5471 238.049 68.5984 239.863 71.9108C244.012 79.484 248.248 87.0013 252.446 94.5426C256.008 100.94 259.563 107.341 263.128 113.736C267.357 121.324 271.596 128.906 275.825 136.494C279.39 142.889 282.942 149.292 286.507 155.688C290.736 163.275 294.982 170.853 299.203 178.446C302.23 183.889 305.218 189.358 308.243 194.802C309.914 197.81 311.626 200.792 313.43 203.815C313.541 204.104 313.541 204.364 313.541 204.754Z"
                              fill="black"
                            />
                            <path
                              d="M192.64 342.5C192.69 341.344 191.908 340.587 191.407 339.8C185.572 330.635 179.684 321.51 173.809 312.376C169.677 305.951 165.553 299.52 161.408 293.105C155.127 283.384 148.809 273.69 142.547 263.956C137.057 255.422 131.644 246.832 126.157 238.296C121.609 231.222 117.003 224.192 112.424 217.142C111.874 216.296 111.373 215.612 112.074 214.394C114.983 209.338 117.742 204.179 120.578 199.072C123.682 193.485 126.813 187.914 129.928 182.334C134.161 174.752 138.393 167.17 142.62 159.584C146.183 153.191 149.74 146.794 153.297 140.398C157.491 132.855 161.677 125.308 165.877 117.77C169.466 111.329 173.075 104.901 176.664 98.4598C180.864 90.9214 185.046 83.3715 189.246 75.8337C190.283 73.973 191.376 72.149 192.406 70.2835C192.552 70.0187 192.482 69.6141 192.512 69.1371C192.854 69 193.195 69 193.665 69C194.591 71.4379 196.087 73.4562 197.263 75.6629C199.448 79.7641 201.753 83.7922 204.064 87.8128C204.634 88.8026 204.543 89.45 203.965 90.4649C200.049 97.3422 196.249 104.297 192.401 111.219C188.02 119.098 183.624 126.967 179.241 134.844C175.363 141.815 171.501 148.796 167.62 155.765C163.075 163.925 158.507 172.069 153.969 180.234C150.626 186.251 147.329 192.298 143.986 198.314C141.041 203.615 138.085 208.91 135.074 214.167C134.476 215.211 134.376 216.012 135.053 217.058C141.46 226.953 147.832 236.874 154.217 246.786C158.149 252.889 162.074 258.997 166.022 265.087C172.616 275.257 179.249 285.398 185.825 295.582C191.626 304.567 197.37 313.594 203.142 322.599C204.655 324.959 204.669 324.96 203.205 327.291C200.072 332.28 196.931 337.262 193.793 342.373C193.451 342.5 193.11 342.5 192.64 342.5Z"
                              fill="black"
                            />
                            <path
                              d="M67 214.728C68.3293 214.184 68.5201 212.714 69.0868 211.712C74.0058 203.016 78.7877 194.228 83.6544 185.497C88.3627 177.05 93.1421 168.649 97.854 160.205C101.18 154.243 104.419 148.225 107.745 142.263C112.218 134.247 116.756 126.273 121.231 118.258C124.587 112.248 127.874 106.194 131.217 100.177C135.435 92.5826 139.679 85.0046 143.912 77.4203C145.217 75.0834 146.542 72.7597 147.824 70.4085C148.6 68.9835 148.904 68.9115 149.68 70.2733C152.98 76.0638 156.265 81.8643 159.514 87.688C160.012 88.5799 159.995 89.4765 159.411 90.5195C154.711 98.902 150.112 107.35 145.443 115.753C140.613 124.445 135.729 133.102 130.887 141.787C126.683 149.326 122.512 156.887 118.312 164.43C113.768 172.591 109.197 180.735 104.66 188.901C100.999 195.492 97.3782 202.109 93.7233 208.704C92.69 210.568 91.6054 212.4 90.5326 214.238C90.0358 215.089 89.7402 215.866 90.3939 216.854C94.6095 223.229 98.8056 229.62 102.968 236.036C105.848 240.475 108.642 244.98 111.513 249.426C117.527 258.737 123.587 268.013 129.588 277.333C135.379 286.326 141.105 295.37 146.891 304.368C150.907 310.614 154.926 316.859 159.06 323.014C160.056 324.497 159.919 325.578 159.048 326.929C155.771 332.017 152.538 337.138 149.288 342.374C149.047 342.501 148.807 342.501 148.447 342.501C146.917 340.98 145.949 339.1 144.827 337.354C134.964 321.999 125.067 306.67 115.201 291.319C108.044 280.184 100.896 269.043 93.7278 257.917C85.2175 244.709 76.7594 231.46 68.1906 218.296C67.7578 217.631 67.358 216.957 67.0704 216.074C67 215.606 67 215.237 67 214.728Z"
                              fill="black"
                            />
                            <path
                              d="M237.444 342.501C236.825 340.45 235.473 338.918 234.412 337.242C231.519 332.675 228.604 328.124 225.709 323.558C219.156 313.227 212.477 302.988 205.897 292.676C200.116 283.616 194.468 274.455 188.636 265.433C182.592 256.084 176.583 246.709 170.662 237.267C168.055 233.109 165.327 229.04 162.512 224.714C164.617 224.627 165.866 226.051 167.218 226.962C175.568 232.586 183.927 238.194 192.312 243.756C200.439 249.147 208.461 254.724 216.547 260.188C223.274 264.735 230.032 269.229 236.766 273.766C237.629 274.347 238.399 274.301 239.237 273.732C250.367 266.181 261.481 258.601 272.643 251.106C283.624 243.733 294.66 236.455 305.66 229.116C307.593 227.826 309.452 226.409 311.387 225.125C311.771 224.87 312.309 224.25 312.784 224.792C313.207 225.275 312.657 225.674 312.392 226.089C306.261 235.708 300.136 245.331 294.024 254.963C289.404 262.243 284.865 269.584 280.175 276.81C275.095 284.637 270.125 292.545 265.093 300.407C260.091 308.222 255.072 316.023 250.125 323.88C246.341 329.891 242.451 335.824 238.64 341.815C238.456 342.103 238.243 342.12 238.009 342.379C237.836 342.501 237.693 342.501 237.444 342.501Z"
                              fill="black"
                            />
                          </svg>
                        )}
                        {selected === "Foundation" && (
                          <svg
                            width="127"
                            height="122"
                            viewBox="0 0 127 122"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <ellipse
                              cx="63.5"
                              cy="61"
                              rx="63.5"
                              ry="61"
                              fill="white"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M78.8935 61.456C78.8935 70.5444 71.5259 77.912 62.4375 77.912C53.3491 77.912 45.9815 70.5444 45.9815 61.456C45.9815 52.3676 53.3491 45 62.4375 45C71.5259 45 78.8935 52.3676 78.8935 61.456ZM30.9024 46.5674C31.204 46.045 31.958 46.045 32.2596 46.5674L49.0558 75.6593C49.3575 76.1817 48.9804 76.8347 48.3772 76.8347H14.7848C14.1816 76.8347 13.8045 76.1817 14.1062 75.6593L30.9024 46.5674ZM82.6143 45.9794C81.7488 45.9794 81.0471 46.681 81.0471 47.5466V75.3651C81.0471 76.2307 81.7488 76.9324 82.6143 76.9324H110.433C111.298 76.9324 112 76.2307 112 75.3651V47.5466C112 46.681 111.298 45.9794 110.433 45.9794H82.6143Z"
                              fill="black"
                            />
                          </svg>
                        )}
                        {selected === "Magiceden" && (
                          <svg
                            width="170"
                            height="173"
                            viewBox="0 0 170 173"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <ellipse
                              cx="85"
                              cy="86.5"
                              rx="85"
                              ry="86.5"
                              fill="#E42675"
                            />
                            <path
                              d="M79.4801 55.7111C83.7537 47.6962 89.8043 44.6167 98.8035 45.0377C113.599 45.7297 128.45 45.2539 143.277 45.2085C147.697 45.195 151.583 46.2858 153.976 50.2699C157.977 56.9344 153.001 64.9695 144.61 65.1731C135.952 65.3832 127.284 65.1931 118.622 65.2644C117.416 65.2743 115.717 64.4982 115.089 66.1158C114.609 67.3511 115.994 68.1204 116.71 68.9817C119.58 72.4342 122.55 75.806 125.362 79.3045C129.784 84.8051 129.981 88.9149 125.739 94.6604C122.881 98.5309 119.587 102.08 116.476 105.763C115.841 106.514 114.784 107.19 115.094 108.253C115.544 109.798 117.034 109.189 118.081 109.196C126.91 109.248 135.741 109.17 144.57 109.257C149.54 109.307 153.492 111.566 154.872 116.382C156.103 120.679 154.639 124.647 150.683 127.26C148.698 128.571 146.435 129.06 144.06 129.059C128.067 129.054 112.073 129.103 96.0794 129.017C92.3844 128.997 88.6984 128.403 86.1825 125.214C83.1959 121.429 83.4416 117.436 86.0868 113.662C91.5041 105.934 96.9474 98.2161 102.659 90.7058C104.544 88.2268 104.7 86.5425 102.593 84.271C99.7688 81.2261 97.1665 77.9725 94.5213 74.7653C92.7519 72.6199 91.5959 72.3145 89.6848 75.0005C84.217 82.6856 78.4405 90.1557 72.6525 97.6071C67.7563 103.91 61.629 104.243 55.6834 98.5711C50.1411 93.2841 44.7346 87.8549 39.252 82.5051C38.8119 82.0756 38.2452 81.7759 37.1139 80.9741C37.0066 83.2568 36.8731 84.985 36.8526 86.7145C36.7262 97.3696 36.9085 108.038 36.4106 118.675C36.108 125.141 30.7294 129.621 24.8525 129.369C18.9978 129.118 15.0464 124.591 15.0295 117.818C14.9797 97.8258 15.006 77.8336 15.0153 57.8414C15.0177 52.6793 16.4481 48.3096 21.7062 46.1359C27.0669 43.9198 31.4546 45.7608 35.2838 49.5189C43.8418 57.918 52.4125 66.3066 60.8193 74.8556C62.9511 77.0234 64.1561 76.6429 65.7285 74.4576C70.1847 68.2645 74.7316 62.1365 79.4801 55.7111Z"
                              fill="#F5F2F6"
                            />
                          </svg>
                        )}
                        {selected === "Market Decentraland" && (
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <path
                              d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
                              fill="url(#paint0_linear_21_13)"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.7529 11.7002V25.2002H24.0029L12.7529 11.7002Z"
                              fill="url(#paint1_linear_21_13)"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M1.50293 25.2002H12.7529V11.7002L1.50293 25.2002Z"
                              fill="white"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.19995 32.3999C10.3131 34.7416 14.1044 36.0053 18 35.9999C22.05 35.9999 25.7939 34.6589 28.7999 32.3999H7.19995Z"
                              fill="#FF2D55"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.6001 28.7998C4.62782 30.1605 5.83937 31.3721 7.2001 32.3998H28.8001C30.1608 31.3721 31.3724 30.1605 32.4001 28.7998H3.6001Z"
                              fill="#FC9965"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M24.1469 25.2002H1.50293C2.05961 26.4776 2.76336 27.6858 3.59993 28.8002H24.1559V25.2002H24.1469Z"
                              fill="#FFBC5B"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M24.147 18.8999V28.7999H32.4L24.147 18.8999Z"
                              fill="url(#paint2_linear_21_13)"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M15.9031 28.7999H24.1471V18.8999L15.9031 28.7999Z"
                              fill="white"
                            />
                            <path
                              d="M24.147 16.2002C26.6323 16.2002 28.647 14.1855 28.647 11.7002C28.647 9.21491 26.6323 7.2002 24.147 7.2002C21.6617 7.2002 19.647 9.21491 19.647 11.7002C19.647 14.1855 21.6617 16.2002 24.147 16.2002Z"
                              fill="#FFC95B"
                            />
                            <path
                              d="M12.7529 9C13.9956 9 15.0029 7.99264 15.0029 6.75C15.0029 5.50736 13.9956 4.5 12.7529 4.5C11.5103 4.5 10.5029 5.50736 10.5029 6.75C10.5029 7.99264 11.5103 9 12.7529 9Z"
                              fill="#FFC95B"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_21_13"
                                x1="3072.78"
                                y1="527.22"
                                x2="527.22"
                                y2="3072.78"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FF2D55" />
                                <stop offset="1" stop-color="#FFBC5B" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear_21_13"
                                x1="574.87"
                                y1="11.7002"
                                x2="574.87"
                                y2="1361.7"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#A524B3" />
                                <stop offset="1" stop-color="#FF2D55" />
                              </linearGradient>
                              <linearGradient
                                id="paint2_linear_21_13"
                                x1="436.516"
                                y1="18.8999"
                                x2="436.516"
                                y2="1008.9"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#A524B3" />
                                <stop offset="1" stop-color="#FF2D55" />
                              </linearGradient>
                            </defs>
                          </svg>
                        )}
                        {selected === "Mintable" && (
                          <svg
                            width="207"
                            height="206"
                            viewBox="0 0 207 206"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <path
                              d="M103.096 205.506C24.7718 204.331 -24.226 122.896 12.3315 54.4752C30.5157 20.4418 59.9874 1.72042 98.6112 0.111635C138.032 -1.53034 169.418 14.9571 190.276 48.4915C211.029 81.8576 212.024 117.241 193.294 151.676C174.254 186.681 143.496 204.233 103.096 205.506Z"
                              fill="#050404"
                            />
                            <path
                              d="M70.9511 54.7853C80.8968 69.2041 90.7353 83.2614 100.334 97.4805C102.627 100.878 103.749 100.951 106.072 97.4929C116.936 81.315 128.082 65.3255 138.983 49.1715C140.662 46.6838 142.42 45.6405 145.45 45.7712C151.271 46.0225 157.114 45.945 162.942 45.7966C165.582 45.7294 166.857 46.277 166.842 49.3171C166.738 71.1448 166.74 92.9734 166.843 114.801C166.857 117.78 165.696 118.42 163.001 118.382C153.838 118.254 144.671 118.436 135.509 118.271C132.693 118.221 130.906 119.14 129.288 121.42C124.857 127.668 120.12 133.699 115.677 139.938C114.083 142.176 112.246 142.817 109.539 143.249C97.7242 145.138 89.1183 141.438 83.5709 130.497C81.6717 126.752 78.5186 123.642 75.9102 120.204C74.0029 121.573 74.7378 123.205 74.7278 124.551C74.6516 134.882 74.5824 145.214 74.7358 155.543C74.7813 158.609 73.7971 159.574 70.7398 159.517C61.5785 159.345 52.4094 159.326 43.249 159.52C40.0898 159.586 39.3317 158.479 39.339 155.497C39.4255 120.339 39.4345 85.1803 39.3333 50.0223C39.324 46.7752 40.1954 45.5367 43.5424 45.7842C47.1882 46.0538 50.939 46.2985 54.5209 45.7501C62.3039 44.5584 67.6143 47.3503 70.9511 54.7853Z"
                              fill="#FAFAFA"
                            />
                            <path
                              d="M154.073 159.582C149.254 159.577 144.928 159.487 140.607 159.596C137.766 159.668 136.221 158.748 136.252 155.644C136.33 147.994 136.319 140.342 136.259 132.692C136.238 129.941 137.454 128.795 140.174 128.815C147.824 128.872 155.475 128.873 163.125 128.807C165.92 128.784 166.967 130.092 166.947 132.77C166.892 140.254 166.854 147.74 166.974 155.223C167.026 158.427 165.778 159.799 162.549 159.612C159.897 159.459 157.229 159.581 154.073 159.582Z"
                              fill="#EA0D1A"
                            />
                          </svg>
                        )}
                        {selected === "Niftygateway" && (
                          <img
                            src="/images/partners/kyhclu5quebqm4sit0he.png"
                            alt=""
                            className=""
                            style={{ maxWidth: "160px", maxHeight: "35px" }}
                          />
                        )}
                        {selected === "Coinbase" && (
                          <svg
                            width="800"
                            height="800"
                            viewBox="0 0 800 800"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <g clip-path="url(#clip0_21_30)">
                              <path
                                d="M400 800C620.914 800 800 620.914 800 400C800 179.086 620.914 0 400 0C179.086 0 0 179.086 0 400C0 620.914 179.086 800 400 800Z"
                                fill="#0052FF"
                              />
                              <path
                                d="M403.359 282.68C450.453 282.68 487.812 311.727 502 354.922H596.875C579.688 262.57 503.492 200 404.117 200C291.266 200 203.125 285.664 203.125 400.383C203.125 515.102 289.063 600 404.117 600C501.266 600 578.977 537.43 596.18 444.312H501.992C488.539 487.516 451.211 517.32 404.086 517.32C339.062 517.32 293.492 467.406 293.492 400.383C293.523 332.594 338.359 282.68 403.359 282.68Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_21_30">
                                <rect width="800" height="800" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                        {selected === "Nbatopshot" && (
                          <img
                            src="/images/topShotDebut.svg"
                            className=""
                            alt=""
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          />
                        )}
                        {selected === "Opensea" && (
                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <g clip-path="url(#clip0_3_2)">
                              <path
                                d="M100 50C100 77.6127 77.6127 100 50 100C22.3873 100 0 77.6127 0 50C0 22.3873 22.3873 0 50 0C77.6185 0 100 22.3873 100 50Z"
                                fill="#2081E2"
                              />
                              <path
                                d="M24.6679 51.6801L24.8836 51.341L37.8906 30.9932C38.0807 30.6953 38.5276 30.7261 38.6714 31.0497C40.8444 35.9196 42.7194 41.9762 41.841 45.7468C41.466 47.2982 40.4386 49.3992 39.2827 51.341C39.1338 51.6236 38.9694 51.901 38.7947 52.1681C38.7125 52.2914 38.5738 52.3633 38.4248 52.3633H25.048C24.6884 52.3633 24.4778 51.9729 24.6679 51.6801Z"
                                fill="white"
                              />
                              <path
                                d="M82.6444 55.461V58.6819C82.6444 58.8668 82.5314 59.0312 82.367 59.1031C81.3602 59.5346 77.9132 61.1168 76.48 63.11C72.8224 68.2008 70.0279 75.48 63.7812 75.48H37.721C28.4847 75.48 21 67.9697 21 58.7024V58.4045C21 58.1579 21.2003 57.9576 21.4469 57.9576H35.9745C36.2621 57.9576 36.4727 58.2247 36.4471 58.5072C36.3443 59.4524 36.519 60.4182 36.9659 61.2966C37.8289 63.0484 39.6166 64.1426 41.5481 64.1426H48.74V58.5278H41.6303C41.2656 58.5278 41.0499 58.1065 41.2605 57.8086C41.3375 57.6904 41.4249 57.5672 41.5173 57.4285C42.1903 56.473 43.1509 54.9884 44.1064 53.2983C44.7588 52.1579 45.3906 50.9404 45.8992 49.7178C46.002 49.4969 46.0841 49.2708 46.1663 49.0499C46.305 48.6595 46.4489 48.2948 46.5516 47.9301C46.6544 47.6218 46.7365 47.2982 46.8187 46.9951C47.0602 45.9574 47.1629 44.8581 47.1629 43.7177C47.1629 43.2708 47.1424 42.8033 47.1013 42.3564C47.0807 41.8684 47.0191 41.3803 46.9574 40.8923C46.9163 40.4608 46.8393 40.0344 46.7571 39.5875C46.6544 38.9351 46.5105 38.2879 46.3461 37.6354L46.2896 37.3889C46.1663 36.9419 46.0636 36.5156 45.9198 36.0687C45.5139 34.6662 45.0465 33.2998 44.5533 32.0207C44.3735 31.5121 44.168 31.0241 43.9625 30.5361C43.6595 29.8015 43.3512 29.1337 43.0687 28.5018C42.9249 28.2141 42.8016 27.9521 42.6783 27.685C42.5396 27.3819 42.3958 27.0788 42.2519 26.7912C42.1492 26.5703 42.031 26.3648 41.9488 26.1593L41.0704 24.536C40.9471 24.3151 41.1526 24.0531 41.394 24.1199L46.8907 25.6096H46.9061C46.9163 25.6096 46.9215 25.6148 46.9266 25.6148L47.6509 25.8151L48.4472 26.0412L48.74 26.1233V22.8562C48.74 21.2791 50.0037 20 51.5654 20C52.3462 20 53.0551 20.3185 53.5637 20.8373C54.0722 21.3562 54.3907 22.0651 54.3907 22.8562V27.7056L54.9764 27.8699C55.0226 27.8854 55.0688 27.9059 55.1099 27.9367C55.2538 28.0446 55.4592 28.2038 55.7212 28.3991C55.9267 28.5634 56.1476 28.7638 56.4147 28.9693C56.9438 29.3956 57.5757 29.9453 58.2692 30.5772C58.4541 30.7364 58.6339 30.9008 58.7983 31.0652C59.6922 31.8974 60.6939 32.8734 61.6494 33.9522C61.9165 34.2553 62.1785 34.5635 62.4456 34.8871C62.7127 35.2159 62.9953 35.5395 63.2418 35.8632C63.5655 36.2947 63.9148 36.7416 64.2179 37.2091C64.3617 37.43 64.5261 37.656 64.6648 37.8769C65.0552 38.4676 65.3994 39.079 65.7282 39.6903C65.8669 39.9728 66.0107 40.281 66.134 40.5841C66.4987 41.4009 66.7864 42.2331 66.9713 43.0653C67.0278 43.2451 67.0689 43.4403 67.0895 43.615V43.6561C67.1511 43.9026 67.1717 44.1646 67.1922 44.4317C67.2744 45.2845 67.2333 46.1372 67.0484 46.9951C66.9713 47.3599 66.8686 47.704 66.7453 48.0688C66.622 48.4181 66.4987 48.7828 66.3395 49.127C66.0313 49.841 65.6665 50.5551 65.235 51.2229C65.0963 51.4695 64.9319 51.7315 64.7675 51.9781C64.5877 52.24 64.4028 52.4866 64.2384 52.7281C64.0124 53.0363 63.771 53.3599 63.5244 53.6476C63.3035 53.9507 63.0775 54.2538 62.8309 54.5209C62.4867 54.9267 62.1579 55.312 61.8137 55.6819C61.6083 55.9233 61.3874 56.1699 61.1613 56.3908C60.9405 56.6373 60.7144 56.8582 60.5089 57.0637C60.1648 57.4079 59.8771 57.675 59.6356 57.8959L59.0706 58.4148C58.9884 58.4867 58.8805 58.5278 58.7675 58.5278H54.3907V64.1426H59.8976C61.1305 64.1426 62.3018 63.7059 63.247 62.9045C63.5706 62.622 64.9833 61.3994 66.6528 59.5552C66.7093 59.4935 66.7813 59.4473 66.8635 59.4268L82.0742 55.0295C82.3568 54.9473 82.6444 55.163 82.6444 55.461Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3_2">
                                <rect width="100" height="100" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                        {selected === "Rarible" && (
                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <path
                              d="M0.208496 84.1667C0.208497 61.5928 0.208497 39.0189 0.270098 16.4171C0.63903 15.6649 0.980478 14.9529 1.24779 14.214C2.40963 11.0027 4.27723 8.21702 6.742 5.91923C9.55918 3.2929 12.8962 1.48124 16.6961 0.610869C16.848 0.576075 16.9554 0.346953 17.0835 0.208374C39.1018 0.208374 61.1202 0.208374 83.1661 0.272481C83.3625 0.432337 83.5215 0.556025 83.7017 0.619387C85.0571 1.09599 86.4587 1.46614 87.7663 2.04843C90.6719 3.34241 93.2064 5.15302 95.2595 7.63292C97.0622 9.81035 98.4964 12.1682 99.3923 14.8576C99.5586 15.357 99.9311 15.7877 100.208 16.25C100.208 38.8239 100.208 61.3979 100.147 83.9997C99.7781 84.7583 99.4403 85.4781 99.1669 86.2216C97.9845 89.4368 96.1212 92.2423 93.6325 94.5367C90.7926 97.1551 87.455 98.9928 83.62 99.8102C83.5016 99.8354 83.428 100.071 83.3335 100.208C61.3151 100.208 39.2968 100.208 17.2509 100.144C17.0545 99.9844 16.8956 99.8607 16.7154 99.7973C15.3591 99.3201 13.9572 98.9481 12.6479 98.3668C9.74071 97.0759 7.20934 95.2619 5.15717 92.7828C3.35502 90.6058 1.91758 88.2497 1.02462 85.5588C0.858912 85.0595 0.485855 84.629 0.208496 84.1667ZM45.9376 55.9904C47.4303 55.9904 48.9229 55.9868 50.4156 55.9912C53.0188 55.9988 55.6239 55.9545 58.2247 56.039C60.5212 56.1136 61.6567 57.3451 61.6828 59.5974C61.6989 60.9857 61.6865 62.3744 61.6866 63.7629C61.6868 65.2092 61.6867 66.6554 61.6867 68.1044C66.5518 68.1044 71.2851 68.1044 76.0762 68.1044C76.0762 65.3635 76.0149 62.6934 76.0897 60.0271C76.2214 55.3331 74.4531 51.875 69.8985 50.142C69.9285 50.0934 69.938 50.0557 69.9601 50.0457C70.2742 49.9036 70.5889 49.7626 70.9057 49.6265C73.0419 48.7082 74.4806 47.1497 75.1525 44.9213C76.755 39.6056 74.2846 34.9455 68.9893 33.2788C66.2077 32.4033 63.3361 32.2405 60.4469 32.2402C49.3736 32.2389 38.3003 32.2391 27.227 32.2416C26.862 32.2417 26.4971 32.2722 26.1311 32.2886C26.1311 44.295 26.1311 56.186 26.1311 68.1138C30.921 68.1138 35.6544 68.1138 40.5113 68.1138C40.5113 64.0509 40.5113 60.0502 40.5113 55.9904C42.3326 55.9904 44.031 55.9904 45.9376 55.9904Z"
                              fill="#FEDA03"
                            />
                            <path
                              d="M45.8332 55.9904C44.0307 55.9904 42.3324 55.9904 40.511 55.9904C40.511 60.0502 40.511 64.0509 40.511 68.1138C35.6542 68.1138 30.9208 68.1138 26.1309 68.1138C26.1309 56.186 26.1309 44.295 26.1309 32.2886C26.4968 32.2722 26.8618 32.2416 27.2267 32.2416C38.3 32.2391 49.3733 32.2389 60.4466 32.2401C63.3358 32.2405 66.2075 32.4033 68.989 33.2788C74.2843 34.9454 76.7548 39.6056 75.1522 44.9212C74.4804 47.1497 73.0417 48.7081 70.9054 49.6265C70.5887 49.7626 70.274 49.9036 69.9598 50.0457C69.9377 50.0556 69.9282 50.0934 69.8982 50.1419C74.4529 51.875 76.2212 55.3331 76.0895 60.0271C76.0146 62.6933 76.0759 65.3635 76.0759 68.1043C71.2849 68.1043 66.5515 68.1043 61.6864 68.1043C61.6864 66.6554 61.6865 65.2091 61.6864 63.7629C61.6862 62.3744 61.6987 60.9857 61.6826 59.5974C61.6565 57.345 60.521 56.1135 58.2244 56.039C55.6236 55.9545 53.0185 55.9988 50.4153 55.9911C48.9227 55.9868 47.43 55.9904 45.8332 55.9904ZM48.6457 47.1739C52.3567 47.1736 56.0678 47.1888 59.7787 47.1662C61.5818 47.1552 62.7257 45.8115 62.366 44.2067C62.0923 42.9856 61.1732 42.2832 59.77 42.2814C53.5619 42.2733 47.3537 42.277 41.1455 42.2801C40.9485 42.2802 40.7514 42.3197 40.5161 42.345C40.5161 43.9518 40.5161 45.4961 40.5161 47.1739C43.1892 47.1739 45.8133 47.1739 48.6457 47.1739Z"
                              fill="#020100"
                            />
                            <path
                              d="M48.5415 47.1739C45.8133 47.1739 43.1892 47.1739 40.5161 47.1739C40.5161 45.4961 40.5161 43.9518 40.5161 42.345C40.7515 42.3197 40.9485 42.2801 41.1455 42.28C47.3537 42.277 53.5619 42.2733 59.77 42.2813C61.1733 42.2832 62.0923 42.9856 62.366 44.2066C62.7258 45.8114 61.5818 47.1552 59.7788 47.1662C56.0679 47.1888 52.3567 47.1735 48.5415 47.1739Z"
                              fill="#FCD803"
                            />
                          </svg>
                        )}
                        {selected === "Superrare" && (
                          <svg
                            width="376"
                            height="376"
                            viewBox="0 0 376 376"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <circle cx="188" cy="188" r="188" fill="white" />
                            <path
                              d="M186.492 259.283C182.93 259.283 179.855 259.283 176.78 259.283C188.868 251.692 191.278 240.534 191.093 227.586C190.696 199.938 190.827 172.279 191.04 144.626C191.129 132.963 187.037 123.918 176.728 117.973C177.689 116.375 179.165 117.131 180.323 117.128C202.813 117.075 225.303 117.092 247.793 117.087C258.042 117.085 267.606 119.526 276.131 125.337C285.159 131.49 290.606 139.946 291.606 150.942C292.98 166.039 286.554 177.065 272.695 183.392C269.096 185.035 265.281 186.205 260.919 187.834C277.688 211.357 289.437 238.068 310.561 259.161C307.164 259.161 303.824 259.161 300.485 259.161C291.322 259.161 282.156 259.022 272.999 259.239C269.93 259.312 268.232 258.335 266.722 255.674C256.043 236.858 244.439 218.575 234.353 199.414C232.501 195.896 230.716 192.213 227.258 189.91C225.085 188.463 222.987 187.455 223.017 191.789C223.119 206.448 222.879 221.112 223.142 235.767C223.324 245.9 228.463 253.36 237.052 259.283C220.361 259.283 203.67 259.283 186.492 259.283Z"
                              fill="#040404"
                            />
                            <path
                              d="M136.433 128.22C126.751 119.91 116.119 116.2 103.763 119.303C95.7049 121.327 89.6331 125.934 86.6508 133.942C82.6483 144.689 85.578 153.716 95.233 159.98C103.682 165.462 113.202 168.642 122.551 172.142C129.722 174.828 136.964 177.323 143.823 180.78C164.96 191.433 172.948 206.484 168.688 227.696C164.809 247.01 149.276 259.568 127.374 261.189C118.807 261.823 110.42 260.567 102.052 259.037C91.0228 257.02 80.0184 255.424 68.945 260.599C68.945 242.078 68.945 224.09 68.945 206.101C69.1786 206.018 69.4122 205.936 69.6459 205.853C70.8895 208.457 72.1407 211.057 73.3756 213.665C78.3852 224.245 84.0778 234.404 92.2042 242.959C102.802 254.115 115.412 260.231 131.158 257.463C141.552 255.636 147.802 249.334 149.878 239.233C151.902 229.38 148.909 222.494 139.563 216.412C128.844 209.435 116.661 205.764 104.764 201.488C97.6952 198.948 90.915 195.878 84.3749 192.14C58.2877 177.233 61.9018 138.287 83.1467 124.378C92.6435 118.161 102.975 115.094 114.253 115.004C121.935 114.942 129.554 115.693 137.154 116.766C143.92 117.721 150.708 118.646 157.543 117.452C159.49 117.112 160.641 117.262 160.761 119.704C161.485 134.41 162.321 149.111 162.702 163.998C155.012 151.353 147.841 138.441 136.433 128.22Z"
                              fill="#060606"
                            />
                            <path
                              d="M223.045 158.269C223.046 146.454 223.169 135.138 222.967 123.827C222.91 120.672 223.854 119.952 226.879 119.998C239.375 120.191 250.99 128.575 256.071 141.471C259.266 149.582 259.931 157.96 258.216 166.481C255.52 179.876 246.549 186.674 231.989 186.511C223.045 186.412 223.045 186.412 223.045 177.737C223.045 171.414 223.045 165.092 223.045 158.269Z"
                              fill="#FDFDFD"
                            />
                          </svg>
                        )}
                        {selected === "Binance" && (
                          <svg
                            width="100"
                            height="100"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <path
                              d="M56 100.333C52.3264 100.333 48.6528 100.333 44.7492 100.216C38.6916 99.6752 33.2284 97.8613 28.0659 95.295C21.6487 92.105 16.1448 87.6824 11.565 82.1024C6.79344 76.2887 3.48254 69.7749 1.66982 62.4971C1.13589 60.3535 0.77407 58.167 0.333374 56.0002C0.333374 52.3265 0.333374 48.6529 0.450467 44.7495C1.01098 38.6508 2.82107 33.1542 5.41438 27.9401C8.58804 21.5593 13.0235 16.1445 18.5419 11.5954C24.3533 6.80482 30.8925 3.50447 38.1744 1.67037C40.3149 1.13122 42.5013 0.774062 44.6667 0.333496C48.3403 0.333496 52.014 0.333496 55.9175 0.450566C62.1419 1.01771 67.7504 2.90266 73.0409 5.58947C79.2816 8.75884 84.6297 13.1238 89.1039 18.5684C93.8783 24.3782 97.1847 30.8942 98.9971 38.1708C99.5309 40.3142 99.8927 42.5003 100.333 44.6668C100.333 48.3405 100.333 52.0141 100.216 55.9176C99.6629 61.9028 97.9077 67.3008 95.3905 72.4314C92.2009 78.9327 87.7362 84.4573 82.1226 89.072C76.3082 93.8517 69.773 97.1596 62.4938 98.9965C60.3531 99.5367 58.1659 99.8929 56 100.333ZM38.0881 29.2548C35.3813 31.9562 32.6746 34.6576 29.9941 37.3327C32.5864 39.8573 35.079 42.2847 37.8895 45.0217C42.0009 40.8687 46.2345 36.5923 50.6972 32.0846C54.9231 36.2989 59.1461 40.5103 63.3109 44.6636C65.7016 42.3316 68.1619 39.9317 70.4712 37.6791C63.6369 30.8944 56.8464 24.1531 49.9507 17.3074C46.1552 21.1303 42.205 25.1092 38.0881 29.2548ZM66.3465 58.8197C65.3994 57.737 64.4522 56.6542 63.3433 55.3865C58.8067 59.9374 54.59 64.1674 50.1935 68.5777C45.962 64.244 41.7872 59.9683 37.7322 55.8154C35.0845 58.464 32.6323 60.917 30.3817 63.1683C37.0056 69.8164 43.7321 76.5673 50.3266 83.1858C57.0165 76.5571 63.7885 69.8472 70.6475 63.051C69.2828 61.7093 67.898 60.348 66.3465 58.8197ZM30.4835 51.9824C31.1387 51.5736 31.794 51.1648 32.074 50.9902C29.1662 48.0844 26.7139 45.6338 24.4092 43.3306C22.1543 45.5852 19.7313 48.008 17.4294 50.3096C19.783 52.671 22.2325 55.1286 24.8003 57.7049C26.5731 55.9195 28.4447 54.0345 30.4835 51.9824ZM78.5791 55.4148C80.2684 53.7547 81.9577 52.0947 83.5543 50.5258C80.9445 47.903 78.5227 45.469 76.3016 43.2369C73.8696 45.6626 71.3812 48.1447 69.0651 50.4548C71.3441 52.7355 73.7696 55.1629 76.5158 57.9112C77.0886 57.2076 77.7503 56.3948 78.5791 55.4148ZM48.4894 56.0157C49.0989 56.6213 49.7084 57.2269 50.1554 57.6711C52.7522 55.0767 55.1749 52.6563 57.4944 50.3389C55.1388 47.9827 52.6918 45.535 50.0658 42.9083C48.9824 44.0439 47.8182 45.2968 46.6175 46.5137C45.3819 47.7658 44.1108 48.9829 42.7007 50.3671C44.682 52.2994 46.502 54.0743 48.4894 56.0157Z"
                              fill="#F0B90C"
                            />
                            <path
                              d="M38.1714 29.1712C42.2049 25.1089 46.1552 21.1301 49.9506 17.3071C56.8463 24.1528 63.6369 30.8941 70.4712 37.6789C68.1619 39.9314 65.7015 42.3313 63.3108 44.6633C59.146 40.51 54.923 36.2986 50.6971 32.0843C46.2345 36.5921 42.0009 40.8684 37.8894 45.0214C35.0789 42.2845 32.5863 39.857 29.994 37.3325C32.6745 34.6573 35.3813 31.9559 38.1714 29.1712Z"
                              fill="#FFFFFE"
                            />
                            <path
                              d="M66.4298 58.9029C67.8979 60.3477 69.2827 61.709 70.6474 63.0507C63.7884 69.8469 57.0164 76.5568 50.3265 83.1855C43.732 76.567 37.0056 69.8161 30.3816 63.168C32.6322 60.9167 35.0844 58.4637 37.7321 55.8151C41.7871 59.968 45.9619 64.2437 50.1935 68.5774C54.5899 64.1671 58.8066 59.9371 63.3432 55.3862C64.4521 56.6539 65.3993 57.7367 66.4298 58.9029Z"
                              fill="#FFFFFE"
                            />
                            <path
                              d="M30.3998 52.0659C28.4446 54.0344 26.573 55.9194 24.8002 57.7048C22.2324 55.1285 19.7829 52.6709 17.4293 50.3095C19.7312 48.0079 22.1543 45.5851 24.4091 43.3306C26.7139 45.6338 29.1661 48.0843 32.0739 50.9901C31.7939 51.1648 31.1387 51.5736 30.3998 52.0659Z"
                              fill="#FFFEFC"
                            />
                            <path
                              d="M78.4954 55.4983C77.7502 56.3947 77.0885 57.2075 76.5158 57.9111C73.7695 55.1628 71.344 52.7354 69.0651 50.4548C71.3811 48.1447 73.8696 45.6625 76.3015 43.2368C78.5226 45.469 80.9444 47.9029 83.5542 50.5257C81.9576 52.0946 80.2683 53.7547 78.4954 55.4983Z"
                              fill="#FFFEFC"
                            />
                            <path
                              d="M48.4057 55.9323C46.502 54.0742 44.682 52.2992 42.7007 50.367C44.1108 48.9828 45.3819 47.7657 46.6174 46.5135C47.8181 45.2967 48.9824 44.0438 50.0658 42.9082C52.6918 45.5349 55.1388 47.9826 57.4944 50.3388C55.1749 52.6562 52.7522 55.0766 50.1554 57.671C49.7084 57.2268 49.0989 56.6212 48.4057 55.9323Z"
                              fill="#FFFFFE"
                            />
                          </svg>
                        )}
                        {selected === "Kraken" && (
                          <svg
                            width="551"
                            height="560"
                            viewBox="0 0 551 560"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <ellipse
                              cx="275.5"
                              cy="280"
                              rx="275.5"
                              ry="280"
                              fill="#5741D9"
                            />
                            <path
                              d="M361.291 304.305C356.13 310.454 353.656 317.662 353.656 325.97C353.654 354.675 353.626 383.38 353.673 412.086C353.687 420.423 351.317 427.68 346.265 433.709C342.285 438.458 337.334 441.418 331.585 442.378C322.616 443.875 314.856 440.893 308.58 433.563C304.496 428.792 301.931 423.066 301.464 416.29C301.195 412.394 301.125 408.512 301.455 404.621C301.511 403.965 301.486 403.299 301.486 402.638C301.488 376.512 301.572 350.386 301.449 324.261C301.394 312.619 296.78 303.554 287.748 297.901C279.036 292.449 270.128 293.053 261.654 298.804C253.495 304.342 249.552 312.92 249.491 323.466C249.332 351.112 249.419 378.76 249.46 406.407C249.465 409.977 249.656 413.551 249.162 417.089C248.333 423.036 246.249 428.348 242.647 432.848C238.119 438.506 232.445 441.608 225.763 442.351C210.801 444.014 198.877 431.564 197.382 417.023C197.145 414.72 197.029 412.42 197.03 410.105C197.035 381.334 197.037 352.562 197.031 323.791C197.028 309.79 188.525 297.64 176.428 294.735C168.117 292.739 160.613 295.107 154.104 301.218C147.668 307.26 145.024 315.301 144.996 324.539C144.947 340.545 144.982 356.552 144.981 372.558C144.981 386.183 145.068 399.809 144.958 413.433C144.836 428.531 135.284 440.839 121.893 442.58C108.901 444.269 95.9933 434.814 93.4596 418.138C93.1742 416.26 93.0646 414.326 93.0631 412.418C93.0391 382.39 92.9194 352.361 93.0902 322.334C93.2074 301.74 95.976 281.549 101.45 261.861C104.95 249.273 109.417 237.142 114.953 225.525C121.807 211.143 130.016 197.817 139.696 185.668C151.27 171.14 164.338 158.552 178.775 147.793C190.118 139.339 202.278 132.707 215.079 127.551C225.534 123.341 236.253 120.31 247.211 118.365C252.182 117.483 257.187 116.916 262.213 116.525C266.598 116.184 270.989 115.98 275.375 116.002C293.824 116.09 311.872 119.184 329.489 125.43C339.913 129.125 349.973 133.811 359.635 139.549C373.173 147.589 385.67 157.334 397.045 168.905C408.9 180.964 419.274 194.453 428.015 209.521C440.369 230.817 449.027 253.876 453.812 278.768C455.589 288.011 456.848 297.334 457.434 306.776C457.762 312.049 458.002 317.318 458 322.606C457.987 352.303 458.002 382 457.99 411.698C457.985 424.269 453.05 433.733 443.34 439.704C436.848 443.696 429.815 443.983 422.919 440.992C412.594 436.513 407.041 427.738 405.736 415.438C405.653 414.655 405.708 413.852 405.707 413.059C405.707 383.824 405.715 354.59 405.699 325.355C405.696 319.706 404.657 314.355 401.968 309.476C393.578 294.251 375.018 290.977 362.956 302.628C362.423 303.143 361.905 303.679 361.291 304.305Z"
                              fill="white"
                            />
                          </svg>
                        )}
                        {selected === "Zora" && (
                          <svg
                            width="157"
                            height="159"
                            viewBox="0 0 157 159"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              maxWidth: "160px",
                              maxHeight: "35px",
                              width: "35px",
                            }}
                          >
                            <ellipse
                              cx="78.5"
                              cy="79.5"
                              rx="78.5"
                              ry="79.5"
                              fill="black"
                            />
                            <path
                              d="M98.8155 92.8381C104.513 97.1482 106.732 102.39 104.677 109.371C87.0572 109.371 69.1539 109.371 51 109.371C51 106.199 51 103.116 51 99.6034C63.2084 99.6034 75.4396 99.6034 88.5909 99.6034C87.4823 98.0902 86.9803 97.1977 86.2882 96.4916C76.4953 86.4993 66.9724 76.2143 56.7369 66.696C51.7522 62.0605 50.8501 57.1929 52.061 51C69.3604 51 86.6031 51 104.08 51C104.08 54.3088 104.08 57.4195 104.08 61.1462C92.3859 61.1462 80.7136 61.1462 67.6836 61.1462C78.6312 72.2873 88.6007 82.433 98.8155 92.8381Z"
                              fill="#F7F7F7"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </form>
                  {isErrorLink && (
                    <p className="text-red">
                      Choose a Marketplace where your ad is hosted.
                    </p>
                  )}
                </div>
                {isError && (
                  <p className="text-red">
                    This Link is incompatible with your marketplace selection
                  </p>
                )}
              </div>
              {/* <!-- Blockchain --> */}
              <div className="mb-6">
                <label
                  htmlFor="item-supply"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Token
                </label>

                {/* dropdown */}
                <div className="dropdown relative mb-4 cursor-pointer ">
                  <form className="flex">
                    <select
                      className="select-padding border-select font_select dark:bg-jacarta-700 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 py-3 px-3 hover:ring-2 dark:text-white"
                      value={selectedRede}
                      onChange={(e) => setSelectedRede(e.target.value)}
                    >
                      {optionss.map((value) => (
                        <option
                          className="option_drop dark:text-white"
                          value={value}
                          key={value}
                        >
                          {value}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      id="item-name"
                      className="border-select-camp dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                      placeholder="price"
                      required
                      value={price}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const formattedValue = formatNumber(inputValue);
                        setPrice(formattedValue);
                      }}
                    />
                  </form>
                  {isErroPrice && (
                    <p className="text-red">Please add a price to your ad.</p>
                  )}
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isTermsResponsability}
                    onChange={(event) =>
                      setIsTermsResponsability(event.target.checked)
                    }
                    id="terms"
                    className="cursor-pointer checked:bg-accent dark:bg-jacarta-600 hover:bg-jacarta-700 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                  />
                  <label
                    htmlFor="terms"
                    className="font-pop dark:text-jacarta-200 text-sm text-none"
                  >
                    By checking this box, I agree that this ad refers to an NFT
                    that is in my possession, subject to permanent removal from
                    the platform.
                  </label>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isTermsAccepted}
                    onChange={(event) =>
                      setIsTermsAccepted(event.target.checked)
                    }
                    id="terms"
                    className="cursor-pointer checked:bg-accent dark:bg-jacarta-600 hover:bg-jacarta-700 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                  />
                  <label
                    htmlFor="terms"
                    className="font-pop dark:text-jacarta-200 text-sm text-none"
                  >
                    By checking this box, I agree to {"Socialverse's"}{" "}
                    <a href="#" className="text-accent">
                      Terms of Service
                    </a>
                  </label>
                </div>
              </div>
              {/* <!-- Freeze metadata --> */}
              {/* <!-- Submit --> */}
              <button
                onClick={Post}
                className={`dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button text-center font-semibold text-white upl_btn dark:bg-jacarta-700 rounded-button py-3 px-8 text-center font-semibold text-white transition-all ${
                  !isTermsAccepted || !isTermsResponsability
                    ? "disabled:opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!isTermsAccepted || !isTermsResponsability}
              >
                {preleorder ? (
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
        </section>
        {/* <!-- end create --> */}
      </div>
      <Footer />
    </>
  );
};

export default Create;
