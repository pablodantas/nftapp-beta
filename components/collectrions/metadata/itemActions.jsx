import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import dividirString from './dividirString';

function NameNFT({ postLike }) {
  const { Moralis } = useMoralis();

  const [nft, setNft] = useState('');

  const fetchItem = async () => {
    if(postLike){
      const [contract, tokenId] = dividirString(postLike, "/");
      const query = new Moralis.Query("NftsLogs");
      query.equalTo("address", contract);
      query.equalTo("tokenId", tokenId);
      const result = await query.first();
      const a = JSON.parse(JSON.stringify(result));
      return a;
    }
  }

  const { data } = useQuery(`Imgnft${postLike}`, fetchItem, {
    staleTime: 1000 * 10,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      let tokenURI = data?.tokenURI;
      let origLink = tokenURI?.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');

      async function nft() {
        let NFT;
        try {
          await fetch(origLink)
            .then((response) => response.json())
            .then((data) => {
              NFT = data;
            });
        } catch (error) {
          console.log(error);
        }
    
        setNft(NFT?.name);
      }

      nft()
    }
  }, [data]);

  return (nft)

} export default NameNFT;
