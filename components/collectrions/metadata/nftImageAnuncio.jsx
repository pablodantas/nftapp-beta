import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import AudioPlayer from "../../audioPlayer";

function ImageNFT({ tokenURI }) {
  let origLink = tokenURI?.replace(
    "ipfs://",
    "https://ipfs.moralis.io:2053/ipfs/"
  );
  let tokenUri = origLink;

  async function nftImage() {
    let NFT;
    try {
      NFT = tokenUri;
    } catch (error) {
      console.log(error);
    }
    return NFT;
  }

  const { data, isLoading } = useQuery(`Img${tokenUri}`, nftImage, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });
  useEffect(() => {
    if (!data) {
      setPlayMan(
        <div className="imgpost placeholder pulse">
          <div className="square flex items-center justify-center">
            No image available.
          </div>
        </div>
      );
    }
    if (data) {
      const type = data.split(".").reverse()[0].substr(0, 3);

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
        setPlayMan(<div>Unsupported file type.</div>);
      }
    }
  }, [data]);

  const [playMan, setPlayMan] = useState("");

  console.log(playMan);

  return isLoading ? (
    <div className="placeholder pulse">
      <div className="square"></div>
    </div>
  ) : (
    playMan
  );
}
export default ImageNFT;
