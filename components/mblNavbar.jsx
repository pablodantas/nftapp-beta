import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { closeMblMenu } from "../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import UserId from "./userId";
import { Metamask_comp_text, Metamask_comp_icon } from "./metamask/Metamask";
import { useMoralis } from "react-moralis";
import Image from "next/image";
import Activity_button from "./activity_button";
import UseProfile from "./searchUser/useProfile";
import { useTheme } from "next-themes";
import { useQuery } from "react-query";

const MblNavbar = ({ theme, scroll }) => {
  const { mblMenu } = useSelector((state) => state.counter);
  const [theme1, setTheme1] = useState("");
  const dispatch = useDispatch();
  const [profileShow, setProfileShow] = useState(false);
  const router = useRouter();
  const [navItemValue, setNavItemValue] = useState(1);
  const [navText, setnavText] = useState("");
  const { Moralis, isInitialized, user, logout, isAuthenticated } =
    useMoralis();

  const [tap, setTap] = useState("0");
  const infoWallet = user?.attributes;
  const walletAddress = infoWallet?.ethAddress;
  const [search, setSearch] = useState("");
  const [sugestion, setSugestion] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);

  const fetchProfile = async () => {
    const query = new Moralis.Query("IfUser");
    query.equalTo("postOwner", walletAddress);
    const result = await query.find();
    const a = JSON.parse(JSON.stringify(result));
    const b = a[0];
    return b;
  };

  const { data, isLoading } = useQuery(
    `userProfile${walletAddress}myprofile`,
    fetchProfile,
    {
      staleTime: 1000 * 50,
      //cacheTime: 111120000,
    }
  );
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const Router = useRouter();

  useEffect(() => {
    if (!user) {
      if (router.pathname === "/myprofile") {
        router.push("/");
      }
    }
    if (user) {
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
            Router.push("/profile");
          } // else {
          //   if (
          //     Router.pathname === "/feed/global" ||
          //     Router.pathname === "/collection/explore_collection"
          //   ) {
          //     Router.replace(Router.pathname);
          //   } else {
          //     Router.push("/myprofile");
          //   }
          // }
        };
        saveEdits();
      }
    }
  }, [user]);

  const HandleSugestion = () => {
    if (sugestion) {
      setSugestion(false);
    } else {
      setSugestion(true);
    }
  };

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
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
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
    if (router.asPath.includes("global")) {
      localStorage.setItem("navItemValue", 27);
    }
    if (router.asPath.includes("explore_collection")) {
      localStorage.setItem("navItemValue", 27);
    }
    if (router.asPath.includes("create")) {
      localStorage.setItem("navItemValue", 28);
    }
    if (router.asPath.includes("upload")) {
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

  const resourcesData = [
    {
      id: 20,
      text: "Help Center",
      href: "/help_center",
    },
  ];

  const [themeAtual, setThemeAtual] = useState("");

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme") || "system";
    setThemeAtual(localStorageTheme);
  }, [localStorage.getItem("theme")]);

  useEffect(() => {
    if (themeAtual == "dark") {
      setTheme1("dark");
    } else {
      setTheme1("light");
    }
  }, [themeAtual]);

  return (
    <>
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
              <img src="/images/socialverse.png" className="max-h-7 dark:hidden" />

              <img
                src="/images/socialverse.png"
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
        {/* <!-- Primary Nav --> */}
        <nav className="navbar w-full navbar-PAD">
          <ul className="flex flex-col lg:flex-row">
            <li className="js-nav-dropdown group relative">
              <button
                className={
                  router.asPath === "/home/home_4"
                    ? "hidden md:flex dropdown-toggle font-display hover:text-accent focus:text-accent items-center justify-between py-3.5 text-base text-jacarta-700 dark:lg:text-jacarta-700 lg:text-white lg:px-5 w-full"
                    : "hidden md:flex dropdown-toggle text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent  items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full"
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
                style={{ padding: "0" }}
              >
                <li>
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
                          className=" h-4 w-4 dark:fill-white"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.0004 23C10.463 23 9.02696 22.7181 7.6922 22.1544C6.35746 21.5907 5.18837 20.8046 4.18492 19.7963C3.18148 18.7879 2.3998 17.6124 1.83988 16.2698C1.27996 14.9272 1 13.4848 1 11.9426C1 10.4088 1.27996 8.97447 1.83988 7.63971C2.3998 6.30495 3.18148 5.14707 4.18492 4.16608C5.18837 3.18508 6.35701 2.41215 7.69086 1.84728C9.02471 1.28243 10.4627 1 12.0049 1C13.5387 1 14.9706 1.28243 16.3004 1.84728C17.6302 2.41215 18.7968 3.18508 19.8003 4.16608C20.8037 5.14707 21.5879 6.30616 22.1527 7.64333C22.7176 8.9805 23 10.4177 23 11.9549C23 13.4942 22.7176 14.9338 22.1527 16.2737C21.5879 17.6137 20.8037 18.7879 19.8003 19.7963C18.7968 20.8046 17.6282 21.5907 16.2945 22.1544C14.9607 22.7181 13.5293 23 12.0004 23ZM11.9778 20.8729C12.5704 20.2704 13.0635 19.5673 13.4572 18.7635C13.8509 17.9598 14.1839 16.9969 14.4563 15.8747H9.5551C9.79018 16.9269 10.1098 17.8693 10.5138 18.7021C10.9179 19.5348 11.4059 20.2584 11.9778 20.8729ZM9.74911 20.5466C9.31929 19.9167 8.95483 19.2226 8.65575 18.4646C8.35668 17.7065 8.09998 16.8432 7.88563 15.8747H4.03086C4.66077 17.0787 5.40575 18.0339 6.2658 18.7404C7.12583 19.447 8.28694 20.049 9.74911 20.5466ZM14.2326 20.5203C15.4674 20.1551 16.576 19.5652 17.5585 18.7504C18.541 17.9356 19.3434 16.9771 19.9657 15.8747H16.1558C15.9258 16.8196 15.6553 17.6726 15.3441 18.4337C15.033 19.1949 14.6625 19.8904 14.2326 20.5203ZM3.4989 14.3023H7.60034C7.53796 13.8374 7.5024 13.4194 7.49365 13.0481C7.4849 12.6769 7.48053 12.3125 7.48053 11.9549C7.48053 11.5175 7.48927 11.1331 7.50677 10.8018C7.52427 10.4705 7.56421 10.0987 7.62659 9.68633H3.4989C3.38567 10.0987 3.30472 10.4661 3.25604 10.7887C3.20735 11.1112 3.183 11.5 3.183 11.9549C3.183 12.4 3.20735 12.7994 3.25604 13.1531C3.30472 13.5069 3.38567 13.8899 3.4989 14.3023ZM9.25582 14.3023H14.7564C14.8165 13.7674 14.8528 13.3319 14.8654 12.9956C14.878 12.6594 14.8842 12.3125 14.8842 11.9549C14.8842 11.605 14.878 11.2731 14.8654 10.9593C14.8528 10.6455 14.8162 10.2211 14.7556 9.68633H9.255C9.18501 10.2211 9.14127 10.6455 9.12377 10.9593C9.10628 11.2731 9.09753 11.605 9.09753 11.9549C9.09753 12.3125 9.10628 12.6594 9.12377 12.9956C9.14127 13.3319 9.18528 13.7674 9.25582 14.3023ZM16.3848 14.3023H20.4986C20.5838 13.8899 20.6532 13.5069 20.7069 13.1531C20.7605 12.7994 20.7873 12.4 20.7873 11.9549C20.7873 11.5 20.7605 11.1112 20.7069 10.7887C20.6532 10.4661 20.5838 10.0987 20.4986 9.68633H16.4111C16.4362 10.3185 16.4575 10.7862 16.475 11.0894C16.4925 11.3926 16.5012 11.6811 16.5012 11.9549C16.5012 12.33 16.4881 12.6856 16.4618 13.0219C16.4356 13.3581 16.4099 13.7849 16.3848 14.3023ZM16.1295 8.09902H19.9657C19.3784 6.93657 18.5935 5.94797 17.611 5.1332C16.6285 4.31843 15.4936 3.7547 14.2064 3.44202C14.6362 4.08184 15.0067 4.77109 15.3178 5.50978C15.629 6.24847 15.8996 7.11155 16.1295 8.09902ZM9.5551 8.09902H14.4826C14.3099 7.22141 14.0023 6.34148 13.5599 5.45923C13.1176 4.57697 12.5902 3.81062 11.9778 3.16017C11.4551 3.62803 11.0057 4.24444 10.6295 5.00939C10.2533 5.77433 9.89517 6.80421 9.5551 8.09902ZM4.03086 8.09902H7.90705C8.10274 7.16404 8.34247 6.33158 8.62622 5.60164C8.91 4.8717 9.27555 4.16057 9.72287 3.46827C8.42576 3.78095 7.29718 4.32908 6.33711 5.11267C5.37702 5.89624 4.60827 6.89169 4.03086 8.09902Z" />
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
            <li className="js-nav-dropdown group relative">
              <div className="lg:hidden">
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
                                {/* <svg
                                  width="25"
                                  height="25"
                                  viewBox="0 0 28 28"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className=" h-4 w-4 dark:fill-white"
                                >
                                  <path d="M14 25.6667C12.3667 25.6667 10.8403 25.3604 9.42083 24.7479C8.00138 24.1354 6.76666 23.3042 5.71666 22.2542C4.66666 21.2042 3.84027 19.9646 3.2375 18.5354C2.63472 17.1063 2.33333 15.575 2.33333 13.9417C2.33333 12.3083 2.63472 10.7868 3.2375 9.37708C3.84027 7.96736 4.66666 6.7375 5.71666 5.6875C6.76666 4.6375 8.00138 3.81597 9.42083 3.22292C10.8403 2.62986 12.3667 2.33333 14 2.33333C15.6333 2.33333 17.1597 2.62986 18.5792 3.22292C19.9986 3.81597 21.2333 4.6375 22.2833 5.6875C23.3333 6.7375 24.1597 7.96736 24.7625 9.37708C25.3653 10.7868 25.6667 12.3083 25.6667 13.9417C25.6667 15.575 25.3653 17.1063 24.7625 18.5354C24.1597 19.9646 23.3333 21.2042 22.2833 22.2542C21.2333 23.3042 19.9986 24.1354 18.5792 24.7479C17.1597 25.3604 15.6333 25.6667 14 25.6667ZM14 23.975C14.6806 23.275 15.2493 22.4729 15.7062 21.5687C16.1632 20.6646 16.5375 19.5903 16.8292 18.3458H11.2C11.4722 19.5125 11.8368 20.5625 12.2937 21.4958C12.7507 22.4292 13.3194 23.2556 14 23.975ZM11.5208 23.625C11.0347 22.8861 10.6167 22.0889 10.2667 21.2333C9.91666 20.3778 9.625 19.4153 9.39166 18.3458H5.01666C5.75555 19.7264 6.61111 20.8104 7.58333 21.5979C8.55555 22.3854 9.86805 23.0611 11.5208 23.625ZM16.5083 23.5958C17.9083 23.1486 19.1674 22.4778 20.2854 21.5833C21.4035 20.6889 22.3028 19.6097 22.9833 18.3458H18.6375C18.3847 19.3958 18.0882 20.3486 17.7479 21.2042C17.4076 22.0597 16.9944 22.8569 16.5083 23.5958ZM4.43333 16.5958H9.07083C9.0125 16.0708 8.97847 15.5993 8.96875 15.1813C8.95902 14.7632 8.95416 14.35 8.95416 13.9417C8.95416 13.4556 8.96388 13.0229 8.98333 12.6438C9.00277 12.2646 9.04166 11.8417 9.1 11.375H4.43333C4.29722 11.8417 4.20486 12.2597 4.15624 12.6292C4.10763 12.9986 4.08333 13.4361 4.08333 13.9417C4.08333 14.4472 4.10763 14.8993 4.15624 15.2979C4.20486 15.6965 4.29722 16.1292 4.43333 16.5958ZM10.8792 16.5958H17.15C17.2278 15.9931 17.2764 15.5021 17.2958 15.1229C17.3153 14.7438 17.325 14.35 17.325 13.9417C17.325 13.5528 17.3153 13.1785 17.2958 12.8188C17.2764 12.459 17.2278 11.9778 17.15 11.375H10.8792C10.8014 11.9778 10.7528 12.459 10.7333 12.8188C10.7139 13.1785 10.7042 13.5528 10.7042 13.9417C10.7042 14.35 10.7139 14.7438 10.7333 15.1229C10.7528 15.5021 10.8014 15.9931 10.8792 16.5958ZM18.9 16.5958H23.5667C23.7028 16.1292 23.7951 15.6965 23.8437 15.2979C23.8924 14.8993 23.9167 14.4472 23.9167 13.9417C23.9167 13.4361 23.8924 12.9986 23.8437 12.6292C23.7951 12.2597 23.7028 11.8417 23.5667 11.375H18.9292C18.9875 12.0556 19.0264 12.5757 19.0458 12.9354C19.0653 13.2951 19.075 13.6306 19.075 13.9417C19.075 14.3694 19.0604 14.7729 19.0312 15.1521C19.0021 15.5313 18.9583 16.0125 18.9 16.5958ZM18.6083 9.625H22.9833C22.3417 8.28333 21.4618 7.16528 20.3437 6.27083C19.2257 5.37639 17.9375 4.74444 16.4792 4.375C16.9653 5.09444 17.3785 5.87222 17.7187 6.70833C18.059 7.54444 18.3556 8.51667 18.6083 9.625ZM11.2 9.625H16.8583C16.6444 8.59444 16.2847 7.59792 15.7792 6.63542C15.2736 5.67292 14.6806 4.82222 14 4.08333C13.3778 4.60833 12.8528 5.29861 12.425 6.15417C11.9972 7.00972 11.5889 8.16667 11.2 9.625ZM5.01666 9.625H9.42083C9.63472 8.575 9.90694 7.63681 10.2375 6.81042C10.5681 5.98403 10.9861 5.18194 11.4917 4.40417C10.0333 4.77361 8.75972 5.39583 7.67083 6.27083C6.58194 7.14583 5.69722 8.26389 5.01666 9.625Z" />
                                </svg> */}
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    className=" h-4 w-4 dark:fill-white"
                                    d="M8.00028 16C6.8822 16 5.83779 15.795 4.86705 15.385C3.89633 14.975 3.04608 14.4034 2.31631 13.67C1.58653 12.9366 1.01803 12.0817 0.61082 11.1053C0.203607 10.1289 0 9.07984 0 7.95826C0 6.84274 0.203607 5.79961 0.61082 4.82888C1.01803 3.85815 1.58653 3.01605 2.31631 2.3026C3.04608 1.58915 3.89601 1.02702 4.86608 0.616203C5.83615 0.205401 6.88198 0 8.00356 0C9.11908 0 10.1604 0.205401 11.1275 0.616203C12.0947 1.02702 12.9431 1.58915 13.6729 2.3026C14.4027 3.01605 14.973 3.85902 15.3838 4.83151C15.7946 5.804 16 6.84924 16 7.96722C16 9.08666 15.7946 10.1336 15.3838 11.1082C14.973 12.0827 14.4027 12.9366 13.6729 13.67C12.9431 14.4034 12.0932 14.975 11.1232 15.385C10.1532 15.795 9.11225 16 8.00028 16ZM7.98382 14.453C8.41482 14.0148 8.77348 13.5035 9.0598 12.9189C9.34612 12.3344 9.58833 11.6341 9.78641 10.818H6.22189C6.39286 11.5832 6.62528 12.2686 6.91916 12.8742C7.21304 13.4799 7.56793 14.0061 7.98382 14.453ZM6.36299 14.2157C6.05039 13.7576 5.78533 13.2528 5.56782 12.7015C5.35032 12.1502 5.16362 11.5223 5.00773 10.818H2.20426C2.66237 11.6936 3.20418 12.3883 3.82967 12.9021C4.45515 13.416 5.29959 13.8538 6.36299 14.2157ZM9.62374 14.1966C10.5217 13.931 11.328 13.5019 12.0425 12.9094C12.7571 12.3168 13.3407 11.6197 13.7932 10.818H11.0224C10.8551 11.5052 10.6584 12.1255 10.4321 12.6791C10.2058 13.2326 9.93634 13.7385 9.62374 14.1966ZM1.81738 9.67436H4.80025C4.75488 9.33631 4.72902 9.03228 4.72265 8.76227C4.71629 8.49228 4.71311 8.22726 4.71311 7.96722C4.71311 7.64908 4.71947 7.36953 4.7322 7.12858C4.74492 6.88762 4.77397 6.61721 4.81933 6.31733H1.81738C1.73504 6.61721 1.67616 6.88444 1.64076 7.11903C1.60534 7.35363 1.58764 7.63635 1.58764 7.96722C1.58764 8.29089 1.60534 8.58136 1.64076 8.83863C1.67616 9.09591 1.73504 9.37449 1.81738 9.67436ZM6.00423 9.67436H10.0047C10.0484 9.28541 10.0748 8.96866 10.0839 8.7241C10.0931 8.47955 10.0976 8.22726 10.0976 7.96722C10.0976 7.71271 10.0931 7.47134 10.0839 7.24311C10.0748 7.01488 10.0482 6.70629 10.0041 6.31733H6.00364C5.95274 6.70629 5.92092 7.01488 5.9082 7.24311C5.89547 7.47134 5.88911 7.71271 5.88911 7.96722C5.88911 8.22726 5.89547 8.47955 5.9082 8.7241C5.92092 8.96866 5.95293 9.28541 6.00423 9.67436ZM11.189 9.67436H14.1808C14.2428 9.37449 14.2933 9.09591 14.3323 8.83863C14.3713 8.58136 14.3908 8.29089 14.3908 7.96722C14.3908 7.63635 14.3713 7.35363 14.3323 7.11903C14.2933 6.88444 14.2428 6.61721 14.1808 6.31733H11.2081C11.2263 6.77712 11.2418 7.11725 11.2545 7.33775C11.2672 7.55824 11.2736 7.76806 11.2736 7.96722C11.2736 8.23999 11.2641 8.49864 11.245 8.74319C11.2259 8.98774 11.2072 9.29814 11.189 9.67436ZM11.0033 5.16292H13.7932C13.3661 4.31751 12.7953 3.59852 12.0807 3.00596C11.3662 2.4134 10.5408 2.00342 9.60465 1.77602C9.91725 2.24134 10.1867 2.74261 10.413 3.27984C10.6393 3.81707 10.836 4.44476 11.0033 5.16292ZM6.22189 5.16292H9.8055C9.6799 4.52467 9.45623 3.88472 9.13449 3.24307C8.81277 2.60143 8.42921 2.04408 7.98382 1.57103C7.60371 1.9113 7.27686 2.35959 7.00327 2.91592C6.72967 3.47224 6.46921 4.22124 6.22189 5.16292ZM2.20426 5.16292H5.02331C5.16563 4.48294 5.33998 3.87751 5.54634 3.34665C5.75273 2.81578 6.01858 2.2986 6.3439 1.79511C5.40056 2.02251 4.57977 2.42115 3.88153 2.99103C3.18329 3.5609 2.6242 4.28487 2.20426 5.16292Z"
                                    fill="white"
                                  />
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
                {/* LOGIN METAMASK */}
                <Metamask_comp_text />
              </div>
            </li>
          </ul>
        </nav>
        {/* <!-- Mobile Connect Wallet / Socials --> */}
        <div className="mt-10 w-full lg:hidden">
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <Activity_button />
                <Link href={`/myprofile`}>
                  <a
                    className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent js-dark-mode-trigger ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] fill-dark dark:fill-white hover:fill-white"
                    onClick={() => dispatch(closeMblMenu())}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-colors"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.5 7.33325C5.5 4.29568 7.96243 1.83325 11 1.83325C14.0376 1.83325 16.5 4.29568 16.5 7.33325C16.5 10.3708 14.0376 12.8333 11 12.8333C7.96243 12.8333 5.5 10.3708 5.5 7.33325Z"
                        fill="#323232"
                        className="fill-jacarta-700 transition-colors dark:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.97824 15.494C6.46776 14.8696 8.45457 14.6667 10.9999 14.6667C13.54 14.6667 15.5237 14.8688 17.0119 15.49C18.6093 16.1568 19.5898 17.2896 20.1125 18.9372C20.3066 19.5496 19.8474 20.1667 19.2125 20.1667H2.78158C2.14929 20.1667 1.69277 19.5523 1.88537 18.9434C2.40646 17.2958 3.38347 16.1626 4.97824 15.494Z"
                        fill="#323232"
                        className="fill-jacarta-700 transition-colors dark:fill-white"
                      />
                    </svg>
                  </a>
                </Link>
                <Link href={`/profile`}>
                  <a
                    className="border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent js-dark-mode-trigger ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] fill-dark dark:fill-white hover:fill-white"
                    onClick={() => dispatch(closeMblMenu())}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-700 h-4 w-4 transition-colors dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    </svg>
                  </a>
                </Link>
              </>
            ) : null}
          </div>
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
        <div className="hidden lg:flex">
          {/* <!-- Wallet --> */}
          <Link href="/upload">
            <a
              onClick={() => {
                dispatch(closeMblMenu());
                localStorage.setItem("navItemValue", 28);
              }}
            >
              <button className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white dark:bg-jacarta-700 text-center font-semibold text-white transition-all dropdown-toggle border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-jacarta-700 transition-colors dark:fill-white"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.105 2C6.52401 2 2 6.52402 2 12.105C2 17.686 6.52401 22.21 12.105 22.21C17.686 22.21 22.21 17.686 22.21 12.105C22.21 6.52402 17.686 2 12.105 2ZM15.1365 13.1156C15.6943 13.1156 16.147 12.6628 16.147 12.105C16.147 11.5472 15.6943 11.0945 15.1365 11.0945H13.1155V9.07351C13.1155 8.51572 12.6628 8.06301 12.105 8.06301C11.5472 8.06301 11.0945 8.51572 11.0945 9.07351V11.0945H9.07351C8.51571 11.0945 8.063 11.5472 8.063 12.105C8.063 12.6628 8.51571 13.1156 9.07351 13.1156H11.0945V15.1365C11.0945 15.6943 11.5472 16.147 12.105 16.147C12.6628 16.147 13.1155 15.6943 13.1155 15.1365V13.1156H15.1365Z"
                  />
                </svg>
              </button>
            </a>
          </Link>
          {/* <!-- Profile --> */}
          <div className="js-nav-dropdown group-dropdown relative">
            {router.asPath === "/home/home_3" ? (
              <button
                className="dropdown-toggle border-jacarta-100 focus:bg-accent group hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent border-transparent bg-white/[.15]"
                onMouseEnter={() => setProfileShow(true)}
                onMouseLeave={() => setProfileShow(false)}
              >
                <svg
                  width="18"
                  height="23"
                  viewBox="0 0 18 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 7.49998C5 4.46242 7.23857 2 10 2C12.7615 2 15 4.46242 15 7.49998C15 10.5375 12.7615 13 10 13C7.23857 13 5 10.5375 5 7.49998Z"
                    fill="#A3A3A3"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.7406 16.2033C6.04173 15.2951 7.77726 15 10.0007 15C12.2195 15 13.9523 15.294 15.2523 16.1975C16.6476 17.1674 17.5041 18.8151 17.9607 21.2116C18.1303 22.1024 17.7292 23 17.1746 23H2.82177C2.26945 23 1.87067 22.1063 2.03891 21.2207C2.4941 18.8241 3.34754 17.1759 4.7406 16.2033Z"
                    fill="#A3A3A3"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all dropdown-toggle border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
                onMouseEnter={() => setProfileShow(true)}
                onMouseLeave={() => setProfileShow(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-jacarta-700 transition-colors dark:fill-white"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.09277 7.11594C7.09277 4.29047 9.38327 2 12.2087 2C15.0343 2 17.3247 4.29047 17.3247 7.11594C17.3247 9.94137 15.0343 12.2319 12.2087 12.2319C9.38327 12.2319 7.09277 9.94137 7.09277 7.11594Z"
                  />
                  <path
                    className="fill-jacarta-700 transition-colors dark:fill-white"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.15468 14.549C7.65241 13.5533 9.65016 13.2298 12.2095 13.2298C14.7636 13.2298 16.7582 13.5521 18.2547 14.5425C19.8607 15.6058 20.8467 17.4121 21.3722 20.0394C21.5675 21.0159 21.1058 22 20.4673 22H3.94594C3.31016 22 2.85113 21.0203 3.04479 20.0493C3.56875 17.4221 4.55115 15.6151 6.15468 14.549Z"
                  />
                </svg>
              </button>
            )}

            <div
              className={
                profileShow
                  ? "dropdown-menu dark:bg-jacarta-700 group-dropdown-hover:opacity-100 group-dropdown-hover:visible !-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full lg:absolute lg:grid lg:!translate-y-4 lg:py-4  show lg:visible lg:opacity-100"
                  : "dropdown-menu dark:bg-jacarta-700 group-dropdown-hover:opacity-100 group-dropdown-hover:visible !-right-4 !top-[85%] !left-auto z-10 min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full lg:absolute lg:grid lg:!translate-y-4 lg:py-4  lg:shadow-2xl hidden lg:invisible lg:opacity-0"
              }
              onMouseEnter={() => setProfileShow(true)}
              onMouseLeave={() => setProfileShow(false)}
            >
              <UserId
                classes="js-copy-clipboard font-display text-jacarta-700 my-4 flex select-none items-center whitespace-nowrap px-5 leading-none dark:text-white"
                userId="0x7a86c0b064171007716bbd6af96676935799a63e"
                shortId={true}
              />

              <div className="dark:border-jacarta-600 border-jacarta-100 mx-5 mb-6 rounded-lg border p-4">
                <span className="dark:text-jacarta-200 text-sm font-medium tracking-tight">
                  Balance
                </span>
                <div className="flex items-center">
                  <span
                    className="text-green text-lg font-bold"
                    style={{ fontSize: "11px" }}
                  >
                    <span className="mr-1">Buzz Coin</span>
                    {data?.carteira.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      maximumSignificantDigits: 7,
                    })}
                  </span>
                </div>
              </div>
              <Link href={`/myprofile`}>
                <a className="dark:hover:bg-jacarta-600 mb-1 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_12_56)">
                      <path
                        fill-rule="evenodd"
                        className="fill-jacarta-700 h-4 w-4 transition-colors dark:fill-white"
                        clip-rule="evenodd"
                        d="M2.39999 4.19046C2.39999 1.87613 4.19085 0 6.39999 0C8.60919 0 10.4 1.87613 10.4 4.19046C10.4 6.50477 8.60919 8.38095 6.39999 8.38095C4.19085 8.38095 2.39999 6.50477 2.39999 4.19046Z"
                        fill="#A3A3A3"
                      />
                      <path
                        fill-rule="evenodd"
                        className="fill-jacarta-700 h-4 w-4 transition-colors dark:fill-white"
                        clip-rule="evenodd"
                        d="M2.19248 10.8216C3.23338 10.1296 4.62181 9.90475 6.40053 9.90475C8.1756 9.90475 9.56184 10.1288 10.6018 10.8171C11.7181 11.5561 12.4033 12.8115 12.7686 14.6374C12.9042 15.3161 12.5834 16 12.1397 16H0.657417C0.215561 16 -0.103462 15.3191 0.0311296 14.6443C0.395277 12.8184 1.07803 11.5626 2.19248 10.8216Z"
                        fill="#A3A3A3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_12_56">
                        <rect width="12.8" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text_space font-display text-jacarta-700 text-sm dark:text-white">
                    My Profile
                  </span>
                </a>
              </Link>
              <Link href={`/profile`}>
                <a className="dark:hover:bg-jacarta-600 mb-1 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors">
                  <svg
                    width="26"
                    height="26"
                    className="fill-jacarta-700 h-4 w-4 transition-colors dark:fill-white"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.3064 1.26311C12.081 0.909601 13.9133 0.90875 15.6882 1.26061C15.8064 2.00206 16.0991 2.70866 16.5443 3.32789C16.9896 3.94711 17.576 4.46305 18.26 4.83734C18.9435 5.21292 19.7073 5.43729 20.4947 5.49376C21.282 5.55023 22.0727 5.43735 22.8078 5.16352C24.0158 6.44831 24.9308 7.95671 25.4954 9.59381C24.8788 10.0619 24.3813 10.656 24.0396 11.3319C23.698 12.0078 23.5211 12.7482 23.5221 13.498C23.5221 15.0776 24.293 16.4861 25.498 17.4021C24.9301 19.0379 24.0139 20.5451 22.8064 21.8299C22.0715 21.5563 21.2811 21.4435 20.494 21.5C19.7069 21.5564 18.9434 21.7807 18.26 22.1561C17.5766 22.5303 16.9906 23.0459 16.5456 23.6646C16.1006 24.2834 15.808 24.9894 15.6895 25.7303C13.9152 26.0847 12.0828 26.0864 10.3078 25.7353C10.1901 24.9932 9.89772 24.2859 9.45244 23.666C9.00717 23.046 8.42044 22.5295 7.73593 22.1548C7.05235 21.7795 6.28848 21.5553 5.50113 21.4991C4.71378 21.4428 3.92321 21.5559 3.18821 21.8299C1.98004 20.5448 1.06498 19.0359 0.500617 17.3984C1.11679 16.9305 1.61414 16.3368 1.95575 15.6614C2.29736 14.9859 2.47445 14.2461 2.47389 13.4967C2.47453 12.7467 2.29722 12.0063 1.95514 11.3303C1.61305 10.6544 1.11499 10.0604 0.497986 9.59256C1.06585 7.95682 1.98204 6.44961 3.18952 5.16477C3.92444 5.4384 4.71482 5.55118 5.50192 5.49471C6.28903 5.43824 7.05262 5.21398 7.73593 4.83859C8.4194 4.46441 9.00539 3.94881 9.45039 3.33004C9.89539 2.71128 10.188 2.004 10.3064 1.26311ZM12.998 17.2472C14.0447 17.2472 15.0485 16.8522 15.7886 16.149C16.5287 15.4459 16.9445 14.4923 16.9445 13.498C16.9445 12.5036 16.5287 11.55 15.7886 10.8469C15.0485 10.1438 14.0447 9.74878 12.998 9.74878C11.9513 9.74878 10.9475 10.1438 10.2074 10.8469C9.46724 11.55 9.05145 12.5036 9.05145 13.498C9.05145 14.4923 9.46724 15.4459 10.2074 16.149C10.9475 16.8522 11.9513 17.2472 12.998 17.2472Z" />
                  </svg>
                  <span className="text_space font-display text-jacarta-700 text-sm dark:text-white">
                    Edit Profile
                  </span>
                </a>
              </Link>
              <a
                className="cursor-pointer dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center space-x-2 rounded-xl px-5 py-2 transition-colors"
                onClick={logout}
              >
                <svg
                  width="26"
                  height="26"
                  className="fill-jacarta-700 h-4 w-4 transition-colors dark:fill-white"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.0625 25.0833C6.15875 25.0833 0.5625 19.4871 0.5625 12.5833C0.5625 5.67959 6.15875 0.0833435 13.0625 0.0833435C19.9662 0.0833435 25.5625 5.67959 25.5625 12.5833C25.5625 19.4871 19.9662 25.0833 13.0625 25.0833ZM9.9375 10.7083V6.33334L0.5625 12.5833L9.9375 18.2083V13.8333H19.9375V10.7083H9.9375Z" />
                </svg>
                <span className="text_space font-display text-jacarta-700 text-sm dark:text-white">
                  Sign out
                </span>
              </a>
            </div>
          </div>
          {/* <Metamask_comp_icon prop={router} /> */}
          <Activity_button />
          {/* <!-- Dark Mode --> */}
          {/* <button
          href="#"
          className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent js-dark-mode-trigger ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
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
          {/* NOTIFICAÇÂO */}
          {/*CHAT */}
        </div>
      </div>
    </>
  );
};

export default MblNavbar;
