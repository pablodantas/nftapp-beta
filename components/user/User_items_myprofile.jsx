import React, { useState, useEffect, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Activity_item from "../collectrions/Activity_item";
import Image from "next/image";
import "react-tabs/style/react-tabs.css";
import My_collection_item_Upload from "../collectrions_upload/myprofile_collection_item";
import My_collection_itemPost from "../collectrions/myprofile/myprofile_collection_item";
import My_collection_item_nft from "../collectrions/myprofile/myprofile_collection_nft";
import My_collection_item_nftBlockChain from "../collectrions/myprofile/myprofile_collection_item_nftBlockChain";
import Explore_collection_item_buy from "../collectrions/myprofile/myprofile_collection_item_buy";
import My_collection_item_anuncio from "../collectrions/myprofile/myprofile_collection_anuncio";
import { useRouter } from "next/router";
import Link from "next/link";

const User_items = () => {
  //myprofile
  const router = useRouter();
  const { defaultIndex } = router.query;

  const [itemActive, setItemActive] = useState(Number(defaultIndex) || 1);
  const [showDiv, setShowDiv] = useState(false);
  const ref = useRef();
  const [currentDefaultIndex, setCurrentDefaultIndex] = useState(defaultIndex);

  useEffect(() => {
    if (defaultIndex != null) {
      setCurrentDefaultIndex(defaultIndex);
      setItemActive(Number(defaultIndex) || 1);

      const element = document.getElementById("tabList_gancho");
      if (element) {
        element.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [defaultIndex]);

  const handleTabClick = (id) => {
    setCurrentDefaultIndex(undefined);
    setItemActive(id);
    router.push("/myprofile", undefined, { shallow: true });
  };

    useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDiv(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const tabItem = [
    {
      id: 1,
      text: "UPLOADED",
      icon: "owned",
    },
    {
      id: 2,
      text: "POSTS",
      icon: "created",
    },
    {
      id: 3,
      text: "NFT $Buzz Coin",
      icon: "created",
    },
    {
      id: 4,
      text: "NFTs WALLET",
      icon: "created",
    },
    {
      id: 5,
      text: "SALE",
      icon: "on-sale",
    },
    {
      id: 6,
      text: "ADVERTS",
      icon: "created",
    },
    {
      id: 7,
      text: "ACTIVITY",
      icon: "activity",
    },
  ];
  return (
    <>
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
            layout="fill"
          />
        </picture>
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs
            className="tabs relative"
            swipeable={true}
            id="tabList_gancho"
            selectedIndex={itemActive - 1}
          >
            <TabList className="no-scrollbar nav_myprofile nav nav-tabs s mb-12  items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 lg:justify-center hidden md:flex">
              {tabItem.map(({ id, text, icon }) => {
                return (
                  <Tab
                    className="nav-item"
                    role="presentation"
                    key={id}
                    onClick={() => handleTabClick(id)}
                  >
                    <button
                      className={
                        itemActive === id
                          ? "mb-1 relative rounded-2.5xl  border-jacarta-100 p-10 dark:border-jacarta-700 nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                      style={{ padding: "10px" }}
                    >
                      <svg className="icon mr-1 h-5 w-5 fill-current">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span
                        className="text_space font-display text-base font-medium"
                        style={{ fontSize: "15px" }}
                      >
                        {text}
                      </span>
                    </button>
                  </Tab>
                );
              })}
            </TabList>
            <TabList className="no-scrollbar overflow-x-auto sm:flex-row nav nav-tabs mb-12 flex border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:hidden">
              <Tab className="nav-item" role="presentation">
                <Link href={"/collection/explore_collection"}>
                  <button
                    className="nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                    style={{ padding: "10px" }}
                  >
                    <span className="mr-1 rounded-xl p-[0.375rem]">
                      <svg
                        width="20"
                        height="24"
                        viewBox="0 0 20 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                      >
                        <path
                          d="M1 7H19V19.6067C19 20.5067 18.6435 21.3697 18.0089 22.0061C17.3742 22.6425 16.5134 23 15.6158 23H4.38417C3.48663 23 2.62585 22.6425 1.9912 22.0061C1.35655 21.3697 1 20.5067 1 19.6067V7Z"
                          stroke="#555766"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        ></path>
                        <path
                          d="M5 10.0162V5.00954C5 3.94615 5.51538 2.9263 6.43276 2.17437C7.3501 1.42243 8.5944 1 9.8917 1C11.1891 1 12.4333 1.42243 13.3507 2.17437C14.2681 2.9263 14.7835 3.94615 14.7835 5.00954V10.0162"
                          stroke="#555766"
                          stroke-width="2"
                          stroke-miterlimit="10"
                        ></path>
                      </svg>
                    </span>
                    <span
                      className="text_space font-display text-base font-medium"
                      style={{ fontSize: "15px" }}
                    >
                      SHOP
                    </span>
                  </button>
                </Link>
              </Tab>
              <Tab className="nav-item" role="presentation">
                <Link href={"/feed/global"}>
                  <button
                    className="nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                    style={{ padding: "10px" }}
                  >
                    <span className="mr-1 rounded-xl p-[0.375rem]">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 28 28"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" h-4 w-4 fill-current"
                      >
                        <path d="M14 25.6667C12.3667 25.6667 10.8403 25.3604 9.42083 24.7479C8.00138 24.1354 6.76666 23.3042 5.71666 22.2542C4.66666 21.2042 3.84027 19.9646 3.2375 18.5354C2.63472 17.1063 2.33333 15.575 2.33333 13.9417C2.33333 12.3083 2.63472 10.7868 3.2375 9.37708C3.84027 7.96736 4.66666 6.7375 5.71666 5.6875C6.76666 4.6375 8.00138 3.81597 9.42083 3.22292C10.8403 2.62986 12.3667 2.33333 14 2.33333C15.6333 2.33333 17.1597 2.62986 18.5792 3.22292C19.9986 3.81597 21.2333 4.6375 22.2833 5.6875C23.3333 6.7375 24.1597 7.96736 24.7625 9.37708C25.3653 10.7868 25.6667 12.3083 25.6667 13.9417C25.6667 15.575 25.3653 17.1063 24.7625 18.5354C24.1597 19.9646 23.3333 21.2042 22.2833 22.2542C21.2333 23.3042 19.9986 24.1354 18.5792 24.7479C17.1597 25.3604 15.6333 25.6667 14 25.6667ZM14 23.975C14.6806 23.275 15.2493 22.4729 15.7062 21.5687C16.1632 20.6646 16.5375 19.5903 16.8292 18.3458H11.2C11.4722 19.5125 11.8368 20.5625 12.2937 21.4958C12.7507 22.4292 13.3194 23.2556 14 23.975ZM11.5208 23.625C11.0347 22.8861 10.6167 22.0889 10.2667 21.2333C9.91666 20.3778 9.625 19.4153 9.39166 18.3458H5.01666C5.75555 19.7264 6.61111 20.8104 7.58333 21.5979C8.55555 22.3854 9.86805 23.0611 11.5208 23.625ZM16.5083 23.5958C17.9083 23.1486 19.1674 22.4778 20.2854 21.5833C21.4035 20.6889 22.3028 19.6097 22.9833 18.3458H18.6375C18.3847 19.3958 18.0882 20.3486 17.7479 21.2042C17.4076 22.0597 16.9944 22.8569 16.5083 23.5958ZM4.43333 16.5958H9.07083C9.0125 16.0708 8.97847 15.5993 8.96875 15.1813C8.95902 14.7632 8.95416 14.35 8.95416 13.9417C8.95416 13.4556 8.96388 13.0229 8.98333 12.6438C9.00277 12.2646 9.04166 11.8417 9.1 11.375H4.43333C4.29722 11.8417 4.20486 12.2597 4.15624 12.6292C4.10763 12.9986 4.08333 13.4361 4.08333 13.9417C4.08333 14.4472 4.10763 14.8993 4.15624 15.2979C4.20486 15.6965 4.29722 16.1292 4.43333 16.5958ZM10.8792 16.5958H17.15C17.2278 15.9931 17.2764 15.5021 17.2958 15.1229C17.3153 14.7438 17.325 14.35 17.325 13.9417C17.325 13.5528 17.3153 13.1785 17.2958 12.8188C17.2764 12.459 17.2278 11.9778 17.15 11.375H10.8792C10.8014 11.9778 10.7528 12.459 10.7333 12.8188C10.7139 13.1785 10.7042 13.5528 10.7042 13.9417C10.7042 14.35 10.7139 14.7438 10.7333 15.1229C10.7528 15.5021 10.8014 15.9931 10.8792 16.5958ZM18.9 16.5958H23.5667C23.7028 16.1292 23.7951 15.6965 23.8437 15.2979C23.8924 14.8993 23.9167 14.4472 23.9167 13.9417C23.9167 13.4361 23.8924 12.9986 23.8437 12.6292C23.7951 12.2597 23.7028 11.8417 23.5667 11.375H18.9292C18.9875 12.0556 19.0264 12.5757 19.0458 12.9354C19.0653 13.2951 19.075 13.6306 19.075 13.9417C19.075 14.3694 19.0604 14.7729 19.0312 15.1521C19.0021 15.5313 18.9583 16.0125 18.9 16.5958ZM18.6083 9.625H22.9833C22.3417 8.28333 21.4618 7.16528 20.3437 6.27083C19.2257 5.37639 17.9375 4.74444 16.4792 4.375C16.9653 5.09444 17.3785 5.87222 17.7187 6.70833C18.059 7.54444 18.3556 8.51667 18.6083 9.625ZM11.2 9.625H16.8583C16.6444 8.59444 16.2847 7.59792 15.7792 6.63542C15.2736 5.67292 14.6806 4.82222 14 4.08333C13.3778 4.60833 12.8528 5.29861 12.425 6.15417C11.9972 7.00972 11.5889 8.16667 11.2 9.625ZM5.01666 9.625H9.42083C9.63472 8.575 9.90694 7.63681 10.2375 6.81042C10.5681 5.98403 10.9861 5.18194 11.4917 4.40417C10.0333 4.77361 8.75972 5.39583 7.67083 6.27083C6.58194 7.14583 5.69722 8.26389 5.01666 9.625Z"></path>
                      </svg>
                    </span>
                    <span
                      className="text_space font-display text-base font-medium"
                      style={{ fontSize: "15px" }}
                    >
                      SOCIAL
                    </span>
                  </button>
                </Link>
              </Tab>
              {tabItem.map(({ id, text, icon }) => {
                return (
                  <Tab
                    className="nav-item"
                    role="presentation"
                    key={id}
                    onClick={() => setItemActive(id)}
                  >
                    <button
                      className={
                        itemActive === id
                          ? "mb-1 relative rounded-2.5xl  border-jacarta-100 p-10 dark:border-jacarta-700 nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }
                    >
                      <svg className="icon mr-1 h-5 w-5 fill-current">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span className="text_space font-display text-base font-medium">
                        {text}
                      </span>
                    </button>
                  </Tab>
                );
              })}
              <Tab className="nav-item" role="presentation">
                <button
                  className="nav-link hover:text-jacarta-700 text-jacarta-400  flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                  style={{ padding: "10px" }}
                  onClick={() => setShowDiv(true)}
                >
                  <span className="mr-1 rounded-xl p-[0.375rem]">
                    <svg
                      width="758"
                      height="800"
                      viewBox="0 0 758 800"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current h-4 w-4"
                    >
                      <path
                        d="M757.273 309.566C757.273 269.311 742.148 230.952 714.684 201.548C694.064 179.472 667.942 163.987 639.256 156.473C639.652 152.178 639.877 147.847 639.877 143.484C639.878 64.3656 575.512 0 496.395 0C447.905 0 404.986 24.2031 379 61.1391C353.014 24.2031 310.095 0 261.605 0C182.488 0 118.123 64.3656 118.123 143.481C118.123 147.847 118.35 152.177 118.744 156.47C90.0578 163.983 63.9391 179.469 43.3156 201.545C15.85 230.95 0.726562 269.311 0.726562 309.564C0.726562 343.136 11.2438 374.294 29.1406 399.934C10.6969 426.333 0.726562 457.748 0.726562 490.433C0.726562 563.792 50.8984 625.648 118.73 643.506C118.341 647.82 118.12 652.158 118.12 656.517C118.12 735.634 182.486 799.998 261.602 799.998C310.094 799.998 353.013 775.795 378.997 738.859C404.986 775.797 447.905 800 496.395 800C575.512 800 639.877 735.634 639.877 656.519C639.877 652.162 639.658 647.823 639.267 643.508C707.098 625.65 757.27 563.795 757.27 490.434C757.27 457.748 747.298 426.333 728.856 399.936C746.758 374.295 757.273 343.137 757.273 309.566ZM352.913 536.075V656.519C352.913 706.864 311.95 747.827 261.605 747.827C211.256 747.827 170.297 706.864 170.297 656.519C170.297 653.752 170.434 651 170.68 648.263C211.003 645.263 248.997 626.834 276.33 596.655L237.659 561.628C217.57 583.808 188.9 596.53 158.998 596.53C100.495 596.53 52.9016 548.934 52.9016 490.434C52.9016 471.853 57.7063 453.884 66.7047 438.061C92.7031 456.788 124.583 467.834 158.998 467.834V415.661C100.495 415.661 52.9016 368.066 52.9016 309.566C52.9016 260.505 86.8422 218.433 132.945 206.73C148.806 238.866 176.45 264.819 211.216 277.859L229.541 229.009C194.106 215.717 170.297 181.347 170.297 143.483C170.297 93.1344 211.259 52.175 261.605 52.175C311.95 52.175 352.913 93.1375 352.913 143.483V263.927V300.194H331.366V263.927H279.192V300.194H242.925V352.367H279.192V373.914H242.925V426.088H279.192V447.633H242.925V499.806H279.192V536.073H331.366V499.806H352.913V536.075ZM331.369 447.633V352.369H426.633V447.633H331.369ZM691.295 438.061C700.294 453.886 705.098 471.855 705.098 490.434C705.098 548.937 657.503 596.53 599.002 596.53C569.1 596.53 540.43 583.809 520.341 561.628L481.672 596.656C509.006 626.834 546.998 645.261 587.322 648.264C587.567 651 587.705 653.753 587.705 656.52C587.705 706.869 546.742 747.828 496.397 747.828C446.052 747.828 405.088 706.869 405.088 656.52V536.077V499.809H426.633V536.077H478.806V499.809H515.073V447.636H478.806V426.091H515.073V373.917H478.806V352.37H515.073V300.197H478.806V263.93H426.633V300.197H405.088V263.93V143.481C405.088 93.1328 446.05 52.1734 496.395 52.1734C546.741 52.1734 587.703 93.1328 587.703 143.481C587.703 181.344 563.894 215.714 528.459 229.008L546.784 277.858C581.552 264.816 609.194 238.862 625.056 206.728C671.159 218.433 705.1 260.503 705.1 309.564C705.1 368.066 657.505 415.659 599.003 415.659V467.833C633.417 467.834 665.297 456.786 691.295 438.061Z"
                        fill="black"
                        className="fill-current"
                      />
                    </svg>
                  </span>
                  <span
                    className="text_space font-display text-base font-medium"
                    style={{ fontSize: "15px" }}
                  >
                    A.I
                  </span>
                </button>
              </Tab>
              <div
                className={`dark:bg-jacarta-700 bg-white absolute top-0 right-0 ${
                  showDiv ? "flex" : "hidden"
                }`}
                style={{
                  padding: "7px 10px",
                  margin: "43px 0",
                  maxHeight: "100px",
                  borderRadius: "4px",
                }}
              >
                <div className="flex flex-col"
                ref={ref}
                style={{zIndex: "5"}}
                >
                  <button
                    className="btn_disable flex dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors"
                    title="under development"
                  >
                    <span>
                   
                    </span>
                    Chat
                  </button>
                  <button
                    className="btn_disable dark:hover:bg-jacarta-600 hover:text-accent focus:text-accent hover:bg-jacarta-50 flex items-center rounded-xl px-5 py-2 transition-colors"
                    title="under development"
                  >
                    <span>
                      
                    </span>
                    IMG
                  </button>
                </div>
              </div>
            </TabList>
            {tabItem.map(({ id, text, icon }) => {
              return (
                <TabPanel>
                  <div className="">
                    {id === 1 && <My_collection_item_Upload />}
                    {id === 2 && <My_collection_itemPost />}
                    {id === 3 && <My_collection_item_nft />}
                    {id === 4 && <My_collection_item_nftBlockChain />}
                    {id === 5 && <Explore_collection_item_buy />}
                    {id === 6 && <My_collection_item_anuncio />}
                    {id === 7 && <Activity_item />}
                  </div>
                </TabPanel>
              );
            })}
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default User_items;
