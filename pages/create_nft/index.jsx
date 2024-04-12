import React, { useState, useEffect, useRef } from "react";
import "tippy.js/dist/tippy.css"; // optional
import Meta from "../../components/Meta";
import Footer from "../../components/footer";
import MoralisIPFS from "../../components/ipfsGenerete/moralisIPFS";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Web3 from "web3";
import { base64IPFS } from "../../components/ipfsGenerete/base64";
import MoralisIPFSMetadata from "../../components/ipfsGenerete/moralisIPFSMetadata";
const web3 = new Web3(Web3.givenProvider);

const Create_NFT = () => {
  const { user, Moralis } = useMoralis();
  const walletAddress = user?.attributes?.ethAddress;
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preleorder, setPreleorder] = useState(false);

  const router = useRouter();
  const [isError, setIserror] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [nameNftError, setNameNftError] = useState("");
  const [descriptionNftError, setDescriptionNftError] = useState("");

  const [base64Image, setBase64Image] = useState(null);
  
  const changeHandler = async (event) => {
    const img = event.target.files[0];
    if (img) {
      setSelectedFile(URL.createObjectURL(img));
      const file1 = await base64IPFS(img);
      const file1url = await MoralisIPFS(img.type, file1);
      setBase64Image(file1url);
    }
  };

  console.log("image", base64Image);

  
  const [quantitys, setQuantity] = useState("");

  async function nftQuantity() {
    const query = new Moralis.Query(`NFTs`);
    const likes = await query.find();
    const res = likes.length;
    return res;
  }

  const { data: quantity } = useQuery(`NftsQuantity`, nftQuantity, {
    staleTime: 1000 * 1,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (quantity) {
      setQuantity(quantity.toString());
    }
  }, [quantity]);

  const onSubmit = async () => {

    setPreleorder(true);
    if (!name) {
      setNameNftError("The Name field is mandatory.");
      setPreleorder(false);
      return;
    }

    if (!description) {
      setDescriptionNftError("The Description field is mandatory.");
      setPreleorder(false);
      return;
    }
    if (!base64Image){
      setPreleorder(false);
    }
    if (base64Image && user.attributes.ethAddress && quantity) {
      try {
        const abi = [
          {
            path: "metadata.json",
            content: {
              name: name,
              description: description,
              image: base64Image,
            },
          },
        ];

        const metadataurl = await MoralisIPFSMetadata(abi);

        const NFTs = Moralis.Object.extend("NFTs");
        const newNFTs = new NFTs();
        newNFTs.set("minter_address", user.attributes.ethAddress);
        newNFTs.set("collection", "BlackBuzz");
        newNFTs.set("symbol", "USDT");
        newNFTs.set(
          "token_address",
          "0xf17e7382f937cd1204a674b87e2aa358cd027bf2"
        );
        newNFTs.set("token_id", quantitys);
        newNFTs.set("owner", user.attributes.ethAddress);
        if (metadataurl) {
          newNFTs.set("token_uri", metadataurl);
        }
        newNFTs.set("buy", false);
        await newNFTs.save();
        setPreleorder(false);

        if (router) {
          const currentPath = router.pathname;
          const newRoute = currentPath === "/myprofile" ? currentPath : "/myprofile";
        
          setTimeout(() => {
            router.replace({
              pathname: newRoute,
              query: { ...router.query, defaultIndex: 3 },
            }, undefined, { shallow: true });
          }, 1500);
        }
        
      } catch (err) {
        setPreleorder(false);
        console.log(err);
        alert("Verifique faça login novamente!");
      }
    }
  };


  const onImageClick = () => {
    inputFile.current.click();
  };

  const imageReset = () => {
    setFile("");
    setSelectedFile("");
  };

  return (
    <>
      <div>
        <Meta title="Create NFT" />
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
              Create your NFT
            </h1>

            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- File Upload --> */}
              <div className="mb-6 flex items-center image_place">
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Image or Video
                  <span className="text-red">*</span>
                </label>

                {file?.name ? (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    successfully uploaded : {file?.name}
                  </p>
                ) : (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    Drag or choose your file to upload
                  </p>
                )}

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
                      src={selectedFile}
                      onClick={onImageClick}
                    ></img>
                  </div>
                </div>
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
                <p className="text-red">{nameNftError}</p>
              </div>
              {/* <!-- External Link --> */}

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
                <p className="text-red">{descriptionNftError}</p>
              </div>

              {/* <!-- Blockchain --> */}
              <div className="mb-6">
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
                    By checking this box, I agree to {"BlackBuzz's"}{" "}
                    <a href="#" className="text-accent">
                      Terms of Service
                    </a>
                  </label>
                </div>
              </div>
              <button
                onClick={onSubmit}
                className={`dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button text-center font-semibold text-white upl_btn dark:bg-jacarta-700 rounded-button py-3 px-8 text-center font-semibold text-white transition-all ${
                  !isTermsAccepted
                    ? "disabled:opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!isTermsAccepted}
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

export default Create_NFT;
