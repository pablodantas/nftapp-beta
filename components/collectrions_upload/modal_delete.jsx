import React, { useEffect, useState } from "react";

function Delete({ nft, keyModal, showElementNFT }){

  const [xiX, setX] = useState();
  useEffect(() => {
    xMan();
  }, [showElementNFT]);

  function xMan() {
    setX(!xiX);
  }

  return (
    <>
      {xiX ? (
        <div className={"modal fade show block"} key={keyModal}>
          <div className="modal-dialog max-w-2xl">
            <div className="modal-content dark:bg-jacarta-700">
              <div className="modal-header p-over_20">
                <h5
                  className="font-pop modal-title text-space text-none"
                  id="placeBidLabel"
                >
                  Do you want to delete this?{" "}
                </h5>
              </div>
              {/* <!-- Body --> */}
              <div className="modal-body p-over_20">
                <div className="mb-2 flex justify-around">
                 <button className="bg-accent  hover:bg-accent-dark rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                 onClick={() => DeleteUpload(item.objectId)}>
                    yes
                 </button>
                 <button className="bg-accent  hover:bg-accent-dark rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                  onClick={() => setX()}>
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
};

export default Delete;
