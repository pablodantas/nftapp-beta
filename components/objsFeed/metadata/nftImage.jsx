import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import AudioPlayer from "../../audioPlayer";

function ImageNFT({ tokenURI }) {
  const [isLoading, setIsLoading] = useState(true);
  const [playMan, setPlayMan] = useState("");
  const [base, setBase] = useState("");

  async function nftImage() {
    let NFT;
    NFT = tokenURI?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
    return NFT;
  }
  function handleLoad() {
    setIsLoading(false);
  }
  const { data } = useQuery(`Img${tokenURI}`, nftImage, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!data) {
      setPlayMan(
        <div className="imgpost2 placeholder pulse">
          <div className="square_feed  flex items-center justify-center">
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
            className="imgpost2 object-fit-fill"
            onload={handleLoad}
            src={data}
            rounded
            alt=""
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
          <div className="relative">
            <img src="/images/gif_audio_black.gif" alt="" className="imgpost2" />
            <AudioPlayer src={data} />
            {/* <audio
              className="imgpost absolute bottom-0"
              controls
              autoPlay
              muted
              loop
              src={data}
              allow="fullscreen"
            ></audio> */}
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
            className="imgpost2"
            controls
            autoPlay
            muted
            loop
            poster="/images/gif_audio_black.gif"
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
          <div>
            <div className="imgpost2 placeholder pulse">
              <div className="square_feed flex items-center justify-center">Unsupported file type.</div>
            </div>
          </div>
        );
      }
    }
  }, [data]);

  return isLoading ? (
    <div className="imgpost2 placeholder pulse">
      <div className="square_feed"></div>
    </div>
  ) : (
    playMan
  );
}

export default ImageNFT;
