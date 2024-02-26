import Link from "next/link";
import { hero_5_data } from "../../data/coverflow_data";
import React, { useRef, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import particlesConfig from "./particles.json";
import { useRouter } from "next/router";
import Latest_update from "../modal/latest _updates_modal";

const Hero_5 = () => {
  const particles = useRef();
  // const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   const hasSeenModal = localStorage.getItem("hasSeenModal");

  //   if (router.pathname === "/" && !hasSeenModal) {
  //     setShowModal(true);
  //     localStorage.setItem("hasSeenModal", "true");
  //   }
  // }, [router.pathname]);

  return (
    <>
      {/* {showModal && <Latest_update />} */}
      {/* <!-- Hero --> */}
      <Particles options={particlesConfig} container={particles} />
      <section className="relative py-20 md:pt-32">
        <picture className="light_picture pointer-events-none absolute inset-0 -z-10 dark:hidden">
          {/* <img
            src="/images/tap_03.png"
            alt="gradient"
            className="w-full light_img"
          /> */}
        </picture>
        <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
          <img src="/images/8.jpg" alt="gradient dark" />
        </picture>
        <div className="h-full px-2">
          <div className="grid h-full items-center gap-4 lg:grid-cols-12">
            <div className="col-span-6 flex h-full flex-col md:justify-start items-center justify-center py-10 md:items-start md:py-12 xl:col-span-5 xl:pl-[20%] xl:pr-[10%]">
              {/* <div className="mb-10 w-full sm:flex sm:space-x-4">
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-[#5899d5]">
                    10,569
                  </span>
                  <span className="block font-display text-sm text-jacarta-500 dark:text-white">
                    Collectibles
                  </span>
                </div>
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-[#5899d5]">
                    1,200
                  </span>
                  <span className="block font-display text-sm text-jacarta-500 dark:text-white">
                    Auctions
                  </span>
                </div>
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-[#5899d5]">
                    6,897
                  </span>
                  <span className="block font-display text-sm text-jacarta-500 dark:text-white">
                    Artists
                  </span>
                </div>
              </div> */}
              <h1 className="mb-6 text-center font-display text-3xl text-jacarta-700 dark:text-white md:text-left lg:text-4xl xl:text-5xl">
                Exchange Exclusive NFTs on our Web3 Social Platform
              </h1>
              <p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
                The {"world's"} largest digital marketplace for crypto
                collectibles and non-fungible tokens
              </p>
              <div className="flex space-x-4">
                  <a
                  href="https://socialverse.finance/"
                  target="_blank"
                    className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] w-36 rounded-button py-3 px-8 text-center font-semibold text-white  w-36 rounded-button py-3 px-8 text-center font-semibold text-white"
                  >
                    About us
                  </a>
                <Link href="/collection/explore_collection">
                  <a className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] w-36 rounded-button py-3 px-8 text-center font-semibold text-white w-36 rounded-button py-3 px-8 text-center font-semibold text-[#9E7CFF] bg_button2">
                    Explore
                  </a>
                </Link>
              </div>
            </div>

            {/* <!-- Hero images --> */}
            <div className="relative col-span-6 xl:col-span-6 xl:col-start-7 col-cards_header">
              <div className="md:flex md:space-x-6 xl:space-x-12">
                {hero_5_data.map((item, index) => {
                  const { id, img, title, authorImage, authorName, subItem } =
                    item;
                  const itemLink = img
                    .split("/")
                    .slice(-1)
                    .toString()
                    .replace("_2lg.jpg", "")
                    .replace(".gif", "");
                  return (
                    <div
                      className={
                        index === 0
                          ? "mb-6 md:flex md:w-1/2 md:items-center"
                          : "space-y-6 md:w-1/2 xl:space-y-12"
                      }
                      key={id}
                    >
                      <article>
                        <div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                          <figure className="relative">
                            <Link href={`/item/${itemLink}`}>
                              <a>
                                <img
                                  src={img}
                                  alt="item 1"
                                  className="w-full object-cover"
                                  height="437"
                                  width="406"
                                />
                              </a>
                            </Link>
                          </figure>
                          <div className="p-6">
                            <div className="flex">
                              <Link href="#">
                                <a className="shrink-0">
                                  <img
                                    src={authorImage}
                                    alt="avatar"
                                    className="mr-4 h-10 w-10 rounded-full"
                                  />
                                </a>
                              </Link>
                              <div>
                                <Link href={`/item/${itemLink}`}>
                                  <a className="block">
                                    <span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
                                      {title}
                                    </span>
                                  </a>
                                </Link>
                                <Link href="/user/avatar_6">
                                  <a className="text-2xs text-accent">
                                    {authorName}
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                      {subItem &&
                        subItem.map(
                          ({ id, img, title, authorImage, authorName }) => {
                            const itemLink = img
                              .split("/")
                              .slice(-1)
                              .toString()
                              .replace(".jpg", "")
                              .replace(".gif", "")
                              .replace("_lg", "");
                            return (
                              <div className="md:w-3/4" key={id}>
                                <article>
                                  <div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                                    <figure className="relative">
                                      <Link href={`/item/${itemLink}`}>
                                        <a>
                                          <img
                                            src={img}
                                            alt="item 1"
                                            className="w-full object-cover"
                                            height="437"
                                            width="406"
                                          />
                                        </a>
                                      </Link>
                                    </figure>
                                    <div className="p-6">
                                      <div className="flex">
                                        <Link href="/user/avatar_6">
                                          <a className="shrink-0">
                                            <img
                                              src={authorImage}
                                              alt="avatar"
                                              className="mr-4 h-10 w-10 rounded-full"
                                            />
                                          </a>
                                        </Link>
                                        <div>
                                          <Link href={`/item/${itemLink}`}>
                                            <a className="block">
                                              <span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
                                                {title}
                                              </span>
                                            </a>
                                          </Link>
                                          <Link href="/user/avatar_6">
                                            <a className="text-2xs text-accent">
                                              {authorName}
                                            </a>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              </div>
                            );
                          }
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end hero --> */}
    </>
  );
};

export default Hero_5;
