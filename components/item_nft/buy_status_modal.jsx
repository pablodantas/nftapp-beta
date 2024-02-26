import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { Route } from "react-router-dom";
import { useRouter } from "next/router";

function Buy_status({ keyModal, BuyStatus, status }) {
  const [xiX, setX] = useState();
  const ref = useRef();
  const Router = useRouter();

  useEffect(() => {
    xMan();
  }, [BuyStatus]);

  function xMan() {
    setX(!xiX);
  }
  
  function OkButtonFinish() {
    setX(false);
    setTimeout(() => {
      Router.push({
        pathname: '/myprofile',
        query: { defaultIndex: 3 },
        scroll: false,
      });
    }, 1000);
  }
  
  return (
    <>
      {xiX ? (
        <div className={"modal fade show block"} key={keyModal}>
          <div className="modal-dialog">
            <div className="modal-content dark:bg-jacarta-700">
              {" "}
              {/* ref={ref} */}
              <div className="modal-header p-over_20 flex justify-between items-center">
                <h6
                  className="w-full text-center font-display modal-title text-space text-none"
                  id="placeBidLabel"
                  // style={{ fontSize: "18px" }}
                >
                  Wait!
                </h6>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body p-over_20">
                <div>
                  {status !== "100% - Purchase made successfully!" && (
                    <p>
                      {" "}
                      We are processing your purchase, do not close this tab.
                    </p>
                  )}
                  {status == "100% - Purchase made successfully!" && (
                    <p>
                      Success! your purchase has been completed, check <br /> the NFT
                      in your profile.
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <p className="font-display text-center">{status}</p>
                </div>
                <div className="mt-4 flex justify-center">
                  {status !== "100% - Purchase made successfully!" && (
                    <div className="loader-container">
                      <div className="loader"></div>
                    </div>
                  )}
                  {status == "100% - Purchase made successfully!" && (
                    <button
                      className="mr-2 dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-4 text-center font-semibold text-white transition-all"
                      onClick={OkButtonFinish}
                    >
                      Ok
                    </button>
                  )}
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

export default Buy_status;
