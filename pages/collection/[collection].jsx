import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Auctions_dropdown from '../../components/dropdown/Auctions_dropdown';
import Social_dropdown from '../../components/dropdown/Social_dropdown';
import Collection_items from '../../components/collectrions/Collection_items';
import Link from 'next/link';
import Footer from "../../components/footer";
import Meta from '../../components/Meta';
import { useMoralis } from "react-moralis";

const Collection = () => {
	const [likesImage, setLikesImage] = useState(false);
	const router = useRouter();
	const pid = router.query.collection;

	const handleLikes = () => {
		if (!likesImage) {
			setLikesImage(true);
		} else {
			setLikesImage(false);
		}
	};

	const { Moralis } = useMoralis();
	const [preview, setPreview] = useState();
	const [coverPreview, setCoverPreview] = useState();
	const [userName, setUserName] = useState();
	const [bio, setBio] = useState();

	const walletAddress = pid;

	useEffect(() => {

		setTimeout(() => {
			async function getPostrs() {
				try {
					const query = new Moralis.Query("IfUser");
					query.equalTo("postOwner", walletAddress);
					const Posts = await query.find();
					const fetchedContent = JSON.parse(JSON.stringify(Posts, ["avatarUser"]));
					const avatar = fetchedContent[0]?.avatarUser;
					if (avatar) {
						setPreview(avatar);
					} else {
						setPreview(null);
					}
					const fetchedContentCover = JSON.parse(JSON.stringify(Posts, ["bannerUser"]));
					const avatarCover = fetchedContentCover[0]?.bannerUser;
					if (avatarCover) {
						setCoverPreview(avatarCover);
					} else {
						setCoverPreview(null);
					}
					const fetchedContentuserName = JSON.parse(JSON.stringify(Posts, ["userName"]));
					const userName = fetchedContentuserName[0]?.userName;
					if (userName) {
						setUserName(userName);
					} else {
						setUserName(null);
					}
					const fetchedContentuserbio = JSON.parse(JSON.stringify(Posts, ["bio"]));
					const bio = fetchedContentuserbio[0]?.bio;
					if (bio) {
						setBio(bio);
					} else {
						setBio(null);
					}
				} catch (error) {
					console.error(error);
				}

			}
			getPostrs();
		}, 2000);
		return () => {
			console.log('cleaned up');
		}

	}, [walletAddress]);

	return (
		<>
			<Meta title={`${pid} || Collection`} />

			<div className="pt-[5.5rem] lg:pt-24">
				{/* <!-- Banner --> */}
				<div className="relative h-[18.75rem] banner_user_profile">
					<img src={coverPreview ? coverPreview : 'https://ipfs.moralis.io:2053/ipfs/QmQWybRGaJQEBYJdgrQdd8wgKzfZz5hmCqvjmXVBqJdrq6'} alt="banner" layout="fill" objectFit="cover" />
				</div>
				{/* <!-- end banner --> */}

				{/* <!-- Profile --> */}
							<section  className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
								{/* <!-- Avatar --> */}
								<div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
									<figure className="relative h-40 w-40 dark:border-jacarta-600 border-radius_100 border-[5px] border-white">
										<img
											src={preview ? preview : 'https://ipfs.moralis.io:2053/ipfs/QmQWybRGaJQEBYJdgrQdd8wgKzfZz5hmCqvjmXVBqJdrq6'}
											alt=""
											layout="fill"
											objectFit="contain"
											className="user_profile_img dark:border-jacarta-600 border-radius_100 border-[5px] border-white"
										/>
										<div
											className="dark:border-jacarta-600 bg-green absolute right_button bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
											data-tippy-content="Verified Collection"
										>
										</div>
									</figure>
								</div>

								<div className="container">
									<div className="text-center">
										<h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
											{userName}
										</h2>
										<div className="mb-8">
											<span className="text-jacarta-400 text-sm font-bold">Created by </span>
											<Link href={`/collection/${walletAddress}`}>
												<a className="text-accent text-sm font-bold">{walletAddress}</a>
											</Link>
										</div>
										<p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">{bio}</p>

										<div className="mt-6 flex items-center justify-center space-x-2.5 relative">
											<div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
												{/* <Likes data={} /> */}
												<div
													className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
													onClick={() => handleLikes()}
												>
													<button>
														{likesImage ? (
															<svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
																<use xlinkHref="/icons.svg#icon-heart-fill"></use>
															</svg>
														) : (
															<svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
																<use xlinkHref="/icons.svg#icon-heart"></use>
															</svg>
														)}
													</button>
												</div>
											</div>

											<Social_dropdown />

											<Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
										</div>
									</div>
								</div>
							</section>

				{/* <!-- end profile --> */}
			</div>
			<Collection_items />
			<Footer />
		</>
	);
};

export default Collection;
