/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { tranding_category_filter } from "../../data/categories_data";
import { HeadLine } from "../../components/component";
import Feature_collections_data from "../../data/Feature_collections_data";
import Collection_dropdown from "../../components/dropdown/collection_dropdown";
import Explore_collection_item from "../../components/collectrions/explore_collection_item";
import Meta from "../../components/Meta";
import Footer from "../../components/footer";
import SearchNFT from "../../components/search_nft/search_nft";
import { collectCollectionData } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";
import Explore_carousel from "../../components/carousel/explore_carousel"

const Explore_collection = () => {
  const [dropdownItemActive, setDropdownItemActive] = useState(null);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("Trending");

  const handleDropdown = () => {
    window.addEventListener("click", (w) => {
      if (w.target.closest(".dropdown-toggle")) {
        if (dropdownShow) {
          setDropdownShow(false);
        } else {
          setDropdownShow(true);
        }
      } else {
        setDropdownShow(false);
      }
    });
  };

  
  const handleDropdownItemClick = (id, text) => {
    setDropdownItemActive(id);
    setDropdownShow(false);
    setTrendingText(text);
  };
  
  const dropdownItemText = [ { id: 3,    text: "All",  }, {    id: 1,    text: "Lowest price",  },  {    id: 2,    text: "Biggest price",  },  {    id: 3,    text: "Recent",  }, {    id: 4 ,    text: "Announced",  }];
  
  const [trendingText, setTrendingText] = useState("Trending");

  return (
    <>
      <Meta title="Explore" />
      <Explore_carousel />
      <section className="relative lg:pb-48 pb-24 mt-5">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>

        <div className="container">
          {/* <!-- Filter --> */}
          <div className="flex flex-col mb-8 pt-10">
            <HeadLine
              text="Explore"
              classes="ml-2 mb-3 text-start font-display text-jacarta-700  text-center text-xl font-medium dark:text-white"
            />
            <div className="flex flex-wrap items-start justify-between">
              {/* dropdown */}
              <div className="dropdown relative my-1 cursor-pointer">
                <button
                  className="dark:bg-jacarta-700 dropdown-toggle border-jacarta-100 dark:border-jacarta-600 inline-flex w-48 items-center justify-between rounded-lg border bg-white py-2 px-3 text-sm dark:text-white"
                  onClick={handleDropdown}
                >
                  <span className="font-display">{trendingText}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 h-4 w-4 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                  </svg>
                </button>

                <div
                  className={
                    dropdownShow
                      ? " dark:bg-jacarta-800 z-10 max-w-sm w-[13rem] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl absolute top-full right-0 show"
                      : " dark:bg-jacarta-800 z-10 max-w-sm w-[13rem] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl absolute top-full right-0 hidden"
                  }
                >
                  {dropdownItemText.map(({ id, text }) => {
                    return (
                      <button
                        key={id}
                        className="text_space dropdown-item font-display text-jacarta-700 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full  rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                          onClick={() => handleDropdownItemClick(id, text)}
                      >
                        {text}
                        {dropdownItemActive === id && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="fill-accent h-4 w-4 ml-2"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Grid --> */}
          <div className="flex flex-wrap  grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4 col_mkt_flex">
            <Explore_collection_item
              itemFor="explore-collection"
              filter={dropdownItemActive}
              collection={search}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Explore_collection;
