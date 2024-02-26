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

  const { data: quantity } = useQuery(`comentarioQuantity${comentarioId}`, likeQuantity, {
    staleTime: 1000 * 90,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (quantity) {
      setquantityLikes(quantity);
    }
  }, [quantity]);

  return (
    <>
       {quantityLikes ? quantityLikes : "0"}
    </>
  );
};
export default ComentsPost;
