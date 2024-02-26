import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

function NameNFT({ tokenURI }) {

  let origLink = tokenURI?.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');

  const [name, setName] = useState();

  async function nftName() {
    try {
      const response = await fetch(origLink);
      if (!response.ok) {
        throw new Error("Erro ao obter dados da API");
      }
      const data = await response.json();
      const NFT = data?.name;
      if (!NFT) {
        throw new Error("Nome do NFT não encontrado");
      }
      return NFT;
    } catch (error) {
      console.error("Erro ao obter nome do NFT:", error.message);
      return "Erro ao obter nome do NFT";
    }
  }

  const { data } = useQuery(`Namenft${origLink}`, nftName, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      setName(data);
    }
  }, [data]);

  return (name);

} export default NameNFT;