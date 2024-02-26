import Tippy from "@tippyjs/react";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";

const Likes = ({ donoPoster, likeId, classes = "dark:bg-jacarta-700 absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2", }) => {
  const { Moralis, user } = useMoralis();
  const walletAddress = user?.attributes?.ethAddress;

  const [likeState, setLikeState] = useState(false);
  const [quantityLikes, setquantityLikes] = useState(0);

  async function handleLike() {
    if (walletAddress) {
      const likeCo = !likeState;
      setLikeState(likeCo);
      if (likeCo === true) {
        setquantityLikes(quantityLikes + 1);
      }
      if (likeCo !== true) {
        setquantityLikes(quantityLikes - 1);
      }
      const like = Moralis.Object.extend('like');
      const query = new Moralis.Query(like);
      query.equalTo("postLike", likeId);
      query.equalTo("donoVoter", walletAddress.toLowerCase());
      const likeIses = await query.first();
      if (likeIses) {
        likeIses.destroy();
      } else {
        const newLike = new like();
        newLike.set("postLike", likeId);
        newLike.set("donoPoster", donoPoster);
        newLike.set("donoVoter", walletAddress);
        newLike.set("like", likeCo);
        newLike.set("category", 'likes');
        await newLike.save();

        const notifications = Moralis.Object.extend("Notifications");
        const query = new Moralis.Query(notifications);
        query.equalTo("postOwner", donoPoster?.toLowerCase());
        const myDetails = await query.first();
        if (myDetails) {
          if (walletAddress) {
            myDetails.set("notifications", true);
            await myDetails.save();
          }
        } else {
          const notifications = Moralis.Object.extend("Notifications");
          const query = new notifications();
          if (donoPoster) {
            query.set("notifications", true);
            query.set("postOwner", donoPoster?.toLowerCase());
          }
          await query.save();
          refetch();
        }
      }
    }
  };

  async function likeCoracao() {
    if (walletAddress) {
      const like = Moralis.Object.extend('like');
      const query = new Moralis.Query(like);
      query.equalTo("postLike", likeId);
      query.equalTo("donoVoter", walletAddress.toLowerCase());
      const likeIses = await query.first();
      if (likeIses !== undefined) {
        return true;
      }
      if (likeIses === undefined) {
        return false;
      }
    }
  }

  const { data: coracao, refetch } = useQuery(`LikeCoracao${likeId}`, likeCoracao, {
    staleTime: 1000 * 90,
    cacheTime: 0,
  });

  useEffect(() => {
    if (coracao !== undefined) {
      setLikeState(coracao);
    }
  }, [coracao]);

  async function likeQuantity() {
    const query = new Moralis.Query(`like`);
    query.equalTo("postLike", likeId);
    query.equalTo("like", true);
    const likes = await query.find();
    const res = likes.length;
    return res;
  }

  const { data: quantity } = useQuery(`LikeQuantity${likeId}`, likeQuantity, {
    staleTime: 1000 * 90,
    cacheTime: 0,
  });

  useEffect(() => {
    if (quantity) {
      setquantityLikes(quantity);
    }
  }, [quantity]);


  return (
    <>
      <div className={classes} onClick={handleLike} key={likeId}>
        <Tippy content={<span>{likeState !== true ? "Like" : "Liked"}</span>}>
          <button className="js-likes relative cursor-pointer">
            {likeState !== true ? (
              <svg className="icon icon-heart-fill dark:fill-jacarta-200 fill-jacarta-500 hover:fill-red dark:hover:fill-red h-4 w-4"
                width="16"
                height="14">
                <use xlinkHref="/icons.svg#icon-hert-fill"></use>
              </svg>
            ) : (
              <svg
                className="group-hover:fill-accent fill-white h-4 w-4"
                width="14"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{width: "14px"}}
              >
                <g clip-path="url(#clip0_24_102)">
                  <path d="M7.99573 13.9621L7.182 13.2293C5.89746 12.0531 4.83774 11.0377 4.00286 10.1834C3.168 9.32899 2.50237 8.56492 2.00597 7.89112C1.50957 7.21726 1.16205 6.60595 0.963447 6.05708C0.764833 5.50822 0.665527 4.95262 0.665527 4.39028C0.665527 3.2753 1.03972 2.34288 1.78811 1.59304C2.53651 0.84321 3.46218 0.468292 4.56515 0.468292C5.24838 0.468292 5.88117 0.626477 6.46353 0.942843C7.04587 1.25922 7.5566 1.71858 7.99573 2.32096C8.507 1.68248 9.04407 1.21408 9.60693 0.915763C10.1698 0.617449 10.7763 0.468292 11.4263 0.468292C12.5321 0.468292 13.4599 0.84321 14.2097 1.59304C14.9596 2.34288 15.3345 3.2753 15.3345 4.39028C15.3345 4.95262 15.2352 5.5075 15.0366 6.05494C14.838 6.60236 14.4905 7.21299 13.9941 7.88679C13.4977 8.56059 12.8313 9.32539 11.995 10.1812C11.1587 11.037 10.0983 12.0531 8.81367 13.2293L7.99573 13.9621Z" />
                </g>
                <defs>
                  <clipPath id="clip0_24_102">
                    <rect
                      width="16"
                      height="14"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        </Tippy>
        <span className="dark:text-jacarta-200 text-sm">{quantityLikes} </span>
      </div>
    </>

  );
};

export default Likes;
