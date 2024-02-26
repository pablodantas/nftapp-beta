import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

function DescriptionNFT({ tokenURI }) {

  const [description, setDescription] = useState();

  let origLink = tokenURI?.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');
  let tokenUri = origLink;

  async function nftDescription() {
    let NFT;
    try {
      await fetch(tokenUri)
        .then((response) => response.json())
        .then((data) => {
          NFT = data.description;
        });
    } catch (error) {
      console.log(error);
    }
    return NFT;
  }

  const { data } = useQuery(`Descriptionnft${tokenUri}`, nftDescription, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      setDescription(data);
    }
  }, [data]);

  return (description);

} export default DescriptionNFT;