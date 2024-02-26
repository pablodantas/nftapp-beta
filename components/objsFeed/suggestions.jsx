import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import Link from "next/link";
import TimeAgo from "react-timeago";

const Sugestion = () => {
  const { Moralis, user } = useMoralis();
  const [suges, setSuges] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const fetchUseres = async () => {
    const toSkip = (page - 1) * pageSize;
    const query = new Moralis.Query("IfUser");
    query.descending("createdAt");
    query.skip(toSkip);
    query.limit(pageSize);
    query.notEqualTo("userName", "");
    const result = await query.find();
    const res = JSON.parse(JSON.stringify(result));
    return res;
  };

  const { data } = useQuery(`FeedProfile0${pageSize}`, fetchUseres, {
    staleTime: 1000 * 80,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      setSuges(data);
    }
  }, [data]);

  function perfilImag(ipfs) {
    if (ipfs) {
      let origLink = ipfs.replace(
        "ipfs://",
        "https://ipfs.moralis.io:2053/ipfs/"
      );
      return origLink;
    }
  }
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
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

  return (
    <>
      {suges.map(
        (suges, index) =>
          suges?.userName && (
            <div className="col mt-3 ml-2" key={index}>
              <Link href={`/user/${suges?.postOwner}`}>
                <button className="row flex_important btn flex feedBtn items-center p-1">
                  <div className="col-auto mr-3">
                    <div className="imgBorder">
                      <img
                        src={perfilImag(suges?.avatarUser)}
                        alt=""
                        className="imgPostAuthor"
                      />
                    </div>
                  </div>
                  <div className="col flex col_line_2">
                    <div className="row flex flex-col col_mw">
                      <div className="col flex pr-2 text-dark dark:text-white">
                        <p
                          className="m-0 text-truncate text-start flex"
                          style={{
                            fontSize: "14px",
                            fontFamily:  "SofiaPro, Arial, Tahoma, PingFangSC, sans-serif",
                          }}
                        >
                          {suges?.userName}
                          {suges?.userName && (
                            <span className="ml-2">
                              <svg
                                className="h-4 w-4"
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
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="col">
                        <h6 className="graypost2 flex">
                          <small>
                            Joined in <TimeAgo date={suges?.createdAt} />
                          </small>
                        </h6>
                      </div>
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          )
      )}
      <div className="col  ml-2 ps-1 flex flex-col">
        {loading ? (
          <div className="loader-container  flex justify-center btn_disable">
            <div className="loader"></div>
          </div>
        ) : (
          <button onClick={fetchData} className="hashtag_2">
            <small>View More</small>
          </button>
        )}
      </div>
    </>
  );
};

export default Sugestion;
