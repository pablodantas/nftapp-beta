import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import ProfileActivity from "./profileUser/ProfileActivity";
import ProfileName from "./profileUser/ProfileExploreName";
import TimeAgo from "react-timeago";
import ItemActions from "./metadata/itemActions";

const Activity_item = () => {
  const { Moralis, user } = useMoralis();
  const walletAddress = user?.attributes?.ethAddress;
  const [isLoading, setIsLoading] = useState(true);

  async function likeCoracao() {
    if (walletAddress) {
      const like = Moralis.Object.extend("like");
      const query = new Moralis.Query(like);
      query.descending("createdAt");
      query.equalTo("donoPoster", walletAddress?.toLowerCase());
      const result = await query.find();
      const res = JSON.parse(JSON.stringify(result));
      return res;
    }
  }

  const { data: coracao, isLoading: coracaoLoading } = useQuery(
    `LikeCoracao${walletAddress}`,
    likeCoracao,
    {
      staleTime: 1000 * 90,
      //cacheTime: 111120000,
    }
  );
  async function Comments() {
    if (walletAddress) {
      const ments = Moralis.Object.extend("coments");
      const query = new Moralis.Query(ments);
      query.descending("createdAt");
      query.equalTo("donoPoster", walletAddress?.toLowerCase());
      const result = await query.find();
      const res = JSON.parse(JSON.stringify(result));
      return res;
    }
  }

  const { data: comments, isLoading: commentsLoading } = useQuery(
    `comments${walletAddress}`,
    Comments,
    {
      staleTime: 1000 * 90,
      //cacheTime: 111120000,
    }
  );

  useEffect(() => {
    if (!coracaoLoading && !commentsLoading) {
      setIsLoading(false);
    }
  }, [coracaoLoading, commentsLoading]);

  const [base, setBase] = useState([]);
  const [filterVal, setFilterVal] = useState(null);
  const [filtro, setFiltro] = useState([]);

  const abreviarEndereco = (endereco) => {
    const inicio = endereco.substring(0, 12);
    const final = endereco.substring(endereco.length - 12, endereco.length);
    return `${inicio}...${final}`;
  };

  function sortByDateDesc(array) {
    return array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  useEffect(() => {
    if (coracao && comments && filterVal === null) {
      const newArray = [
        ...coracao,
        ...comments?.map((item) => {
          return {
            category: item.category,
            comentario: `${item.comentario}`,
            comentarioId: `${item.comentarioId}`,
            createdAt: `${item.createdAt}`,
            donoPoster: `${item.donoPoster}`,
            donoVoter: `${item.donoVoter}`,
            objectId: `${item.objectId}`,
          };
        }),
      ];
      setBase(sortByDateDesc(newArray));
      setFiltro(sortByDateDesc(newArray));
    } else if (coracao && comments && filterVal === null) {
      const newArray = [
        ...comments,
        ...coracao?.map((item) => {
          return {
            category: item.category,
            comentario: `${item.comentario}`,
            comentarioId: `${item.comentarioId}`,
            createdAt: `${item.createdAt}`,
            donoPoster: `${item.donoPoster}`,
            donoVoter: `${item.donoVoter}`,
            objectId: `${item.objectId}`,
          };
        }),
      ];
      setBase(sortByDateDesc(newArray));
      setFiltro(sortByDateDesc(newArray));
    }

    if (coracao && filterVal === 0) {
      setBase(coracao);
      setFiltro(coracao);
    }

    if (comments && filterVal === 1) {
      setBase(comments);
      setFiltro(comments);
    }
  }, [coracao, comments, filterVal]);

  const handleFilter = (category) => {
    setBase(base.filter((item) => item.category === category));
  };

  function recortarString(str) {
    if(str){
      const index = str.indexOf('/');
      if (index !== -1) {
        return str.slice(index + 1);
      } else {
        return str;
      }
    }
  }

  return (
    <>
      {/* <!-- Activity Tab --> */}
      <div className="tab-pane fade">
        {/* <!-- Records / Filter --> */}
        <div className="lg:flex flex flex-col_reverse ">
          {/* <!-- Records --> */}
          <div className="mb-10 shrink-0 basis-8/12 space-y-5 lg:mb-0 lg:pr-10">
            {!isLoading && base.length === 0 && (
              <h3 className="text-center mb-3 font-S text-center mb-3 pt-10 font-display">
                You don't have notifications.
              </h3>
            )}
            {isLoading ? ( // exibe animação enquanto isLoading é verdadeiro
              <div className="loader-container flex justify-center btn_disable mb-3">
                <div className="loader"></div>
              </div>
            ) : (
              base.map((item, index) => {
                return (
                  <a href={`/post/${recortarString(item?.postLike || item?.comentarioId)}`} className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl relative flex items-center border bg-white p-8 transition-shadow hover:shadow-lg" key={index}>
                    <Link href={`/user/${item?.donoVoter}`}>
                      <figure className="mr-5 self-start cursor-pointer">
                        <ProfileActivity address={item?.donoVoter} />
                      </figure>
                    </Link>
                    <div>
                      <div className="flex items-center">
                        <h3 className="no-wrpa_text font-display text-jacarta-700 text-base font-semibold dark:text-white">
                          <ItemActions
                            postLike={item?.postLike || item?.comentarioId}
                          />
                        </h3>
                        {item?.postLike && item?.comentarioId ? (
                          <span className="text-truncate ml-2 text-jacarta-200 flex items-center text-xs">
                            {abreviarEndereco(
                              item?.postLike || item?.comentarioId
                            )}
                          </span>
                        ) : (
                          <span className="text-truncate text-jacarta-200 flex items-center text-xs">
                            {abreviarEndereco(
                              item?.postLike || item?.comentarioId
                            )}
                          </span>
                        )}
                      </div>
                      <span className="dark:text-jacarta-200 text-jacarta-500 mb-1 block text-sm">
                        <Link href={`/user/${item?.donoVoter}`}>
                          <span className="cursor-pointer font-display dark:text-white hover:text-accent">
                            <ProfileName address={item?.donoVoter} />
                          </span>
                        </Link>
                        {item.comentarioId ? " commented on your post" : <></>}
                        {item.postLike ? " liked your post" : <></>}
                      </span>
                      <div>
                        {item.comentario ? (
                          <span
                            id="comentario"
                            className="text-width  line-clamp-3 text-jacarta-200 block text-xs mb-3"
                          >
                            {item?.comentario}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <span className="text-jacarta-300 block text-xs">
                        <TimeAgo date={item?.createdAt} />
                      </span>
                    </div>
                    <div className="dark:border-jacarta-600 border-jacarta-100 ml-auto rounded-full border p-3">
                      <svg className="icon fill-jacarta-700 dark:fill-white h-6 w-6">
                        {item.category === "comment" ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.8293 6.87341C13.2041 6.87341 12.7197 7.3539 12.7197 7.94711C12.7197 8.54032 13.2041 9.02086 13.8293 9.02086C14.4004 9.02086 14.8849 8.54032 14.8849 7.94711C14.8849 7.3539 14.4004 6.87341 13.8293 6.87341ZM6.25133 6.87341C5.62614 6.87341 5.14169 7.3539 5.14169 7.94711C5.14169 8.54032 5.62614 9.02086 6.25133 9.02086C6.82239 9.02086 7.30681 8.54032 7.30681 7.94711C7.30681 7.3539 6.82239 6.87341 6.25133 6.87341Z"
                              fill="black"
                              className="dark:fill-white"
                            />
                            <path
                              d="M6.59469 14.7048L4.53763 15.3437L4.51689 13.2036L4.51512 13.0208L4.39312 12.8847L4.18319 12.6505C2.03906 10.0496 1.90019 6.30787 3.90877 3.5632C6.36016 0.229397 11.0607 -0.507337 14.4122 1.89831C17.7735 4.32204 18.5144 8.96964 16.0906 12.2774C14.0553 15.0467 10.4101 16.0728 7.2432 14.8518L6.92369 14.7197L6.76187 14.6529L6.59469 14.7048Z"
                              stroke="black"
                              stroke-width="0.484848"
                              className="dark:fillStrokeWhite"
                            />
                            <path
                              d="M10.0403 6.87341C9.41514 6.87341 8.93073 7.3539 8.93073 7.94711C8.93073 8.54032 9.41514 9.02086 10.0403 9.02086C10.6114 9.02086 11.0959 8.54032 11.0959 7.94711C11.0959 7.3539 10.6114 6.87341 10.0403 6.87341Z"
                              fill="black"
                              className="dark:fill-white"
                            />
                          </svg>
                        ) : (
                          <>
                            <use
                              xlinkHref={`/icons.svg#icon-${item?.category}`}
                            ></use>
                          </>
                        )}
                      </svg>
                    </div>
                  </a>
                );
              })
            )}
          </div>

          {/* <!-- Filters --> */}
          <aside className="basis-4/12 lg:pl-5">
            <h3 className="font-display text-jacarta-500 mb-4 font-semibold dark:text-white">
              Filters
            </h3>
            <div className="flex flex-wrap">
              <button
                className={
                  filterVal === null
                    ? "mb-2 mr-2 dark:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent  rounded-button py-3 px-8 text-center font-semibold dark:text-white transition-all"
                    : "mb-2 mr-2 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold dark:text-white transition-all"
                }
                onClick={() => {
                  handleFilter(null);
                  setFilterVal(null);
                }}
              >
                <span className="text-2xs font-medium capitalize">{"All"}</span>
              </button>

              <button
                className={
                  filterVal === 0
                    ? "mb-2 mr-2 dark:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent  rounded-button py-3 px-8 text-center font-semibold dark:text-white transition-all"
                    : "mb-2 mr-2 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold dark:text-white transition-all"
                }
                onClick={() => {
                  handleFilter("likes");
                  setFilterVal(0);
                }}
              >
                <svg
                  className={
                    filterVal === 0
                      ? "icon mr-2 h-4 w-4 dark:fill-white"
                      : "icon  mr-2 h-4 w-4 group-hover:fill-white dark:fill-white"
                  }
                >
                  <use xlinkHref={`/icons.svg#icon-${"likes"}`}></use>
                </svg>
                <span className="text-2xs font-medium capitalize">
                  {"likes"}
                </span>
              </button>

              <button
                className={
                  filterVal === 1
                    ? "mb-2 mr-2 dark:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent  rounded-button py-3 px-4 text-center font-semibold dark:text-white transition-all"
                    : "mb-2 mr-2 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-4 text-center font-semibold dark:text-white transition-all"
                }
                onClick={() => {
                  handleFilter("comment");
                  setFilterVal(1);
                }}
              >
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M13.8293 6.87341C13.2041 6.87341 12.7197 7.3539 12.7197 7.94711C12.7197 8.54032 13.2041 9.02086 13.8293 9.02086C14.4004 9.02086 14.8849 8.54032 14.8849 7.94711C14.8849 7.3539 14.4004 6.87341 13.8293 6.87341ZM6.25133 6.87341C5.62614 6.87341 5.14169 7.3539 5.14169 7.94711C5.14169 8.54032 5.62614 9.02086 6.25133 9.02086C6.82239 9.02086 7.30681 8.54032 7.30681 7.94711C7.30681 7.3539 6.82239 6.87341 6.25133 6.87341Z"
                    fill="black"
                    className="dark:fill-white"
                  />
                  <path
                    d="M6.59469 14.7048L4.53763 15.3437L4.51689 13.2036L4.51512 13.0208L4.39312 12.8847L4.18319 12.6505C2.03906 10.0496 1.90019 6.30787 3.90877 3.5632C6.36016 0.229397 11.0607 -0.507337 14.4122 1.89831C17.7735 4.32204 18.5144 8.96964 16.0906 12.2774C14.0553 15.0467 10.4101 16.0728 7.2432 14.8518L6.92369 14.7197L6.76187 14.6529L6.59469 14.7048Z"
                    stroke="black"
                    stroke-width="0.484848"
                    className="dark:fillStrokeWhite"
                  />
                  <path
                    d="M10.0403 6.87341C9.41514 6.87341 8.93073 7.3539 8.93073 7.94711C8.93073 8.54032 9.41514 9.02086 10.0403 9.02086C10.6114 9.02086 11.0959 8.54032 11.0959 7.94711C11.0959 7.3539 10.6114 6.87341 10.0403 6.87341Z"
                    fill="black"
                    className="dark:fill-white"
                  />
                </svg>

                <span className="text-2xs font-medium capitalize">
                  {"comment"}
                </span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};
export default Activity_item;
