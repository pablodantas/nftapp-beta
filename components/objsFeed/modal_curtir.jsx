import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import Login_button from "../login_button"

function Modal_Curtir({ keyModal, alert_comment, closeModalAlert }) {
  const [xiX, setX] = useState();
  const ref = useRef();

  useEffect(() => {
    xMan();
  }, [alert_comment]);

  function xMan() {
    setX(!xiX);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
        closeModalAlert();
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
        <div className={"modal fade show block"} key={keyModal}>
          <div className="modal-dialog">
            <div className="modal-content dark:bg-jacarta-700 p-over_40"
            ref={ref}
            style={{
              backgroundColor: "rgb(38 41 45 / 0.5)",
                backdropFilter: "blur(7px)",
            }}>
              <div className="modal-header p-over_20 flex justify-between items-center">
                <h6
                  className="w-full text-center font-pop modal-title text-space text-none"
                  id="placeBidLabel"
                style={{fontSize: "18px"}}>
                  Login to Like!
                </h6>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body p-over_20">
                <div className="flex items-center justify-around">
                  <Login_button />
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

export default Modal_Curtir;
