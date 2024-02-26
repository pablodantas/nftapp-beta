import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";

const ComentsPost = ({ contract, tokeId }) => {

  const { Moralis } = useMoralis();

  const comentarioId = `${contract}/${tokeId}`;

  const [quantityLikes, setquantityLikes] = useState(false);

  async function likeQuantity() {
    if (comentarioId) {
      const query = new Moralis.Query(`coments`);
      query.equalTo("comentarioId", comentarioId);
      const likes = await query.find();
      const res = likes.length;
      return res;
    }
  }

  const { data: quantity, refetch } = useQuery(`comentarioQuantity${comentarioId}`, likeQuantity, {
    staleTime: 5000,
    cacheTime: 600000,
    refetchInterval: 1000, 
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    if (quantity) {
      setquantityLikes(quantity);
    }
    if (!quantity) {
      setquantityLikes(0);
    }
  }, [quantity]);

  console.log(quantityLikes, "quantityLikes");

  return (
    <>
      {quantityLikes}
    </>
  );
};
export default ComentsPost;
