import React, { useEffect, useState } from "react";
import Link from "next/link";
import { closeMblMenu } from "../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import UserId from "./userId";
import { Metamask_comp_text } from "./metamask/Metamask";
import { useMoralis } from "react-moralis";
import Image from "next/image";
import Login_button from "./login_button";

const MblNavbarOf = ({ theme }) => {
  const { mblMenu } = useSelector((state) => state.counter);
  const [theme1, setTheme1] = useState("");
  const dispatch = useDispatch();
  const [profileShow, setProfileShow] = useState(false);
  const router = useRouter();
  const [navItemValue, setNavItemValue] = useState(1);
  const [navText, setnavText] = useState("");
  const { Moralis, isInitialized, user } = useMoralis();
  const [tap, setTap] = useState("0");
  const infoWallet = user?.attributes;
  const walletAddress = infoWallet?.ethAddress;

  useEffect(() => {}, [isInitialized]);

  const handleItemDropdown = (e) => {
    const target = e.target.closest("li");

    if (!target.classList.contains("show")) {
      target.classList.add("show");
    } else {
      target.classList.remove("show");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        dispatch(closeMblMenu());
      }
    });

    if (router.asPath === "/") {
      localStorage.setItem("navItemValue", 1);
    }
    if (router.asPath === "/home/home_2") {
      localStorage.setItem("navItemValue", 2);
    }
    if (router.asPath === "/home/home_3") {
      localStorage.setItem("navItemValue", 3);
    }
    if (router.asPath === "/home/home_4") {
      localStorage.setItem("navItemValue", 4);
    }
    if (router.asPath === "/home/home_5") {
      localStorage.setItem("navItemValue", 5);
    }
    if (router.asPath === "/home/home_6") {
      localStorage.setItem("navItemValue", 6);
    }
    if (router.asPath.includes("item")) {
      localStorage.setItem("navItemValue", 7);
    }
    if (router.asPath.includes("collection/avatar")) {
      localStorage.setItem("navItemValue", 9);
    }
    if (router.asPath === "/collection/explore_collection") {
      localStorage.setItem("navItemValue", 8);
    }
    if (router.asPath.includes("activity")) {
      localStorage.setItem("navItemValue", 10);
    }
    if (router.asPath.includes("ranking")) {
      localStorage.setItem("navItemValue", 11);
    }
    if (router.asPath.includes("user")) {
      localStorage.setItem("navItemValue", 12);
    }
    if (router.asPath.includes("profile")) {
      localStorage.setItem("navItemValue", 13);
    }
    if (router.asPath.includes("about")) {
      localStorage.setItem("navItemValue", 14);
    }
    if (router.asPath.includes("contact")) {
      localStorage.setItem("navItemValue", 15);
    }
    if (router.asPath.includes("wallet")) {
      localStorage.setItem("navItemValue", 16);
    }
    if (router.asPath.includes("404")) {
      localStorage.setItem("navItemValue", 18);
    }
    if (router.asPath.includes("tarms")) {
      localStorage.setItem("navItemValue", 19);
    }
    if (router.asPath.includes("help_center")) {
      localStorage.setItem("navItemValue", 20);
    }
    if (router.asPath.includes("partners")) {
      localStorage.setItem("navItemValue", 23);
    }
    if (router.asPath.includes("blog")) {
      localStorage.setItem("navItemValue", 24);
    }
    if (router.asPath.includes("single_post")) {
      localStorage.setItem("navItemValue", 25);
    }
    if (router.asPath.includes("newsletter")) {
      localStorage.setItem("navItemValue", 26);
    }
    if (router.asPath.includes("create")) {
      localStorage.setItem("navItemValue", 28);
    }

    const value = localStorage.getItem("navItemValue");
    setNavItemValue(+value);

    if (navItemValue > 0 && navItemValue <= 4) {
      setnavText("home");
    } else if (navItemValue > 19 && navItemValue <= 26) {
      setnavText("resources");
    } else if (navItemValue === 28) {
      setnavText("create");
    } else if (navItemValue === 27) {
      setnavText("collection");
    }
  }, [dispatch, navItemValue, router]);
  const homenavData = [
    {
      id: 4,
      text: "home",
      url: "/home/home_4",
    },
  ];

  const pageTextData = [
    {
      id: 7,
      text: "Item Details",
      href: "/item/item_20",
    },
    {
      id: 8,
      text: "Explore Collections",
      href: "/collection/explore_collection",
    },
    {
      id: 9,
      text: "Collection",
      href: "/collection/avatar_1",
    },
    {
      id: 10,
      text: "Activity",
      href: "/activity",
    },
    {
      id: 11,
      text: "Rankings",
      href: "/rankings",
    },
    {
      id: 12,
      text: "User",
      href: "/user/avatar_6",
    },
    {
      id: 13,
      text: "Edit Profile",
      href: "/profile/user_avatar",
    },
    {
      id: 14,
      text: "About",
      href: "/about",
    },
    {
      id: 15,
      text: "Contact",
      href: "/contact",
    },
    {
      id: 16,
      text: "Wallet",
      href: "/wallet",
    },
    {
      id: 17,
      text: "Login",
      href: "/login",
    },
    {
      id: 18,
      text: "Page 404",
      href: "/404",
    },
    {
      id: 19,
      text: "Terms Of Service",
      href: "/tarms",
    },
  ];

  const resourcesData = [
    {
      id: 20,
      text: "Help Center",
      href: "/help_center",
    },
  ];

  const [themeAtual, setThemeAtual] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localStorageTheme = localStorage.getItem("theme") || "system";
      setThemeAtual(localStorageTheme);
    }
  }, [theme]);

  useEffect(() => {
    if (themeAtual == "dark") {
      setTheme1("dark");
    } else {
      setTheme1("light");
    }
  }, [themeAtual]);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user]);

  return (
    <div
      className={
        mblMenu
          ? "js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent nav-menu--is-open"
          : "js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent"
      }
      style={
        !isLargeScreen
          ? {
              backgroundColor: "rgb(38 41 45 / 0.5)",
              backdropFilter: "blur(7px)",
            }
          : {}
      }
    >
      {/* <!-- Mobile Logo / Menu Close --> */}
      <div className="t-0 dark:bg-jacarta-800 fixed left-0 z-10 flex w-full items-center justify-between bg-white p-6 lg:hidden">
        {/* <!-- Mobile Logo --> */}

        <Link href="/">
          <a>
            <img
              src="/images/socialverse.png"
              className="max-h-7 dark:hidden"
              alt="Xhibiter | NFT Marketplace"
            />

            <img
              src="/images/socialverse.png"
              alt="Xhibiter | NFT Marketplace"
              className="max-h-7 dark:block hidden"
            />
          </a>
        </Link>

        {/* <!-- Mobile Menu Close --> */}
        <button
          className="js-mobile-close border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
          onClick={() => dispatch(closeMblMenu())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
          </svg>
        </button>
      </div>

      {/* <!-- Mobile Search --> */}
      {/* <form action="search" className="relative mt-24 mb-8 w-full lg:hidden">
        {/* <input type="search" className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-2xl border py-3 px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white" placeholder="Search"> */}
      {/*  <input
          type="search"
          className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-button border py-3 px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
          placeholder="Search"
        />
        <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-500 h-4 w-4 dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
          </svg>
        </span>
      </form> */}

      {/* <!-- Primary Nav --> */}
      <nav className="navbar w-full">
        <ul className="flex flex-col lg:flex-row">
          <li className="js-nav-dropdown group relative">
            <button
              className={
                router.asPath === "/home/home_4"
                  ? "dropdown-toggle font-display hover:text-accent focus:text-accent flex items-center justify-between py-3.5 text-base text-jacarta-700 dark:lg:text-jacarta-700 lg:text-white lg:px-5 w-full"
                  : "dropdown-toggle text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full"
              }
              onClick={(e) => handleItemDropdown(e)}
            >
              <Link href="/">
                <a>
                  <span className={navText === "home" ? "text-accent" : ""}>
                    Home
                  </span>

                  {/* <i className="lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-4 w-4 dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                    </svg>
                  </i> */}
                </a>
              </Link>
            </button>
          </li>
          <li className="js-nav-dropdown nav-item dropdown group relative">
            <button
              className={
                router.asPath === "/home/home_3"
                  ? "hidden md:flex dropdown-toggle font-display hover:text-accent focus:text-accent  items-center justify-between py-3.5 text-base lg:text-white text-jacarta-700 dark:text-white lg:px-5 w-full"
                  : "hidden md:flex dropdown-toggle text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent  items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full"
              }
              onClick={(e) => handleItemDropdown(e)}
            >
              <span className={navText === "collection" ? "text-accent" : ""}>
                Explore
              </span>

              <i className="lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                </svg>
              </i>
            </button>
            <ul
              className="dropdown-menu dark:bg-jacarta-800 -left-6 top-[85%] z-10 hidden grid-flow-col grid-rows-2 gap-x-4 whitespace-nowrap rounded-xl bg-white transition-all will-change-transform group-hover:visible group-hover:opacity-100 lg:invisible lg:absolute lg:flex flex-col lg:translate-y-4 lg:py-8 lg:px-2 lg:opacity-0  lg:group-hover:translate-y-2 relative"
              aria-labelledby="navDropdown-1"
              style={{ padding: "0", width: "180px" }}
            >
              <li className="mb-2">
                <Link href="/collection/explore_collection">
                  <a
                    className="dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors"
                    onClick={() => {
                      dispatch(closeMblMenu());
                      localStorage.setItem("navItemValue", 27);
                    }}
                  >
                    <span className="mr-3 rounded-xl p-[0.375rem]">
                      <svg
                        width="20"
                        height="24"
                        viewBox="0 0 20 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                      </svg>
                    </span>
                    <span className="font-display text-jacarta-700 text-sm dark:text-white">
                      Shop
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/feed/global">
                  <a
                    className="dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors"
                    onClick={() => {
                      dispatch(closeMblMenu());
                      localStorage.setItem("navItemValue", 27);
                    }}
                  >
                    <span className="mr-3 rounded-xl p-[0.375rem]">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 28 28"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" h-4 w-4 dark:fill-white"
                      >
                        <path d="M14 25.6667C12.3667 25.6667 10.8403 25.3604 9.42083 24.7479C8.00138 24.1354 6.76666 23.3042 5.71666 22.2542C4.66666 21.2042 3.84027 19.9646 3.2375 18.5354C2.63472 17.1063 2.33333 15.575 2.33333 13.9417C2.33333 12.3083 2.63472 10.7868 3.2375 9.37708C3.84027 7.96736 4.66666 6.7375 5.71666 5.6875C6.76666 4.6375 8.00138 3.81597 9.42083 3.22292C10.8403 2.62986 12.3667 2.33333 14 2.33333C15.6333 2.33333 17.1597 2.62986 18.5792 3.22292C19.9986 3.81597 21.2333 4.6375 22.2833 5.6875C23.3333 6.7375 24.1597 7.96736 24.7625 9.37708C25.3653 10.7868 25.6667 12.3083 25.6667 13.9417C25.6667 15.575 25.3653 17.1063 24.7625 18.5354C24.1597 19.9646 23.3333 21.2042 22.2833 22.2542C21.2333 23.3042 19.9986 24.1354 18.5792 24.7479C17.1597 25.3604 15.6333 25.6667 14 25.6667ZM14 23.975C14.6806 23.275 15.2493 22.4729 15.7062 21.5687C16.1632 20.6646 16.5375 19.5903 16.8292 18.3458H11.2C11.4722 19.5125 11.8368 20.5625 12.2937 21.4958C12.7507 22.4292 13.3194 23.2556 14 23.975ZM11.5208 23.625C11.0347 22.8861 10.6167 22.0889 10.2667 21.2333C9.91666 20.3778 9.625 19.4153 9.39166 18.3458H5.01666C5.75555 19.7264 6.61111 20.8104 7.58333 21.5979C8.55555 22.3854 9.86805 23.0611 11.5208 23.625ZM16.5083 23.5958C17.9083 23.1486 19.1674 22.4778 20.2854 21.5833C21.4035 20.6889 22.3028 19.6097 22.9833 18.3458H18.6375C18.3847 19.3958 18.0882 20.3486 17.7479 21.2042C17.4076 22.0597 16.9944 22.8569 16.5083 23.5958ZM4.43333 16.5958H9.07083C9.0125 16.0708 8.97847 15.5993 8.96875 15.1813C8.95902 14.7632 8.95416 14.35 8.95416 13.9417C8.95416 13.4556 8.96388 13.0229 8.98333 12.6438C9.00277 12.2646 9.04166 11.8417 9.1 11.375H4.43333C4.29722 11.8417 4.20486 12.2597 4.15624 12.6292C4.10763 12.9986 4.08333 13.4361 4.08333 13.9417C4.08333 14.4472 4.10763 14.8993 4.15624 15.2979C4.20486 15.6965 4.29722 16.1292 4.43333 16.5958ZM10.8792 16.5958H17.15C17.2278 15.9931 17.2764 15.5021 17.2958 15.1229C17.3153 14.7438 17.325 14.35 17.325 13.9417C17.325 13.5528 17.3153 13.1785 17.2958 12.8188C17.2764 12.459 17.2278 11.9778 17.15 11.375H10.8792C10.8014 11.9778 10.7528 12.459 10.7333 12.8188C10.7139 13.1785 10.7042 13.5528 10.7042 13.9417C10.7042 14.35 10.7139 14.7438 10.7333 15.1229C10.7528 15.5021 10.8014 15.9931 10.8792 16.5958ZM18.9 16.5958H23.5667C23.7028 16.1292 23.7951 15.6965 23.8437 15.2979C23.8924 14.8993 23.9167 14.4472 23.9167 13.9417C23.9167 13.4361 23.8924 12.9986 23.8437 12.6292C23.7951 12.2597 23.7028 11.8417 23.5667 11.375H18.9292C18.9875 12.0556 19.0264 12.5757 19.0458 12.9354C19.0653 13.2951 19.075 13.6306 19.075 13.9417C19.075 14.3694 19.0604 14.7729 19.0312 15.1521C19.0021 15.5313 18.9583 16.0125 18.9 16.5958ZM18.6083 9.625H22.9833C22.3417 8.28333 21.4618 7.16528 20.3437 6.27083C19.2257 5.37639 17.9375 4.74444 16.4792 4.375C16.9653 5.09444 17.3785 5.87222 17.7187 6.70833C18.059 7.54444 18.3556 8.51667 18.6083 9.625ZM11.2 9.625H16.8583C16.6444 8.59444 16.2847 7.59792 15.7792 6.63542C15.2736 5.67292 14.6806 4.82222 14 4.08333C13.3778 4.60833 12.8528 5.29861 12.425 6.15417C11.9972 7.00972 11.5889 8.16667 11.2 9.625ZM5.01666 9.625H9.42083C9.63472 8.575 9.90694 7.63681 10.2375 6.81042C10.5681 5.98403 10.9861 5.18194 11.4917 4.40417C10.0333 4.77361 8.75972 5.39583 7.67083 6.27083C6.58194 7.14583 5.69722 8.26389 5.01666 9.625Z" />
                      </svg>
                    </span>
                    <span className="font-display text-jacarta-700 text-sm dark:text-white">
                      Social
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/help_center">
                  <a
                    className="dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors"
                    onClick={() => {
                      dispatch(closeMblMenu());
                      localStorage.setItem("navItemValue", 27);
                    }}
                  >
                    <span className="mr-3 rounded-xl p-[0.375rem]">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" h-4 w-4 dark:fill-white"
                      >
                        <path
                          d="M13.1021 0.75867C6.17518 0.862833 0.706588 6.53975 0.75867 13.4145C0.862833 20.3414 6.53975 25.81 13.4145 25.7579C20.3414 25.6538 25.81 19.9769 25.7579 13.1021C25.6538 6.17518 19.9769 0.706588 13.1021 0.75867ZM13.1021 2.42529C14.977 2.37321 16.7478 2.84194 18.2582 3.62317L16.5915 6.43559C15.602 5.91477 14.4562 5.65436 13.2583 5.65436C12.0604 5.65436 10.9146 5.91477 9.92507 6.43559L8.25845 3.62317C9.71674 2.89402 11.3313 2.42529 13.1021 2.42529ZM6.43559 16.5915L3.62317 18.2582C2.89402 16.7999 2.42529 15.1332 2.42529 13.3625C2.37321 11.4875 2.84194 9.71674 3.62317 8.20637L6.43559 9.87298C5.91477 10.8625 5.65436 12.0083 5.65436 13.2062C5.65436 14.4041 5.91477 15.602 6.43559 16.5915ZM13.4145 24.0913C11.5396 24.1434 9.76882 23.6747 8.25845 22.8934L9.92507 20.081C10.9146 20.6018 12.0604 20.8622 13.2583 20.8622C14.4562 20.8622 15.602 20.6018 16.5915 20.081L18.2582 22.8934C16.7999 23.6226 15.1853 24.0913 13.4145 24.0913ZM13.2583 19.2477C9.92506 19.2477 7.26889 16.5395 7.26889 13.2583C7.26889 9.92506 9.97715 7.26889 13.2583 7.26889C16.5915 7.26889 19.2477 9.97715 19.2477 13.2583C19.2477 16.5915 16.5915 19.2477 13.2583 19.2477ZM20.081 16.5915C20.6018 15.602 20.8622 14.4562 20.8622 13.2583C20.8622 12.0604 20.6018 10.9146 20.081 9.92507L22.8934 8.25845C23.6226 9.71674 24.0913 11.3834 24.0913 13.1541C24.1434 15.0291 23.6747 16.7999 22.8934 18.3102L20.081 16.5915Z"
                          fill="black"
                          className="dark:fill-white"
                        />
                      </svg>
                    </span>
                    <span className="font-display text-jacarta-700 text-sm dark:text-white">
                      Help Center
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* <!-- Mobile Connect Wallet / Socials --> */}
      <div className="mt-10 w-full lg:hidden">
        <div>
          <ul className="mt-10 mb-10">
            <li>
              <span className="text-accent font-display">Explore</span>
              <ul>
                <li className="">
                  <Link href="/collection/explore_collection">
                    <a
                      className="mt-2 hover:text-accent focus:text-accent flex items-center transition-colors"
                      onClick={() => {
                        dispatch(closeMblMenu());
                        localStorage.setItem("navItemValue", 27);
                      }}
                    >
                      <span className="mr-1 rounded-xl p-[0.375rem]">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
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
                        </svg>
                      </span>
                      <span className="font-display text-jacarta-700 text-sm dark:text-white">
                        Shop
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/feed/global">
                    <a
                      className="mt-2 hover:text-accent focus:text-accent flex items-center transition-colors"
                      onClick={() => {
                        dispatch(closeMblMenu());
                        localStorage.setItem("navItemValue", 27);
                      }}
                    >
                      <span className="mr-1 rounded-xl p-[0.375rem]">
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 28 28"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" h-4 w-4 dark:fill-white"
                        >
                          <path d="M14 25.6667C12.3667 25.6667 10.8403 25.3604 9.42083 24.7479C8.00138 24.1354 6.76666 23.3042 5.71666 22.2542C4.66666 21.2042 3.84027 19.9646 3.2375 18.5354C2.63472 17.1063 2.33333 15.575 2.33333 13.9417C2.33333 12.3083 2.63472 10.7868 3.2375 9.37708C3.84027 7.96736 4.66666 6.7375 5.71666 5.6875C6.76666 4.6375 8.00138 3.81597 9.42083 3.22292C10.8403 2.62986 12.3667 2.33333 14 2.33333C15.6333 2.33333 17.1597 2.62986 18.5792 3.22292C19.9986 3.81597 21.2333 4.6375 22.2833 5.6875C23.3333 6.7375 24.1597 7.96736 24.7625 9.37708C25.3653 10.7868 25.6667 12.3083 25.6667 13.9417C25.6667 15.575 25.3653 17.1063 24.7625 18.5354C24.1597 19.9646 23.3333 21.2042 22.2833 22.2542C21.2333 23.3042 19.9986 24.1354 18.5792 24.7479C17.1597 25.3604 15.6333 25.6667 14 25.6667ZM14 23.975C14.6806 23.275 15.2493 22.4729 15.7062 21.5687C16.1632 20.6646 16.5375 19.5903 16.8292 18.3458H11.2C11.4722 19.5125 11.8368 20.5625 12.2937 21.4958C12.7507 22.4292 13.3194 23.2556 14 23.975ZM11.5208 23.625C11.0347 22.8861 10.6167 22.0889 10.2667 21.2333C9.91666 20.3778 9.625 19.4153 9.39166 18.3458H5.01666C5.75555 19.7264 6.61111 20.8104 7.58333 21.5979C8.55555 22.3854 9.86805 23.0611 11.5208 23.625ZM16.5083 23.5958C17.9083 23.1486 19.1674 22.4778 20.2854 21.5833C21.4035 20.6889 22.3028 19.6097 22.9833 18.3458H18.6375C18.3847 19.3958 18.0882 20.3486 17.7479 21.2042C17.4076 22.0597 16.9944 22.8569 16.5083 23.5958ZM4.43333 16.5958H9.07083C9.0125 16.0708 8.97847 15.5993 8.96875 15.1813C8.95902 14.7632 8.95416 14.35 8.95416 13.9417C8.95416 13.4556 8.96388 13.0229 8.98333 12.6438C9.00277 12.2646 9.04166 11.8417 9.1 11.375H4.43333C4.29722 11.8417 4.20486 12.2597 4.15624 12.6292C4.10763 12.9986 4.08333 13.4361 4.08333 13.9417C4.08333 14.4472 4.10763 14.8993 4.15624 15.2979C4.20486 15.6965 4.29722 16.1292 4.43333 16.5958ZM10.8792 16.5958H17.15C17.2278 15.9931 17.2764 15.5021 17.2958 15.1229C17.3153 14.7438 17.325 14.35 17.325 13.9417C17.325 13.5528 17.3153 13.1785 17.2958 12.8188C17.2764 12.459 17.2278 11.9778 17.15 11.375H10.8792C10.8014 11.9778 10.7528 12.459 10.7333 12.8188C10.7139 13.1785 10.7042 13.5528 10.7042 13.9417C10.7042 14.35 10.7139 14.7438 10.7333 15.1229C10.7528 15.5021 10.8014 15.9931 10.8792 16.5958ZM18.9 16.5958H23.5667C23.7028 16.1292 23.7951 15.6965 23.8437 15.2979C23.8924 14.8993 23.9167 14.4472 23.9167 13.9417C23.9167 13.4361 23.8924 12.9986 23.8437 12.6292C23.7951 12.2597 23.7028 11.8417 23.5667 11.375H18.9292C18.9875 12.0556 19.0264 12.5757 19.0458 12.9354C19.0653 13.2951 19.075 13.6306 19.075 13.9417C19.075 14.3694 19.0604 14.7729 19.0312 15.1521C19.0021 15.5313 18.9583 16.0125 18.9 16.5958ZM18.6083 9.625H22.9833C22.3417 8.28333 21.4618 7.16528 20.3437 6.27083C19.2257 5.37639 17.9375 4.74444 16.4792 4.375C16.9653 5.09444 17.3785 5.87222 17.7187 6.70833C18.059 7.54444 18.3556 8.51667 18.6083 9.625ZM11.2 9.625H16.8583C16.6444 8.59444 16.2847 7.59792 15.7792 6.63542C15.2736 5.67292 14.6806 4.82222 14 4.08333C13.3778 4.60833 12.8528 5.29861 12.425 6.15417C11.9972 7.00972 11.5889 8.16667 11.2 9.625ZM5.01666 9.625H9.42083C9.63472 8.575 9.90694 7.63681 10.2375 6.81042C10.5681 5.98403 10.9861 5.18194 11.4917 4.40417C10.0333 4.77361 8.75972 5.39583 7.67083 6.27083C6.58194 7.14583 5.69722 8.26389 5.01666 9.625Z" />
                        </svg>
                      </span>
                      <span className="font-display text-jacarta-700 text-sm dark:text-white">
                        Social
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/help_center">
                    <a
                      className="mt-2 hover:text-accent focus:text-accent flex items-center  transition-colors"
                      onClick={() => {
                        dispatch(closeMblMenu());
                        localStorage.setItem("navItemValue", 27);
                      }}
                    >
                      <span className="mr-1 rounded-xl p-[0.375rem]">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" h-4 w-4 dark:fill-white"
                        >
                          <path
                            d="M13.1021 0.75867C6.17518 0.862833 0.706588 6.53975 0.75867 13.4145C0.862833 20.3414 6.53975 25.81 13.4145 25.7579C20.3414 25.6538 25.81 19.9769 25.7579 13.1021C25.6538 6.17518 19.9769 0.706588 13.1021 0.75867ZM13.1021 2.42529C14.977 2.37321 16.7478 2.84194 18.2582 3.62317L16.5915 6.43559C15.602 5.91477 14.4562 5.65436 13.2583 5.65436C12.0604 5.65436 10.9146 5.91477 9.92507 6.43559L8.25845 3.62317C9.71674 2.89402 11.3313 2.42529 13.1021 2.42529ZM6.43559 16.5915L3.62317 18.2582C2.89402 16.7999 2.42529 15.1332 2.42529 13.3625C2.37321 11.4875 2.84194 9.71674 3.62317 8.20637L6.43559 9.87298C5.91477 10.8625 5.65436 12.0083 5.65436 13.2062C5.65436 14.4041 5.91477 15.602 6.43559 16.5915ZM13.4145 24.0913C11.5396 24.1434 9.76882 23.6747 8.25845 22.8934L9.92507 20.081C10.9146 20.6018 12.0604 20.8622 13.2583 20.8622C14.4562 20.8622 15.602 20.6018 16.5915 20.081L18.2582 22.8934C16.7999 23.6226 15.1853 24.0913 13.4145 24.0913ZM13.2583 19.2477C9.92506 19.2477 7.26889 16.5395 7.26889 13.2583C7.26889 9.92506 9.97715 7.26889 13.2583 7.26889C16.5915 7.26889 19.2477 9.97715 19.2477 13.2583C19.2477 16.5915 16.5915 19.2477 13.2583 19.2477ZM20.081 16.5915C20.6018 15.602 20.8622 14.4562 20.8622 13.2583C20.8622 12.0604 20.6018 10.9146 20.081 9.92507L22.8934 8.25845C23.6226 9.71674 24.0913 11.3834 24.0913 13.1541C24.1434 15.0291 23.6747 16.7999 22.8934 18.3102L20.081 16.5915Z"
                            fill="black"
                            className="dark:fill-white"
                          />
                        </svg>
                      </span>
                      <span className="font-display text-jacarta-700 text-sm dark:text-white">
                        Help Center
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Metamask_comp_text />
        <hr className="dark:bg-jacarta-600 bg-jacarta-100 my-5 h-px border-0" />
        {/* <!-- Socials --> */}
        <div className="flex items-center justify-center space-x-5">
          <a href="#" className="group">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook"
              className="group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
            </svg>
          </a>
          <a href="#" className="group">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="twitter"
              className="group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
            </svg>
          </a>
          <a href="#" className="group">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="discord"
              className="group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
            </svg>
          </a>
          <a href="#" className="group">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="instagram"
              className="group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
            </svg>
          </a>
          <a href="#" className="group">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="tiktok"
              className="group-hover:fill-accent fill-jacarta-300 h-5 w-5 dark:group-hover:fill-white"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* <!-- Actions --> */}
      <div className="hidden lg:flex ">
        {/* <!-- Profile --> */}
        <div className="js-nav-dropdown group-dropdown relative">
          <Login_button />
          {/* <Link href="/login">
            <a className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 dark:bg-white/[.15] hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
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
              <span
                className="text_space font-display text-jacarta-700 mt-1 text-base dark:text-white"
                style={{ whiteSpace: "nowrap" }}
              >
                login in
              </span>
            </a>
          </Link> */}
        </div>
        {/* <!-- Dark Mode --> */}
        {/* <button
          href="#"
          className="border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent js-dark-mode-trigger ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
          aria-label="dark"
          onClick={theme}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-700 dark-mode-light h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:hidden"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-jacarta-700 dark-mode-dark hidden h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:block dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"></path>
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default MblNavbarOf;
