import React, { useEffect, useState, useRef } from "react";
import { useMoralis } from "react-moralis";
import { useQuery, QueryClient } from "react-query";

function Modal_chat({ handleCloseModal }) {
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [xiX, setX] = useState(true);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleCloseModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={"modal fade show block"} key={"keyModal"}>
        <div className="modal-dialog w-40vw">
          <div className="modal-content dark:bg-jacarta-700" ref={ref}>
            <div className="modal-header p-over_20 flex justify-between items-center">
              <h4 className="font-display text-md text_space">
                We're sorry! Chat under development.
                <small className="ml-2 text_space">V0.1 pre-alpha</small>
              </h4>
            </div>
            {/* <!-- Body --> */}
            <div className="modal-body p-over_20 mx-5 my-2">
              <div className="flex flex-col items-center justify-between">
                <div className="mb-3">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M44.6429 50C47.6009 50 50 47.0793 50 43.4783C50 42.1207 49.4268 40.5424 49.4268 40.5424L29.3554 2.72826L29.3571 2.72717C28.3848 1.07609 26.7955 0 25 0C23.2045 0 21.6152 1.07609 20.6429 2.72717L20.6446 2.72826L0.573214 40.5424C0.573214 40.5424 0 42.1207 0 43.4783C0 47.0793 2.39911 50 5.35714 50H44.6429Z"
                      fill="#F0B90B"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23.2144 39.1305C23.2144 37.9305 24.0144 36.9565 25.0001 36.9565C25.9858 36.9565 26.7858 37.9305 26.7858 39.1305C26.7858 40.3305 25.9858 41.3044 25.0001 41.3044C24.0144 41.3044 23.2144 40.3305 23.2144 39.1305Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M28.5716 17.3913C28.5716 14.9902 26.9725 13.0435 25.0001 13.0435C23.0278 13.0435 21.4287 14.9902 21.4287 17.3913L23.2144 30.4348C23.2144 31.6348 24.0144 32.6087 25.0001 32.6087C25.9859 32.6087 26.7859 31.6348 26.7859 30.4348L28.5716 17.3913Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <p>
                    For now, it is not yet possible to use the chat on our
                    platform. We are working hard to develop and implement this
                    feature as quickly as possible. We apologize for any
                    inconvenience this may cause and appreciate your patience.
                    Please stay tuned for upcoming updates, as the chat will be
                    available soon. In the meantime, if you have any questions
                    or need assistance, please do not hesitate to contact us
                    through the support channels available on our platform. Best
                    regards, Development Team.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- end body --> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal_chat;
