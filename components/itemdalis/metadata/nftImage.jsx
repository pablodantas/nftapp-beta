import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import AudioPlayer from "../../audioPlayer";

function ImageNFTBuy({ tokenURI }) {

  async function nftImage() {
    let img = tokenURI?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
    return img;
  }

  const { data, isError, isLoading } = useQuery(`Img${tokenURI}`, nftImage, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      const type = data.split(".").reverse()[0].substr(0, 3);
      console.log(type);
      if (type === "AVIF" || type === "avi" || type === "gif" || type === "png" || type === "jpg" || type === "bmp" || type === "jpe" || type === "svg" || type === "web") {
        setPlayMan(<img className="rounded-2xl cursor-pointer  w-full object-fit-cover" src={data} rounded alt="" style={{maxWidth:'617px'}}/>);
      } else if ( type === "mpeg" || type === "mp3" || type === "ogg" || type === "wav" || type === "flac") {
        setPlayMan(<div><img src="images/gif_audio_black.gif" alt="" className="rounded-2xl cursor-pointer  w-full" /><AudioPlayer src={data} /></div>);
      } else if(type === "mp4" || type === "mov" || type === "m4v" || type === "mpe" || type === "ogv" || type === "web" ||type === "wmv") {
        const res = (<video className="rounded-2xl cursor-pointer  w-full object-fit-cover" controls autoPlay muted loop poster="/images/gif_audio_black.gif" allow="fullscreen" style={{maxWidth:'617px'}}>
          <source src={data} type="video/mp4" />
          <source src={data} type="video/webm" />
          <source src={data} type="video/ogg" />
          Your browser does not support the video tag.
        </video>);
        setPlayMan(res);
      } else {
        setPlayMan(<div>Unsupported file type.</div>);
      }
    }
  }, [data]);

  const [playMan, setPlayMan] = useState("");

  return isLoading ? (
    <div className="placeholder pulse">
      <div className="square" style={{minHeight: "700px", minWidth: "617px", borderRadius: "1rem" }}></div>
    </div>
  ) : (
    playMan
  );
}
export default ImageNFTBuy;
