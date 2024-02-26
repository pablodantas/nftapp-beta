import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

function DescriptionNFT({ tokenURI }) {

  const [description, setDescription] = useState();

  let origLink = tokenURI?.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');

  async function nftDescription() {
    let NFT;
    try {
      const response = await fetch(origLink);
      if (!response.ok) {
        throw new Error("Erro ao obter dados da API");
      }
      const data = await response.json();
      NFT = data?.description || "Descrição não encontrada";
    } catch (error) {
      console.error("Erro ao obter dados da API:", error.message);
      NFT = "Erro ao obter descrição do NFT";
    }
    return NFT;
  }
  

  const { data } = useQuery(`Descriptionnft${origLink}`, nftDescription, {
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