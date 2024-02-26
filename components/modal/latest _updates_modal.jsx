import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useQuery, QueryClient } from "react-query";

function Latest_update() {
  const [loading, setLoading] = useState(false);

  const [xiX, setX] = useState(true);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {xiX ? (
        <div className={"modal fade show block"} key={"keyModal"}>
          <div className="modal-dialog w-40vw">
            <div className="modal-content dark:bg-jacarta-700">
              <div className="modal-header p-over_20 flex justify-between items-center">
                <h4 className="font-display text-md">
                  Latest system updates{" "}
                  <small className="ml-2 text_space">V0.1 pre-alpha</small>
                </h4>
                <button
                  type="button"
                  className="btn-close m_0_imp"
                  onClick={() => setX(false)}
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
              <div className="modal-body p-over_20 h-70 mx-5 my-2">
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center">
                  {loading ? ( // exibe animação enquanto isLoading é verdadeiro
                      <div className="loader-container flex justify-center btn_disable">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <ul
                      className=""
                      style={{
                        listStyle: "decimal",
                      }}
                    >
                      <li className="mb-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </li>
                      <li className="mb-1">
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </li>
                      <li className="mb-1">
                        It has survived not only five centuries, but also the
                        leap into electronic typesetting, remaining essentially
                        unchanged.
                      </li>
                      <li className="mb-1">
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </li>
                    </ul>
                    )}
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

export default Latest_update;
