import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";

function DescriptionNFT({ address, tokenId }) {
  const { Moralis } = useMoralis();

  const [nft, setNft] = useState("");

  const fetchItem = async () => {
    const query = new Moralis.Query("NftsLogs");
    query.equalTo("address", address);
    query.equalTo("tokenId", tokenId);
    const result = await query.find();
    const a = JSON.parse(JSON.stringify(result));
    return a;
  };

  const { data, isLoading, error } = useQuery(
    `Imgnft${address}token${tokenId}`,
    fetchItem,
    {
      staleTime: 1000 * 10,
      //cacheTime: 111120000,
    }
  );

  useEffect(() => {
    if (data) {
      let tokenURI = data[0]?.tokenURI;
      let origLink = tokenURI?.replace(
        "ipfs://",
        "https://ipfs.moralis.io:2053/ipfs/"
      );

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

        setNft(NFT?.description);
      }

      nft();
    }
  }, [data, address, tokenId]);

  return isLoading ? (
    <div className="placeholder pulse">
      <div className="square_text"></div>
    </div>
  ) : nft ? (
    nft
  ) : (
    <p>Sem descrição para exibir.</p>
    
  );
}
export default DescriptionNFT;
