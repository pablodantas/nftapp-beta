import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

function ImageNFT({ tokenURI }) {
  const [isLoading, setIsLoading] = useState(true);

  async function nftImage() {
    if (tokenURI) {
      let img = tokenURI.replace(
        "ipfs://",
        "https://ipfs.moralis.io:2053/ipfs/"
      );
      return img;
    }
  }

  function handleLoad() {
    setIsLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const { data } = useQuery(`Img${tokenURI}`, nftImage, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (!data) {
      setPlayMan(
        <div className="imgpost2 placeholder pulse" >
          <div className="square_feed flex items-center justify-center">
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
          <div>
            <img src="images/gif_audio_black.gif" alt="" className="imgpost2" />
            <audio
              className="imgpost"
              controls
              autoPlay
              muted
              loop
              src={data}
              allow="fullscreen"
            ></audio>
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
        setPlayMan(<div>Unsupported file type.</div>);
      }
    }
  }, [data]);

  const [playMan, setPlayMan] = useState("");

  return <div key={tokenURI}>{playMan}</div>;
}
export default ImageNFT;
