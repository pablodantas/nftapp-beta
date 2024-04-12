import React, { useState, useEffect, useRef } from "react";
import { useMoralis } from "react-moralis";
import MetaNft from "./image";
import NFT_true from "../../modal/nft_sucefuly";
import { useRouter } from "next/router";

// import Web3 from "web3";
// const web3 = new Web3(Web3.givenProvider);
function ModalNft({ nft, keyModal, showElementNFT }) {
  const { Moralis, user } = useMoralis();
  const router = useRouter();
  const [nameNft, setNameNft] = useState("");
  const [descriptionNft, setDescriptionNft] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [showCrop, setShowCrop] = useState(false);

  const [nameNftError, setNameNftError] = useState("");
  const [descriptionNftError, setDescriptionNftError] = useState("");
  const [DoubleError, setDoubleError] = useState("");

  const handleChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setValue(numericValue);
  };

  const ref = useRef();
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

  const onSubmit = async (nft) => {
    const image = await MetaNft(nft.token_uri);
    if (!nameNft || !descriptionNft) {
      setDoubleError("This field cannot be empty");
      console.error("Name and description cannot be empty");
      setIsLoading(false);
      return;
    }
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
    if (image && nft && value > 0) {
      try {
        const Marketplace = Moralis.Object.extend("Marketplace");
        const query = new Moralis.Query(Marketplace);
        query.equalTo("token_address", nft.token_address);
        query.equalTo("token_id", nft.token_id);
        const myDetails = await query.first();
        if (myDetails) {
          myDetails.set("owner", nft.owner);
          if (nameNft) myDetails.set("name", nameNft);
          if (descriptionNft) myDetails.set("description", descriptionNft);
          myDetails.set("valor", parseInt(value, 10)); // Conversão para int32

          const NFTs = Moralis.Object.extend("NFTs");
          const queryNft = new Moralis.Query(NFTs);
          queryNft.equalTo("token_address", nft.token_address);
          queryNft.equalTo("token_id", nft.token_id);
          const myNft = await queryNft.first();
          if (!myNft) {
            console.error("Erro: NFT não encontrado");
            return;
          }
          myNft.set("buy", true);
          await myNft.save();
          await myDetails.save();
        } else {
          const Marketplace = Moralis.Object.extend("Marketplace");
          const newMarketplace = new Marketplace();
          newMarketplace.set("minter_address", nft.minter_address);
          newMarketplace.set("collection", nft.collection);
          newMarketplace.set("symbol", nft.symbol);
          newMarketplace.set("created", nft.last_token_uri_sync);
          if (nameNft) newMarketplace.set("name", nameNft);
          if (descriptionNft) newMarketplace.set("description", descriptionNft);
          newMarketplace.set("token_address", nft.token_address);
          newMarketplace.set("token_id", nft.token_id);
          newMarketplace.set("owner", nft.owner);
          newMarketplace.set("valor", parseInt(value, 10)); // Conversão para int32
          if (image) {
            newMarketplace.set("image", image);
          }
          const NFTs = Moralis.Object.extend("NFTs");
          const queryNft = new Moralis.Query(NFTs);
          queryNft.equalTo("token_address", nft.token_address);
          queryNft.equalTo("token_id", nft.token_id);
          const myNft = await queryNft.first();
          if (!myNft) {
            console.error("Erro: NFT não encontrado");
            return;
          }
          await newMarketplace.save();
          myNft.set("buy", true);
          await myNft.save();
        }
        setShowCrop(true);
        setX();
        router.push(`/${nft.token_address}/${nft.token_id}`);
      } catch (err) {
        console.error(err);
        alert("Faça login novamente!");
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

  console.log(value);

  return (
    <>
      {showCrop && <NFT_true />}

      {xiX ? (
        <div>
          <div className={"modal fade show block"} key={keyModal}>
            <div className="modal-dialog max-w-2xl">
              <div className="modal-content dark:bg-jacarta-700" ref={ref}>
                <div className="modal-header p-over_10">
                  <h5
                    className="ml_over_20 font-pop modal-title text-space text-none"
                    id="placeBidLabel"
                  >
                    Put on sale{" "}
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
                    <p className="text-red">{DoubleError}</p>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="item-description"
                      className="font-display text-jacarta-700 mb-2 block dark:text-white"
                    >
                      Description
                    </label>
                    <p className="dark:text-jacarta-300 text-2xs mb-3">
                      The description will be included on the {"item's"} detail
                      page underneath its image. Markdown syntax is supported.
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
                    <p className="text-red">{DoubleError}</p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-display text-jacarta-700 font-pop font-S dark:text-white">
                        Price
                      </span>
                    </div>
                    <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-2 flex items-center overflow-hidden rounded-lg border">
                      <input
                        type="number"
                        className="font-pop focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inse dark:text-jacarta-700"
                        placeholder="Amount"
                        value={value}
                        onChange={handleChange}
                      />
                      <div className="border-jacarta-100 gap-2 bg-jacarta-50 flex flex-1 items-center self-stretch border-r px-2">
                        <span>
                          <img src="/images/logo_black.png" className="w-5" />
                        </span>
                        <span className="font-display text-jacarta-700 text-sm">
                          $USDT
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Terms --> */}
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
                      className={`dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all ${!isTermsAccepted
                        ? "disabled:opacity-50 cursor-not-allowed"
                        : ""
                        }`}
                      disabled={!isTermsAccepted}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default ModalNft;
