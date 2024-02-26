import React, { useState } from "react";

const [postModal, setpostModal] = useState({});

const PostModal = () => {


  return (
    <div>
      <div className={postModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content dark:bg-jacarta-700">
            <div className="modal-header p-over_10">
              <h5 className="ml_over_20 font-pop modal-title text-space text-none" id="placeBidLabel">
                Put on sale{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setpostModal(false)}
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
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer p-over_10">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="bg-accent  hover:bg-accent-dark rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
