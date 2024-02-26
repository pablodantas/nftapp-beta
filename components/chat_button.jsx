import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import { closeMblMenu } from "../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import Modal_chat from "./modal/modal_chat";

const Chat_button = ({modalOpen}) => {

  return (
    <div className="hidden lg:flex">
      <button
        href="#"
        className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 md:flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent js-dark-mode-trigger ml-2  h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]  hover:fill-white"
        aria-label="dark"
        onClick={modalOpen}
        title={"Chat"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-jacarta-700 h-4 w-4 transition-colors dark:fill-white" d="M22.97 11.4752C22.97 16.7083 18.2754 20.9505 12.485 20.9505C11.4465 20.952 10.4124 20.8127 9.40896 20.5363C8.64355 20.937 6.88601 21.7058 3.92924 22.2067C3.66711 22.2499 3.4679 21.9684 3.57144 21.7166C4.03541 20.585 4.4548 19.0771 4.58062 17.7018C2.9751 16.0369 2 13.8576 2 11.4752C2 6.2422 6.69466 2 12.485 2C18.2754 2 22.97 6.2422 22.97 11.4752Z"/>
        </svg>
      </button>
    </div>
  );
};

export default Chat_button;
