import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import Modal_Curtir from "./modal_curtir";
import { useRouter } from "next/router";
import Profile_alert from "../modal/alert_Profile";

const Like = ({ donoPoster, walletAddress, contract, tokeId }) => {
  const Router = useRouter();

  const { Moralis, user } = useMoralis();

  const [likeState, setLikeState] = useState();
  const [quantityLikes, setquantityLikes] = useState(false);

  const likeId = `${contract}/${tokeId}`;

  const [alert_comment, setAlert] = useState("");
  const [showAlert, setShowElementAlert] = useState("");
  const [Profile_user, setProfile_user] = useState("");

  function closeModalAlert(){
    setAlert(false);
  }

  async function handleLike() {
    if (!walletAddress && donoPoster) {
      const a = !alert_comment;
      setShowElementAlert("");
      setAlert(a);
      return;
    }
    if (user.attributes.ethAddress) {
      const checkFields = async () => {
        const User = Moralis.Object.extend("IfUser");
        const query = new Moralis.Query(User);
        query.equalTo("postOwner", user.attributes.ethAddress.toLowerCase());
        const myDetails = await query.first();
        if (
          myDetails &&
          (!myDetails.get("nameUserLink") ||
            !myDetails.get("avatarUser") ||
            !myDetails.get("userName"))
        ) {
          setProfile_user(true);
          setTimeout(() => {
            Router.push("/profile");
          }, 3000);
          return;
        }
        // 	Router.push("myprofile");
      };
      checkFields();
    }
    if (walletAddress) {
      const likeCo = !likeState;
      setLikeState(likeCo);
      if (likeCo === true) {
        setquantityLikes(quantityLikes + 1);
      }
      if (likeCo !== true) {
        setquantityLikes(quantityLikes - 1);
      }
      const like = Moralis.Object.extend("like");
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
        newLike.set("category", "likes");
        await newLike.save();

        const notifications = Moralis.Object.extend("Notifications");
        const query = new Moralis.Query(notifications);
        query.equalTo("postOwner", donoPoster.toLowerCase());
        const myDetails = await query.first();
        if (myDetails) {
          if (donoPoster) {
            myDetails.set("notifications", true);
            await myDetails.save();
          }
        } else {
          const notifications = Moralis.Object.extend("Notifications");
          const query = new notifications();
          if (donoPoster) {
            query.set("notifications", true);
            query.set("postOwner", donoPoster.toLowerCase());
          }
          await query.save();
          refetch();
        }
      }
    }
  }

  async function likeCoracao() {
    if (user.attributes.ethAddress.toLowerCase()) {
      const like = Moralis.Object.extend("like");
      const query = new Moralis.Query(like);
      query.equalTo("postLike", likeId);
      query.equalTo("donoVoter", user.attributes.ethAddress.toLowerCase());
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
    const query = new Moralis.Query("like");
    query.equalTo("postLike", likeId);
    query.equalTo("like", true);
    const likes = await query.find();
    const res = likes.length;
    return res;
  }

  const { data: quantity } = useQuery(
    `LikeQuantity${likeId}`,
    likeQuantity,
    {
      staleTime: 1000 * 50,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    if (quantity !== undefined) {
      setquantityLikes(quantity);
    }
  }, [quantity]);

  return (
    <>
      {alert_comment && <Modal_Curtir closeModalAlert={closeModalAlert}/>}
      {Profile_user && <Profile_alert />}

      <div className="col mb-3 mw-100">
        <div className="row flex flex-col flex-center-500">
          <button
            className="col-auto rounded-pill flex_important items-center justify-center"
            onClick={handleLike}
          >
            {likeState ? (
              <svg
                width="24"
                className="fill-accent"
                height="21"
                viewBox="0 0 24 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.9936 20.9432L10.773 19.8439C8.84619 18.0796 7.25661 16.5566 6.00429 15.2751C4.752 13.9935 3.75355 12.8474 3.00896 11.8367C2.26435 10.8259 1.74308 9.90894 1.44517 9.08564C1.14725 8.26234 0.998291 7.42894 0.998291 6.58544C0.998291 4.91296 1.55958 3.51434 2.68217 2.38958C3.80476 1.26483 5.19327 0.702454 6.84772 0.702454C7.87257 0.702454 8.82176 0.939731 9.69529 1.41428C10.5688 1.88884 11.3349 2.57789 11.9936 3.48145C12.7605 2.52373 13.5661 1.82113 14.4104 1.37366C15.2547 0.926189 16.1644 0.702454 17.1394 0.702454C18.7981 0.702454 20.1899 1.26483 21.3146 2.38958C22.4394 3.51434 23.0018 4.91296 23.0018 6.58544C23.0018 7.42894 22.8528 8.26127 22.5549 9.08242C22.257 9.90355 21.7357 10.8195 20.9911 11.8302C20.2465 12.8409 19.247 13.9881 17.9925 15.2718C16.738 16.5555 15.1474 18.0796 13.2205 19.8439L11.9936 20.9432Z" />
              </svg>
            ) : (
              <svg
                className="btnAnimated fill-black dark:fill-white"
                width="24"
                height="21"
                viewBox="0 0 24 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.9936 20.9432L10.773 19.8439C8.84619 18.0796 7.25661 16.5566 6.00429 15.2751C4.752 13.9935 3.75355 12.8474 3.00896 11.8367C2.26435 10.8259 1.74308 9.90894 1.44517 9.08564C1.14725 8.26234 0.998291 7.42894 0.998291 6.58544C0.998291 4.91296 1.55958 3.51434 2.68217 2.38958C3.80476 1.26483 5.19327 0.702454 6.84772 0.702454C7.87257 0.702454 8.82176 0.939731 9.69529 1.41428C10.5688 1.88884 11.3349 2.57789 11.9936 3.48145C12.7605 2.52373 13.5661 1.82113 14.4104 1.37366C15.2547 0.926189 16.1644 0.702454 17.1394 0.702454C18.7981 0.702454 20.1899 1.26483 21.3146 2.38958C22.4394 3.51434 23.0018 4.91296 23.0018 6.58544C23.0018 7.42894 22.8528 8.26127 22.5549 9.08242C22.257 9.90355 21.7357 10.8195 20.9911 11.8302C20.2465 12.8409 19.247 13.9881 17.9925 15.2718C16.738 16.5555 15.1474 18.0796 13.2205 19.8439L11.9936 20.9432Z" />
              </svg>
            )}
          </button>
          <div className="col pt-1 text-center dark:text-white name_light">
            <h6 className="grayfeed mb-0 text-md">
              <small>{quantityLikes ? quantityLikes : "0"}</small>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};
export default Like;
