import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";

function Crop({ keyModal, showCrop }) {
  const [xiX, setX] = useState();
  const ref = useRef();

  useEffect(() => {
    xMan();
  }, [showCrop]);

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
          <div className="modal-dialog" >
            <div className="modal-content dark:bg-jacarta-700" ref={ref}>
              <div className="modal-header p-over_20 flex justify-between items-center">
                <h6
                  className="w-full text-center font-display modal-title text-space text-none"
                  id="placeBidLabel"
                  style={{ fontSize: "18px" }}
                >
                  Success!
                </h6>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body p-over_20">
                <div>
                    <p>Successfully cropped image!</p>
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

export default Crop;
