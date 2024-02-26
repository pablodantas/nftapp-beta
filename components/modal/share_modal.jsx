import React, { useEffect, useState } from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { useRouter } from "next/router";

function Share({ keyModal, showShare }) {
  const router = useRouter();

  const sharePost = () => {
    const postLink = `${window.location.origin}/global/${objectId}`;
    navigator.share({
      title: "Check out this post!",
      text: "I found this post on MyApp and wanted to share it with you.",
      url: postLink,
    });
  };

  const [xiX, setX] = useState();
  useEffect(() => {
    xMan();
  }, [showShare]);

  function xMan() {
    setX(!xiX);
  }

  return (
    <>
      {xiX ? (
        <div
          className={"modal fade show block"}
          key={keyModal}
          style={{ maxWidth: "600px" }}
        >
          <div className="modal-dialog">
            <div className="modal-content dark:bg-jacarta-700">
              <div className="modal-header p-over_20 flex justify-between items-center">
                <h6
                  className="w-full text-center font-pop modal-title text-space text-none"
                  id="placeBidLabel"
                >
                  Share
                </h6>
                <button
                  type="button"
                  className="btn-close m_0_imp"
                  onClick={() => setX()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body p-over_20">
                <div className="flex items-center flex-wrap">
                  <a className="cursor-pointer dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-4 text-left text-sm transition-colors dark:text-white">
                  <svg className="group-hover:fill-accent fill-jacarta-300 mr-2 h-4 w-4 dark:group-hover:fill-white" width="20" height="20" viewBox="0 0 20 20" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM4.45969 3.94511V11.6295C4.86278 18.1046 13.5249 18.8165 16.0034 12.6329C16.3894 11.4322 14.6312 10.0858 13.5249 11.681C13.2647 12.4957 12.176 14.211 9.89708 14.211C7.94168 14.211 7.11835 12.2556 7.11835 11.681V8.65352H9.53688C11.1492 8.56775 11.2436 6.11492 9.53688 6.00343H7.11835L7.1012 3.94511C6.78388 2.15266 4.45969 2.59863 4.45969 3.94511ZM13.2676 8.25043C13.6891 8.25043 14.0309 7.90869 14.0309 7.48714C14.0309 7.06558 13.6891 6.72384 13.2676 6.72384C12.846 6.72384 12.5043 7.06558 12.5043 7.48714C12.5043 7.90869 12.846 8.25043 13.2676 8.25043ZM11.3876 5.86394C11.2621 5.98949 11.3597 6.50568 11.848 6.35222C12.3223 5.86394 12.7485 5.64072 13.2786 5.64072C13.8087 5.64072 14.9387 6.0174 15.1201 7.30089C15.1201 8.19838 14.9137 8.42015 14.6261 8.7292L14.626 8.72925C14.5783 8.78049 14.5284 8.83413 14.4768 8.89365C14.2985 9.09948 14.5033 9.54134 14.8799 9.37393C15.6723 8.74892 15.7734 7.80058 15.7633 7.40995C15.7127 5.46312 14.0522 4.95712 13.2012 4.95712C12.5595 5.01292 11.9736 5.18033 11.3876 5.86394ZM12.3585 6.78388C12.0583 6.87822 11.9983 6.56089 12.0755 6.4837C12.4357 6.06346 12.7959 5.96055 13.1904 5.92624C13.7135 5.92624 14.7804 6.22813 14.8285 7.50429C14.8347 7.74442 14.7496 8.3036 14.2624 8.68782C14.0309 8.79074 13.8902 8.50772 13.9794 8.4048C14.0065 8.37355 14.0333 8.34407 14.0596 8.31524C14.2494 8.10671 14.4082 7.93216 14.4082 7.36707C14.2967 6.57804 13.6021 6.34648 13.2762 6.34648C12.9503 6.34648 12.6501 6.4837 12.3585 6.78388Z"/>
                  </svg>
                    <span className="mt-1 inline-block">Share on Socialverse</span>
                  </a>
                  <a
                    className="dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-4 text-left text-sm transition-colors dark:text-white"
                    onClick={sharePost}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="facebook"
                      className="group-hover:fill-accent fill-jacarta-300 mr-2 h-4 w-4 dark:group-hover:fill-white"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                    </svg>
                    <span className="mt-1 inline-block">Facebook</span>
                  </a>
                  <Link href="#">
                    <a className="dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-4 text-left text-sm transition-colors dark:text-white">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="twitter"
                        className="group-hover:fill-accent fill-jacarta-300 mr-2 h-4 w-4 dark:group-hover:fill-white"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                      </svg>
                      <span className="mt-1 inline-block">Twitter</span>
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-4 text-left text-sm transition-colors dark:text-white">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="discord"
                        className="group-hover:fill-accent fill-jacarta-300 mr-2 h-4 w-4 dark:group-hover:fill-white"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                      </svg>
                      <span className="mt-1 inline-block">Discord</span>
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-4 text-left text-sm transition-colors dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="group-hover:fill-accent fill-jacarta-300 mr-2 h-4 w-4 dark:group-hover:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z" />
                      </svg>
                      <span className="mt-1 inline-block">Email</span>
                    </a>
                  </Link>
                  <Link href="#">
                    <a className="dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-4 text-left text-sm transition-colors dark:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="group-hover:fill-accent fill-jacarta-300 mr-2 h-4 w-4 dark:group-hover:fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" />
                      </svg>
                      <span className="mt-1 inline-block">Copy</span>
                    </a>
                  </Link>
                  <div className="cursor-pointer flex items-center dark:hover:bg-jacarta-600 rounded-xl transition-colors hover:bg-jacarta-50 p-2"></div>
                </div>
              </div>
              {/* <!-- end body --> */}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Share;
