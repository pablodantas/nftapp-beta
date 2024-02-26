import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "tippy.js/dist/tippy.css";
import PostItem from "../../components/item_nft/post";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";

const Post = () => {
  const router = useRouter();
  const postagem = router.query.post;

  const { Moralis } = useMoralis();

  const [postBy, setPostBy] = useState();
  const [tokenId, setTokenId] = useState();

  const fetchPosts = async () => {
    const Post = Moralis.Object.extend("Posts");
    const query = new Moralis.Query(Post);
    query.equalTo("objectId", postagem);
    const results = await query.find();
    return results;
  };
  fetchPosts();

  const { data } = useQuery(`Posts${postagem}`, async () => {
    const results = await fetchPosts(postagem);
    return results[0].attributes; 
  }, {
    staleTime: 1000 * 50,
  });
  
  useEffect(() => {
    if (data) {
      setPostBy(data);
      setTokenId(postagem);
    }
  }, [data, postagem]);

  return (
    <>
    <PostItem postBy={postBy} tokenId={tokenId} />
    </>
  );
};

export default Post;
