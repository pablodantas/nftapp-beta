import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";

function Buy_quest({ keyModal, buyQuest, close, buy }) {
  const [xiX, setX] = useState();
  const ref = useRef();

  useEffect(() => {
    xMan();
  }, [buyQuest]);

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
        <div className={"modal fade show block"}>
          <div className="modal-dialog max-w-2xl">
            <div className="modal-content dark:bg-jacarta-700">
              <div className="modal-header p-over_20">
                <h5
                  className="font-pop modal-title text-space text-none"
                  id="placeBidLabel"
                  style={{ fontSize: "20px" }}
                >
                  Do you want to Buy this?{" "}
                </h5>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body p-over_20">
                <div className="mb-2 flex justify-around">
                  <button
                    className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                    onClick={() => buy()}
                  >
                    yes
                  </button>
                  <button
                    className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                    onClick={() => close()}
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
    </>
  );
}

export default Buy_quest;
