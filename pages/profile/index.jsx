import React, { useEffect, useState, useRef } from "react";
import Meta from "../../components/Meta";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import Footer from "../../components/footer";
import MoralisIPFS from "../../components/ipfsGenerete/moralisIPFS";
import { useRouter } from "next/router";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import Crop from "../../components/modal/alert_crop";

const Edit_user = () => {
  const imageRef = useRef(null);
  const imageRef2 = useRef(null);
  const { user, Moralis } = useMoralis();
  const router = useRouter();

  const walletAddress = user?.attributes?.ethAddress;

  const [Preview, setPreview] = useState();
  const [CoverPreview, setCoverPreview] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [coverePhoto, setCoverePhoto] = useState();
  const [croppedCoverPhoto, setCroppedCoverPhoto] = useState();
  const [userName, setUserName] = useState();
  const [nameUserLink, setNameUserLink] = useState();
  const [bio, setBio] = useState();
  const [email, setEmail] = useState();
  const [instagram, setInstagram] = useState();
  const [twitter, setTwitter] = useState();
  const [carregar, setCarregar] = useState(false);
  const [usernameInUse, setUsernameInUse] = useState(false);
  const [usernameTEN, setUsernameInTEN] = useState(false);
  const [isCropped, setIsCropped] = useState(false);
  const [isCropped2, setIsCropped2] = useState(false);
  const [cropper, setCropper] = useState(null);
  const [showCrop, setShowCrop] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };
    window.addEventListener("resize", handleResize);

    setIsLargeScreen(window.innerWidth > 500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = function () {
        setProfilePhoto(reader.result);
        const image = imageRef2.current;
        const cropper = new Cropper(image, {
          aspectRatio: 10 / 11,
          viewMode: 2,
          dragMode: "move",
          crop: function (event) {
            const canvas = cropper.getCroppedCanvas();
            const dataURL = canvas.toDataURL("image/jpeg");
            setProfilePhoto(dataURL);
          },
        });
        setCropper(cropper);
      };
      reader.readAsDataURL(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setProfilePhoto(null);
    }
  };

  const handleCoverPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = function () {
        setCoverePhoto(reader.result);
        const image = imageRef.current;
        const cropper = new Cropper(image, {
          aspectRatio: 16 / 9,
          viewMode: 2,
          dragMode: "move",
          crop: function (event) {
            const canvas = cropper.getCroppedCanvas();
            const dataURL = canvas.toDataURL("image/jpeg");
            setCoverePhoto(dataURL);
          },
        });
        setCropper(cropper);
      };
      reader.readAsDataURL(file);
      setCoverPreview(URL.createObjectURL(file));
    } else {
      setCoverePhoto(null);
    }
  };

  const handleCrop = async () => {
    const User = Moralis.Object.extend("IfUser");
    const query = new Moralis.Query(User);
    query.equalTo("postOwner", walletAddress.toLowerCase());
    const myDetails = await query.first();
    if (myDetails) {
      if (walletAddress) {
        const canvas = cropper.getCroppedCanvas();
        const dataURL = canvas.toDataURL("image/jpeg");
        setCoverePhoto(dataURL);
        cropper.destroy();
        setCropper(null);
        setShowCrop(true);
        setIsCropped(true);
        if (coverePhoto) {
          const ipfsObject = await MoralisIPFS("image", coverePhoto);
          myDetails.set("bannerUser", ipfsObject);
        }
        await myDetails.save();
      }
    }
  };

  const handleCrop2 = async () => {
    const User = Moralis.Object.extend("IfUser");
    const query = new Moralis.Query(User);
    query.equalTo("postOwner", walletAddress.toLowerCase());
    const myDetails = await query.first();
    if (myDetails) {
      if (walletAddress) {
        const canvas = cropper.getCroppedCanvas();
        const dataURL = canvas.toDataURL("image/jpeg");
        setProfilePhoto(dataURL);
        cropper.destroy();
        setCropper(null);
        setShowCrop(true);
        setIsCropped2(true);
        if (profilePhoto) {
          const ipfsObject = await MoralisIPFS("image", profilePhoto);
          myDetails.set("avatarUser", ipfsObject);
        }
        await myDetails.save();
      }
    }
  };

  const handleCancelCrop = () => {
    if (cropper) {
      cropper.destroy();
    }
    const fileInput = document.getElementById("cover-photo-input");
    fileInput.value = "";
    setCoverPreview(data.bannerUser);
    setCoverePhoto();
    setIsCropped(false);
    setShowCrop(false);
  };
  const handleCancelCrop2 = () => {
    if (cropper) {
      cropper.destroy();
    }
    const fileInput = document.getElementById("profile-photo-input");
    fileInput.value = "";
    setPreview(data.avatarUser);
    setProfilePhoto();
    setIsCropped2(false);
    setShowCrop(false);
  };
  const fetchProfile = async () => {
    const query = new Moralis.Query("IfUser");
    query.equalTo("postOwner", walletAddress);
    const result = await query.find();
    const a = JSON.parse(JSON.stringify(result));
    const b = a[0];
    return b;
  };

  const { data } = useQuery(`userProfile${walletAddress}`, fetchProfile, {
    staleTime: 1000 * 60,
    cacheTime: 0,
  });

  useEffect(() => {
    if (data) {
      setPreview(data?.avatarUser);
      setCoverPreview(data?.bannerUser);
    }
  }, [data]);

  useEffect(() => {
    async function checkUsername() {
      if (nameUserLink) {
        const User = Moralis.Object.extend("IfUser");
        const query = new Moralis.Query(User);
        query.equalTo("nameUserLink", nameUserLink.toLowerCase());
        const results = await query.find();
        setUsernameInUse(results.length > 0);
      }
    }
    checkUsername();
  }, [nameUserLink]);

  const saveEdits = async () => {
    const User = Moralis.Object.extend("IfUser");
    const query = new Moralis.Query(User);
    query.equalTo("postOwner", walletAddress.toLowerCase());
    const myDetails = await query.first();
    if (myDetails) {
      if (walletAddress) {
        setCarregar(true);
        if (userName) {
          myDetails.set("userName", userName);
        }
        if (nameUserLink) {
          if (
            nameUserLink.length > 14 ||
            nameUserLink.includes(" ") ||
            nameUserLink.includes("@")
          ) {
            alert(
              "Username must be a maximum of 14 characters, cannot contain spaces and @."
            );
            setCarregar(false);
            return;
          }
          const nameQuery = new Moralis.Query(User);
          nameQuery.equalTo("nameUserLink", nameUserLink.toLowerCase());
          const nameExists = await nameQuery.first();
          if (nameExists) {
            alert(
              "This username is already in use. Please choose another one."
            );
            setCarregar(false);
            return;
          } else {
            myDetails.set("nameUserLink", nameUserLink.toLowerCase());
          }
        }
        if (bio) {
          myDetails.set("bio", bio);
        }
        if (email) {
          myDetails.set("email", email.toLowerCase());
        }
        if (instagram) {
          if (NoNameVerinsta) {
            return;
          }
          myDetails.set("instagram", instagram.toLowerCase());
        }
        if (twitter) {
          if (NoNameVer) {
            return;
          }
          myDetails.set("twitter", twitter.toLowerCase());
        }
        if (profilePhoto) {
          const ipfsObject = await MoralisIPFS("image", profilePhoto);
          myDetails.set("avatarUser", ipfsObject);
        }
        if (coverePhoto) {
          const ipfsObject = await MoralisIPFS("image", coverePhoto);
          myDetails.set("bannerUser", ipfsObject);
        }
        await myDetails.save();
      }
    }

    if (carregar === true) {
      setCarregar(false);
    }
    router.push("/myprofile");
  };

  function perfilImag(ipfs) {
    let origLink = ipfs?.replace(
      "ipfs://",
      "https://ipfs.moralis.io:2053/ipfs/"
    );
    return origLink;
  }

  const [NoNameVer, setNoNameVer] = useState(false);
  const [NoNameVerinsta, setNoNameVerinsta] = useState(false);

  function handleChange(event) {
    const inputValue = event.target.value;
    setTwitter(inputValue);
    if (inputValue.includes("@")) {
      setNoNameVer(true);
    } else {
      setNoNameVer(false);
    }
  }

  function handleChangeInsta(event) {
    const inputValueinsta = event.target.value;
    setInstagram(inputValueinsta);
    if (inputValueinsta.includes("@")) {
      setNoNameVerinsta(true);
    } else {
      setNoNameVerinsta(false);
    }
  }

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustTextareaHeight = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener('input', adjustTextareaHeight);
    adjustTextareaHeight(); // Ajustar a altura inicialmente

    return () => {
      textarea.removeEventListener('input', adjustTextareaHeight);
    };
  }, [data?.bio]);


  return (
    console.log(data),
    (
      <>
        {showCrop && <Crop />}
        <div>
          {/* {modalIsOpen && (
           < Comments />
          )} */}
          <Meta title="Edit Profile" />
          <div className="pt-[5.5rem] lg:pt-24">
            {/* <!-- Banner --> */}
            <div className="relative banner_user_profile">
              <img
                ref={imageRef}
                src={
                  perfilImag(coverePhoto)
                    ? perfilImag(coverePhoto)
                    : perfilImag(CoverPreview)
                    ? perfilImag(CoverPreview)
                    : "/images/frame_2_1.png"
                }
                alt="banner"
                className="h-[18.75rem] w-full object-cover"
              />
              <div
                className="container relative -translate-y-4"
                style={{ height: "50px" }}
              >
                <div className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700  mr-2 font-display group hover:bg-accent absolute right-0 bottom-4 flex items-center rounded-full bg-white text-sm p-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(e) => handleCoverPhoto(e)}
                    id="cover-photo-input"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="dark:fill-white fill-jacarta-400  h-4 w-4 group-hover:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
                  </svg>
                </div>
              </div>
              {perfilImag(coverePhoto) && (
                <>
                  {!isCropped && (
                    <div
                      className="container relative -translate-y-4 flex justify-center mb-5"
                      style={{ height: "50px" }}
                    >
                      <button
                        type="button"
                        className="mr-2 font-display group hover:bg-accent flex items-center rounded-full bg-white text-sm p-3"
                        onClick={handleCrop}
                        title="cut"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.75 15C5.75544 15 4.80162 15.3951 4.09836 16.0984C3.3951 16.8016 3 17.7554 3 18.75C3 19.7446 3.3951 20.6984 4.09836 21.4016C4.80162 22.1049 5.75544 22.5 6.75 22.5C7.74456 22.5 8.69843 22.1049 9.40169 21.4016C10.1049 20.6984 10.5 19.7446 10.5 18.75C10.5 17.7554 10.1049 16.8016 9.40169 16.0984C8.69843 15.3951 7.74456 15 6.75 15ZM6.75 16.5C7.34674 16.5 7.91905 16.7371 8.341 17.1591C8.76296 17.581 9 18.1533 9 18.75C9 19.3467 8.76296 19.919 8.341 20.341C7.91905 20.763 7.34674 21 6.75 21C6.15326 21 5.581 20.763 5.15904 20.341C4.73709 19.919 4.5 19.3467 4.5 18.75C4.5 18.1533 4.73709 17.581 5.15904 17.1591C5.581 16.7371 6.15326 16.5 6.75 16.5Z"
                            fill="#373737"
                          />
                          <path
                            d="M18 1.5L7.5 16.5H9V18L18 4.5V1.5ZM12 11.25C12.1989 11.25 12.3897 11.3291 12.5304 11.4697C12.671 11.6104 12.75 11.8011 12.75 12C12.75 12.1989 12.671 12.3897 12.5304 12.5304C12.3897 12.671 12.1989 12.75 12 12.75C11.8011 12.75 11.6103 12.671 11.4697 12.5304C11.329 12.3897 11.25 12.1989 11.25 12C11.25 11.8011 11.329 11.6104 11.4697 11.4697C11.6103 11.3291 11.8011 11.25 12 11.25Z"
                            fill="#373737"
                          />
                          <path
                            d="M17.25 15C18.2446 15 19.1984 15.3951 19.9017 16.0984C20.6049 16.8016 21 17.7554 21 18.75C21 19.7446 20.6049 20.6984 19.9017 21.4016C19.1984 22.1049 18.2446 22.5 17.25 22.5C16.2554 22.5 15.3016 22.1049 14.5984 21.4016C13.8951 20.6984 13.5 19.7446 13.5 18.75C13.5 17.7554 13.8951 16.8016 14.5984 16.0984C15.3016 15.3951 16.2554 15 17.25 15ZM17.25 16.5C16.6533 16.5 16.081 16.7371 15.659 17.1591C15.2371 17.581 15 18.1533 15 18.75C15 19.3467 15.2371 19.919 15.659 20.341C16.081 20.763 16.6533 21 17.25 21C17.8467 21 18.419 20.763 18.841 20.341C19.263 19.919 19.5 19.3467 19.5 18.75C19.5 18.1533 19.263 17.581 18.841 17.1591C18.419 16.7371 17.8467 16.5 17.25 16.5Z"
                            fill="#373737"
                          />
                          <path
                            d="M6 1.5V4.5L15 18V16.5H16.5L6 1.5ZM12 11.25C12.1989 11.25 12.3897 11.3291 12.5304 11.4697C12.671 11.6104 12.75 11.8011 12.75 12C12.75 12.1989 12.671 12.3897 12.5304 12.5304C12.3897 12.671 12.1989 12.75 12 12.75C11.8011 12.75 11.6103 12.671 11.4697 12.5304C11.329 12.3897 11.25 12.1989 11.25 12C11.25 11.8011 11.329 11.6104 11.4697 11.4697C11.6103 11.3291 11.8011 11.25 12 11.25Z"
                            fill="#373737"
                          />
                        </svg>
                      </button>
                      {/* <button
                    className="ml-2 font-display group hover:bg-accent flex items-center rounded-full bg-white text-sm p-3"
                    onClick={handleCancelCrop}
                    title="cancel"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.6903 12.0007L19.2623 16.5727C19.5593 16.8697 19.5593 17.352 19.2623 17.649L17.649 19.2622C17.352 19.5592 16.8705 19.5592 16.5728 19.2622L12 14.6902L7.42726 19.2622C7.13026 19.5592 6.64876 19.5592 6.35176 19.2622L4.73776 17.649C4.44076 17.352 4.44076 16.8705 4.73776 16.5727L9.31051 12.0007L4.73776 7.428C4.44076 7.131 4.44076 6.64875 4.73776 6.35175L6.35251 4.7385C6.64951 4.4415 7.13101 4.4415 7.42801 4.7385L12 9.31125L16.5728 4.7385C16.8698 4.4415 17.3513 4.4415 17.649 4.7385L19.2623 6.3525C19.5593 6.6495 19.5593 7.131 19.2623 7.42875L14.6903 12.0007Z"
                        fill="black"
                      />
                    </svg>
                  </button> */}
                    </div>
                  )}
                </>
              )}
            </div>
            {/* <!-- end banner --> */}
            {/* <!-- Edit Profile --> */}
            <section className="dark:bg-jacarta-800 relative">
              <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                <img
                  src="/images/gradient_light.jpg"
                  alt="gradient"
                  className="h-full w-full"
                />
              </picture>
              <div className="container">
                <div className="mx-auto max-w-[48.125rem] flex flex-col-reverse md:flex-row">
                  {/* <!-- Form --> */}
                  <div className="mb-12 md:w-1/2 md:pr-8">
                    <div className="mb-6">
                      <label className="font-display text-jacarta-700 mb-1 block text-sm dark:text-white">
                        Name<span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="profile-username"
                        className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white px-3"
                        placeholder={data?.userName}
                        defaultValue={data?.userName || ""}
                        required
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <label className="font-display text-jacarta-700 mb-1 block text-sm dark:text-white">
                        Username<span className="text-red">*</span>
                      </label>
                      <div className="relative">
                        <img
                          src="images/socialverse.png"
                          alt=""
                          className="w-5 absolute top-1/2 left-4 -translate-y-1/2"
                        />
                        <input
                          type="text"
                          id="profile-username"
                          className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white pl-10"
                          placeholder={
                            data?.nameUserLink ? data?.nameUserLink : "@socialverse"
                          }
                          data-ls-module="charCounter"
                          maxLength={30}
                          required
                          onChange={(e) => setNameUserLink(e.target.value)}
                        />
                      </div>
                      {nameUserLink &&
                        !usernameInUse &&
                        (nameUserLink.length > 14 ||
                          nameUserLink.includes(" ") ||
                          nameUserLink.includes("@")) && (
                          <p className="text-red">
                            The username must be a maximum of 14 characters and
                            cannot contain spaces. the @ is included
                            automatically, it doesn't need to be.
                          </p>
                        )}
                      {usernameInUse &&
                        nameUserLink &&
                        nameUserLink.length > 0 && (
                          <p className="text-red">
                            Username is already in use.
                          </p>
                        )}
                    </div>
                    <div className="mb-6">
                      <label className="font-display text-jacarta-700 mb-1 block text-sm dark:text-white">
                        Bio {/*<span className="text-red">*</span> */}
                      </label>
                      <textarea
                        id="profile-bio"
                        ref={textareaRef}
                        className="my-textarea dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white px-3"
                        required
                        maxLength={150}
                        placeholder={
                          data?.bio ? data?.bio : "Tell the world your story!"
                        }
                        defaultValue={data?.bio || ""}
                        onChange={(e) => setBio(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-6">
                      <label className="font-display text-jacarta-700 mb-1 block text-sm dark:text-white">
                        Email address
                      </label>
                      <input
                        type="text"
                        id="profile-email"
                        className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 hover:ring-2 dark:text-white px-3"
                        placeholder={data?.email ? data?.email : "Enter email"}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <label className="font-display text-jacarta-700 mb-1 block text-sm dark:text-white">
                        Links<span className="text-red"></span>
                      </label>
                      <div className="relative">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="twitter"
                          className="fill-jacarta-300 dark:fill-jacarta-400 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                        </svg>
                        <input
                          type="text"
                          id="profile-twitter"
                          className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-t-lg py-3 pl-10 hover:ring-2 focus:ring-inset dark:text-white"
                          placeholder={data?.twitter ? data?.twitter : "name"}
                          defaultValue={data?.twitter || ""}
                          onChange={handleChange}
                        />
                      </div>
                      {NoNameVer && (
                        <p className="text-red">
                          By default the system automatically adds your @ to
                          twittername
                        </p>
                      )}
                      <div className="relative">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="instagram"
                          className="fill-jacarta-300 dark:fill-jacarta-400 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                        </svg>
                        <input
                          type="url"
                          id="profile-website"
                          className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 -mt-px w-full rounded-b-lg py-3 pl-10 hover:ring-2 focus:ring-inset dark:text-white"
                          placeholder={
                            data?.instagram ? data?.instagram : "name"
                          }
                          defaultValue={data?.instagram || ""}
                          onChange={handleChangeInsta}
                        />
                      </div>
                      {NoNameVerinsta && (
                        <p className="text-red">
                          Instagram doesn't use @, your link will be incorrect.
                        </p>
                      )}
                    </div>
                    <div className="mb-6"></div>
                    {!isLargeScreen && (
                      <div className="w-100 flex justify-center md:block mt-20">
                        {carregar ? (
                          <button
                            id="change"
                            // onClick={saveEdits}
                            className="dark:bg-jacarta-600 bg-jacarta-50 btn_disable flex items-center  rounded-button py-3 px-20 text-center font-semibold text-white transition-all"
                          >
                            <div className="loader-container">
                              <div className="loader"></div>
                            </div>
                          </button>
                        ) : (
                          <button
                            onClick={saveEdits}
                            className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button text-center font-semibold  upl_btn dark:bg-jacarta-700 rounded-button py-3 px-8 text-center font-semibold dark:text-white transition-all"
                          >
                            Update Profile
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {/* <!-- Avatar --> */}
                  <div className="flex space-x-5 md:w-1/2 md:pl-8 mb-5 flex-col">
                    <form className="shrink-0">
                      <figure className="relative inline-block">
                        <img
                          ref={imageRef2}
                          src={
                            perfilImag(profilePhoto)
                              ? perfilImag(profilePhoto)
                              : perfilImag(Preview)
                              ? perfilImag(Preview)
                              : "/images/frame_2_1.png"
                          }
                          alt="collection avatar"
                          className="user_profile_img dark:border-jacarta-600 border-radius_100 border-[5px] border-white"
                          height={140}
                          width={140}
                          style={{ objectFit: "cover" }}
                        />
                        {perfilImag(profilePhoto) && (
                          <>
                            {!isCropped2 && (
                              <div
                                className="container relative -translate-y-4 flex justify-center mb-5"
                                style={{ height: "50px" }}
                              >
                                <button
                                  type="button"
                                  className="mr-2 font-display group hover:bg-accent flex items-center rounded-full bg-white text-sm p-3"
                                  onClick={handleCrop2}
                                  title="cut"
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6.75 15C5.75544 15 4.80162 15.3951 4.09836 16.0984C3.3951 16.8016 3 17.7554 3 18.75C3 19.7446 3.3951 20.6984 4.09836 21.4016C4.80162 22.1049 5.75544 22.5 6.75 22.5C7.74456 22.5 8.69843 22.1049 9.40169 21.4016C10.1049 20.6984 10.5 19.7446 10.5 18.75C10.5 17.7554 10.1049 16.8016 9.40169 16.0984C8.69843 15.3951 7.74456 15 6.75 15ZM6.75 16.5C7.34674 16.5 7.91905 16.7371 8.341 17.1591C8.76296 17.581 9 18.1533 9 18.75C9 19.3467 8.76296 19.919 8.341 20.341C7.91905 20.763 7.34674 21 6.75 21C6.15326 21 5.581 20.763 5.15904 20.341C4.73709 19.919 4.5 19.3467 4.5 18.75C4.5 18.1533 4.73709 17.581 5.15904 17.1591C5.581 16.7371 6.15326 16.5 6.75 16.5Z"
                                      fill="#373737"
                                    />
                                    <path
                                      d="M18 1.5L7.5 16.5H9V18L18 4.5V1.5ZM12 11.25C12.1989 11.25 12.3897 11.3291 12.5304 11.4697C12.671 11.6104 12.75 11.8011 12.75 12C12.75 12.1989 12.671 12.3897 12.5304 12.5304C12.3897 12.671 12.1989 12.75 12 12.75C11.8011 12.75 11.6103 12.671 11.4697 12.5304C11.329 12.3897 11.25 12.1989 11.25 12C11.25 11.8011 11.329 11.6104 11.4697 11.4697C11.6103 11.3291 11.8011 11.25 12 11.25Z"
                                      fill="#373737"
                                    />
                                    <path
                                      d="M17.25 15C18.2446 15 19.1984 15.3951 19.9017 16.0984C20.6049 16.8016 21 17.7554 21 18.75C21 19.7446 20.6049 20.6984 19.9017 21.4016C19.1984 22.1049 18.2446 22.5 17.25 22.5C16.2554 22.5 15.3016 22.1049 14.5984 21.4016C13.8951 20.6984 13.5 19.7446 13.5 18.75C13.5 17.7554 13.8951 16.8016 14.5984 16.0984C15.3016 15.3951 16.2554 15 17.25 15ZM17.25 16.5C16.6533 16.5 16.081 16.7371 15.659 17.1591C15.2371 17.581 15 18.1533 15 18.75C15 19.3467 15.2371 19.919 15.659 20.341C16.081 20.763 16.6533 21 17.25 21C17.8467 21 18.419 20.763 18.841 20.341C19.263 19.919 19.5 19.3467 19.5 18.75C19.5 18.1533 19.263 17.581 18.841 17.1591C18.419 16.7371 17.8467 16.5 17.25 16.5Z"
                                      fill="#373737"
                                    />
                                    <path
                                      d="M6 1.5V4.5L15 18V16.5H16.5L6 1.5ZM12 11.25C12.1989 11.25 12.3897 11.3291 12.5304 11.4697C12.671 11.6104 12.75 11.8011 12.75 12C12.75 12.1989 12.671 12.3897 12.5304 12.5304C12.3897 12.671 12.1989 12.75 12 12.75C11.8011 12.75 11.6103 12.671 11.4697 12.5304C11.329 12.3897 11.25 12.1989 11.25 12C11.25 11.8011 11.329 11.6104 11.4697 11.4697C11.6103 11.3291 11.8011 11.25 12 11.25Z"
                                      fill="#373737"
                                    />
                                  </svg>
                                </button>
                                {/* <button
                              className="ml-2 font-display group hover:bg-accent flex items-center rounded-full bg-white text-sm p-3"
                              onClick={handleCancelCrop2}
                              title="cancel"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.6903 12.0007L19.2623 16.5727C19.5593 16.8697 19.5593 17.352 19.2623 17.649L17.649 19.2622C17.352 19.5592 16.8705 19.5592 16.5728 19.2622L12 14.6902L7.42726 19.2622C7.13026 19.5592 6.64876 19.5592 6.35176 19.2622L4.73776 17.649C4.44076 17.352 4.44076 16.8705 4.73776 16.5727L9.31051 12.0007L4.73776 7.428C4.44076 7.131 4.44076 6.64875 4.73776 6.35175L6.35251 4.7385C6.64951 4.4415 7.13101 4.4415 7.42801 4.7385L12 9.31125L16.5728 4.7385C16.8698 4.4415 17.3513 4.4415 17.649 4.7385L19.2623 6.3525C19.5593 6.6495 19.5593 7.131 19.2623 7.42875L14.6903 12.0007Z"
                                  fill="black"
                                />
                              </svg>
                            </button> */}
                              </div>
                            )}
                          </>
                        )}
                        {!isCropped2 && (
                          <div className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white dark:bg-jacarta-700 group hover:bg-accent border-jacarta-100 absolute right_button bottom_button h-8 w-8 overflow-hidden rounded-full border bg-white text-center hover:border-transparent">
                            <input
                              id="profile-photo-input"
                              type="file"
                              accept="image/*"
                              className="absolute top-0 left-0 w-full cursor-pointer opacity-0"
                              onChange={(e) => handleProfilePhoto(e)}
                            />
                            <div className="flex h-full items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                className="fill-jacarta-400 dark:fill-white h-4 w-4 group-hover:fill-white"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </figure>
                    </form>
                    <div className="mt-4">
                      <span className="font-display text-jacarta-700 mb-3 block text-sm dark:text-white">
                        Profile Image<span className="text-red">*</span>
                      </span>
                      <p className="dark:text-jacarta-300 text-sm leading-normal">
                        We recommend an image of at least 300x300. Gifs work
                        too. Max 5mb.
                      </p>
                    </div>
                    {isLargeScreen && (
                      <div className="w-100 flex justify-center md:block mt-5">
                        {carregar ? (
                          <button
                            id="change"
                            // onClick={saveEdits}
                            className="dark:bg-jacarta-600 bg-jacarta-50 btn_disable flex items-center  rounded-button py-3 px-20 text-center font-semibold text-white transition-all"
                          >
                            <div className="loader-container">
                              <div className="loader"></div>
                            </div>
                          </button>
                        ) : (
                          <button
                            onClick={saveEdits}
                            className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 focus:bg-accent group flex items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] rounded-button text-center font-semibold  upl_btn dark:bg-jacarta-700 rounded-button py-3 px-8 text-center font-semibold dark:text-white transition-all"
                          >
                            Update Profile
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- end edit profile --> */}
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default Edit_user;
