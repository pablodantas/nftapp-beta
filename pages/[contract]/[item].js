import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "tippy.js/dist/tippy.css";
import NftItem from "../../components/item_nft/nft";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import NftAnuncio from "../../components/item_nft/anuncio";

const Item = () => {
  const router = useRouter();
  const item = router.query.item;
  const contract = router.query.contract;
  
  const { Moralis } = useMoralis();

  const [nftBuy, setnftBuy] = useState();
  const [hist, setHist] = useState([]);

  const fetchItem = async () => {
    try {
      if(contract === 'announced'){
        const Announcement = Moralis.Object.extend("Announcement");
        const query = new Moralis.Query(Announcement);
        query.equalTo("objectId", item);
        const result = await query.first();
        if (!result) {
          throw new Error("Nenhum item encontrado");
        }
        return result;
      }else{
        const Marketplace = Moralis.Object.extend("Marketplace");
        const query = new Moralis.Query(Marketplace);
        query.equalTo("token_address", contract);
        query.equalTo("token_id", item);
        const result = await query.first();
        if (!result) {
          throw new Error("Nenhum item encontrado");
        }
        return result;
      }

    } catch (error) {
      console.error("Erro ao buscar o item:", error.message);
      return null;
    }
  };

  const { data } = useQuery(`marketplace${contract}_${item}`, fetchItem, {
    staleTime: 1000 * 50,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      setnftBuy(data.attributes);
    }
  }, [data, item]);

  const fetchItemHystory= async () => {
    const query = new Moralis.Query("HistoryNft");
    query.equalTo("token_address", contract);
    query.equalTo("token_id", item);
    const result = await query.find();
    const res = JSON.parse(JSON.stringify(result));
    console.log(res)
    return res;
  };

  const { data: history, isLoading } = useQuery(`$Historic${contract}filter${item}`, fetchItemHystory, {
    staleTime: 1000 * 90,
    //cacheTime: 111120000,
  }
  );

  useEffect(() => {
    if (history) {
      setHist(history)
    }
  }, [history]);

  return (
    <>
      {contract === 'announced' &&  <NftAnuncio nft={nftBuy} itemI={item}/>} 
      {contract !== 'announced' && <NftItem nft={nftBuy} contract={contract} tokenId={item} history={hist}/>} 
    </>
  );
};

export default Item;
