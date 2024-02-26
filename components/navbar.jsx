/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import MblNavbar from "./mblNavbar";
import { useSelector, useDispatch } from "react-redux";
import { openMblMenu } from "../redux/counterSlice";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import MblNavbarOf from "./mblNavbarOf";
import UseProfile from "./searchUser/useProfile";
import Modal_chat from "./modal/modal_chat";
import Chat_button from "./chat_button";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [scroll, setScroll] = useState(false);
  const [home3, setHome3] = useState(false);
  const [search, setSearch] = useState("");
  const [sugestion, setSugestion] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const { user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState("");

  useMemo(() => {
    if (user) {
      const userId = user?.attributes?.ethAddress;
      setWalletAddress(userId);
    }
  }, [user]);

  const { mblMenu } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleSticky = function () {
    if (window.scrollY >= 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  const HandleSugestion = () => {
    if (sugestion) {
      setSugestion(false);
    } else {
      setSugestion(true);
    }
  };

  const handleTheme = () => {
    if (theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const router = useRouter();
  const pid = router.asPath;

  // const router = useRouter();

  useEffect(() => {
    if (pid === "/home/home_3") {
      setHome3(true);
      // console.log('home 3');
    } else {
      setHome3(false);
      // console.log('not home 3');
    }
  }, [pid]);

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
  }, []);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    // adiciona o event listener para detectar a mudança de tamanho da tela
    window.addEventListener("resize", handleResize);

    // define o valor inicial do isLargeScreen
    setIsLargeScreen(window.innerWidth > 500);

    // remove o event listener quando o componente é desmontado
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [modalChatOpen, setModalChatOpen] = useState(false);

  const handleOpenModal = () => {
    setModalChatOpen(true);
  };

  const handleCloseModal = () => {
    setModalChatOpen(false);
  };

  if (walletAddress && user) {
    return (
      <>
        {modalChatOpen && <Modal_chat handleCloseModal={handleCloseModal} />}

        <div>
          <header
            className={
              scroll && home3
                ? "js-page-header page-header--transparent fixed top-0 z-20 w-full bg-white/[.15]  transition-colors js-page-header--is-sticky"
                : home3
                ? " js-page-header page-header--transparent fixed top-0 z-20 w-full bg-white/[.15]  transition-colors"
                : scroll && !mblMenu
                ? "blur_3 js-page-header fixed top-0 z-20 w-full  transition-colors js-page-header--is-sticky"
                : "js-page-header fixed top-0 z-20 w-full  transition-colors"
            }
          >
            <div className="flex items-center px-6 py-6 xl:px-24 ">
              {/* <!-- Logo --> */}
              {!showResults && (
                <>
                  <Link href="/">
                    <a className="shrink-0 flex items-center lg:hidden">
                      <img
                        src="/images/socialverse.png"
                        alt=""
                        className="logo_img logo_img_resp h-auto dark:hidden"
                      />
                      <img
                        src="/images/socialverse.png"
                        className="logo_img logo_img_resp h-auto hidden dark:block"
                        alt="Socialverse | NFT Marketplace"
                      />
                      <p className="logo_name hidden logo_name_resp dark:block">
                        BlackBuzz
                      </p>
                      <p className="logo_name_light logo_name_resp dark:hidden">
                        BlackBuzz
                      </p>
                      <div style={{ height: "32px" }}>
                        <div
                          aria-orientation="vertical"
                          role="separator"
                          style={{
                            background: "rgb(255 253 253 / 26%)",
                            height: "100%",
                            width: "1px",
                            margin: "0 24px",
                          }}
                        ></div>
                      </div>
                    </a>
                  </Link>
                </>
              )}
              <Link href="/">
                <a className="shrink-0 items-center hidden lg:flex">
                  <img
                    src="/images/socialverse.png"
                    alt=""
                    className="logo_img logo_img_resp h-auto dark:hidden"
                  />
                  <img
                    src="/images/socialverse.png"
                    className="logo_img logo_img_resp h-auto hidden dark:block"
                    alt="Socialverse | NFT Marketplace"
                  />
                  <p className="logo_name hidden logo_name_resp dark:block">
                    BlackBuzz
                  </p>
                  <p className="logo_name_light logo_name_resp dark:hidden">
                    BlackBuzz
                  </p>
                  <div style={{ height: "32px" }}>
                    <div
                      aria-orientation="vertical"
                      role="separator"
                      style={{
                        background: "rgb(255 253 253 / 26%)",
                        height: "100%",
                        width: "1px",
                        margin: "0 24px",
                      }}
                    ></div>
                  </div>
                </a>
              </Link>
              {/* Search Mb */}
              {/* <!-- Search --> */}
              <div
                className="relative w-full navbar_full"
                ref={!isLargeScreen ? wrapperRef : null}
              >
                <div
                  action="search"
                  className="w-full flex relative  mr-8  basis-3/12 flex  margin_resp"
                >
                  {!showResults && !isLargeScreen && (
                    <>
                      <button
                        className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] js-mobile-toggle border-jacarta-100  group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                        onClick={() => setShowResults(true)}
                      >
                        {/* <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 19.2058L13.7437 12.953C14.9412 11.5772 15.6687 9.78747 15.6687 7.82998C15.6687 3.50112 12.1656 0 7.83436 0C3.50308 0 0 3.50112 0 7.82998C0 12.1588 3.50308 15.66 7.83436 15.66C9.79295 15.66 11.5837 14.9329 12.9603 13.7472L19.2166 20L20 19.2058ZM7.83436 14.5414C4.12983 14.5414 1.11919 11.5324 1.11919 7.82998C1.11919 4.12752 4.12983 1.11857 7.83436 1.11857C11.5389 1.11857 14.5495 4.12752 14.5495 7.82998C14.5495 11.5324 11.5389 14.5414 7.83436 14.5414Z"
                            fill="black"
                            className="dark:fill-white"
                          />
                        </svg> */}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="dark:fill-white"
                            d="M21.2387 22.9873L13.464 15.2162C12.8742 15.6883 12.1903 16.0552 11.4124 16.317C10.6345 16.5789 9.80568 16.7098 8.92603 16.7098C6.68838 16.7098 4.80797 15.9471 3.28478 14.4216C1.76159 12.8962 1 11.0395 1 8.85152C1 6.66353 1.7627 4.80794 3.28811 3.28475C4.81353 1.76158 6.67024 1 8.85823 1C11.0462 1 12.9018 1.76238 14.425 3.28714C15.9482 4.81191 16.7098 6.66929 16.7098 8.85928C16.7098 9.73447 16.5812 10.5496 16.324 11.3046C16.0668 12.0596 15.6823 12.7764 15.1705 13.4549L23 21.226L21.2387 22.9873ZM8.8685 14.2822C10.3957 14.2822 11.6798 13.7586 12.7208 12.7113C13.7617 11.664 14.2822 10.3808 14.2822 8.86167C14.2822 7.34253 13.7618 6.05706 12.7209 5.00525C11.6801 3.95343 10.3968 3.42753 8.87107 3.42753C7.32913 3.42753 6.03638 3.95343 4.99284 5.00525C3.9493 6.05706 3.42753 7.34253 3.42753 8.86167C3.42753 10.3808 3.94849 11.664 4.99042 12.7113C6.03235 13.7586 7.32504 14.2822 8.8685 14.2822Z"
                          />
                        </svg>
                      </button>
                      <Link href={"/collection/explore_collection"}>
                        <button className="nav_none_2 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] js-mobile-toggle border-jacarta-100  group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
                          {/* <svg
                            width="20"
                            height="24"
                            viewBox="0 0 20 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 7H19V19.6067C19 20.5067 18.6435 21.3697 18.0089 22.0061C17.3742 22.6425 16.5134 23 15.6158 23H4.38417C3.48663 23 2.62585 22.6425 1.9912 22.0061C1.35655 21.3697 1 20.5067 1 19.6067V7Z"
                              stroke="black"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              className="dark:fillStrokeWhite"
                            />
                            <path
                              d="M5 10.0162V5.00954C5 3.94615 5.51538 2.9263 6.43276 2.17437C7.3501 1.42243 8.5944 1 9.8917 1C11.1891 1 12.4333 1.42243 13.3507 2.17437C14.2681 2.9263 14.7835 3.94615 14.7835 5.00954V10.0162"
                              stroke="black"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              className="dark:fillStrokeWhite"
                            />
                          </svg> */}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="dark:fillStrokeWhite"
                              d="M3 7H21V19.6067C21 20.5067 20.6435 21.3697 20.0089 22.0061C19.3742 22.6425 18.5134 23 17.6158 23H6.38417C5.48663 23 4.62585 22.6425 3.9912 22.0061C3.35655 21.3697 3 20.5067 3 19.6067V13.3034V7Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-miterlimit="10"
                            />
                            <path
                              className="dark:fillStrokeWhite"
                              d="M7 10.0162V5.00954C7 3.94615 7.51538 2.9263 8.43276 2.17437C9.3501 1.42243 10.5944 1 11.8917 1C13.1891 1 14.4333 1.42243 15.3507 2.17437C16.2681 2.9263 16.7835 3.94615 16.7835 5.00954V10.0162"
                              stroke="white"
                              stroke-width="2"
                              stroke-miterlimit="10"
                            />
                          </svg>
                        </button>
                      </Link>
                      <Link href={"/feed/global"}>
                        <button className="nav_none_1 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] js-mobile-toggle border-jacarta-100  group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
                          {/* <svg
                            width="22"
                            height="22"
                            viewBox="0 0 28 28"
                            xmlns="http://www.w3.org/2000/svg"
                            className="dark:fill-white"
                          >
                            <path d="M14 25.6667C12.3667 25.6667 10.8403 25.3604 9.42083 24.7479C8.00138 24.1354 6.76666 23.3042 5.71666 22.2542C4.66666 21.2042 3.84027 19.9646 3.2375 18.5354C2.63472 17.1063 2.33333 15.575 2.33333 13.9417C2.33333 12.3083 2.63472 10.7868 3.2375 9.37708C3.84027 7.96736 4.66666 6.7375 5.71666 5.6875C6.76666 4.6375 8.00138 3.81597 9.42083 3.22292C10.8403 2.62986 12.3667 2.33333 14 2.33333C15.6333 2.33333 17.1597 2.62986 18.5792 3.22292C19.9986 3.81597 21.2333 4.6375 22.2833 5.6875C23.3333 6.7375 24.1597 7.96736 24.7625 9.37708C25.3653 10.7868 25.6667 12.3083 25.6667 13.9417C25.6667 15.575 25.3653 17.1063 24.7625 18.5354C24.1597 19.9646 23.3333 21.2042 22.2833 22.2542C21.2333 23.3042 19.9986 24.1354 18.5792 24.7479C17.1597 25.3604 15.6333 25.6667 14 25.6667ZM14 23.975C14.6806 23.275 15.2493 22.4729 15.7062 21.5687C16.1632 20.6646 16.5375 19.5903 16.8292 18.3458H11.2C11.4722 19.5125 11.8368 20.5625 12.2937 21.4958C12.7507 22.4292 13.3194 23.2556 14 23.975ZM11.5208 23.625C11.0347 22.8861 10.6167 22.0889 10.2667 21.2333C9.91666 20.3778 9.625 19.4153 9.39166 18.3458H5.01666C5.75555 19.7264 6.61111 20.8104 7.58333 21.5979C8.55555 22.3854 9.86805 23.0611 11.5208 23.625ZM16.5083 23.5958C17.9083 23.1486 19.1674 22.4778 20.2854 21.5833C21.4035 20.6889 22.3028 19.6097 22.9833 18.3458H18.6375C18.3847 19.3958 18.0882 20.3486 17.7479 21.2042C17.4076 22.0597 16.9944 22.8569 16.5083 23.5958ZM4.43333 16.5958H9.07083C9.0125 16.0708 8.97847 15.5993 8.96875 15.1813C8.95902 14.7632 8.95416 14.35 8.95416 13.9417C8.95416 13.4556 8.96388 13.0229 8.98333 12.6438C9.00277 12.2646 9.04166 11.8417 9.1 11.375H4.43333C4.29722 11.8417 4.20486 12.2597 4.15624 12.6292C4.10763 12.9986 4.08333 13.4361 4.08333 13.9417C4.08333 14.4472 4.10763 14.8993 4.15624 15.2979C4.20486 15.6965 4.29722 16.1292 4.43333 16.5958ZM10.8792 16.5958H17.15C17.2278 15.9931 17.2764 15.5021 17.2958 15.1229C17.3153 14.7438 17.325 14.35 17.325 13.9417C17.325 13.5528 17.3153 13.1785 17.2958 12.8188C17.2764 12.459 17.2278 11.9778 17.15 11.375H10.8792C10.8014 11.9778 10.7528 12.459 10.7333 12.8188C10.7139 13.1785 10.7042 13.5528 10.7042 13.9417C10.7042 14.35 10.7139 14.7438 10.7333 15.1229C10.7528 15.5021 10.8014 15.9931 10.8792 16.5958ZM18.9 16.5958H23.5667C23.7028 16.1292 23.7951 15.6965 23.8437 15.2979C23.8924 14.8993 23.9167 14.4472 23.9167 13.9417C23.9167 13.4361 23.8924 12.9986 23.8437 12.6292C23.7951 12.2597 23.7028 11.8417 23.5667 11.375H18.9292C18.9875 12.0556 19.0264 12.5757 19.0458 12.9354C19.0653 13.2951 19.075 13.6306 19.075 13.9417C19.075 14.3694 19.0604 14.7729 19.0312 15.1521C19.0021 15.5313 18.9583 16.0125 18.9 16.5958ZM18.6083 9.625H22.9833C22.3417 8.28333 21.4618 7.16528 20.3437 6.27083C19.2257 5.37639 17.9375 4.74444 16.4792 4.375C16.9653 5.09444 17.3785 5.87222 17.7187 6.70833C18.059 7.54444 18.3556 8.51667 18.6083 9.625ZM11.2 9.625H16.8583C16.6444 8.59444 16.2847 7.59792 15.7792 6.63542C15.2736 5.67292 14.6806 4.82222 14 4.08333C13.3778 4.60833 12.8528 5.29861 12.425 6.15417C11.9972 7.00972 11.5889 8.16667 11.2 9.625ZM5.01666 9.625H9.42083C9.63472 8.575 9.90694 7.63681 10.2375 6.81042C10.5681 5.98403 10.9861 5.18194 11.4917 4.40417C10.0333 4.77361 8.75972 5.39583 7.67083 6.27083C6.58194 7.14583 5.69722 8.26389 5.01666 9.625Z"></path>
                          </svg> */}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="dark:fill-white"
                              d="M12.0004 24C10.3233 24 8.75668 23.6925 7.30058 23.0776C5.8445 22.4626 4.56913 21.6051 3.47446 20.505C2.37979 19.4049 1.52705 18.1226 0.916231 16.6579C0.30541 15.1933 0 13.6198 0 11.9374C0 10.2641 0.30541 8.69942 0.916231 7.24332C1.52705 5.78722 2.37979 4.52408 3.47446 3.4539C4.56913 2.38373 5.84401 1.54053 7.29912 0.924305C8.75423 0.308102 10.323 0 12.0053 0C13.6786 0 15.2406 0.308102 16.6913 0.924305C18.142 1.54053 19.4147 2.38373 20.5094 3.4539C21.604 4.52408 22.4595 5.78854 23.0757 7.24727C23.6919 8.706 24 10.2739 24 11.9508C24 13.63 23.6919 15.2005 23.0757 16.6623C22.4595 18.124 21.604 19.4049 20.5094 20.505C19.4147 21.6051 18.1399 22.4626 16.6849 23.0776C15.2299 23.6925 13.6684 24 12.0004 24ZM11.9757 21.6795C12.6222 21.0223 13.1602 20.2552 13.5897 19.3784C14.0192 18.5016 14.3825 17.4511 14.6796 16.227H9.33284C9.58929 17.3748 9.93792 18.4029 10.3787 19.3113C10.8196 20.2198 11.3519 21.0092 11.9757 21.6795ZM9.54449 21.3235C9.07559 20.6363 8.678 19.8793 8.35173 19.0522C8.02547 18.2252 7.74543 17.2835 7.5116 16.227H3.30639C3.99356 17.5404 4.80627 18.5824 5.74451 19.3532C6.68273 20.124 7.94939 20.7807 9.54449 21.3235ZM14.4356 21.2949C15.7826 20.8965 16.992 20.2529 18.0638 19.3641C19.1356 18.4752 20.011 17.4295 20.6899 16.227H16.5336C16.2827 17.2577 15.9875 18.1883 15.6481 19.0186C15.3087 19.849 14.9045 20.6077 14.4356 21.2949ZM2.72607 14.5115H7.20037C7.13232 14.0045 7.09352 13.5484 7.08398 13.1434C7.07444 12.7384 7.06966 12.3409 7.06966 11.9508C7.06966 11.4736 7.07921 11.0543 7.0983 10.6929C7.11738 10.3314 7.16095 9.92581 7.229 9.476H2.72607C2.60255 9.92581 2.51424 10.3267 2.46114 10.6786C2.40802 11.0304 2.38146 11.4545 2.38146 11.9508C2.38146 12.4363 2.40802 12.872 2.46114 13.2579C2.51424 13.6439 2.60255 14.0617 2.72607 14.5115ZM9.00635 14.5115H15.007C15.0726 13.9281 15.1122 13.453 15.1259 13.0861C15.1396 12.7193 15.1464 12.3409 15.1464 11.9508C15.1464 11.5691 15.1396 11.207 15.1259 10.8647C15.1122 10.5223 15.0723 10.0594 15.0061 9.476H9.00546C8.92911 10.0594 8.88139 10.5223 8.8623 10.8647C8.84321 11.207 8.83367 11.5691 8.83367 11.9508C8.83367 12.3409 8.84321 12.7193 8.8623 13.0861C8.88139 13.453 8.9294 13.9281 9.00635 14.5115ZM16.7835 14.5115H21.2712C21.3642 14.0617 21.4399 13.6439 21.4984 13.2579C21.5569 12.872 21.5862 12.4363 21.5862 11.9508C21.5862 11.4545 21.5569 11.0304 21.4984 10.6786C21.4399 10.3267 21.3642 9.92581 21.2712 9.476H16.8121C16.8395 10.1657 16.8627 10.6759 16.8818 11.0066C16.9009 11.3374 16.9104 11.6521 16.9104 11.9508C16.9104 12.36 16.8961 12.748 16.8675 13.1148C16.8388 13.4816 16.8108 13.9472 16.7835 14.5115ZM16.5049 7.74438H20.6899C20.0492 6.47626 19.1929 5.39778 18.1211 4.50894C17.0492 3.6201 15.8112 3.00513 14.407 2.66403C14.8759 3.362 15.28 4.11391 15.6195 4.91976C15.9589 5.7256 16.2541 6.66714 16.5049 7.74438ZM9.33284 7.74438H14.7082C14.5198 6.787 14.1843 5.82707 13.7017 4.86461C13.2192 3.90215 12.6438 3.06613 11.9757 2.35655C11.4056 2.86694 10.9153 3.53939 10.5049 4.37388C10.0945 5.20836 9.70382 6.33186 9.33284 7.74438ZM3.30639 7.74438H7.53497C7.74845 6.72441 8.00996 5.81627 8.31952 5.01997C8.62909 4.22367 9.02787 3.4479 9.51586 2.69266C8.10083 3.03376 6.86965 3.63173 5.8223 4.48655C4.77494 5.34136 3.9363 6.4273 3.30639 7.74438Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </Link>
                    </>
                  )}
                  {!isLargeScreen && showResults && (
                    <input
                      type="search"
                      className="input_color_hover text-jacarta-700  focus:ring-accent border-jacarta-100 w-full border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white placeholder-grey input_border"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onClick={() => setShowResults(true)}
                    />
                  )}
                  {isLargeScreen && (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute h-4 w-4"
                        style={{ top: "12px", marginLeft: "10px" }}
                      >
                        <path
                          d="M20 19.2058L13.7437 12.953C14.9412 11.5772 15.6687 9.78747 15.6687 7.82998C15.6687 3.50112 12.1656 0 7.83436 0C3.50308 0 0 3.50112 0 7.82998C0 12.1588 3.50308 15.66 7.83436 15.66C9.79295 15.66 11.5837 14.9329 12.9603 13.7472L19.2166 20L20 19.2058ZM7.83436 14.5414C4.12983 14.5414 1.11919 11.5324 1.11919 7.82998C1.11919 4.12752 4.12983 1.11857 7.83436 1.11857C11.5389 1.11857 14.5495 4.12752 14.5495 7.82998C14.5495 11.5324 11.5389 14.5414 7.83436 14.5414Z"
                          fill="black"
                          className="dark:fill-grey-holder"
                        />
                      </svg>
                      <input
                        type="search"
                        className="input_color_hover no-ring input_color_focus text-jacarta-700  border-jacarta-100 w-full border py-2 px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white placeholder-grey input_border"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={() => setShowResults(true)}
                        style={{ minWidth: "330px" }}
                      />
                    </>
                  )}
                </div>
                {showResults && search && (
                  <div
                    className="dark:bg-jacarta-800 absolute box_search bg-white"
                    ref={isLargeScreen ? wrapperRef : null}
                  >
                    <ul className="p-2">
                      <li className="">
                        <UseProfile addr={search} />
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {/* <!-- Menu / Actions --> */}
              <MblNavbar theme={handleTheme} scroll={handleSticky} />
              <Chat_button modalOpen={handleOpenModal} />
              {/* <!-- Mobile Menu Actions --> */}
              <div className="ml-auto flex lg:hidden">
                {/* <!-- Dark Mode --> */}
                {/* <button
                className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]  js-dark-mode-trigger border-jacarta-100  group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                onClick={handleTheme}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 dark-mode-light h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:hidden"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 dark-mode-dark hidden h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:block dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                </svg>
              </button> */}
                {/* <!-- Mobile Menu Toggle --> */}
                <button
                  className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] js-mobile-toggle border-jacarta-100  group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                  aria-label="open mobile menu"
                  onClick={() => {
                    dispatch(openMblMenu());
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>
          {/* <Wallet_modal /> */}
        </div>
      </>
    );
  } else {
    return (
      <div>
        <header
          className={
            scroll && home3
              ? "js-page-header page-header--transparent fixed top-0 z-20 w-full bg-white/[.15]  transition-colors js-page-header--is-sticky"
              : home3
              ? "js-page-header page-header--transparent fixed top-0 z-20 w-full bg-white/[.15]  transition-colors"
              : scroll
              ? "js-page-header fixed top-0 z-20 w-full  transition-colors js-page-header--is-sticky"
              : "js-page-header fixed top-0 z-20 w-full  transition-colors"
          }
        >
          <div className="flex items-center px-6 py-6 xl:px-24 ">
            {/* <!-- Logo --> */}
            <Link href="/">
              <a className="shrink-0 flex items-center">
                <img
                  src="/images/socialverse.png"
                  alt=""
                  className="logo_img h-auto dark:hidden"
                />
                <img
                  src="/images/socialverse.png"
                  className="logo_img h-auto hidden dark:block"
                  alt="Socialverse | NFT Marketplace"
                />
                <p className="logo_name hidden dark:block" translate="no">
                  BlackBuzz
                </p>
                <p className="logo_name_light dark:hidden" translate="no">
                  BlackBuzz
                </p>
              </a>
            </Link>
            {/* <!-- Search --> */}

            {/* <!-- Menu / Actions --> */}
            <MblNavbarOf theme={handleTheme} />
            {/* <!-- Mobile Menu Actions --> */}
            <div className="ml-auto flex lg:hidden">
              {/* <!-- Dark Mode --> */}
              {/* <button
                className="js-dark-mode-trigger border-jacarta-100 hover:bg-accent dark:hover:bg-accent focus:bg-accent group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                onClick={handleTheme}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 dark-mode-light h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:hidden"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 dark-mode-dark hidden h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:block dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                </svg>
              </button> */}
              {/* <!-- Mobile Menu Toggle --> */}
              <button
                className="js-mobile-toggle border-jacarta-100 hover:bg-accent dark:hover:bg-accent focus:bg-accent group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                aria-label="open mobile menu"
                onClick={() => {
                  dispatch(openMblMenu());
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        {/* <Wallet_modal /> */}
      </div>
    );
  }
};

export default Navbar;
