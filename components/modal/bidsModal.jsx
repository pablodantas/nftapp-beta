// import { set } from "immer/dist/internal";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bidsModalHide } from "../../redux/counterSlice";

const BidsModal = () => {
  const { bidsModal } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [ETHAmount, setETHAmount] = useState(0.05);
  const [sale, setSale] = useState('');

  const handleEThAmount = (e) => {
    e.preventDefault();
    setETHAmount(e.target.value);
  };
  const HandlePrice = () => {
    const a = !sale;
    setSale(a);
  };

  return (
    <div>
      <div className={bidsModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content dark:bg-jacarta-700">
            <div className="modal-header p-over_10">
              <h5
                className="ml_over_20 font-pop modal-title text-space text-none"
                id="placeBidLabel"
              >
                Put on sale{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(bidsModalHide())}
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
              <div className="mb-2">
                <label
                  htmlFor="item-name"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Name<span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  id="item-name"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  placeholder="Item name"
                  required
                  value={""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="item-description"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white"
                >
                  Description
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  The description will be included on the {"item's"} detail page
                  underneath its image. Markdown syntax is supported.
                </p>
                <textarea
                  id="item-description"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  rows="4"
                  required
                  placeholder="Provide a detailed description of your item."
                  value={""}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mt-4 mb-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sale"
                  value={setSale}
                  onClick={HandlePrice}
                  className="cursor-pointer checked:bg-accent dark:bg-jacarta-600 hover:bg-jacarta-700 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                />
                <label
                  htmlFor="sale"
                  className="font-pop dark:text-jacarta-200 text-sm text-none"
                >
                  <p href="#" className="text-accent">
                    Do you want to put this NFT on sale?
                  </p>
                </label>
              </div>
              {sale ? (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-display text-jacarta-700 font-pop font-S dark:text-white">
                      Price
                    </span>
                  </div>
                  <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-2 flex items-center overflow-hidden rounded-lg border">
                    <input
                      type="number"
                      className="font-pop focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inse dark:text-jacarta-700"
                      placeholder="Amount"
                      value={"amount"}
                      onChange={(e) => handleEThAmount(e)}
                    />

                    <div className="border-jacarta-100 gap-2 bg-jacarta-50 flex flex-1 items-center self-stretch border-r px-2">
                      <span>
                        <img src="/images/logo_black.png" className="w-5" />
                      </span>
                      <span className="font-display text-jacarta-700 text-sm">
                        $USDT
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* <!-- Terms --> */}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="cursor-pointer checked:bg-accent dark:bg-jacarta-600 hover:bg-jacarta-700 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                />
                <label
                  htmlFor="terms"
                  className="font-pop dark:text-jacarta-200 text-sm text-none"
                >
                  By checking this box, I agree to {"BlackBuzz"}{" "}
                  <a href="#" className="text-accent">
                    Terms of Service
                  </a>
                </label>
              </div>
            </div>
            <div className="modal-footer p-over_10">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="bg-accent  hover:bg-accent-dark rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                >
                  Sale
                </button>
              </div>
            </div>
          </div>
          {/* <!-- end body --> */}
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
