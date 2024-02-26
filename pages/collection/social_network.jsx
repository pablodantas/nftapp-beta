/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { tranding_category_filter } from "../../data/categories_data";
import { HeadLine } from "../../components/component";
import Feature_collections_data from "../../data/Feature_collections_data";
import Collection_dropdown from "../../components/dropdown/collection_dropdown";
import Explore_collection_item from "../../components/collectrions/explore_collection_item";
import Meta from "../../components/Meta";
import { collectCollectionData } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";

const Social_network = () => {
  const dispatch = useDispatch();
  const [collectionFilteredData, setCollectionFilteredData] = useState(
    Feature_collections_data
  );
  const [filterVal, setFilterVal] = useState(0);

  const handleItemFilter = (text) => {
    if (text === "all") {
      setCollectionFilteredData(Feature_collections_data);
    } else {
      setCollectionFilteredData(
        Feature_collections_data.filter((item) => item.category === text)
      );
    }
  };

  useEffect(() => {
    dispatch(collectCollectionData(collectionFilteredData.slice(0, 8)));
  }, [dispatch, collectionFilteredData]);

  return (
    <>
      <Meta title="Explore" />
      <section className="relative mt-24 lg:pb-48 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>

        <div className="container">
          <HeadLine
            text="Explore"
            classes="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white"
          />

          {/* <!-- Filter --> */}
          <div className="mb-8 flex flex-wrap items-start justify-between">
            <ul className="flex flex-wrap items-center">
              {tranding_category_filter.map(({ id, svg, text }) => {
                if (text === "all") {
                  return (
                    <li
                      className="my-1 mr-2.5"
                      key={id}
                      onClick={() => {
                        handleItemFilter(text);
                        setFilterVal(id);
                      }}
                    >
                      <button
                        className={
                          filterVal === id
                            ? " group bg-accent font-display flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors border-transparent text-white capitalize"
                            : "dark:border-jacarta-600 dark:bg-jacarta-900 dark:hover:bg-accent group hover:bg-accent border-jacarta-100 font-display text-jacarta-500 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent dark:hover:text-white capitalize"
                        }
                      >
                        {text}
                      </button>
                    </li>
                  );
                } else {
                }
              })}
            </ul>
            {/* dropdown */}
            <Collection_dropdown />
          </div>

          {/* <!-- Grid --> */}
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
            <Explore_collection_item itemFor="explore-collection" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Social_network;
