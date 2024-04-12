import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import MetaNft from "./image";
import NFT_true from "../../modal/nft_sucefuly";
import { useRouter } from 'next/router';
import { contractABI, contractAddress } from "../../../contractMarketPlace";


function ModalNft({ nft, keyModal, showElementNFT }) {

  const { Moralis, user, enableWeb3 } = useMoralis();

  const router = useRouter();
  const [nameNft, setNameNft] = useState("");
  const [descriptionNft, setDescriptionNft] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");


  const AproveActive = async (nft) => {
    await enableWeb3();
    try {

      const optionsNft = {
        contractAddress: "0x8a64030f84BDA05F406689Fe9EdC8354f2e58bc5",
        functionName: "setApprovalForAll",
        abi: [
          {
            "constant": false,
            "inputs": [
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        params: {
          operator: "0x69d350358ad3e5c792AB0F2Ad04626AA2D929142",
          approved: true,
        },
      };
      const transaction = await Moralis.executeFunction(optionsNft);
      await transaction.wait(); // Aguarda a transação ser confirmada
      alert(`APROVE NFT successfully. Transaction hash - ${transaction.hash}`);

      setIsTermsAccepted(true)
    } catch (err) {
      console.error(err);
      alert("A transação falhou ou o login expirou. Tente novamente!");
    }

  }

  const handleChange = (event) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setValue(numericValue);
  };
  const [showCrop, setShowCrop] = useState(false);

  const onSubmit = async (nft) => {

    const conversionRate = 1700000000000000; // 1 dólar = 1700000000000000 Wei
    const valor = value * conversionRate;

    await enableWeb3();


    const image = await MetaNft(nft.token_uri);

    if (image && nft.token_id && value > 0) {
      const listingFee = "1700000000000000"; // 0.0017 BNB para uma taxa de 1 dólar a uma taxa de câmbio hipotética.

      const options = {
        contractAddress: "0x69d350358ad3e5c792AB0F2Ad04626AA2D929142",
        functionName: "createMarketItem",
        abi: [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "name": "createMarketItem",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              }
            ],
            "name": "createMarketSale",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "seller",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "bool",
                "name": "sold",
                "type": "bool"
              }
            ],
            "name": "MarketItemCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "MarketItemSold",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "newFee",
                "type": "uint256"
              }
            ],
            "name": "updateListingFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        params: {
          nftContract: "0x8a64030f84BDA05F406689Fe9EdC8354f2e58bc5",
          tokenId: nft.token_id,
          price: valor.toString(),
        },
        msgValue: listingFee,
      };

      // Executa a função do contrato e aguarda pela transação ser confirmada
      const transaction = await Moralis.executeFunction(options);
      const receipt = await transaction.wait()
      alert(`Successfully. Transaction hash - ${transaction.hash}`);


      try {
        const Marketplace = Moralis.Object.extend("Marketplace");
        const query = new Moralis.Query(Marketplace);
        query.equalTo("token_address", nft.token_address);
        query.equalTo("token_id", parseInt(nft.token_id, 10));
        const myDetails = await query.first();

        if (myDetails) {
          myDetails.set("owner", nft.owner_of);
          if (nameNft) myDetails.set("name", nameNft);
          if (descriptionNft) myDetails.set("description", descriptionNft);
          myDetails.set("valor", parseInt(value, 10));
          await myDetails.save();
        } else {
          const newMarketplace = new Marketplace();
          newMarketplace.set("minter_address", nft.minter_address);
          newMarketplace.set("collection", nft.name);
          newMarketplace.set("symbol", nft.symbol);
          newMarketplace.set("created", nft.last_token_uri_sync);
          if (nameNft) newMarketplace.set("name", nameNft);
          if (descriptionNft) newMarketplace.set("description", descriptionNft);
          newMarketplace.set("token_address", nft.token_address);
          newMarketplace.set("token_id", parseInt(nft.token_id, 10));
          newMarketplace.set("owner", nft.owner_of);
          newMarketplace.set("valor", parseInt(value, 10));
          if (image) {
            newMarketplace.set("image", image);
          }
          await newMarketplace.save();
        }

        setShowCrop(true);
        setX();
        router.push(`/${nft.token_address}/${nft.token_id}`);
      } catch (err) {
        console.error(err);
        alert("A transação falhou ou o login expirou. Tente novamente!");
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

  return (
    <>
      {showCrop && <NFT_true />}
      {xiX ? (
        <div>
          <div className={"modal fade show block"} key={keyModal}>
            <div className="modal-dialog max-w-2xl">
              <div className="modal-content dark:bg-jacarta-700">
                <div className="modal-header p-over_10">
                  <h5
                    className="ml_over_20 font-pop modal-title text-space text-none"
                    id="placeBidLabel"
                  >
                    Put on sale{" "}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setX()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                    </svg>
                  </button>
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
                        AproveActive(event.target.checked)
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
