import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import AudioPlayer from "../../audioPlayer";

function ImageNFTBuy({ address, tokenId }) {
  const { Moralis } = useMoralis();
  const [image, setImage] = useState("");
  const [token, setTokenId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchItem = async () => {
    const query = new Moralis.Query("NftsLogs");
    query.equalTo("address", address);
    query.equalTo("tokenId", tokenId);
    const result = await query.find();
    const a = JSON.parse(JSON.stringify(result));
    return a;
  };

  const {
    data,
    isLoading: dataLoading,
    isError,
  } = useQuery(`Img${address}token${tokenId}`, fetchItem, {
    staleTime: 1000 * 10,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data) {
      let tokenURI = data[0]?.tokenURI;
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

        let img = NFT?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
        setImage(img);
      }

      nftImage();
    }
  }, [data, address, tokenId]);

  useEffect(() => {
    if (!data) {
      setPlayMan(
        <div className="placeholder pulse">
          <div className="square flex items-center justify-center">
            No image available.
          </div>
        </div>
      );
    }
    if (data) {
      const type = data.split(".").reverse()[0].substr(0, 3);
      console.log(type);
      if (
        type === "AVIF" ||
        type === "avi" ||
        type === "gif" ||
        type === "png" ||
        type === "jpg" ||
        type === "bmp" ||
        type === "jpe" ||
        type === "svg" ||
        type === "web"
      ) {
        setPlayMan(
          <img
            className="height_nft w-full  object-cover"
            src={data}
            rounded
            alt=""
            style={{
              objectPosition: "top",
            }}
          />
        );
      } else if (
        type === "mpeg" ||
        type === "mp3" ||
        type === "ogg" ||
        type === "wav" ||
        type === "flac"
      ) {
        setPlayMan(
          <div>
            <img
              src="images/audio.gif"
              alt=""
              className="height_nft w-full  object-cover"
            />
            <AudioPlayer src={data} />
          </div>
        );
      } else if (
        type === "mp4" ||
        type === "mov" ||
        type === "m4v" ||
        type === "mpe" ||
        type === "ogv" ||
        type === "web" ||
        type === "wmv"
      ) {
        const res = (
          <video
            className="height_nft w-full  object-cover"
            controls
            autoPlay
            muted
            loop
            poster="/images/audio_2.gif"
            allow="fullscreen"
          >
            <source src={data} type="video/mp4" />
            <source src={data} type="video/webm" />
            <source src={data} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
        );
        setPlayMan(res);
      } else {
        setPlayMan(
          <div className="placeholder pulse">
            <div className="square flex items-center justify-center">
              Unsupported file type.
            </div>
          </div>
        );
      }
    }
  }, [data]);

  const [playMan, setPlayMan] = useState("");

  return isLoading ? (
    <div className="placeholder pulse">
      <div className="square"></div>
    </div>
  ) : isError ? (
    <div className="placeholder pulse">
      <div className="square">Error! Media not supported.</div>
    </div>
  ) : (
    playMan
  );
}
export default ImageNFTBuy;
