import React, { useState, useEffect, useRef } from "react";
// import Web3 from "web3";
// const web3 = new Web3(Web3.givenProvider);
import MoralisIPFSMetadata from "../../ipfsGenerete/moralisIPFSMetadata";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import NFT_true from "../../modal/nft_sucefuly";
import { useRouter } from "next/router";

function ModalNft({ nft, keyModal, showElementNFT }) {
  
  const ref = useRef();
  const router = useRouter();

  const { Moralis, user } = useMoralis();
  const [showCrop, setShowCrop] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [nameNft, setNameNft] = useState("");
  const [descriptionNft, setDescriptionNft] = useState("");
  const [quantitys, setQuantity] = useState(0);
  const [nameNftError, setNameNftError] = useState("");
  const [descriptionNftError, setDescriptionNftError] = useState("");

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

  const onSubmit = async (nft) => {
      if (!nameNft) {
      setNameNftError("The Name field is mandatory.");
      setIsLoading(false);
      return;
    }

    if (!descriptionNft) {
      setDescriptionNftError("The Description field is mandatory.");
      setIsLoading(false);
      return;
    }
    if (nft.image && user.attributes.ethAddress) {
      try {
        const abi = [
          {
            path: "metadata.json",
            content: {
              name: nameNft,
              description: descriptionNft,
              image: nft.image,
            },
          },
        ];

        const metadataurl = await MoralisIPFSMetadata(abi);

        const NFTs = Moralis.Object.extend("NFTs");
        const newNFTs = new NFTs();
        newNFTs.set("minter_address", user.attributes.ethAddress);
        newNFTs.set("collection", "BlackBuzz");
        newNFTs.set("symbol", "Tap");
        newNFTs.set(
          "token_address",
          "0xf17e7382f937cd1204a674b87e2aa358cd027bf2"
        );
        newNFTs.set("token_id", quantitys);
        newNFTs.set("owner", user.attributes.ethAddress);
        newNFTs.set("buy", false);
        if (metadataurl) {
          newNFTs.set("token_uri", metadataurl);
        }
        await newNFTs.save();
        setShowCrop(true);
        setX();
        setTimeout(() => {
          router.replace(
            {
              pathname: router.pathname,
              query: { ...router.query, defaultIndex: 3 },
            },
            undefined,
            { shallow: true }
          );
        }, 1500);

        setX();
      } catch (err) {
        console.error(err);
        alert("Verifique faça login novamente!");
        setX();
      }
    }
  };

  const [xiX, setX] = useState();

  useEffect(() => {
    xMan();
  }, [showElementNFT]);

  function xMan() {
    setX(!xiX);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {showCrop && <NFT_true />}
      {xiX ? (
        <div>
          <div className={"modal fade show block"} key={keyModal}>
            <div className="modal-dialog max-w-2xl">
              <div className="modal-content dark:bg-jacarta-700" ref={ref}>
                <>
                  <div className="modal-header p-over_10">
                    <h5
                      className="ml_over_20 font-pop modal-title text-space text-none"
                      id="placeBidLabel"
                    >
                      Create NFT
                    </h5>
                  </div>
                  {/* <!-- Body --> */}
                  <div className="modal-body p-over_20">
                    <div className="mb-2">
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
                        value={nameNft}
                        onChange={(e) => setNameNft(e.target.value)}
                      />
                      <p className="text-red">{nameNftError}</p>
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="item-description"
                        className="font-display text-jacarta-700 mb-2 block dark:text-white"
                      >
                        Description
                      </label>
                      <p className="dark:text-jacarta-300 text-2xs mb-3">
                        The description will be included on the {"item's"}{" "}
                        detail page underneath its image. Markdown syntax is
                        supported.
                      </p>
                      <textarea
                        id="item-description"
                        className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                        rows="4"
                        required
                        placeholder="Provide a detailed description of your item."
                        value={descriptionNft}
                        onChange={(e) => setDescriptionNft(e.target.value)}
                      ></textarea>
                      <p className="text-red">{descriptionNftError}</p>
                    </div>
                    {/* <!-- Terms --> */}
                    <div className="mt-4 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={isTermsAccepted}
                        onChange={(event) =>
                          setIsTermsAccepted(event.target.checked)
                        }
                        className="cursor-pointer checked:bg-accent dark:bg-jacarta-600 hover:bg-jacarta-700 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                      />
                      <label
                        htmlFor="terms"
                        className="font-pop dark:text-jacarta-200 text-sm text-none"
                      >
                        By checking this box, I agree to {"BlackBuzz"}{" "}
                        <a href="#" className="text-accent">
                          Terms of Service
                        </a>
                      </label>
                    </div>
                  </div>
                  {/* <!-- end body --> */}
                  <div className="modal-footer p-over_10">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => onSubmit(nft)}
                        type="button"
                        title={
                          !isTermsAccepted
                            ? "Please agree to the terms and conditions"
                            : null
                        }
                        className={`dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all${
                          !isTermsAccepted
                            ? "disabled:opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={!isTermsAccepted}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default ModalNft;
