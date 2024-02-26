import React, { useEffect, useState } from "react";
import Link from "next/link";
import { closeMblMenu } from "../../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import Sugestion from "./suggestions";

const ProfileFeed = () => {
  const dispatch = useDispatch();
  const { Moralis, user, isAuthenticated } = useMoralis();
  const [imageModal2, setImageModal2] = useState(false);
  const router = useRouter();
  const [navItemValue, setNavItemValue] = useState(1);
  const [navText, setnavText] = useState("");
  const [loggin_in, setLogin] = useState(false);

  const fetchProfile = async () => {
    if (!(await Moralis.User.current())) {
      setLogin(true);
      return;
    }
    if (user) {
      const query = new Moralis.Query("IfUser");
      query.equalTo("postOwner", user.attributes.ethAddress);
      const result = await query.find();
      const a = JSON.parse(JSON.stringify(result));
      const b = a[0];
      return b;
    }
  };

  const { data } = useQuery(`userProfile${user}`, fetchProfile, {
    staleTime: 1000 * 80,
    //cacheTime: 111120000,
  });

  function perfilImag(ipfs) {
    let origLink = ipfs?.replace(
      "ipfs://",
      "https://ipfs.moralis.io:2053/ipfs/"
    );
    return origLink;
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        dispatch(closeMblMenu());
      }
    });

    if (router.asPath === "/feed/global") {
      localStorage.setItem("navItemValue", 1);
    }
    if (router.asPath === "/feed/following") {
      localStorage.setItem("navItemValue", 2);
    }

    const value = localStorage.getItem("navItemValue");
    setNavItemValue(+value);

    if (navItemValue > 0 && navItemValue <= 1) {
      setnavText("global");
    } else if (navItemValue > 1 && navItemValue == 2) {
      setnavText("following");
    }
  }, [dispatch, navItemValue, router]);
  return (
    <>
      <div className="col-3 lg:block hidden mr-20">
        <div className="row flex flex">
          <div
            className={user ? "flex items-center" : "flex items-center w-full"}
          >
            {user && (
              <div className="img_hover_bright imgBorder relative cursor-pointer">
                <button
                  className="col-cards_header w-full h-full absolute"
                  onClick={() => setImageModal2(true)}
                />
                <img
                  src={
                    perfilImag(data?.avatarUser)
                      ? perfilImag(data?.avatarUser)
                      : "/images/frame_2_1.png"
                  }
                  alt=""
                  className="imgPostAuthor imgProfileFeed"
                />
                <div
                  className="cursor-pointer absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center"
                  data-tippy-content="Verified Collection"
                  title="Verified account"
                  style={{ zIndex: 5 }}
                >
                  <svg
                    className="h-6 w-6"
                    width="734"
                    height="734"
                    viewBox="0 0 734 734"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="198"
                      y="229"
                      width="386"
                      height="322"
                      fill="white"
                    />
                    <path
                      d="M666.407 242.251L666.356 242.557L666.608 242.739C706.064 271.16 732.833 315.184 732.833 366.667C732.833 418.149 706.064 462.207 666.608 490.594L666.356 490.776L666.407 491.082C674.384 539.013 661.95 589.376 625.647 625.646L626 626L625.646 625.646C589.277 662.016 538.947 674.118 491.214 666.34L490.907 666.29L490.727 666.543C462.441 706.13 418.017 732.833 366.667 732.833C315.184 732.833 271.06 706.031 242.706 666.509L242.525 666.257L242.219 666.307C194.419 674.118 144.056 662.049 107.654 625.646C71.2847 589.278 59.1824 538.915 67.2264 491.083L67.278 490.776L67.0253 490.594C27.6007 462.239 0.5 418.181 0.5 366.667C0.5 315.153 27.6008 271.061 67.0251 242.739L67.2781 242.558L67.2264 242.25C59.1824 194.418 71.2847 144.056 107.687 107.687L107.687 107.687C143.99 71.3503 194.387 58.9491 242.485 66.9266L242.793 66.9776L242.974 66.7237C271.16 27.203 315.283 0.5 366.667 0.5C417.984 0.5 462.341 27.1704 490.66 66.7244L490.841 66.9777L491.149 66.9266C539.079 58.9493 589.376 71.4164 625.646 107.687L626 107.333L625.647 107.687C661.95 143.957 674.417 194.321 666.407 242.251ZM329.003 447.829L257.254 376.08L257.247 376.074C250.866 369.911 242.32 366.5 233.449 366.578C224.578 366.655 216.092 370.213 209.819 376.486C203.546 382.759 199.988 391.245 199.911 400.116C199.834 408.987 203.244 417.533 209.407 423.914L209.413 423.92L309.413 523.92C312.888 527.395 317.078 530.072 321.692 531.764C326.306 533.455 331.234 534.121 336.131 533.716C341.029 533.31 345.78 531.842 350.052 529.414C354.325 526.986 358.018 523.657 360.874 519.657L527.54 286.324C530.122 282.707 531.966 278.618 532.967 274.288C533.968 269.959 534.107 265.475 533.375 261.092C532.643 256.709 531.054 252.514 528.701 248.745C526.347 244.976 523.274 241.708 519.657 239.126C512.358 233.909 503.284 231.805 494.433 233.277C485.582 234.749 477.678 239.676 472.46 246.976L472.867 247.267L472.46 246.976L329.003 447.829Z"
                      fill="url(#paint0_linear_12_7)"
                      stroke="black"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_12_7"
                        x1="4.3784e-06"
                        y1="253.5"
                        x2="733"
                        y2="733"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F0B90B" />
                        <stop offset="1" stopColor="#000" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            )}
          </div>
          {/* <!-- Modal --> */}
          <div className={imageModal2 ? "modal fade show block" : "modal fade"}>
            <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center NFT_modal">
              <img
                src={
                  perfilImag(data?.avatarUser)
                    ? perfilImag(data?.avatarUser)
                    : "/images/frame_2_1.png"
                }
                alt=""
                layout="fill"
                objectFit="contain"
                className=""
              />{" "}
            </div>

            <button
              type="button"
              className="btn-close absolute top-6 right-6"
              onClick={() => setImageModal2(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-6 w-6 fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>
          {/* <!-- end modal --> */}
          {user && (
            <div className="col flex items-center justify-center">
              <div className="row flex flex w-full">
                <div className="col px-3 flex items-center w-full">
                  <Link href="/myprofile">
                    <h3 className="line-clamp-2 cursor-pointer text-2xl font-semibold mb-0 text-dark dark:text-white hover:text-accent">
                      {data?.userName}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="row flex">
          <div className="col">
            <div className="row flex flex-col mt-4">
              <button className="dark:fillHoverStrokeWhite fillHoverStrokeBlack dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col rounded-xl mt-2 hover:bg-white hover:outline hover:outline-1 hover:outline-gray-200 dark:hover:outline-gray-600 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Link href="/collection/explore_collection">
                  <div className="dark:fillHoverStrokeWhite fillHoverStrokeBlack row flex fill-gray-500 hover:fill-gray-900 dark:fill-gray-400 dark:hover:fill-white p-2 pl-5">
                    <div
                      className="col-auto pl-3"
                      style={{ paddingLeft: "0.92rem" }}
                    >
                      <svg
                        width="20"
                        height="24"
                        viewBox="0 0 20 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 7H19V19.6067C19 20.5067 18.6435 21.3697 18.0089 22.0061C17.3742 22.6425 16.5134 23 15.6158 23H4.38417C3.48663 23 2.62585 22.6425 1.9912 22.0061C1.35655 21.3697 1 20.5067 1 19.6067V7Z"
                          stroke="#A3A3A3"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M5 10.0162V5.00954C5 3.94615 5.51538 2.9263 6.43276 2.17437C7.3501 1.42243 8.5944 1 9.8917 1C11.1891 1 12.4333 1.42243 13.3507 2.17437C14.2681 2.9263 14.7835 3.94615 14.7835 5.00954V10.0162"
                          stroke="#A3A3A3"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        />
                      </svg>
                    </div>
                    <div className="col text-start flex items-center pl-3">
                      <p>Shop</p>
                    </div>
                  </div>
                </Link>
              </button>
              <button
                className={
                  navText === "global"
                    ? "col rounded-xl mt-2 dark:bg-jacarta-600  duration-100 bg-jacarta-600"
                    : "col rounded-xl hover:bg-white dark:hover:bg-jacarta-900 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }
              >
                <Link href="/feed/global">
                  <div
                    className={
                      navText === "global"
                        ? "row flex fill-white p-2 pl-5"
                        : " dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-xl mt-2 hover:bg-white text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white row flex fill-gray-500 hover:fill-gray-900 dark:fill-gray-400 dark:hover:fill-white p-2 pl-5"
                    }
                  >
                    <div className="col-auto pl-3">
                      <svg
                        // className={navText === "global" ? "fill_white":""}
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14 25.6667C12.3667 25.6667 10.8403 25.3604 9.42083 24.7479C8.00138 24.1354 6.76666 23.3042 5.71666 22.2542C4.66666 21.2042 3.84027 19.9646 3.2375 18.5354C2.63472 17.1063 2.33333 15.575 2.33333 13.9417C2.33333 12.3083 2.63472 10.7868 3.2375 9.37708C3.84027 7.96736 4.66666 6.7375 5.71666 5.6875C6.76666 4.6375 8.00138 3.81597 9.42083 3.22292C10.8403 2.62986 12.3667 2.33333 14 2.33333C15.6333 2.33333 17.1597 2.62986 18.5792 3.22292C19.9986 3.81597 21.2333 4.6375 22.2833 5.6875C23.3333 6.7375 24.1597 7.96736 24.7625 9.37708C25.3653 10.7868 25.6667 12.3083 25.6667 13.9417C25.6667 15.575 25.3653 17.1063 24.7625 18.5354C24.1597 19.9646 23.3333 21.2042 22.2833 22.2542C21.2333 23.3042 19.9986 24.1354 18.5792 24.7479C17.1597 25.3604 15.6333 25.6667 14 25.6667ZM14 23.975C14.6806 23.275 15.2493 22.4729 15.7062 21.5687C16.1632 20.6646 16.5375 19.5903 16.8292 18.3458H11.2C11.4722 19.5125 11.8368 20.5625 12.2937 21.4958C12.7507 22.4292 13.3194 23.2556 14 23.975ZM11.5208 23.625C11.0347 22.8861 10.6167 22.0889 10.2667 21.2333C9.91666 20.3778 9.625 19.4153 9.39166 18.3458H5.01666C5.75555 19.7264 6.61111 20.8104 7.58333 21.5979C8.55555 22.3854 9.86805 23.0611 11.5208 23.625ZM16.5083 23.5958C17.9083 23.1486 19.1674 22.4778 20.2854 21.5833C21.4035 20.6889 22.3028 19.6097 22.9833 18.3458H18.6375C18.3847 19.3958 18.0882 20.3486 17.7479 21.2042C17.4076 22.0597 16.9944 22.8569 16.5083 23.5958ZM4.43333 16.5958H9.07083C9.0125 16.0708 8.97847 15.5993 8.96875 15.1813C8.95902 14.7632 8.95416 14.35 8.95416 13.9417C8.95416 13.4556 8.96388 13.0229 8.98333 12.6438C9.00277 12.2646 9.04166 11.8417 9.1 11.375H4.43333C4.29722 11.8417 4.20486 12.2597 4.15624 12.6292C4.10763 12.9986 4.08333 13.4361 4.08333 13.9417C4.08333 14.4472 4.10763 14.8993 4.15624 15.2979C4.20486 15.6965 4.29722 16.1292 4.43333 16.5958ZM10.8792 16.5958H17.15C17.2278 15.9931 17.2764 15.5021 17.2958 15.1229C17.3153 14.7438 17.325 14.35 17.325 13.9417C17.325 13.5528 17.3153 13.1785 17.2958 12.8188C17.2764 12.459 17.2278 11.9778 17.15 11.375H10.8792C10.8014 11.9778 10.7528 12.459 10.7333 12.8188C10.7139 13.1785 10.7042 13.5528 10.7042 13.9417C10.7042 14.35 10.7139 14.7438 10.7333 15.1229C10.7528 15.5021 10.8014 15.9931 10.8792 16.5958ZM18.9 16.5958H23.5667C23.7028 16.1292 23.7951 15.6965 23.8437 15.2979C23.8924 14.8993 23.9167 14.4472 23.9167 13.9417C23.9167 13.4361 23.8924 12.9986 23.8437 12.6292C23.7951 12.2597 23.7028 11.8417 23.5667 11.375H18.9292C18.9875 12.0556 19.0264 12.5757 19.0458 12.9354C19.0653 13.2951 19.075 13.6306 19.075 13.9417C19.075 14.3694 19.0604 14.7729 19.0312 15.1521C19.0021 15.5313 18.9583 16.0125 18.9 16.5958ZM18.6083 9.625H22.9833C22.3417 8.28333 21.4618 7.16528 20.3437 6.27083C19.2257 5.37639 17.9375 4.74444 16.4792 4.375C16.9653 5.09444 17.3785 5.87222 17.7187 6.70833C18.059 7.54444 18.3556 8.51667 18.6083 9.625ZM11.2 9.625H16.8583C16.6444 8.59444 16.2847 7.59792 15.7792 6.63542C15.2736 5.67292 14.6806 4.82222 14 4.08333C13.3778 4.60833 12.8528 5.29861 12.425 6.15417C11.9972 7.00972 11.5889 8.16667 11.2 9.625ZM5.01666 9.625H9.42083C9.63472 8.575 9.90694 7.63681 10.2375 6.81042C10.5681 5.98403 10.9861 5.18194 11.4917 4.40417C10.0333 4.77361 8.75972 5.39583 7.67083 6.27083C6.58194 7.14583 5.69722 8.26389 5.01666 9.625Z" />
                      </svg>
                    </div>
                    <div className="col text-start flex items-center pl-3">
                      <p
                        className={
                          navText === "global"
                            ? "col-auto flex items-center text-white"
                            : ""
                        }
                      >
                        Social
                      </p>
                    </div>
                  </div>
                </Link>
              </button>
              <Link href="/upload">
                <a style={{ marginTop: "8px" }} className="col">
                  <button
                    className={
                      router.asPath === "/home/home_3"
                        ? "w-full hover:text-white dark:text-gray-400 flex items-center justify-start py-3.5 text-base lg:px-5"
                        : "w-full hover_white hover:text-white dark:text-gray-400   dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-start border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center  dark:bg-jacarta-700 text-center   transition-all flex items-center py-3.5 text-base lg:px-5  flex items-center justify-start py-3.5 text-base lg:px-5"
                    }
                    style={{
                      padding: "8px",
                      borderRadius: "11px",
                      display: "-ms-flexbox",
                      display: "flex",
                    }}
                  >
                    <span>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current"
                        style={{
                          height: "24px",
                          width: "24px",
                          margin: "0px 0px 0px 14px",
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.5 12.5C17.5 13.1571 16.94 13.6905 16.25 13.6905H13.75V16.0714C13.75 16.7285 13.19 17.2619 12.5 17.2619C11.81 17.2619 11.25 16.7285 11.25 16.0714V13.6905H8.75001C8.06001 13.6905 7.5 13.1571 7.5 12.5C7.5 11.8428 8.06001 11.3095 8.75001 11.3095H11.25V8.92855C11.25 8.27141 11.81 7.73807 12.5 7.73807C13.19 7.73807 13.75 8.27141 13.75 8.92855V11.3095H16.25C16.94 11.3095 17.5 11.8428 17.5 12.5ZM12.5 22.0238C6.98625 22.0238 2.5 17.7512 2.5 12.5C2.5 7.24879 6.98625 2.97617 12.5 2.97617C18.0137 2.97617 22.5 7.24879 22.5 12.5C22.5 17.7512 18.0137 22.0238 12.5 22.0238ZM12.5 0.595215C5.59625 0.595215 0 5.92498 0 12.5C0 19.075 5.59625 24.4047 12.5 24.4047C19.4037 24.4047 25 19.075 25 12.5C25 5.92498 19.4037 0.595215 12.5 0.595215Z"
                          fill="#A3A3A3"
                          className="fill-current"
                        />
                      </svg>
                    </span>
                    <span className="pl-3">Upload</span>
                  </button>
                </a>
              </Link>
              <button className=" dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] col rounded-xl mt-2 hover:bg-white hover:outline hover:outline-1 hover:outline-gray-200 dark:hover:outline-gray-600 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Link href="/myprofile">
                  <div className="dark:fillHoverWhite fillHoverBlack row flex fill-gray-500 hover:fill-gray-900 dark:fill-gray-400 dark:hover:fill-white p-2 pl-5">
                    <div className="col-auto" style={{ paddingLeft: "1rem" }}>
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
                    </div>
                    <div className="col text-start flex items-center pl-3">
                      <p>My Profile</p>
                    </div>
                  </div>
                </Link>
              </button>
              <button
                className={
                  navText === "following"
                    ? "col rounded-xl mt-2 bg-accent  dark:bg-jacarta-600  duration-100"
                    : "col rounded-xl hover:bg-white dark:hover:bg-jacarta-900  text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }
              >
                <Link href="/feed/following">
                  <div
                    className={
                      navText === "following"
                        ? "row flex fill-white p-2 pl-5"
                        : " dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-xl mt-2 hover:bg-white text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white row flex fill-gray-500 hover:fill-gray-900 dark:fill-gray-400 dark:hover:fill-white p-2 pl-5"
                    }
                  >
                    <div className="col-auto" style={{ paddingLeft: "1rem" }}>
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 21V17.8213C0 17.0322 0.135746 16.3164 0.407239 15.674C0.678732 15.0314 1.0558 14.5523 1.53846 14.2367C2.63952 13.5154 3.63122 12.9969 4.51357 12.6811C5.39592 12.3656 6.30466 12.2078 7.23983 12.2078C8.17493 12.2078 9.07993 12.3656 9.95476 12.6811C10.8295 12.9969 11.8175 13.5154 12.9185 14.2367C13.4012 14.5523 13.782 15.0314 14.0611 15.674C14.3401 16.3164 14.4796 17.0322 14.4796 17.8213V21H0ZM15.8371 21V17.8213C15.8371 16.401 15.5958 15.2343 15.1131 14.3213C14.6304 13.4082 13.997 12.6699 13.2127 12.1063C14.2533 12.2867 15.2337 12.5515 16.1538 12.901C17.0738 13.2504 17.8205 13.6505 18.3936 14.1014C18.8914 14.5298 19.2836 15.0596 19.5701 15.6909C19.8567 16.3221 20 17.0322 20 17.8213V21H15.8371ZM7.23983 10.1449C6.24434 10.1449 5.42986 9.67152 4.79637 8.72462C4.16289 7.77783 3.84615 6.56044 3.84615 5.07247C3.84615 3.58455 4.16289 2.36716 4.79637 1.42029C5.42986 0.473438 6.24434 0 7.23983 0C8.23528 0 9.04976 0.473438 9.68327 1.42029C10.3167 2.36716 10.6335 3.58455 10.6335 5.07247C10.6335 6.56044 10.3167 7.77783 9.68327 8.72462C9.04976 9.67152 8.23528 10.1449 7.23983 10.1449ZM15.3846 5.07247C15.3846 6.56044 15.0678 7.77783 14.4344 8.72462C13.8009 9.67152 12.9864 10.1449 11.991 10.1449C11.825 10.1449 11.6403 10.128 11.4366 10.0942C11.233 10.0604 11.0483 9.99836 10.8823 9.90827C11.2444 9.34468 11.5196 8.65134 11.7081 7.8285C11.8966 7.00566 11.991 6.08693 11.991 5.07247C11.991 4.05798 11.8966 3.16185 11.7081 2.38406C11.5196 1.60629 11.2444 0.890506 10.8823 0.23672C11.0483 0.16909 11.233 0.112731 11.4366 0.0676408C11.6403 0.0225508 11.825 0 11.991 0C12.9864 0 13.8009 0.473438 14.4344 1.42029C15.0678 2.36716 15.3846 3.58455 15.3846 5.07247ZM1.35746 18.971H13.1222V17.8213C13.1222 17.4606 13.0505 17.1112 12.9072 16.773C12.7639 16.4348 12.5867 16.1981 12.3755 16.0628C11.2896 15.3414 10.377 14.8567 9.63797 14.6087C8.89896 14.3607 8.09953 14.2367 7.23983 14.2367C6.38008 14.2367 5.57691 14.3607 4.83031 14.6087C4.0837 14.8567 3.16741 15.3414 2.08144 16.0628C1.87028 16.1981 1.69683 16.4348 1.56108 16.773C1.42534 17.1112 1.35746 17.4606 1.35746 17.8213V18.971ZM7.23983 8.11592C7.82804 8.11592 8.31448 7.8285 8.69907 7.25366C9.08373 6.6787 9.27603 5.95174 9.27603 5.07247C9.27603 4.19325 9.08373 3.4662 8.69907 2.89131C8.31448 2.31643 7.82804 2.02899 7.23983 2.02899C6.65158 2.02899 6.16515 2.31643 5.78053 2.89131C5.39592 3.4662 5.20361 4.19325 5.20361 5.07247C5.20361 5.95174 5.39592 6.6787 5.78053 7.25366C6.16515 7.8285 6.65158 8.11592 7.23983 8.11592Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="col text-start flex items-center pl-3">
                      <p
                        className={
                          navText === "following"
                            ? "col-auto flex items-center text-white"
                            : ""
                        }
                      >
                        Following
                      </p>
                    </div>
                  </div>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <hr className="hrPost mt-4" />
        <div className="row flex mt-3 flex-col">
          <div className="col mt-2">
            <h4 className="grayfeed">Suggestions for you</h4>
          </div>
          <Sugestion />
          <hr className="hrPost mt-4" />
        </div>
      </div>
    </>
  );
};

export default ProfileFeed;
