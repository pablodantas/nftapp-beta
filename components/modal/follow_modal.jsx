import React, { useEffect, useState, useRef } from "react";
import { useMoralis } from "react-moralis";
import { useQuery, QueryClient } from "react-query";
import Link from "next/link";
import { useRouter } from "next/router";

function Follow({ keyModal, showElementFOLLOW, seguindo, closeButton }) {
  const ref = useRef();
  const { Moralis, user } = useMoralis();
  const walletAddress = user?.attributes?.ethAddress;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchItem = async () => {
    if (seguindo) {
      const query = new Moralis.Query("IfUser");
      const toSkip = (page - 1) * pageSize;
      query.containedIn("postOwner", seguindo);
      query.skip(toSkip);
      query.limit(pageSize);
      const result = await query.find();
      const res = JSON.parse(JSON.stringify(result));
      return res;
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
        closeButton();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();

  const [item, setItem] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const { data, isLoading, error } = useQuery(
    `${walletAddress}page${pageSize}seguidorProfileAvatar${seguindo}`,
    fetchItem,
    {
      staleTime: 1000 * 90,
      refetchInterval: 5000,
      cacheTime: 1000 * 60 * 2,
    }
  );

  function perfilImag(ipfs) {
    let origLink = ipfs?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
    return origLink;
  }

  useEffect(() => {
    if (data) {
      setItem(data);
    }
  }, [data]);

  const [xiX, setX] = useState();

  useEffect(() => {
    xMan();
  }, [showElementFOLLOW]);

  function xMan() {
    setX(!xiX);
  }

  const fetchData = () => {
    setPageSize(pageSize + 1);
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  async function handleSeguir(follow, key) {
    console.log("cateira", follow);
    const a = follow.toLowerCase();
    const b = walletAddress.toLowerCase();

    try {
      if (b && a && a !== b) {
        const like = Moralis.Object.extend("seguir");
        const query = new Moralis.Query(like);
        query.equalTo("seguindo", b);
        query.equalTo("seguidores", a);
        const likeIses = await query.first();
        console.log("o", likeIses);
        if (likeIses) {
          likeIses.destroy();
          const newUser = item.filter((_, i) => i !== key);
          setItem(newUser);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      // router.replace('/myprofile');
    }
  }

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function handleImageLoad() {
    setIsImageLoaded(true);
  }

  return (
    <>
      {xiX ? (
        <div className={"modal fade show block"} key={keyModal}>
          <div className="modal-dialog w-40vw">
            <div className="modal-content dark:bg-jacarta-700" ref={ref}>
              <div className="modal-header p-over_20 flex justify-between items-center">
                <h6
                  className="font-pop modal-title text-space text-none"
                  id="placeBidLabel"
                >
                  Followers
                </h6>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body p-over_20 h-70">
                {!isLoading && item.length === 0 && (
                  <p className="text-center p-3">
                    You do not have any followers to display.
                  </p>
                )}
                {loading ? ( // exibe animação enquanto isLoading é verdadeiro
                  <div className="loader-container flex justify-center btn_disable">
                    <div className="loader"></div>
                  </div>
                ) : (
                  item.map(
                    (data, index) => (
                      (
                        <div
                          className="flex items-center justify-between"
                          key={index}
                        >
                          <Link href={`/user/${data.postOwner}`}>
                            <div className="cursor-pointer flex items-center dark:hover:bg-jacarta-600 rounded-xl transition-colors hover:bg-jacarta-50 p-2">
                              {!isImageLoaded && (
                                <div className="placeholder pulse mr-2 w-8 h-8">
                                  <div className="cicrle rounded-full w-8 h-8"></div>
                                </div>
                              )}
                              <img
                                src={perfilImag(data?.avatarUser)}
                                alt=""
                                className="rounded-full mr-2 w-8 h-8"
                                onLoad={handleImageLoad}
                                style={{
                                  display: isImageLoaded ? "block" : "none",
                                }}
                              />
                              <p>
                                {data?.userName}{" "}
                                <span className="dark:text-jacarta-400">
                                  @{data?.nameUserLink}
                                </span>
                              </p>
                            </div>
                          </Link>
                          <div>
                            <button
                              onClick={() =>
                                handleSeguir(data.postOwner, index)
                              }
                              className="flex items-center btn_follow p-1 rounded"
                            >
                              remove{" "}
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-1"
                              >
                                <path
                                  d="M14.667 6L12.0003 8.66667ZM12.0003 6L14.667 8.66667ZM4.33366 14.0001H11.667C12.5875 14.0001 13.3337 13.2539 13.3337 12.3334C13.3337 9.61293 9.33366 9.66673 8.00033 9.66673C6.66699 9.66673 2.66699 9.61293 2.66699 12.3334C2.66699 13.2539 3.41319 14.0001 4.33366 14.0001ZM10.667 4.66667C10.667 6.13943 9.47306 7.33333 8.00033 7.33333C6.52757 7.33333 5.33366 6.13943 5.33366 4.66667C5.33366 3.19391 6.52757 2 8.00033 2C9.47306 2 10.667 3.19391 10.667 4.66667Z"
                                  fill="white"
                                />
                                <path
                                  d="M14.667 6L12.0003 8.66667M12.0003 6L14.667 8.66667M4.33366 14.0001H11.667C12.5875 14.0001 13.3337 13.2539 13.3337 12.3334C13.3337 9.61293 9.33366 9.66673 8.00033 9.66673C6.66699 9.66673 2.66699 9.61293 2.66699 12.3334C2.66699 13.2539 3.41319 14.0001 4.33366 14.0001ZM10.667 4.66667C10.667 6.13943 9.47306 7.33333 8.00033 7.33333C6.52757 7.33333 5.33366 6.13943 5.33366 4.66667C5.33366 3.19391 6.52757 2 8.00033 2C9.47306 2 10.667 3.19391 10.667 4.66667Z"
                                  stroke="white"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )
                    )
                  )
                )}
              </div>
              {isLoading ? ( // exibe animação enquanto isLoading é verdadeiro
                <div className="loader-container flex justify-center btn_disable mb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                  <button
                    onClick={fetchData}
                    className="flex w-full justify-center mb-5"
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
              )}
              {/* <!-- end body --> */}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Follow;
