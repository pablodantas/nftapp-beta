import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";

function ImageNFTBuy({ address, tokenId }) {
  const { Moralis } = useMoralis();
  const [image, setImage] = useState("");
  const [token, setTokenId] = useState("");

  const fetchItem = async () => {
    const query = new Moralis.Query("NftsLogs");
    query.equalTo("address", address);
    query.equalTo("tokenId", tokenId);
    const result = await query.find();
    const a = JSON.parse(JSON.stringify(result));
    return a;
  };

  const { data } = useQuery(`Imgnft${address}token${tokenId}`, fetchItem, {
    staleTime: 1000 * 10,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      let tokenURI = data[0].tokenURI;
      let origLink = tokenURI?.replace(
        "ipfs://",
        "https://ipfs.moralis.io:2053/ipfs/"
      );

      async function nftImage() {
        let NFT;
        try {
          await fetch(origLink)
            .then((response) => response.json())
            .then((data) => {
              NFT = data.image;
            });
        } catch (error) {
          console.log(error);
        }

        let img = NFT.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
        setImage(img);
      }

      nftImage();
    }
  }, [data, address, tokenId]);

  useEffect(() => {
    if (image) {
      let type;
      type = image.split(".").reverse().join("");
      type = type.substr(0, 3);
      const postResult = (
        <video
          className="height_nft w-full object-cover"
          controls
          autoPlay
          muted
          loop
          src={image}
          allow="fullscreen"
        ></video>
      );
      const emptyResult = (
        <img
          className="height_nft w-full  object-cover"
          src={image}
          rounded
          alt=""
        />
      );

      if (
        type === "mp4" ||
        type === "mov" ||
        type === "avi" ||
        type === "m4v" ||
        type === "mpeg" ||
        type === "ogv" ||
        type === "webm" ||
        type === "wmv"
      ) {
        setPlayMan(postResult);
      }
      if (
        type === "gif" ||
        type === "png" ||
        type === "jpg" ||
        type === "bmp" ||
        type === "jpe" ||
        type === "svg" ||
        type === "web"
      ) {
        setPlayMan(emptyResult);
      }
    }
  }, [image]);

  const [playMan, setPlayMan] = useState("");

  return playMan;
}
export default ImageNFTBuy;
