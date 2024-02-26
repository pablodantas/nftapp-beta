import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tippy from "@tippyjs/react";

const Social_dropdown = ({ postId }) => {
  const router = useRouter();
  const origin = process.env.NODE_ENV === 'development' ? '' : router.basePath;
  const postLink = `${origin}/user/${postId}`;
  const [copied, setCopied] = useState(false);

  const sharePost = () => {
    navigator.share({
      title: "Check out this post!",
      text: "I found this post on Socialverse and wanted to share it with you.",
      url: postLink,
    });
  };

  const sharePostFACE = () => {
    const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postLink
    )}`;
    window.open(facebookShareLink, "_blank");
  };

  const sharePostWhatsapp = () => {
    const message = `I found this post on Socialverse and wanted to share it with you.\n\n ${postLink}`;
    const whatsappShareLink = `whatsapp://send?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappShareLink;
  };

  const sharePostTwitter = () => {
    const message =
      "I found this post on Socialverse and wanted to share it with you.\n\n";
    const twitterShareLink = `https://twitter.com/share?url=${encodeURIComponent(
      postLink
    )}&text=${encodeURIComponent(message)}`;
    window.open(twitterShareLink, "_blank");
  };

  return (
    <>
      <div className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl bg-white">
        <Tippy
          animation="fade"
          arrow={false}
          trigger="click"
          interactive="true"
          placement="bottom"
          className="tooltip-container"
          content={
            <div className="dark:bg-jacarta-800 text-jacarta-700 z-10 min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl show">
              <a
                href="#"
                className="cursor-pointer dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl  px-5 py-2 text-left text-sm transition-colors dark:text-white"
              >
                <span className="mt-1 inline-block">Share on BlackBuzz</span>
              </a>
              <a
                className="cursor-pointer dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                onClick={sharePostFACE}
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
              <a
                className="cursor-pointer  dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                onClick={sharePostTwitter}
              >
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
              <a
                className="cursor-pointer dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                onClick={sharePostWhatsapp}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:fill-accent fill-jacarta-300 mr-2 h-4 w-4 dark:group-hover:fill-white"
                >
                  <path
                    d="M9 0.875C7.58877 0.875381 6.20196 1.24323 4.97607 1.94234C3.75018 2.64144 2.72745 3.64771 2.00856 4.86211C1.28966 6.0765 0.899372 7.45716 0.876105 8.8682C0.852838 10.2792 1.19739 11.672 1.87586 12.9095L1.20814 15.2466C1.14688 15.4609 1.14406 15.6877 1.19996 15.9035C1.25587 16.1193 1.36847 16.3162 1.5261 16.4739C1.68372 16.6315 1.88064 16.7441 2.09644 16.8C2.31223 16.856 2.53906 16.8532 2.7534 16.7919L5.09059 16.1242C6.1767 16.7201 7.38471 17.0599 8.62226 17.1174C9.8598 17.1749 11.0941 16.9487 12.2308 16.456C13.3675 15.9633 14.3765 15.2172 15.1807 14.2748C15.9848 13.3324 16.5628 12.2185 16.8705 11.0185C17.1781 9.81838 17.2073 8.56385 16.9558 7.35078C16.7042 6.1377 16.1786 4.9982 15.4192 4.01941C14.6597 3.04061 13.6865 2.24844 12.5739 1.70345C11.4613 1.15846 10.2389 0.875087 9 0.875ZM10.8847 14C10.8824 14.0018 10.8782 14 10.8749 14C9.97124 14 9.07645 13.8218 8.24172 13.4757C7.40698 13.1296 6.64866 12.6223 6.01014 11.9829C5.37161 11.3435 4.86542 10.5845 4.52049 9.74922C4.17557 8.914 3.99869 8.01896 3.99996 7.11531C4.00281 6.37116 4.30035 5.65844 4.82746 5.13315C5.35456 4.60786 6.06831 4.31278 6.81246 4.3125C7.01752 4.31276 7.21888 4.36709 7.39624 4.47C7.5736 4.57291 7.72069 4.72077 7.82267 4.89867L8.73603 6.49718C8.84606 6.69001 8.9028 6.90864 8.90044 7.13064C8.89808 7.35264 8.8367 7.57001 8.7226 7.76046L8.16706 8.68636C8.44182 9.16272 8.8373 9.55821 9.31365 9.83298L10.2395 9.27741C10.43 9.1633 10.6473 9.10191 10.8693 9.09954C11.0913 9.09717 11.31 9.1539 11.5028 9.26391L13.1012 10.1773C13.2791 10.2793 13.427 10.4263 13.53 10.6037C13.6329 10.7811 13.6872 10.9824 13.6875 11.1875C13.6872 11.9316 13.3921 12.6454 12.8668 13.1725C12.3416 13.6996 11.6289 13.9971 10.8847 14Z"
                    fill="black"
                    className="group-hover:fill-accent fill-jacarta-300 dark:group-hover:fill-white"
                  />
                  <path
                    d="M9.66018 11.0828C9.57375 11.1347 9.47605 11.1649 9.37542 11.1708C9.27479 11.1768 9.17422 11.1582 9.08229 11.1169C8.10478 10.6777 7.32231 9.89528 6.88315 8.91779C6.84181 8.82585 6.82331 8.72527 6.82925 8.62464C6.83519 8.524 6.86538 8.4263 6.91726 8.33986L7.65075 7.11732L6.76276 5.56329C6.35849 5.57598 5.97491 5.745 5.69276 6.0348C5.4106 6.3246 5.25188 6.71256 5.25001 7.11702C5.24896 7.85638 5.39368 8.58869 5.67589 9.27207C5.9581 9.95545 6.37227 10.5765 6.8947 11.0997C7.41714 11.6228 8.03759 12.0379 8.72056 12.3211C9.40354 12.6043 10.1356 12.75 10.875 12.75H10.883C11.2875 12.7482 11.6754 12.5894 11.9652 12.3073C12.255 12.0251 12.4241 11.6415 12.4367 11.2373L10.8827 10.3493L9.66018 11.0828Z"
                    fill="black"
                    className="group-hover:fill-accent fill-jacarta-300 dark:group-hover:fill-white"
                  />
                </svg>
                <span className="mt-1 inline-block">Whatsaap</span>
              </a>
              <a
                className="cursor-pointer dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                onClick={sharePost}
              >
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
              <CopyToClipboard text={postLink} onCopy={() => setCopied(true)}>
                <a className="cursor-pointer dark:hover:bg-jacarta-600 font-display hover:bg-jacarta-50 flex w-full items-center rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white">
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
                  <span className="mt-1 inline-block">
                    {copied ? "Copied" : "Copy"}
                  </span>
                </a>
              </CopyToClipboard>
            </div>
          }
        >
          <button className="inline-flex h-10 w-10 items-center justify-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.514 3.514 0 0 1 0 1.458l5.11 2.787a3.5 3.5 0 1 1-.958 1.755z" />
            </svg>
          </button>
        </Tippy>
      </div>
    </>
  );
};

export default Social_dropdown;
