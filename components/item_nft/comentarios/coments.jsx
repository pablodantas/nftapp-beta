import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import ProfileExplore from "../../collectrions/profileUser/ProfileExplore";
import ProfileExploreName from "../../collectrions/profileUser/ProfileExploreName";
import InfiniteScroll from "react-infinite-scroll-component";
import TimeAgo from "react-timeago";

const Coments = ({
  showElement,
  contract,
  tokeId,
  walletAddress,
  donoPoster,
}) => {
  const comentarioId = `${contract}/${tokeId}`;

  const { Moralis } = useMoralis();

  const [coments, setComents] = useState();
  const [hasMoreData, setHasMoreData] = useState(true);
  const [tempComent, setTempComent] = useState();
  const [isLargeScreen, setIsLargeScreen] = useState();
  const [xiX, setX] = useState();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [CommentError, setCommentError] = useState(false);
  const [showElementDelete, setShowElementDEL] = useState("");
  const [showElementIndexDEL, setShowElementIndexDEL] = useState();

  const saveComent = async () => {
    const User = Moralis.Object.extend("coments");
    const query = new User();
    if (comentarioId && walletAddress && coments && donoPoster) {
      query.set("comentarioId", comentarioId);
      query.set("donoPoster", donoPoster?.toLowerCase());
      query.set("donoVoter", walletAddress?.toLowerCase());
      query.set("category", "comment");
      query.set("comentario", coments);
      let arrm = JSON.parse(JSON.stringify([query.attributes]));
      if (arrm[0]) {
        setTempComent(arrm[0]);
        setComents("");
      }
    }
    await query.save();

    const notifications = Moralis.Object.extend("Notifications");
    const noti = new Moralis.Query(notifications);
    noti.equalTo("postOwner", donoPoster?.toLowerCase());
    const myDetails = await noti.first();
    if (myDetails) {
      if (walletAddress) {
        myDetails.set("notifications", true);
        await myDetails.save();
      }
    } else {
      const notifications = Moralis.Object.extend("Notifications");
      const noti = new notifications();
      if (donoPoster) {
        noti.set("notifications", true);
        noti.set("postOwner", donoPoster?.toLowerCase());
      }
      await noti.save();
    }
    refetch();
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const fetchItem = async () => {
    const query = new Moralis.Query("coments");
    query.equalTo("comentarioId", comentarioId);
    const toSkip = (page - 1) * pageSize;
    query.descending("createdAt");
    query.skip(toSkip);
    query.limit(pageSize);
    const result = await query.find();
    const a = JSON.parse(JSON.stringify(result));
    return a;
  };

  const { data, isLoading, error, refetch } = useQuery(
    `comentario${comentarioId}pag${pageSize}`,
    fetchItem,
    {
      staleTime: 1000 * 60,
      //cacheTime: 111120000,
    }
  );

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  useEffect(() => {
    if (tempComent) {
      let newComent = new Array(tempComent);
      setItem(newComent.concat(item));
    }
  }, [tempComent]);

  const fetchMoreData = async () => {
    setLoading(true);
    const newData = await fetchItem();
    setItems([...items, ...newData]);
    if (newData.length < pageSize) {
      setHasMoreData(false);
    }
    setPageSize(pageSize + 3);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItem();
      setItems(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    xMan();
  }, [showElement]);

  function xMan() {
    setX(!xiX);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deleteComment = async (objectId) => {
    try {
      const query = new Moralis.Query("coments");
      const comment = await query.get(objectId);
      const currentUser = Moralis.User.current();
      const owner = comment.get("donoVoter");

      await comment.destroy();
      console.log("Comentário excluído com sucesso.");
      const index = item.findIndex((item) => item.objectId === objectId);
      console.log(item.comentarioId, objectId);
      const newItems = item.filter((_, i) => i !== index);
      setItem(newItems);
    } catch (error) {
      console.error("Erro ao excluir o comentário: ", error);
      setItem((prevItems) =>
        prevItems.map((item) =>
          item.objectId === objectId
            ? {
                ...item,
                error: true,
              }
            : item
        )
      );
    } finally {
      setShowElementIndexDEL();
    }
  };

  const [del, setDEL] = useState();
  function DeleteModal(index, item) {
    const a = !showElementDelete;
    setShowElementIndexDEL(index);
    setShowElementDEL(a);
    setDEL(item);
  }

  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {xiX ? (
        <div className={"modal fade show block"}>
          <div className="modal-dialog">
            <div className="modal-content dark:bg-jacarta-700" ref={ref}>
              <div className="modal-body">
                <div className="" key={comentarioId}>
                  <div
                    className="h-full flex  flex-col col-around dark:bg-jacarta-900 w-full-400 bg-white"
                    style={
                      isLargeScreen
                        ? {
                            minHeight: "500px",
                            maxHeight: "350px",
                            minWidth: "450px",
                            maxWidth: "450px",
                            borderRadius: "8px",
                          }
                        : {
                            minHeight: "500px",
                            maxHeight: "350px",
                            minWidth: "80vw",
                            maxWidth: "80vw",
                            borderRadius: "8px",
                          }
                    }
                  >
                    <div className="flex justify-between">
                      <div className="flex w-full justify-between ml-5">
                        <h3 className="text_space title_comments">Comments</h3>
                      </div>
                    </div>
                    {/* <!-- Body --> */}
                    <div className="px-2 text-center row flex">
                      {/* <!-- caixa de comentarios --> */}
                      <div
                        className="col flex flex-col  overflow-y-auto h-225"
                        style={{ minHeight: "350px", maxHeight: "350px" }}
                      >
                        {/* <!-- corpo do comentario --> */}
                        {!isLoading && item.length === 0 && (
                          <p className="text-center mb-3">
                            There are no comments yet.
                          </p>
                        )}

                        {isLoading ? ( // exibe animação enquanto isLoading é verdadeiro
                          <div className="loader-container flex justify-center btn_disable mb-3">
                            <div className="loader"></div>
                          </div>
                        ) : (
                          item.map((item, index) => (
                            <>
                              {showElementIndexDEL === index ? (
                                <div className={"modal fade show block"}>
                                  <div className="modal-dialog max-w-2xl">
                                    <div className="modal-content dark:bg-jacarta-700">
                                      <div className="modal-header p-over_20">
                                        <h5
                                          className="font-pop modal-title text-space text-none"
                                          id="placeBidLabel"
                                          style={{ fontSize: "18px" }}
                                        >
                                          Do you want to delete this comment?
                                        </h5>
                                      </div>
                                      {/* <!-- Body --> */}
                                      <div className="modal-body p-over_20">
                                        <div className="mb-2 flex justify-around">
                                          <button
                                            className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 dark:bg-white/[.15] space-x-2 rounded-xl  py-2 px-4 name_light transition-colors"
                                            onClick={() =>
                                              deleteComment(item.objectId)
                                            }
                                          >
                                            Yes
                                          </button>
                                          <button
                                            className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 dark:bg-white/[.15] space-x-2 rounded-xl  py-2 px-4 name_light transition-colors"
                                            onClick={() =>
                                              setShowElementIndexDEL()
                                            }
                                          >
                                            No
                                          </button>
                                        </div>
                                      </div>
                                      {/* <!-- end body --> */}
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                              <div
                                className="flex dark:hover:bg-jacarta-600 rounded-xl transition-colors hover:bg-jacarta-50"
                                key={index}
                                style={{
                                  padding: "7px",
                                  cursor: "pointer",
                                  margin: "5px",
                                }}
                              >
                                <div className="flex">
                                  <div className="flex">
                                    <div className="">
                                      <Link href={`/user/${item?.donoVoter}`}>
                                        <p className="cursor-pointer mr-2">
                                          <ProfileExplore
                                            address={item?.donoVoter}
                                          />
                                        </p>
                                      </Link>
                                    </div>
                                    <div className="text-start">
                                      <pre
                                        className="text-start sp_comments_p"
                                        style={{
                                          whiteSpace: "pre-wrap",
                                          maxWidth: "100%",
                                        }}
                                      >
                                        <Link href={`/user/${item?.donoVoter}`}>
                                          <span className="flex items-center font-display sp_comments mr-2 user_name cursor-pointer name_user_hover">
                                            <ProfileExploreName
                                              address={item?.donoVoter}
                                            />
                                            <svg
                                              width="22"
                                              height="22"
                                              viewBox="0 0 22 22"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-4 w-4 ml-1 mb-1"
                                            >
                                              <g clip-path="url(#clip0_11_2)">
                                                <path
                                                  d="M18 6.71429L10.087 17L5 12.4286L6.69565 10.1429L10.087 13L15.7391 5L18 6.71429Z"
                                                  fill="white"
                                                />
                                                <path
                                                  d="M20.0045 7.26244L20.003 7.27163L20.0105 7.2771C21.1958 8.13089 22 9.45341 22 11C22 12.5466 21.1958 13.8701 20.0105 14.7229L20.003 14.7284L20.0045 14.7376C20.2441 16.1775 19.8706 17.6904 18.78 18.78C17.6875 19.8726 16.1755 20.2361 14.7415 20.0025L14.7323 20.001L14.7269 20.0086C13.8772 21.1978 12.5426 22 11 22C9.45341 22 8.12789 21.1948 7.2761 20.0076L7.27067 20L7.26147 20.0015C5.82552 20.2361 4.31256 19.8736 3.21901 18.78C2.12644 17.6875 1.76288 16.1745 2.00453 14.7376L2.00608 14.7284L1.99849 14.7229C0.814132 13.8711 0 12.5475 0 11C0 9.45248 0.814135 8.12792 1.99848 7.2771L2.00608 7.27166L2.00453 7.26241C1.76288 5.82549 2.12644 4.31256 3.22 3.22C4.31058 2.12841 5.82456 1.75587 7.26947 1.99552L7.27872 1.99705L7.28416 1.98942C8.13089 0.802184 9.45639 0 11 0C12.5416 0 13.8742 0.801205 14.7249 1.98945L14.7303 1.99706L14.7396 1.99552C16.1794 1.75587 17.6904 2.1304 18.78 3.22C19.8706 4.30959 20.2451 5.82257 20.0045 7.26244ZM9.86855 13.4382L7.71314 11.2828L7.71293 11.2826C7.52124 11.0975 7.26451 10.995 6.99802 10.9973C6.73152 10.9997 6.47659 11.1065 6.28815 11.295C6.0997 11.4834 5.99281 11.7384 5.9905 12.0049C5.98819 12.2713 6.09063 12.5281 6.27577 12.7198L6.27595 12.72L9.28005 15.724C9.38444 15.8284 9.51031 15.9089 9.64892 15.9597C9.78753 16.0105 9.93557 16.0305 10.0827 16.0183C10.2298 16.0061 10.3725 15.962 10.5009 15.8891C10.6292 15.8162 10.7402 15.7161 10.826 15.596L15.8328 8.58643C15.9104 8.47777 15.9658 8.35494 15.9958 8.22486C16.0259 8.09481 16.0301 7.96011 16.0081 7.82844C15.9861 7.69677 15.9384 7.57075 15.8677 7.45752C15.797 7.3443 15.7046 7.24612 15.596 7.16856C15.3767 7.01183 15.1041 6.94863 14.8382 6.99285C14.5723 7.03707 14.3349 7.18508 14.1781 7.40438L9.86855 13.4382Z"
                                                  fill="url(#paint0_linear_11_2)"
                                                />
                                              </g>
                                              <defs>
                                                <linearGradient
                                                  id="paint0_linear_11_2"
                                                  x1="-0.0150205"
                                                  y1="7.60037"
                                                  x2="22.005"
                                                  y2="22.005"
                                                  gradientUnits="userSpaceOnUse"
                                                >
                                                  <stop stop-color="#BF4098" />
                                                  <stop
                                                    offset="1"
                                                    stop-color="#579AD5"
                                                  />
                                                </linearGradient>
                                                <clipPath id="clip0_11_2">
                                                  <rect
                                                    width="22"
                                                    height="22"
                                                    fill="white"
                                                  />
                                                </clipPath>
                                              </defs>
                                            </svg>
                                          </span>
                                        </Link>
                                        {item?.comentario}
                                      </pre>
                                      {Moralis.User.current() &&
                                        Moralis.User.current().get(
                                          "ethAddress"
                                        ) === item.donoVoter && (
                                          <button
                                            onClick={() => DeleteModal(index)}
                                            className="mr-2 hover:text-accent"
                                          >
                                            <small>Delete</small>
                                          </button>
                                        )}
                                      <small className="text-truncate text_coment_date">
                                        <TimeAgo
                                          date={item?.createdAt}
                                          live={true}
                                        />
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <hr className="hrPost mb-1"/> */}
                            </>
                          ))
                        )}
                        {hasMoreData &&
                          item.length > 1 &&
                          (loading ? (
                            <div className="loader-container">
                              <div className="loader"></div>
                            </div>
                          ) : (
                            <button
                              onClick={fetchMoreData}
                              className="flex justify-center"
                            >
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
                          ))}
                      </div>
                    </div>
                    {/* <!-- end body --> */}
                    <div className="">
                      <div className="flex justify-center w-full">
                        <div
                          className="flex w-full"
                          style={{ margin: "10px 35px" }}
                        >
                          <textarea
                            onChange={(e) => setComents(e.target.value)}
                            value={coments}
                            type="text"
                            className="text-jacarta-700 pt-0 pb-0 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-400 border pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white input_border_2"
                            style={{
                              padding: "15px",
                              maxHeight: "57px",
                              resize: "none",
                              width: "100%",
                            }}
                          />
                          <button
                            type="submit"
                            className="bg_button btn_space_3 input_button_border"
                            onClick={saveComent}
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Coments;
