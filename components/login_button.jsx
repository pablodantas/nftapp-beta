import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { closeMblMenu } from "../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal_chat from "./modal/modal_chat";
import Meta from "../components/Meta";
import { useMoralis } from "react-moralis";
import Image from "next/image";
import { useRouter } from "next/router";
import Moralis from "moralis-v1";

const Login_button = () => {
  const { authenticate, enableWeb3, isAuthenticated, user } = useMoralis();
  const [authError, setAuthError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [Finaly, setIsFinaly] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const chain = '0x38';
    try {
      setAuthError(null);
      setIsAuthenticating(true);
      // Enable web3 to get user address and chain
      await enableWeb3({
        throwOnError: true,
        provider: "metamesk",
      });
      const { account, chainId } = Moralis;
      if (!account) {
        throw new Error("Login Failed");
      }
      if (!chainId) {
        throw new Error("Login Failed");
      }
      if (!isAuthenticated && account && chainId) {
        const chainId = parseInt(chain);
        //chainId must match the testnet/mainnet of the web3auth clientId's project settings or the login won't work
        // Get message to sign from the auth api
        const { message } = await Moralis.Cloud.run("requestMessage", {
          address: account,
          chain: chain,
          network: "evm",
        });
        await authenticate({
          signingMessage: message,
          throwOnError: true,
          provider: "metamesk",
          chainId,
        });
      }
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
      setIsFinaly(true);
    }
  };

  const Router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("user", user.attributes.ethAddress);
      if (user.attributes.ethAddress) {
        const saveEdits = async () => {
          const User = Moralis.Object.extend("IfUser");
          const query = new Moralis.Query(User);
          query.equalTo("postOwner", user.attributes.ethAddress.toLowerCase());
          const myDetails = await query.first();
          if (!myDetails) {
            const User = Moralis.Object.extend("IfUser");
            const query = new User();
            query.set("postOwner", user.attributes.ethAddress.toLowerCase());
            query.set("carteira", 1000);
            query.set("nameUserLink", "");
            await query.save();
            Router.push("profile");
          } 
        };
        saveEdits();
      }
      setIsLoading(false);
    }
  }, [user]);

  return (
    <button
      className="cursor-pointer dark:hover:bg-jacarta-600 hover:bg-jacarta-50 dark:bg-white/[.15] hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors"
      onClick={() => handleLogin()}
    >
      {isLoading ? (
        <div className="mr-1 loader-container">
          <div className="loader h-4 w-4"></div>
        </div>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-jacarta-700 h-4 w-4 transition-colors
                dark:fill-white"
        >
          <path
            d="M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20ZM15 9V6L20 10L15 14V11H7V9H15Z"
            fill="black"
            className="dark:fill-white"
          />
        </svg>
      )}
      <span
        className="flex items-center text_space font-display text-jacarta-700 mt-1 text-base dark:text-white"
        style={{ whiteSpace: "nowrap" }}
      >
        {!isLoading && !user && "login in"}
        {isAuthenticating && "wait"}
        {user && "success"}
      </span>
    </button>
  );
};

export default Login_button;
