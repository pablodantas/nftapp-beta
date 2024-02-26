import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

function DescriptionNFT({ tokenURI }) {
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  let origLink = tokenURI?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex items-end">
      <div
        style={{
          maxHeight: isExpanded ? "none" : "3em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          width: "100%",
          textAlign: "justify"
        }}
      >
        {description}
        {isExpanded && (
          <button
            style={{ maxWidth: "80px", minWidth: "80px" }}
            onClick={toggleExpand}
            className="text-accent mt-1 text-start w-full"
          >
            ...See less
          </button>
        )}
      </div>
      {!isExpanded && description.length > 150 && (
        <button
          style={{ maxWidth: "80px", minWidth: "80px" }}
          onClick={toggleExpand}
          className="text-accent mt-1 w-full text-start"
        >
          ...See more
        </button>
      )}
    </div>
  );
}

export default DescriptionNFT;
