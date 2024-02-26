import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Modal_Seguir from "./modal_seguir"
const Seguir = ({ userPost, walletAddress }) => {

    const [seguiriu, setSeguiriu] = useState();

    const { Moralis } = useMoralis();

    useEffect(() => {
        async function likeCora() {
            if (userPost) {
                const like = Moralis.Object.extend('seguir');
                const query = new Moralis.Query(like);
                query.equalTo("seguindo", userPost?.toLowerCase());
                query.equalTo("seguidores", walletAddress?.toLowerCase());
                const likeIses = await query.first();
                setSeguiriu(likeIses?.attributes?.like);
            }
        }
        likeCora()
    }, [userPost]);

    
  const [alert_comment, setAlert] = useState('');
  const [showAlert, setShowElementAlert] = useState('');

  function closeModalAlert(){
    setAlert(false);
  }

    async function handleSeguir() {
        if (!await Moralis.User.current()) {
            const a = !alert_comment;
                setShowElementAlert('');
                setAlert(a);
          return;
        }
        if (walletAddress && userPost && walletAddress !== userPost) {
            const like = Moralis.Object.extend('seguir');
            const query = new Moralis.Query(like);
            query.equalTo("seguindo", userPost?.toLowerCase());
            query.equalTo("seguidores", walletAddress?.toLowerCase());
            const likeIses = await query.first();
            if (likeIses) {
                setSeguiriu(false);
                likeIses.destroy();
            } else {
                const newLike = new like();
                newLike.set("seguindo", userPost?.toLowerCase());
                newLike.set("seguidores", walletAddress?.toLowerCase());
                newLike.set("like", true);
                setSeguiriu(true);
                await newLike.save();
            }
        }
    };

    return (
        <>
        {alert_comment &&(
            <Modal_Seguir closeModalAlert={closeModalAlert}/>
        )
        }
            {walletAddress !== userPost ? (
                <button
                    className="ml-3 text-xs font-medium"
                    onClick={handleSeguir}
                >
                    {seguiriu ? (
                        <p className="dark:text-accent hover:underline">Following</p>
                    ) : (
                        <p className="dark:text-accent hover:underline">Follow</p>
                    )}
                </button>
            ) : (
                <p></p>
            )}
        </>
    );
};
export default Seguir;
