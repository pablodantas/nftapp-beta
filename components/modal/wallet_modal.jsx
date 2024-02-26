import { display } from "@mui/system";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { walletModalhide } from "../../redux/counterSlice";

const Wallet_modal = () => {
  const walletModal = useSelector((state) => state.counter.walletModal);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <!-- Wallet Modal --> */}
      <div
        className={walletModal ? "block modal fade show " : "modal fade hidden"}
      >
        <div className="modal-dialog w-comments">
          <div className="modal-content dark:bg-jacarta-900">
            <div className="modal-header">
              <div className="flex flex-col">
                <h5 className="modal-title text_space">NFT title</h5>
                <small>
                  I'm Thrilled To Share That I've Completed A Graduate
                  Certificate Course In Project Management With The President's
                  Honor Roll.
                </small>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(walletModalhide())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6 text-center row flex">
              <div className="col  w-400">
                <img
                  src="/images/Doodles-Guide-Feature-Image.png"
                  alt="mamaco"
                  className="h-full w-full rounded-2xl"
                />
              </div>
              <div className="col flex flex-col ml-5 overflow-y-auto h-225">
                <div className="flex flex-col mb-5 ">
                  <div className="mb-5">
                    <p className="flex items-center">
                      <span className="mr-3">
                        <img
                          src="/images/Doodles-Guide-Feature-Image.png"
                          alt=""
                          className="user_pic rounded-pill"
                        />
                      </span>
                      Pablo
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-start">
                      here are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mb-5 ">
                  <div className="mb-5">
                    <p className="flex items-center">
                      <span className="mr-3">
                        <img
                          src="/images/Doodles-Guide-Feature-Image.png"
                          alt=""
                          className="user_pic rounded-pill"
                        />
                      </span>
                      Pablo
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-start">
                      here are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mb-5 ">
                  <div className="mb-5">
                    <p className="flex items-center">
                      <span className="mr-3">
                        <img
                          src="/images/Doodles-Guide-Feature-Image.png"
                          alt=""
                          className="user_pic rounded-pill"
                        />
                      </span>
                      Pablo
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-start">
                      here are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                    </p>
                  </div>
                </div>
                <div className="flex flex-col mb-5 ">
                  <div className="mb-5">
                    <p className="flex items-center">
                      <span className="mr-3">
                        <img
                          src="/images/Doodles-Guide-Feature-Image.png"
                          alt=""
                          className="user_pic rounded-pill"
                        />
                      </span>
                      Pablo
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-start">
                      here are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex w-100">
                <div className="">
                  <input
                    type="text"
                    className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-400 border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white input_border"
                  />
                  <button
                    type="submit"
                    className="bg_button btn_space_3 input_button_border"
                  >
                    <svg
                      className=""
                      width="20"
                      height="20"
                      viewBox="0 0 51 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.9974 44.4383L48.7266 25.6883L4.9974 6.9383L4.97656 21.5216L36.2266 25.6883L4.97656 29.855L4.9974 44.4383Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet_modal;
