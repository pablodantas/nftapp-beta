import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";

function Profile_alert({ keyModal, Profile_user }) {
  const [xiX, setX] = useState();
  const ref = useRef();

  useEffect(() => {
    xMan();
  }, [Profile_user]);

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

  function xMan() {
    setX(!xiX);
  }

  return (
    <>
      {xiX ? (
        <div className={"modal fade show block"} key={keyModal}>
          <div className="modal-dialog">
            <div className="modal-content dark:bg-jacarta-700" ref={ref}>
              <div className="modal-header p-over_20 flex justify-between items-center">
                <h6
                  className="w-full text-center justify-center font-pop modal-title text-space text-none flex"
                  id="placeBidLabel"
                  style={{ fontSize: "18px" }}
                >
                  Ops!
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M44.6429 50C47.6009 50 50 47.0793 50 43.4783C50 42.1207 49.4268 40.5424 49.4268 40.5424L29.3554 2.72826L29.3571 2.72717C28.3848 1.07609 26.7955 0 25 0C23.2045 0 21.6152 1.07609 20.6429 2.72717L20.6446 2.72826L0.573214 40.5424C0.573214 40.5424 0 42.1207 0 43.4783C0 47.0793 2.39911 50 5.35714 50H44.6429Z"
                      fill="#4BAADC"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23.2144 39.1305C23.2144 37.9305 24.0144 36.9565 25.0001 36.9565C25.9858 36.9565 26.7858 37.9305 26.7858 39.1305C26.7858 40.3305 25.9858 41.3044 25.0001 41.3044C24.0144 41.3044 23.2144 40.3305 23.2144 39.1305Z"
                      fill="white"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M28.5716 17.3913C28.5716 14.9902 26.9725 13.0435 25.0001 13.0435C23.0278 13.0435 21.4287 14.9902 21.4287 17.3913L23.2144 30.4348C23.2144 31.6348 24.0144 32.6087 25.0001 32.6087C25.9859 32.6087 26.7859 31.6348 26.7859 30.4348L28.5716 17.3913Z"
                      fill="white"
                    ></path>
                  </svg>
                </h6>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body p-over_20">
                <div>
                  <p>
                  You have not completed your profile, we
                    <br /> will redirect you in 3 seconds!
                  </p>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
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

export default Profile_alert;
