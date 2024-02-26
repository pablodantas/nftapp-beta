import React, { useEffect, useState, } from 'react';
import Image from 'next/image';
import Social_dropdown from '../../components/dropdown/Social_dropdown';
import User_items from '../../components/user/User_items_myprofile';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Meta from '../../components/Meta';
import { useMoralis } from "react-moralis";
import { useQuery } from 'react-query';
import Footer from "../../components/footer";
import Follow from "../../components/modal/follow_modal"
import Following from "../../components/modal/following_modal"
import { useRouter } from "next/router"
import TimeAgo from "react-timeago";
import Profile_alert from "../../components/modal/alert_Profile"

const MyProfile = () => {
	const { Moralis, user, isWeb3Enabled } = useMoralis();
	const Router = useRouter();
	const walletAddress = user?.attributes?.ethAddress;
	const fetchProfile = async () => {
		const query = new Moralis.Query("IfUser");
		query.equalTo("postOwner", walletAddress);
		const result = await query.find();
		const a = JSON.parse(JSON.stringify(result))
		const b = a[0];
		return b;
	}

	const today = new Date().toISOString().slice(0, 10);
	const queryKey = `userProfile${walletAddress}myprofile-${today}`;

	const { data, isLoading } = useQuery(queryKey, fetchProfile, {
		staleTime: 1000 * 50,
		cacheTime: 0,
	})
	

	const [copied, setCopied] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	}, [copied]);


	const [quantitySeguindo, setQuantitySeguindo] = useState("");
	const [quantitySeguidores, setQuantitySeguidores] = useState("");
	const [quantityPosts, setQuantityPosts] = useState("");
	const [reloadProfile, setReloadProfile] = useState(false); 
	const [walletSeguidores, setWalletSeguidores] = useState("");
	const [walletSegui, setWalletSegui] = useState("");
	const [walletPosts, setWalletPosts] = useState("");

	const [imageModal, setImageModal] = useState(false);
	const [imageModal2, setImageModal2] = useState(false);

	const [Profile_user, setProfile_user] = useState("");

	useEffect(() => {
		if (user) {
			if (user.attributes.ethAddress) {
				const checkFields = async () => {
					const User = Moralis.Object.extend("IfUser");
					const query = new Moralis.Query(User);
					query.equalTo("postOwner", user.attributes.ethAddress.toLowerCase());
					const myDetails = await query.first();
					if (myDetails && (!myDetails.get("nameUserLink") || !myDetails.get("avatarUser") || !myDetails.get("userName"))) {
						setProfile_user(true);
						setTimeout(() => {
							Router.push("profile");
						}, 3000);
					}

					// 	Router.push("myprofile");
				};
				checkFields();
			}
			//   setIsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		async function seguindo() {
			let addr = [];
			if (walletAddress) {
				const query = new Moralis.Query(`seguir`);
				query.equalTo("seguidores", walletAddress.toLowerCase());
				const likes = await query.find();
				setQuantitySeguindo(likes.length);
				for (let i = 0; i < likes.length; i++) {
					addr[i] = likes[i].attributes.seguindo;
					setWalletSegui(addr);
				}
			}
		}
		seguindo()
	}, [walletAddress, walletSegui]);

	useEffect(() => {
		async function seguidores() {
			let addr = [];
			if (walletAddress) {
				const query = new Moralis.Query(`seguir`);
				query.equalTo("seguindo", walletAddress.toLowerCase());
				const likes = await query.find();
				setQuantitySeguidores(likes.length);
				for (let i = 0; i < likes.length; i++) {
					addr[i] = likes[i].attributes.seguidores;
					setWalletSeguidores(addr);
				}
			}

		}
		seguidores()
	}, [walletAddress, walletSeguidores]);

	useEffect(() => {
		async function posts() {
			let addr = [];
			if (walletAddress) {
				const query = new Moralis.Query(`Posts`);
				query.equalTo("owner", walletAddress.toLowerCase());
				const likes = await query.find();
				setQuantityPosts(likes.length);
				for (let i = 0; i < likes.length; i++) {
					addr[i] = likes[i].attributes.seguidores;
					setWalletPosts(addr);
				}
			}

		}
		posts()
	}, [walletAddress, setWalletPosts]);


	function perfilImag(ipfs) {
		let origLink = ipfs?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
		return origLink;
	}

	const [showElementFOLLOW, setShowElementFOLLOW] = useState('');
	const [showElementFOLLOWING, setShowElementFOLLOWING] = useState('');

	function Follow_modal() {
		const a = !showElementFOLLOW;
		setShowElementFOLLOWING('');
		setShowElementFOLLOW(a);
	}

	function Following_modal() {
		const a = !showElementFOLLOWING;
		setShowElementFOLLOW('');
		setShowElementFOLLOWING(a);
	}

	function followClose() {
		setShowElementFOLLOW(false);
		setShowElementFOLLOWING(false);
	}
	const [editProfile, setEditProfile] = useState(false);

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	function handleImageLoad() {
		setIsImageLoaded(true);
	}
	const [Nologgin, setNoLoggin] = useState(false);


	return (
		<>
			{Profile_user && <Profile_alert />}
			<Meta title={`${data?.userName} - @${data?.nameUserLink}`} />
			{/* <!-- Profile --> */}
			<div className="pt-[5.5rem] lg:pt-24" >
				{/* <!-- Banner --> */}
				<div className="relative flex justify-center h-[18.75rem] banner_user_profile">
					{isLoading ? (
						<div className="placeholder pulse  w-full h-full">
							<div className="square w-full h-full"
								style={{ height: "100%" }}></div>
						</div>
					) : (
						<img src={perfilImag(data?.bannerUser) ? perfilImag(data?.bannerUser) : '/images/frame_2_1.png'} alt="banner" layout="fill" objectFit="cover" />
					)}
					{/* <!-- Avatar --> */}
					<div className="absolute bottom-0 z-10 flex items-center justify-center"
						style={{
							transform: 'translateY(58px)'
						}}>
						<figure className={!isImageLoaded ? "img_hover_bright  h-40 w-40 dark:bg-jacarta-700 rounded-full bg-white" : "img_hover_bright  h-40 w-40 imgBorder_Myprofile"}>
							<button
								className="col-cards_header w-full h-full absolute"
								onClick={() => setImageModal2(true)}
							></button>
							{!isImageLoaded && (
								<div className="placeholder pulse w-full h-full">
									<div className="circle w-full h-full"
										style={{
											borderRadius: "100%",
											width: '100%',
											height: "100%"
										}}></div>
								</div>
							)}

							<img
								src={perfilImag(data?.avatarUser)}
								alt=""
								layout="fill"
								objectFit="contain"
								className="dark:border-jacarta-600 border-radius_100  border-white user_profile_img"
								onLoad={handleImageLoad}
								style={{
									display: isImageLoaded ? "block" : "none",
									margin: "0 2px",
									maxHeight: "150px",
									maxWidth: "150px",
									minWidth: "150px",
									minHeight: "150px"
								}} />
							{!isLoading && isImageLoaded && (
								<div
									className="cursor-pointer absolute right_avatar bottom-0 flex h-6 w-6 items-center justify-center"
									data-tippy-content="Verified Collection"
									title='Verified account'
									style={{ zIndex: 5 }}
								>
									<svg className='h-6 w-6' width="734" height="734" viewBox="0 0 734 734" fill="none" xmlns="http://www.w3.org/2000/svg">
										<rect x="198" y="229" width="386" height="322" fill="white" />
										<path d="M666.407 242.251L666.356 242.557L666.608 242.739C706.064 271.16 732.833 315.184 732.833 366.667C732.833 418.149 706.064 462.207 666.608 490.594L666.356 490.776L666.407 491.082C674.384 539.013 661.95 589.376 625.647 625.646L626 626L625.646 625.646C589.277 662.016 538.947 674.118 491.214 666.34L490.907 666.29L490.727 666.543C462.441 706.13 418.017 732.833 366.667 732.833C315.184 732.833 271.06 706.031 242.706 666.509L242.525 666.257L242.219 666.307C194.419 674.118 144.056 662.049 107.654 625.646C71.2847 589.278 59.1824 538.915 67.2264 491.083L67.278 490.776L67.0253 490.594C27.6007 462.239 0.5 418.181 0.5 366.667C0.5 315.153 27.6008 271.061 67.0251 242.739L67.2781 242.558L67.2264 242.25C59.1824 194.418 71.2847 144.056 107.687 107.687L107.687 107.687C143.99 71.3503 194.387 58.9491 242.485 66.9266L242.793 66.9776L242.974 66.7237C271.16 27.203 315.283 0.5 366.667 0.5C417.984 0.5 462.341 27.1704 490.66 66.7244L490.841 66.9777L491.149 66.9266C539.079 58.9493 589.376 71.4164 625.646 107.687L626 107.333L625.647 107.687C661.95 143.957 674.417 194.321 666.407 242.251ZM329.003 447.829L257.254 376.08L257.247 376.074C250.866 369.911 242.32 366.5 233.449 366.578C224.578 366.655 216.092 370.213 209.819 376.486C203.546 382.759 199.988 391.245 199.911 400.116C199.834 408.987 203.244 417.533 209.407 423.914L209.413 423.92L309.413 523.92C312.888 527.395 317.078 530.072 321.692 531.764C326.306 533.455 331.234 534.121 336.131 533.716C341.029 533.31 345.78 531.842 350.052 529.414C354.325 526.986 358.018 523.657 360.874 519.657L527.54 286.324C530.122 282.707 531.966 278.618 532.967 274.288C533.968 269.959 534.107 265.475 533.375 261.092C532.643 256.709 531.054 252.514 528.701 248.745C526.347 244.976 523.274 241.708 519.657 239.126C512.358 233.909 503.284 231.805 494.433 233.277C485.582 234.749 477.678 239.676 472.46 246.976L472.867 247.267L472.46 246.976L329.003 447.829Z" fill="url(#paint0_linear_12_7)" stroke="black" />
										<defs>
											<linearGradient id="paint0_linear_12_7" x1="4.3784e-06" y1="253.5" x2="733" y2="733" gradientUnits="userSpaceOnUse">
												<stop stopColor="#F0B90B" />
												<stop offset="1" stopColor="#000" />
											</linearGradient>
										</defs>
									</svg>
								</div>
							)}

						</figure>
					</div>
				</div>
				{/* <!-- Modal --> */}
				<div
					className={
						imageModal ? "modal fade show block"
							: "modal fade"
					}
				>
					<div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center NFT_modal">
						<img src={perfilImag(data?.bannerUser) ? perfilImag(data?.bannerUser) : '/images/frame_2_1.png'} alt="banner" layout="fill" objectFit="cover" />
					</div>

					<button
						type="button"
						className="btn-close absolute top-6 right-6"
						onClick={() => setImageModal(false)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
							className="h-6 w-6 fill-white"
						>
							<path fill="none" d="M0 0h24v24H0z" />
							<path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
						</svg>
					</button>
				</div>
				{/* <!-- end modal --> */}
				{/* <!-- end banner --> */}
				{/* <!-- Modal --> */}
				<div
					onClick={() => setImageModal2(false)}
					className={
						imageModal2 ? "modal fade show block"
							: "modal fade"
					}
				>
					<div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center NFT_modal"
						style={{
							margin: "20px",
							overflow: "overlay"
						}}>
						<img
							src={perfilImag(data?.avatarUser) ? perfilImag(data?.avatarUser) : '/images/frame_2_1.png'}
							alt=""
							layout="fill"
							objectFit="cover"
							className=""
							style={{ borderRadius: "4px" }}
						/>
					</div>
					<div className='btn_edit_profile w-full '>
						<Link href={"profile"}>
							<button className='dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100 group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white dark:bg-jacarta-700 text-center font-semibold text-white transition-all dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 bg-white btn_hover_bright font-display group bg-accent flex items-center rounded-lg py-2 px-4 text-sm'
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
									className="mr-1 h-4 w-4 fill-white"
								>
									<path fill="none" d="M0 0h24v24H0z"></path>
									<path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
								</svg>
								<span className="text_space mt-0.5 block text-white">
									Edit Profile
								</span>
							</button>
						</Link>
					</div>
				</div>
				{/* <!-- end modal --> */}
				<section className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-24">
					<div className="container">
						<div className="text-center">
							<h2 className={data?.userName ? "flex items-center justify-center font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white" : "flex items-center justify-center font-display text-jacarta-700 mb-2 text-sm font-medium dark:text-white"}>
								{data?.userName ? data?.userName : "no Name"}
							</h2>
							<h3 className="text-jacarta-400 mb-3">
								@{data?.nameUserLink ? data?.nameUserLink : "no Username"}
							</h3>
							{/* {isWeb3Enabled && (
								<div className='inline-flex items-center justify-center rounded-full mb-8 mt-2'
									style={{
										backgroundImage: 'linear-gradient(45deg, rgba(199, 63, 151, 1), rgba(40, 152, 255, 1))',
										padding: '3px 3px'
									}}>
									<div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100  inline-flex items-center justify-center rounded-full border bg-white py-1.5 px-4">
										<Image
											src="/images/logo_black.png"
											className=" inline-block h-6 w-6"
											alt=""
											height={15}
											width={15}
										/>
										<Tippy
											hideOnClick={false}
											content={copied ? <span>copied</span> : <span>copy</span>}
										>
											<button className="js-copy-clipboard dark:text-jacarta-200 ml-1 max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap">
												<CopyToClipboard text={walletAddress} onCopy={() => setCopied(true)}>
													{walletAddress ? (
														<span>{walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}</span>
													) : (
														<span>Sem carteira para exibir</span>
													)}
												</CopyToClipboard>
											</button>
										</Tippy>
									</div>
								</div>
							)} */}
							<p
								style={{
									whiteSpace: "pre-line",
									overflow: "hidden",
									textAlign: "start",
									marginBottom: "40px",
									// maxWidth: "21rem",
									display: "inline-block"
								}}
								className="bio_box flex justify-center dark:text-jacarta-300 mx-auto mb-5 max-w-xl text-lg">{data?.bio}</p>
							<div className="mt-6 flex items-center justify-center space-x-2.5 relative">
								<Social_dropdown postId={data?.postOwner}/>
								<div className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl bg-white">
									<Link href={"profile"}>
										<button className='inline-flex h-10 w-10 items-center justify-center text-sm'>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
												className="h-4 w-4 dark:fill-white fill-jacrta-400"
											>
												<path fill="none" d="M0 0h24v24H0z"></path>
												<path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"></path>
											</svg>
										</button>
									</Link>
								</div>
							</div>
							<div className='flex flex-col items-center'>
								<div className="padding_myprofile_resp dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex  items-center justify-center rounded-xl border bg-white mt-5">
									<div className="border-resp_none dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl py-4 hover:shadow-md sm:w-32">
										<div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
											<p>{quantityPosts}</p>
										</div>
										<div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
											<p>publications</p>
										</div>
									</div>
									<button
										className=" flex justify-center btn_sale flex gap-2 items-center btn_follow
											dark:hover:text-white"
										onClick={Follow_modal}
									>
										<div className="dark:hover:text-white dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl  py-4 hover:shadow-md sm:w-32">
											<div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
												<p>{user ? quantitySeguidores : 0}</p>
											</div>
											<div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
												<p>followers</p>
											</div>
										</div>
									</button>
									<button
										className=" flex justify-center btn_sale flex gap-2 items-center btn_follow
											dark:hover:text-white"
										onClick={Following_modal}
									>
										<div className="w_resp_100 dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl  py-4 hover:shadow-md sm:w-32">

											<div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
												<p>{user ? quantitySeguindo : 0}</p>
											</div>
											<div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
												<p>following</p>
											</div>
										</div>
									</button>
								</div>
							</div>
							{user && <span className="text-jacarta-400">Joined <TimeAgo date={data?.createdAt} live={true} title={null} /></span>}
							{data?.instagram ? (
								<div className='flex justify-center mt-3'>
									<span className='mr-2'>
										<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"
											className='dark:fill-white'>
											<g clipPath="url(#clip0_6_2)">
												<path className='dark:fill-white' fill-rule="evenodd" clip-rule="evenodd" d="M6.45662 0.135002C4.66595 0.215797 3.11389 0.653594 1.86064 1.90155C0.603014 3.15607 0.170656 4.71428 0.0896592 6.48632C0.03931 7.59235 -0.255106 15.9481 0.598638 18.1394C1.17437 19.6178 2.30828 20.7544 3.80015 21.332C4.49627 21.6028 5.29093 21.7861 6.45662 21.8396C16.2035 22.2807 19.8166 22.0405 21.3402 18.1394C21.6105 17.445 21.7966 16.6511 21.8481 15.4883C22.2935 5.71638 21.7758 3.59826 20.0771 1.90155C18.7297 0.557509 17.1448 -0.357413 6.45662 0.135002ZM6.54635 19.8743C5.47917 19.8263 4.90017 19.6484 4.5138 19.4989C3.54184 19.1211 2.81179 18.394 2.43636 17.4278C1.7862 15.7627 2.00183 7.85457 2.05984 6.57494C2.11676 5.32152 2.37069 4.17597 3.25508 3.29159C4.34962 2.19976 5.76376 1.66466 15.3924 2.09921C16.649 2.15598 17.7972 2.40939 18.6837 3.29159C19.7783 4.38342 20.3212 5.80844 19.879 15.4002C19.8308 16.4647 19.6524 17.0424 19.5025 17.4278C18.5119 19.9663 16.233 20.3187 6.54635 19.8743ZM15.4986 5.15859C15.4986 5.88138 16.0864 6.46913 16.8121 6.46913C17.5378 6.46913 18.1266 5.88138 18.1266 5.15859C18.1266 4.4358 17.5378 3.84858 16.8121 3.84858C16.0864 3.84858 15.4986 4.4358 15.4986 5.15859ZM5.34893 10.9868C5.34893 14.0832 7.86529 16.5936 10.9694 16.5936C14.0735 16.5936 16.5899 14.0832 16.5899 10.9868C16.5899 7.89033 14.0735 5.38149 10.9694 5.38149C7.86529 5.38149 5.34893 7.89033 5.34893 10.9868ZM7.3213 10.9868C7.3213 8.9778 8.95436 7.34784 10.9694 7.34784C12.9845 7.34784 14.6175 8.9778 14.6175 10.9868C14.6175 12.9968 12.9845 14.6273 10.9694 14.6273C8.95436 14.6273 7.3213 12.9968 7.3213 10.9868Z" fill="black" />
											</g>
											<defs>
												<clipPath id="clip0_6_2">
													<rect width="22" height="22" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</span>
									<a href={`https://www.instagram.com/${data?.instagram}/`} target="_blank">
										<p className='dark:text-jacarta-400 underline_hover hover:text-accent'>{data?.instagram}</p>
									</a>
								</div>
							) : null}
							{data?.twitter ? (
								<div className='flex justify-center mt-2'>
									<span className='mr-2'>
										<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path className="dark:fill-white" fill-rule="evenodd" clip-rule="evenodd" d="M6.919 19.7997C15.2207 19.7997 19.7615 13.0276 19.7615 7.15563C19.7615 6.96286 19.7615 6.77153 19.7483 6.58093C20.6316 5.95278 21.3939 5.17287 22 4.28049C21.1772 4.64004 20.3027 4.87584 19.4084 4.9798C20.35 4.42423 21.0551 3.55138 21.3928 2.52145C20.5062 3.03913 19.5371 3.40448 18.5262 3.60051C16.8168 1.81139 13.9579 1.72471 12.1396 3.40768C10.9681 4.49285 10.4698 6.1108 10.8339 7.65407C7.205 7.4743 3.8236 5.78702 1.5312 3.0113C0.3333 5.04191 0.946 7.63867 2.9293 8.9426C2.211 8.92202 1.5081 8.73161 0.88 8.38723V8.44362C0.8811 10.5587 2.3958 12.3799 4.5012 12.799C3.8368 12.9777 3.1394 13.0037 2.464 12.8748C3.0547 14.6856 4.7498 15.9258 6.6803 15.9615C5.082 17.1983 3.1075 17.8699 1.0747 17.8677C0.7161 17.8667 0.3575 17.8461 0 17.8038C2.0647 19.1078 4.466 19.7997 6.919 19.7965" fill="black" />
										</svg>
									</span>
									<a href={`https://twitter.com/${data?.twitter}`} target="_blank">
										<pre className='dark:text-jacarta-400 underline_hover hover:text-accent'>@{data?.twitter}</pre>
									</a>
								</div>
							) : null}
						</div>
					</div>
					{showElementFOLLOW ? (
						<Follow showElementFOLLOW={showElementFOLLOW} seguindo={walletSeguidores} closeButton={followClose} />
					) : null}
					{showElementFOLLOWING ? (
						<Following showElementFOLLOWING={showElementFOLLOWING} seguindo={walletSegui} closeButton={followClose} />
					) : null}
				</section>
				{/* <!-- end profile --> */}
				<User_items />
			</div >
			<Footer />
		</>
	);
};
export default MyProfile;
