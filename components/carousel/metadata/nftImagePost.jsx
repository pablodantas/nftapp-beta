import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

function ImagePost({ tokenURI }) {

  async function nftImage() {
    let img = tokenURI.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');
    return img;
  }

  const { data } = useQuery(`ImagePost${tokenURI}`, nftImage, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });
  useEffect(() => {
    if (data) {
      let type;
      type = data.split('.').reverse().join('');
      type = type.substr(0, 3);
      const postResult = (<video className="height_nft w-full rounded-[0.625rem] object-cover" controls autoPlay muted loop src={data} allow="fullscreen" ></video>)
      const emptyResult = (<img className="height_nft w-full rounded-[0.625rem] object-cover" src={data} rounded alt="" />)

      if (type === "mp4" || type === "mov" || type === "avi" || type === "m4v" || type === "mpeg" || type === "ogv" || type === "webm" || type === "wmv") {
        setPlayMan(postResult);
      }
      if (type === "gif" || type === "png" || type === "jpg" || type === "bmp" || type === "jpe" || type === "svg" || type === "web") {
        setPlayMan(emptyResult);
      }
    }
  }, [data]);

  const [playMan, setPlayMan] = useState('');

  return (<>
    <div key={tokenURI}>
      {playMan}
    </div>
  </>
  )

} export default ImagePost;
