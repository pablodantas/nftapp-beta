import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Modal_chat from "./modal/modal_chat";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import { closeMblMenu } from "../redux/counterSlice";

const Mobile_button = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const { mblMenu } = useSelector((state) => state.counter);
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const [rotaAtual, setRotaAtual] = useState("");
  const [modalChatOpen, setModalChatOpen] = useState(false);

  const handleCloseModal = () => {
    setModalChatOpen(false);
  };

  const handleSticky = function () {
    if (window.scrollY >= 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    // Verifica se a rota atual é "feed/global"
    if (router.pathname === "/feed/global") {
      setRotaAtual(true);
    }

    if (router.pathname === "/feed/following") {
      setRotaAtual(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
  }, []);

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [navItemValue, setNavItemValue] = useState(1);
  const [navText, setnavText] = useState("");

  useEffect(() => {
    if (router.asPath === "/") {
      localStorage.setItem("navItemValue", 1);
    }
    if (router.asPath.includes("explore_collection")) {
      localStorage.setItem("navItemValue", 2);
    }
    if (router.asPath.includes("upload")) {
      localStorage.setItem("navItemValue", 3);
    }
    if (router.asPath.includes("/feed/global")) {
      localStorage.setItem("navItemValue", 4);
    }
    if (router.asPath.includes("/feed/folllowing")) {
      localStorage.setItem("navItemValue", 4);
    }
    if (router.asPath.includes("myprofile")) {
      localStorage.setItem("navItemValue", 5);
    }
    const value = localStorage.getItem("navItemValue");
    setNavItemValue(+value);

    if (navItemValue === 1) {
      setnavText("home");
    } else if (navItemValue === 2) {
      setnavText("shop");
    } else if (navItemValue === 3) {
      setnavText("upload");
    } else if (navItemValue === 4) {
      setnavText("feed");
    } else if (navItemValue === 5) {
      setnavText("myprofile");
    }
  }, [dispatch, navItemValue, router]);


  return (
    <>
      {modalChatOpen && <Modal_chat handleCloseModal={handleCloseModal} />}
      {!isLargeScreen && (
        <div
          className={
            scroll
              ? "lg:hidden no-scrollbar fixed bottom-0 w-full flex justify-center dark:bg-jacarta-900 bg-white py-1"
              : "lg:hidden no-scrollbar fixed bottom-0 w-full flex justify-center dark:bg-jacarta-900 bg-white py-1"
          }
          style={{
            width: "100vw",
            overflow: "auto",
            minWidth: "100%",
            zIndex: "20",
          }}
        >
          <Link href="/">
            <button
              className=" pt-2 pb-1 rounded mx-5 flex flex-col items-center"
              onClick={() => dispatch(closeMblMenu())}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.634 0.226673C12.2653 -0.07556 11.7346 -0.07556 11.366 0.226687L0.632632 9.02667C0.305919 9.29453 0.182792 9.73887 0.325032 10.1367C0.467265 10.5345 0.844165 10.8 1.26665 10.8H2.82106L3.61579 19.4852C3.69426 20.3433 4.41386 21 5.27553 21H10.3337C10.7019 21 11.0003 20.7015 11.0003 20.3333V13.8769C11.0003 13.5087 11.2988 13.2102 11.667 13.2102H12.3337C12.7019 13.2102 13.0003 13.5087 13.0003 13.8769V20.3333C13.0003 20.7015 13.2988 21 13.667 21H18.7253C19.5869 21 20.3065 20.3433 20.385 19.4852L21.1797 10.8H22.7337C23.1562 10.8 23.5331 10.5345 23.6753 10.1367C23.8176 9.7388 23.6945 9.29453 23.3677 9.02667L12.634 0.226673Z"
                  fill="black"
                  className={
                    navText === "home" ? "fill-accent" : "dark:fill-white"
                  }
                />
              </svg>
              <small className="font_small_button">Home</small>
            </button>
          </Link>
          <Link href="/collection/explore_collection">
            <button
              className=" pt-2 pb-1 rounded mx-5 flex flex-col items-center"
              onClick={() => dispatch(closeMblMenu())}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66675 7.01431H23.6667V19.6097C23.6667 20.5089 23.231 21.3712 22.4553 22.007C21.6796 22.6428 20.6275 23 19.5305 23H5.80295C4.70596 23 3.6539 22.6428 2.87821 22.007C2.10253 21.3712 1.66675 20.5089 1.66675 19.6097V7.01431Z"
                  stroke={theme == "light" ? "black" : "white"}
                  stroke-width="2"
                  stroke-miterlimit="10"
                  className={navText === "shop" ? "stroke-accent" : ""}
                />
                <path
                  d="M7.7749 10.0162V5.00954C7.7749 3.94615 8.29028 2.9263 9.20766 2.17437C10.125 1.42243 11.3693 1 12.6666 1C13.964 1 15.2082 1.42243 16.1256 2.17437C17.043 2.9263 17.5584 3.94615 17.5584 5.00954V10.0162"
                  stroke={theme == "light" ? "black" : "white"}
                  stroke-width="2"
                  stroke-miterlimit="10"
                  className={navText === "shop" ? "stroke-accent" : ""}
                />
              </svg>
              <small className="font_small_button">Shop</small>
            </button>
          </Link>
          <Link href="/upload">
            <button
              className="pt-2 pb-2 rounded px-7 flex"
              style={{ alignItems: "center" }}
              onClick={() => dispatch(closeMblMenu())}
            >
              <svg
                width="42"
                height="27"
                viewBox="0 0 42 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3601 9.39858V18.5097M16.3601 13.9541H21.3601H26M12.0268 26.4541H30.6934C34.4272 26.4541 36.2939 26.4541 37.7201 26C38.9746 25.6005 39.9943 24.9632 40.6334 24.1791C41.3601 23.2877 41.3601 22.1211 41.3601 19.7875V8.1208C41.3601 5.78724 41.3601 4.62047 40.6334 3.72917C39.9943 2.94516 38.9746 2.30774 37.7201 1.90827C36.2939 1.45413 34.4272 1.45413 30.6934 1.45413H12.0268C8.29309 1.45413 6.42624 1.45413 5.00017 1.90827C3.74575 2.30774 2.72589 2.94516 2.08673 3.72917C1.36011 4.62047 1.36011 5.78724 1.36011 8.1208V19.7875C1.36011 22.1211 1.36011 23.2877 2.08673 24.1791C2.72589 24.9632 3.74575 25.6005 5.00017 26C6.42624 26.4541 8.29309 26.4541 12.0268 26.4541Z"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className={
                    navText === "upload"
                      ? "stroke-accent"
                      : "dark:fillStrokeWhite"
                  }
                />
              </svg>
            </button>
          </Link>
          <Link href="/feed/global">
            <button
              className=" pt-2 pb-1 rounded mx-5 flex flex-col items-center"
              onClick={() => dispatch(closeMblMenu())}
            >
              {/* <svg
                width="22"
                height="22"
                viewBox="0 0 28 28"
                xmlns="http://www.w3.org/2000/svg"
                className={
                  navText === "feed" ? "fill-accent" : "dark:fill-white"
                }
              >
                <path d="M14 25.6667C12.3667 25.6667 10.8403 25.3604 9.42083 24.7479C8.00138 24.1354 6.76666 23.3042 5.71666 22.2542C4.66666 21.2042 3.84027 19.9646 3.2375 18.5354C2.63472 17.1063 2.33333 15.575 2.33333 13.9417C2.33333 12.3083 2.63472 10.7868 3.2375 9.37708C3.84027 7.96736 4.66666 6.7375 5.71666 5.6875C6.76666 4.6375 8.00138 3.81597 9.42083 3.22292C10.8403 2.62986 12.3667 2.33333 14 2.33333C15.6333 2.33333 17.1597 2.62986 18.5792 3.22292C19.9986 3.81597 21.2333 4.6375 22.2833 5.6875C23.3333 6.7375 24.1597 7.96736 24.7625 9.37708C25.3653 10.7868 25.6667 12.3083 25.6667 13.9417C25.6667 15.575 25.3653 17.1063 24.7625 18.5354C24.1597 19.9646 23.3333 21.2042 22.2833 22.2542C21.2333 23.3042 19.9986 24.1354 18.5792 24.7479C17.1597 25.3604 15.6333 25.6667 14 25.6667ZM14 23.975C14.6806 23.275 15.2493 22.4729 15.7062 21.5687C16.1632 20.6646 16.5375 19.5903 16.8292 18.3458H11.2C11.4722 19.5125 11.8368 20.5625 12.2937 21.4958C12.7507 22.4292 13.3194 23.2556 14 23.975ZM11.5208 23.625C11.0347 22.8861 10.6167 22.0889 10.2667 21.2333C9.91666 20.3778 9.625 19.4153 9.39166 18.3458H5.01666C5.75555 19.7264 6.61111 20.8104 7.58333 21.5979C8.55555 22.3854 9.86805 23.0611 11.5208 23.625ZM16.5083 23.5958C17.9083 23.1486 19.1674 22.4778 20.2854 21.5833C21.4035 20.6889 22.3028 19.6097 22.9833 18.3458H18.6375C18.3847 19.3958 18.0882 20.3486 17.7479 21.2042C17.4076 22.0597 16.9944 22.8569 16.5083 23.5958ZM4.43333 16.5958H9.07083C9.0125 16.0708 8.97847 15.5993 8.96875 15.1813C8.95902 14.7632 8.95416 14.35 8.95416 13.9417C8.95416 13.4556 8.96388 13.0229 8.98333 12.6438C9.00277 12.2646 9.04166 11.8417 9.1 11.375H4.43333C4.29722 11.8417 4.20486 12.2597 4.15624 12.6292C4.10763 12.9986 4.08333 13.4361 4.08333 13.9417C4.08333 14.4472 4.10763 14.8993 4.15624 15.2979C4.20486 15.6965 4.29722 16.1292 4.43333 16.5958ZM10.8792 16.5958H17.15C17.2278 15.9931 17.2764 15.5021 17.2958 15.1229C17.3153 14.7438 17.325 14.35 17.325 13.9417C17.325 13.5528 17.3153 13.1785 17.2958 12.8188C17.2764 12.459 17.2278 11.9778 17.15 11.375H10.8792C10.8014 11.9778 10.7528 12.459 10.7333 12.8188C10.7139 13.1785 10.7042 13.5528 10.7042 13.9417C10.7042 14.35 10.7139 14.7438 10.7333 15.1229C10.7528 15.5021 10.8014 15.9931 10.8792 16.5958ZM18.9 16.5958H23.5667C23.7028 16.1292 23.7951 15.6965 23.8437 15.2979C23.8924 14.8993 23.9167 14.4472 23.9167 13.9417C23.9167 13.4361 23.8924 12.9986 23.8437 12.6292C23.7951 12.2597 23.7028 11.8417 23.5667 11.375H18.9292C18.9875 12.0556 19.0264 12.5757 19.0458 12.9354C19.0653 13.2951 19.075 13.6306 19.075 13.9417C19.075 14.3694 19.0604 14.7729 19.0312 15.1521C19.0021 15.5313 18.9583 16.0125 18.9 16.5958ZM18.6083 9.625H22.9833C22.3417 8.28333 21.4618 7.16528 20.3437 6.27083C19.2257 5.37639 17.9375 4.74444 16.4792 4.375C16.9653 5.09444 17.3785 5.87222 17.7187 6.70833C18.059 7.54444 18.3556 8.51667 18.6083 9.625ZM11.2 9.625H16.8583C16.6444 8.59444 16.2847 7.59792 15.7792 6.63542C15.2736 5.67292 14.6806 4.82222 14 4.08333C13.3778 4.60833 12.8528 5.29861 12.425 6.15417C11.9972 7.00972 11.5889 8.16667 11.2 9.625ZM5.01666 9.625H9.42083C9.63472 8.575 9.90694 7.63681 10.2375 6.81042C10.5681 5.98403 10.9861 5.18194 11.4917 4.40417C10.0333 4.77361 8.75972 5.39583 7.67083 6.27083C6.58194 7.14583 5.69722 8.26389 5.01666 9.625Z" />
              </svg> */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_56_2)">
<path className="dark:fill-white" d="M11.0004 22C9.46302 22 8.02696 21.7181 6.6922 21.1544C5.35746 20.5907 4.18837 19.8046 3.18492 18.7963C2.18148 17.7879 1.3998 16.6124 0.839878 15.2698C0.279959 13.9272 0 12.4848 0 10.9426C0 9.40877 0.279959 7.97447 0.839878 6.63971C1.3998 5.30495 2.18148 4.14707 3.18492 3.16608C4.18837 2.18508 5.35701 1.41215 6.69086 0.84728C8.02471 0.282427 9.46272 0 11.0049 0C12.5387 0 13.9706 0.282427 15.3004 0.84728C16.6302 1.41215 17.7968 2.18508 18.8003 3.16608C19.8037 4.14707 20.5879 5.30616 21.1527 6.64333C21.7176 7.9805 22 9.4177 22 10.9549C22 12.4942 21.7176 13.9338 21.1527 15.2737C20.5879 16.6137 19.8037 17.7879 18.8003 18.7963C17.7968 19.8046 16.6282 20.5907 15.2945 21.1544C13.9607 21.7181 12.5293 22 11.0004 22ZM10.9778 19.8729C11.5704 19.2704 12.0635 18.5673 12.4572 17.7635C12.8509 16.9598 13.1839 15.9969 13.4563 14.8747H8.5551C8.79018 15.9269 9.10976 16.8693 9.51385 17.7021C9.91794 18.5348 10.4059 19.2584 10.9778 19.8729ZM8.74911 19.5466C8.31929 18.9167 7.95483 18.2226 7.65575 17.4646C7.35668 16.7065 7.09998 15.8432 6.88563 14.8747H3.03086C3.66077 16.0787 4.40575 17.0339 5.2658 17.7404C6.12583 18.447 7.28694 19.049 8.74911 19.5466ZM13.2326 19.5203C14.4674 19.1551 15.576 18.5652 16.5585 17.7504C17.541 16.9356 18.3434 15.9771 18.9657 14.8747H15.1558C14.9258 15.8196 14.6553 16.6726 14.3441 17.4337C14.033 18.1949 13.6625 18.8904 13.2326 19.5203ZM2.4989 13.3023H6.60034C6.53796 12.8374 6.5024 12.4194 6.49365 12.0481C6.4849 11.6769 6.48053 11.3125 6.48053 10.9549C6.48053 10.5175 6.48927 10.1331 6.50677 9.8018C6.52427 9.47048 6.56421 9.09866 6.62659 8.68633H2.4989C2.38567 9.09866 2.30472 9.46611 2.25604 9.78867C2.20735 10.1112 2.183 10.5 2.183 10.9549C2.183 11.4 2.20735 11.7994 2.25604 12.1531C2.30472 12.5069 2.38567 12.8899 2.4989 13.3023ZM8.25582 13.3023H13.7564C13.8165 12.7674 13.8528 12.3319 13.8654 11.9956C13.878 11.6594 13.8842 11.3125 13.8842 10.9549C13.8842 10.605 13.878 10.2731 13.8654 9.95927C13.8528 9.64546 13.8162 9.22114 13.7556 8.68633H8.255C8.18501 9.22114 8.14127 9.64546 8.12377 9.95927C8.10628 10.2731 8.09753 10.605 8.09753 10.9549C8.09753 11.3125 8.10628 11.6594 8.12377 11.9956C8.14127 12.3319 8.18528 12.7674 8.25582 13.3023ZM15.3848 13.3023H19.4986C19.5838 12.8899 19.6532 12.5069 19.7069 12.1531C19.7605 11.7994 19.7873 11.4 19.7873 10.9549C19.7873 10.5 19.7605 10.1112 19.7069 9.78867C19.6532 9.46611 19.5838 9.09866 19.4986 8.68633H15.4111C15.4362 9.31853 15.4575 9.78622 15.475 10.0894C15.4925 10.3926 15.5012 10.6811 15.5012 10.9549C15.5012 11.33 15.4881 11.6856 15.4618 12.0219C15.4356 12.3581 15.4099 12.7849 15.3848 13.3023ZM15.1295 7.09902H18.9657C18.3784 5.93657 17.5935 4.94797 16.611 4.1332C15.6285 3.31843 14.4936 2.7547 13.2064 2.44202C13.6362 3.08184 14.0067 3.77109 14.3178 4.50978C14.629 5.24847 14.8996 6.11155 15.1295 7.09902ZM8.5551 7.09902H13.4826C13.3099 6.22141 13.0023 5.34148 12.5599 4.45923C12.1176 3.57697 11.5902 2.81062 10.9778 2.16017C10.4551 2.62803 10.0057 3.24444 9.62949 4.00939C9.25329 4.77433 8.89517 5.80421 8.5551 7.09902ZM3.03086 7.09902H6.90705C7.10274 6.16404 7.34247 5.33158 7.62622 4.60164C7.91 3.8717 8.27555 3.16057 8.72287 2.46827C7.42576 2.78095 6.29718 3.32908 5.33711 4.11267C4.37702 4.89624 3.60827 5.89169 3.03086 7.09902Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_56_2">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>


              <small className="font_small_button">Social</small>
            </button>
          </Link>
          <Link href="/myprofile">
            <button
              className=" pt-2 pb-1 rounded mx-5 flex flex-col items-center"
              onClick={() => dispatch(closeMblMenu())}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.5 7.33325C5.5 4.29568 7.96243 1.83325 11 1.83325C14.0376 1.83325 16.5 4.29568 16.5 7.33325C16.5 10.3708 14.0376 12.8333 11 12.8333C7.96243 12.8333 5.5 10.3708 5.5 7.33325Z"
                  fill="#323232"
                  className={
                    navText === "myprofile" ? "fill-accent" : "dark:fill-white"
                  }
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.97824 15.494C6.46776 14.8696 8.45457 14.6667 10.9999 14.6667C13.54 14.6667 15.5237 14.8688 17.0119 15.49C18.6093 16.1568 19.5898 17.2896 20.1125 18.9372C20.3066 19.5496 19.8474 20.1667 19.2125 20.1667H2.78158C2.14929 20.1667 1.69277 19.5523 1.88537 18.9434C2.40646 17.2958 3.38347 16.1626 4.97824 15.494Z"
                  fill="#323232"
                  className={
                    navText === "myprofile" ? "fill-accent" : "dark:fill-white"
                  }
                />
              </svg>
              <small className="font_small_button">Profile</small>
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Mobile_button;
