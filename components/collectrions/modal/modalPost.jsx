import React, { useState, useEffect, useRef } from "react";
import { useMoralis } from "react-moralis";
import Metapost from "./image";
import { useRouter } from "next/router";
import Post_true from "../../modal/post_sucefuly";

function ModalPost({ post, keyModal, showElementpost }) {
  
  const ref = useRef();
  const router = useRouter();

  const { Moralis, user } = useMoralis();
  const [showCrop, setShowCrop] = useState(false);
  const [namepost, setNamepost] = useState("");
  const [descriptionpost, setDescriptionpost] = useState("");

  const [xiX, setX] = useState();

  useEffect(() => {
    xMan()
  }, [showElementpost]);

  function xMan() {
    setX(!xiX);
  }

  const onSubmit = async (post) => {
    if (post) {
      const image = await Metapost(post);
      if (image) {
        try {
          const CreatedPlace = Moralis.Object.extend("Posts");
          const newpost = new CreatedPlace();
          if (user.attributes.ethAddress) {
            newpost.set("owner", user.attributes.ethAddress);
            if (post) {
              newpost.set("image", image);
              newpost.set("name", namepost);
              newpost.set("description", descriptionpost);
            }
            await newpost.save();
          }
  
          setShowCrop(true);
          setX();
          setTimeout(() => {
            router.replace(
              {
                pathname: router.pathname,
                query: { ...router.query, defaultIndex: 3 },
              },
              undefined,
              { shallow: true }
            );
          }, 1500);

        } catch (err) {
          console.error(err);
          alert("Verifique faça login novamente!");
        }
      }
    }
  };

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

  return (
    <>
     {showCrop && <Post_true />}
      {xiX ? (
        <div className={"modal fade show block"} key={keyModal}>
          <div className="modal-dialog max-w-2xl">
            <div className="modal-content dark:bg-jacarta-700" ref={ref}>
              <div className="modal-header p-over_10">
                <h5
                  className="ml_over_20 font-pop modal-title text-space text-none"
                  id="placeBidLabel"
                >
                  Created Post{" "}
                </h5>
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
                    value={namepost}
                    onChange={(e) => setNamepost(e.target.value)}
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
                    The description will be included on the {"item's"} detail
                    page underneath its image. Markdown syntax is supported.
                  </p>
                  <textarea
                    id="item-description"
                    className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                    rows="4"
                    required
                    placeholder="Provide a detailed description of your item."
                    value={descriptionpost}
                    onChange={(e) => setDescriptionpost(e.target.value)}
                  ></textarea>
                </div>
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
                    By checking this box, I agree to {"postapp's"}{" "}
                    <a href="#" className="text-accent">
                      Terms of Service
                    </a>
                  </label>
                </div>
              </div>
              {/* <!-- end body --> */}
              <div className="modal-footer p-over_10">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => onSubmit(post)}
                    type="button"
                    className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </>
  );
}
export default ModalPost;
