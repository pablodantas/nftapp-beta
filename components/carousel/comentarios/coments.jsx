import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
// import ProfileExplore from "../profile/ProfileExplore";
// import ProfileExploreName from "../profile/ProfileExploreName";
import InfiniteScroll from "react-infinite-scroll-component";

const Coments = ({ showElement, contract, tokeId, walletAddress }) => {
    const comentarioId = `like${contract}tokenlike${tokeId}`;

    const [coments, setComents] = useState();
    const [xiX, setX] = useState();
    const [item, setItem] = useState([]);

    return (
        <>
       {xiX ?
          <div className="w-comments_2 absolute" key={comentarioId}>
            <div className="h-full flex  flex-col col-around dark:bg-jacarta-900 w-full-400">
              <div className="flex justify-between">
                <div className="flex w-full justify-between ml-5">
                  <h3 className="text_space title_comments">Comments</h3>
                  <button
                    type="button"
                    className="btn-close mt-2"
                    onClick={() => setX()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* <!-- Body --> */}
              <div className="p-6 text-center row flex">
                {/* <!-- caixa de comentarios --> */}
                <div className="col flex flex-col ml-3 overflow-y-auto h-225">
                  {/* <!-- corpo do comentario --> */}
                  {item.map((item, index) => (
                    <>
                      <div className="flex mb-5 " key={index}>
                        <div className="flex">
                          <div className="flex">
                            <div className="imgBorder2">
                              <ProfileExplore address={item?.postOwner} />
                            </div>
                            <p className="text-start sp_comments_p">
                              <span className="sp_comments mr-2 user_name">
                                <ProfileExploreName address={item?.postOwner} />
                              </span>
                              {item?.comentario}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <button onClick={"fetchData"} className="flex justify-center">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 81 79"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40.5 76C61.1269 76 78 59.741 78 39.5C78 19.259 61.1269 3 40.5 3C19.8731 3 3 19.259 3 39.5C3 59.741 19.8731 76 40.5 76Z"
                        stroke="#6d6fb8"
                        strokeWidth="6"
                      />
                      <line
                        x1="27"
                        y1="37.5"
                        x2="53"
                        y2="37.5"
                        stroke="#6d6fb8"
                        strokeWidth="3"
                      />
                      <line
                        x1="41.5"
                        y1="27"
                        x2="41.5"
                        y2="52"
                        stroke="#6d6fb8"
                        strokeWidth="3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* <!-- end body --> */}
              <div className="">
                <div className="flex justify-center w-100">
                  <div className="flex">
                    <input
                      onChange={(e) => setComents(e.target.value)}
                      value={coments}
                      type="text"
                      className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-400 border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white input_border"
                    />
                    <button
                      type="submit"
                      className="bg_button btn_space_3 input_button_border"
                      onClick={"saveComent"}
                    >
                      <svg
                        className=""
                        width="20"
                        height="20"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.9974 44.4383L48.7266 25.6883L4.9974 6.9383L4.97656 21.5216L36.2266 25.6883L4.97656 29.855L4.9974 44.4383Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        : null}
      </>
    );
};

export default Coments;
