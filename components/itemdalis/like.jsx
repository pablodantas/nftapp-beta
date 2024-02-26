import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";


const Like = ({ userPost, walletAddress, contract, tokeId }) => {
  const { Moralis } = useMoralis();

  const [likeState, setLikeState] = useState();
  const [quantityLikes, setQuantityLikes] = useState(false);

  const likeId = `like${contract}tokenlike${tokeId}`;


  async function handleLike() {
    if (walletAddress) {
      const likeCo = !likeState;
      setLikeState(likeCo);
      if (likeCo === true) {
        setQuantityLikes(quantityLikes + 1);
      } else {
        setQuantityLikes(quantityLikes - 1);
      }
      const Like = Moralis.Object.extend('Like');
      const query = new Moralis.Query(Like);
      query.equalTo('postLike', likeId);
      query.equalTo('donoVoter', walletAddress.toLowerCase());
      const likeExists = await query.first();
      if (likeExists) {
        likeExists.destroy();
      } else {
        const newLike = new Like();
        newLike.set('postLike', likeId);
        newLike.set('donoVoter', walletAddress);
        newLike.set('like', likeCo);
        await newLike.save();
      }
    }
  };
  
  async function likeCoracao() {
    if (walletAddress) {
      const like = Moralis.Object.extend('like');
      const query = new Moralis.Query(like);
      query.equalTo('postLike', likeId);
      query.equalTo('donoVoter', walletAddress.toLowerCase());
      try {
        const likeIses = await query.first();
        if (likeIses) {
          return likeIses.attributes.like;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    } else {
      return null;
    }
  }
  
  const { data: coracao } = useQuery(`LikeCoracao${likeId}`, likeCoracao, {
    staleTime: 1000 * 90,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (coracao) {
      setLikeState(coracao);
    }
  }, [coracao]);

  async function likeQuantity() {
    const like = Moralis.Object.extend('like');
    const query = new Moralis.Query(like);
    query.equalTo("postLike", likeId);
    query.equalTo("like", true);
    const likes = await query.find();
    const res = likes.length;
    return res;
  }
  

  const { data: quantity } = useQuery(`LikeQuantity${likeId}`, likeQuantity, {
    staleTime: 1000 * 50,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (quantity) {
      setQuantityLikes(quantity);
    }
  }, [quantity]);

  return (
    <>
      <div className="col mb-3 mw-100">
        <div className="row flex flex-col flex-center-500">
          <button
            className="col-auto feedBtn btn rounded-pill p-4 flex_important items-center justify-center bgbuttons dark:bg-jacarta-900"
            onClick={handleLike}
          >
            {likeState ? (
              <svg
                width="29"
                height="27"
                viewBox="0 0 29 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.4656 26.4937L12.7469 24.9469C10.2719 22.6781 8.23229 20.7245 6.62812 19.0859C5.02396 17.4474 3.74635 15.9807 2.79531 14.6859C1.84427 13.3911 1.17969 12.2109 0.801562 11.1453C0.423437 10.0797 0.234375 8.99687 0.234375 7.89687C0.234375 5.69687 0.973437 3.85208 2.45156 2.3625C3.92969 0.872916 5.75729 0.128124 7.93437 0.128124C9.24062 0.128124 10.4437 0.420311 11.5437 1.00469C12.6437 1.58906 13.6177 2.44271 14.4656 3.56562C15.474 2.37396 16.5052 1.50312 17.5594 0.953124C18.6135 0.403124 19.7594 0.128124 20.9969 0.128124C23.1969 0.128124 25.0417 0.872916 26.5312 2.3625C28.0208 3.85208 28.7656 5.69687 28.7656 7.89687C28.7656 8.99687 28.5766 10.074 28.1984 11.1281C27.8203 12.1823 27.1557 13.3568 26.2047 14.6516C25.2536 15.9464 23.9703 17.4187 22.3547 19.0687C20.7391 20.7187 18.7052 22.6781 16.2531 24.9469L14.4656 26.4937Z"
                  fill="#8364E2"
                />
              </svg>
            ) : (
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.4656 25.9187C18.7802 23.7875 20.6823 21.9656 22.1719 20.4531C23.6615 18.9406 24.8417 17.6229 25.7125 16.5C26.5833 15.3771 27.1849 14.3745 27.5172 13.4922C27.8495 12.6099 28.0156 11.7448 28.0156 10.8969C28.0156 9.4302 27.5516 8.22707 26.6234 7.28749C25.6953 6.3479 24.4979 5.87811 23.0312 5.87811C21.8854 5.87811 20.8198 6.23905 19.8344 6.96092C18.849 7.6828 18.0469 8.69686 17.4281 10.0031H15.5375C14.9417 8.71978 14.1453 7.71144 13.1484 6.97811C12.1516 6.24478 11.0802 5.87811 9.93437 5.87811C8.49062 5.87811 7.30469 6.3479 6.37656 7.28749C5.44844 8.22707 4.98437 9.4302 4.98437 10.8969C4.98437 11.7677 5.15625 12.65 5.5 13.5437C5.84375 14.4375 6.45104 15.4573 7.32187 16.6031C8.19271 17.7489 9.37292 19.0667 10.8625 20.5562C12.3521 22.0458 14.2198 23.8333 16.4656 25.9187Z"
                  fill="#A58D8D"
                  fillOpacity="0.01"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.4656 29.4937L14.7469 27.9469C12.2719 25.6781 10.2323 23.7245 8.62812 22.0859C7.02396 20.4474 5.74635 18.9807 4.79531 17.6859C3.84427 16.3911 3.17969 15.2109 2.80156 14.1453C2.42344 13.0797 2.23438 11.9969 2.23438 10.8969C2.23438 8.69686 2.97344 6.85207 4.45156 5.36249C5.92969 3.8729 7.75729 3.12811 9.93437 3.12811C11.2406 3.12811 12.4437 3.4203 13.5437 4.00467C14.6437 4.58905 15.6177 5.4427 16.4656 6.56561C17.474 5.37395 18.5052 4.50311 19.5594 3.95311C20.6135 3.40311 21.7594 3.12811 22.9969 3.12811C25.1969 3.12811 27.0417 3.8729 28.5312 5.36249C30.0208 6.85207 30.7656 8.69686 30.7656 10.8969C30.7656 11.9969 30.5766 13.0739 30.1984 14.1281C29.8203 15.1823 29.1557 16.3568 28.2047 17.6515C27.2536 18.9463 25.9703 20.4187 24.3547 22.0687C22.7391 23.7187 20.7052 25.6781 18.2531 27.9469L16.4656 29.4937ZM22.1719 20.4531C20.6823 21.9656 18.7802 23.7875 16.4656 25.9187C14.2198 23.8333 12.3521 22.0458 10.8625 20.5562C9.37292 19.0667 8.19271 17.7489 7.32187 16.6031C6.45104 15.4573 5.84375 14.4375 5.5 13.5437C5.15625 12.65 4.98437 11.7677 4.98437 10.8969C4.98437 9.4302 5.44844 8.22707 6.37656 7.28749C7.30469 6.3479 8.49062 5.87811 9.93437 5.87811C11.0802 5.87811 12.1516 6.24478 13.1484 6.97811C14.1453 7.71144 14.9417 8.71978 15.5375 10.0031H17.4281C18.0469 8.69686 18.849 7.6828 19.8344 6.96092C20.8198 6.23905 21.8854 5.87811 23.0312 5.87811C24.4979 5.87811 25.6953 6.3479 26.6234 7.28749C27.5516 8.22707 28.0156 9.4302 28.0156 10.8969C28.0156 11.7448 27.8495 12.6099 27.5172 13.4922C27.1849 14.3745 26.5833 15.3771 25.7125 16.5C24.8417 17.6229 23.6615 18.9406 22.1719 20.4531Z"
                  fill="#959595"
                />
              </svg>
            )}
          </button>
          <div className="col pt-1 text-center dark:text-white name_light">
            <p className="grayfeed mb-0">
              {quantityLikes}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Like;
