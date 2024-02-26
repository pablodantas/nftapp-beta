import React from "react";
import { useMetaMask } from "metamask-react";
import { useDispatch } from "react-redux";
import { walletModalShow } from "../../redux/counterSlice";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import { closeMblMenu } from "../../redux/counterSlice";
import Login_button from "../login_button"

const Metamask_comp_text = () => {
  const dispatch = useDispatch();
  const { Moralis, isInitialized, user, logout, isAuthenticated } =
    useMoralis();
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  function handleLogout() {
    setTimeout(() => {
      dispatch(closeMblMenu());
    }, 500);

    logout();
  }

  if (!isAuthenticated)
    return (
      <Login_button />
    );

  if (isAuthenticated)
    return (
      <div>
        <button
          className="dark:bg-white/[.15] flex js-wallet btn_border_2 py-3 px-5 text-center font-semibold text-white transition-all"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mr-2 fill-jacarta-700 h-4 w-4 transition-colors dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 11V8l-5 4 5 4v-3h8v-2H7z"></path>
          </svg>
          <span className="text_space font-display text-jacarta-700 text-sm dark:text-white">
            Sign out
          </span>
        </button>
      </div>
    );
};

const Metamask_comp_login = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  if (status === "initializing")
    return (
      <button className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all">
        <Image
          src="/images/wallets/metamask_24.svg"
          className="mr-2.5 inline-block h-6 w-6"
          alt=""
          height={24}
          width={24}
        />
        <span className="ml-2.5">initializing</span>
      </button>
    );

  if (status === "unavailable")
    return (
      <button className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all">
        <Image
          src="/images/wallets/metamask_24.svg"
          className="mr-2.5 inline-block h-6 w-6"
          alt=""
          height={24}
          width={24}
        />
        <span className="ml-2.5">unavailable</span>
      </button>
    );

  if (status === "notConnected")
    return (
      <button
        className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all"
        onClick={connect}
      >
        <Image
          src="/images/socialverse.png"
          className="inline-block h-6 w-6"
          alt=""
          height={24}
          width={24}
        />
        <span className="ml-2.5">Sign in</span>
      </button>
    );

  if (status === "connecting")
    return (
      <button className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all">
        <Image
          src="/images/wallets/metamask_24.svg"
          className="mr-2.5 inline-block h-6 w-6"
          alt=""
          height={24}
          width={24}
        />
        <span className="ml-2.5">connecting</span>
      </button>
    );

  if (status === "connected")
    return (
      <button className="js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded-full border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all">
        <Image
          src="/images/wallets/metamask_24.svg"
          className=" inline-block h-6 w-6"
          alt=""
          height={24}
          width={24}
        />
        <span className="ml-2.5">Sign in</span>
      </button>
    );
};

const Confirm_checkout = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  if (status === "initializing")
    return (
      <button
        type="button"
        className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
      >
        initializing
      </button>
    );

  if (status === "unavailable")
    return (
      <button
        type="button"
        className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
      >
        unavailable
      </button>
    );

  if (status === "notConnected")
    return (
      <button
        type="button"
        className="bg-accent hover:bg-accent-dark rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
        // onClick={connect}
      >
        Confirm Checkout
      </button>
    );

  if (status === "connecting")
    return (
      <button
        type="button"
        className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
      >
        connecting
      </button>
    );

  if (status === "connected")
    return (
      <button
        type="button"
        className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
      >
        Confirm Checkout
      </button>
    );
};

const Metamask_comp_icon = ({ prop }) => {
  const dispatch = useDispatch();
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  if (status === "initializing")
    return (
      <div>
        <button
          className={
            prop.asPath === "/home/home_3"
              ? "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
              : "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
          }
          // onClick={() => dispatch(walletModalShow())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={
              prop.asPath === "/home/home_3"
                ? " h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white"
                : "fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
            }
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
          </svg>
        </button>
      </div>
    );

  if (status === "unavailable")
    return (
      <div>
        <button
          className={
            prop.asPath === "/home/home_3"
              ? "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
              : "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
          }
          // onClick={() => dispatch(walletModalShow())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={
              prop.asPath === "/home/home_3"
                ? " h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white"
                : "fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
            }
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
          </svg>
        </button>
      </div>
    );

  if (status === "notConnected")
    return (
      <button
        className={
          prop.asPath === "/home/home_3"
            ? "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-alljs-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
            : "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
        }
        // onClick={() => dispatch(walletModalShow())}
        // onClick={connect}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={
            prop.asPath === "/home/home_3"
              ? " h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white"
              : "fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
          }
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
        </svg>
      </button>
    );

  if (status === "connecting")
    return (
      <div>
        <button
          className={
            prop.asPath === "/home/home_3"
              ? "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
              : "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
          }
          // onClick={() => dispatch(walletModalShow())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={
              prop.asPath === "/home/home_3"
                ? " h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white"
                : "fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
            }
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
          </svg>
        </button>
      </div>
    );

  if (status === "connected")
    return (
      <div>
        <button
          className={
            prop.asPath === "/home/home_3"
              ? "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-alljs-wallet border-jacarta-100  focus:bg-accent group hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
              : "btn_disable dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
          }
          // onClick={() => dispatch(walletModalShow())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={
              prop.asPath === "/home/home_3"
                ? " h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white fill-white"
                : "fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
            }
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
          </svg>
        </button>
      </div>
    );
};

export {
  Metamask_comp_text,
  Metamask_comp_icon,
  Metamask_comp_login,
  Confirm_checkout,
};
