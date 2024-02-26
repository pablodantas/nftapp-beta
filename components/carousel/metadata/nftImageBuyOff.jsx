import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import AudioPlayer from "../../audioPlayer";

function ImageNFTBuy({ tokenURI }) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  async function nftImage() {
    let img = tokenURI.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
    return img;
  }

  const { data, isError, isLoading } = useQuery(`Img${tokenURI}`, nftImage, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
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
            style={
              !isLargeScreen
                ? { minHeight: "400px" }
                : { objectPosition: "center", maxHeight: "500px" }
            }
            className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
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
          <div>
            <img
              style={
                !isLargeScreen
                  ? {
                      minHeight: "400px",
                    }
                  : { objectPosition: "top", maxHeight: "500px" }
              }
              src="images/audio.gif"
              alt=""
              className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
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
            style={!isLargeScreen ? { minHeight: "400px" } : {}}
            className="h-full w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105 "
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

  return isLoading ? (
    <div className="placeholder pulse">
      <div className="square"></div>
    </div>
  ) : (
    playMan
  );
}
export default ImageNFTBuy;
