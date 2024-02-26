import React, { useState, useEffect,  useRef } from "react";
import { useMoralis } from "react-moralis";
import Post_true from "../../modal/post_sucefuly";
import { useRouter } from "next/router";

function ModalPostRepost({ post, keyModal, showElementPOST, ShareOnTapClose, postIdRepost, }) {
  const { Moralis, user } = useMoralis();
  const router = useRouter();
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        ShareOnTapClose();
        setX(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [namepost, setNamepost] = useState("");
  const [descriptionpost, setDescriptionpost] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showCrop, setShowCrop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [nameNftError, setNameNftError] = useState("");
  const [descriptionNftError, setDescriptionNftError] = useState("");
  const [DoubleError, setDoubleError] = useState("");

  const onSubmit = async (post) => {
    setIsLoading(true);

    if (!namepost || !descriptionpost) {
      setDoubleError("This field cannot be empty");
      console.error("Name and description cannot be empty");
      setIsLoading(false);
      return;
    }
    if (!namepost) {
      setNameNftError("The Name field is mandatory.");
      setIsLoading(false);
      return;
    }

    if (!descriptionpost) {
      setDescriptionNftError("The Description field is mandatory.");
      setIsLoading(false);
      return;
    }
    if (post) {
      try {
        const CreatedPlace = Moralis.Object.extend("Posts");
        const newpost = new CreatedPlace();
        if (user.attributes.ethAddress) {
          newpost.set("owner", user.attributes.ethAddress);
          if (post) {
            newpost.set("image", post);
            newpost.set("name", namepost);
            newpost.set("description", descriptionpost);
            newpost.set("linkRepost", postIdRepost);
            newpost.set("repost", true);
          }
          await newpost.save();
        }
        setShowCrop(true);
        setX();

        setTimeout(() => {
          const newRoutePathname = router.pathname === "/myprofile" ? router.pathname : "/myprofile";
          router.replace(
            {
              pathname: newRoutePathname,
              query: { ...router.query, defaultIndex: 2 },
            },
            undefined,
            { shallow: true }
          );
        }, 1500);

      } catch (err) {
        console.log(err);
        alert("Verifique faça login novamente!");
      } finally {
        setIsLoading(false);
        setX();
      }
    }
  };

  const [xiX, setX] = useState();

  useEffect(() => {
    xMan();
  }, [showElementPOST]);

  function xMan() {
    setX(!xiX);
  }

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
                  <p className="text-red">{nameNftError}</p>
                  <p className="text-red">{DoubleError}</p>
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
                  <p className="text-red">{descriptionNftError}</p>
                  <p className="text-red">{DoubleError}</p>
                </div>
                {/* <!-- Terms --> */}
                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isTermsAccepted}
                    onChange={(event) =>
                      setIsTermsAccepted(event.target.checked)
                    }
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
                    type="button"
                    onClick={() => onSubmit(post)}
                    title={
                      !isTermsAccepted
                        ? "Please agree to the terms and conditions"
                        : null
                    }
                    className={`dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button py-3 px-8 text-center font-semibold text-white transition-all ${
                      !isTermsAccepted
                        ? "disabled:opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!isTermsAccepted}
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
export default ModalPostRepost;
