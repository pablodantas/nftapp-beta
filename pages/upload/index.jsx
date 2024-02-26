import React, { useState, useEffect, useRef } from "react";
import "tippy.js/dist/tippy.css"; // optional
import Meta from "../../components/Meta";
import Footer from "../../components/footer";
import MoralisIPFS from "../../components/ipfsGenerete/moralisIPFS";
import { useMoralis } from "react-moralis";
import ImageUpload from "../../components/collectrions_upload/uploadImage";
import { base64IPFS } from "../../components/ipfsGenerete/base64";
import { useRouter } from "next/router";

const Create = () => {
  const { user, Moralis } = useMoralis();
  const walletAddress = user?.attributes?.ethAddress;
  const [file, setFile] = useState("");
  const inputFile = useRef(null);
  const [preleorder, setPreleorder] = useState(false);
  const [type, setType] = useState();
  const router = useRouter();

  const changeHandler = async (event) => {
    const img = event.target.files[0];
    if (img) {
      const file1 = await base64IPFS(img);
      setType(img.type);
      setFile(file1);
    }
  };

  async function Uploadnow() {
    if (type && file) {
      setPreleorder(true);
      const file1url = await MoralisIPFS(type, file);
      const PostFeed = Moralis.Object.extend("Upload");
      const newPost = new PostFeed();
      if (walletAddress) {
        newPost.set("owner", walletAddress);
        if (file1url) {
          newPost.set("image", file1url);
        }
        await newPost.save();
        setPreleorder(false);
        setFile("");
        router.push("/myprofile");
      }
    }
  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  return (
    <>
      <div>
        <Meta title="Upload" />
        {/* <!-- Create --> */}
        <section className="relative py-24">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="container">
            <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
              Upload
            </h1>

            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- File Upload --> */}
              <div className="mb-1 flex items-center image_place">
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Image or Video
                  <span className="text-red">*</span>
                </label>

                {file?.name ? (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    successfully uploaded : {file?.name}
                  </p>
                ) : (
                  <p className="dark:text-jacarta-300 text-2xs mb-3">
                    Drag or choose your file to upload
                  </p>
                )}

                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                  <div className="relative cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                    </svg>
                    <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                      .bmp .gif .jpg/.jpeg .png .svg .webp .avi .m4v .mov .mp4
                      .mpeg .ogv .qt .webm .wmv
                    </p>
                  </div>
                  <div className="img-over absolute inset-4 cursor-pointer rounded">
                    <input
                      className="inp_file opacity-0 group-hover:opacity-100"
                      type="file"
                      ref={inputFile}
                      onChange={changeHandler}
                    />
                    <ImageUpload image={file} type={type} />
                    <img className="inp_img" onClick={onImageClick}></img>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="dark:text-jacarta-300  w-400 text_sm_s mb-6">
                  Tip: You can share with your friends or convert to NFT from
                  your profile.
                </p>
              </div>
              <div className="mx-auto text-center mt-10 flex justify-center">
                {preleorder ? (
                  <button
                    id="change"
                    className="upl_btn_2 dark:bg-jacarta-600 bg-jacarta-50 btn_disable py-2 px-20"
                  >
                    <div className="loader-container ">
                      <div className="loader"></div>
                    </div>
                  </button>
                ) : (
                  <button
                    className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button text-center font-semibold dark:text-white upl_btn dark:bg-jacarta-700 upl_btn"
                    onClick={Uploadnow}
                  >
                    Upload now
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end create --> */}
      </div>
      <Footer />
    </>
  );
};

export default Create;
