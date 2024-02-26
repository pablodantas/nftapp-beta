import Link from 'next/link';
import { hero_6_data } from '../../data/hero_6_data';
import HeadLine from '../headLine';
import { collection_data } from '../../data/collection_data';
import React, { useState } from 'react';

const Hero_6 = () => {

	const [timeActiveText, setTimeActiveText] = useState('last 7 days');
	const [data, setData] = useState(collection_data);
	const [dropdownShow, setDropdownShow] = useState(false);
	const timeText = [
		{
			id: 1,
			text: 'Last 24 Hours',
		},
		{
			id: 2,
			text: 'Last 7 days',
		},
		{
			id: 3,
			text: 'Last 30 days',
		},
	];

	const handleFilter = (text) => {
		setTimeActiveText(text);
		const newCollectionData = collection_data.filter((item) => {
			if (text === 'Last 30 days') {
				return item;
			}
			return item.postDate === text;
		});
		setData(newCollectionData);
	};

	const handleDropdown = (e) => {
		window.addEventListener('click', (w) => {
			if (w.target.closest('.dropdown-toggle')) {
				if (dropdownShow) {
					setDropdownShow(false);
				} else {
					setDropdownShow(true);
				}
			} else {
				setDropdownShow(false);
			}
		});
	};

	return (
		<>
			{/* <!-- Hero --> */}
			<section className="relative px-6 pb-8 py-24 md:pt-32">
				<div className="font-display text-jacarta-700 mb-12 text-center text-lg sm:text-3xl dark:text-white flex justify-center items-center gap-x-3">
					<HeadLine text="top users over" classes="inline" />

					<div className="dropdown cursor-pointer relative">
						<button
							className="dropdown-toggle text-accent inline-flex items-center"
							type="button"
							onClick={(e) => handleDropdown(e)}
						>
							{timeActiveText}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								className="fill-accent h-8 w-8"
							>
								<path fill="none" d="M0 0h24v24H0z"></path>
								<path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
							</svg>
						</button>

						<div
							className={
								dropdownShow
									? 'dropdown-menu dark:bg-jacarta-800 z-10  min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl show text-jacarta-700 dark:text-white absolute m-0 top-full'
									: 'dropdown-menu dark:bg-jacarta-800 z-10  min-w-[200px] whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl hidden text-jacarta-700 dark:text-white absolute m-0 top-full'
							}
						>
							{timeText.map(({ id, text }) => {
								return (
									<button
										key={id}
										onClick={() => {
											handleFilter(text);
										}}
										className="block dropdown-text"
									>
										<span className="dropdown-item font-normal text-base dark:hover:bg-jacarta-600 hover:bg-jacarta-50 block rounded-xl px-5 py-2 transition-colors">
											{text}
										</span>
									</button>
								);
							})}
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-5 lg:flex-row">
					<div className="w-full lg:w-1/3">
						<div className="grid grid-cols-2 grid-rows-2 gap-5 grid_img">
							{hero_6_data.slice(0, 4).map((item) => {
								const { id, title, img, authorName } = item;
								const itemLink = img
									.split('/')
									.slice(-1)
									.toString()
									.replace('_square.jpg', '')
									.replace('.gif', '');
								return (
									<article key={id}>
										<div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
											<figure className="relative">
												<Link href={`/item/${itemLink}`}>
													<a className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20">
														<img
															src={img}
															alt={title}
															className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
															height="470"
															width="470"
														/>
													</a>
												</Link>
											</figure>
											<div className="pointer-events-none absolute bottom-0 w-full p-5">
												<h2 className="font-display text-base leading-none text-white xl:text-lg">
													{title}
												</h2>
												<span className="text-2xs text-white">{authorName}</span>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</div>
					<div className="w-full lg:w-1/3">
						{hero_6_data.slice(4, -4).map((item) => {
							const { id, title, img, authorName } = item;
							const itemLink = img
								.split('/')
								.slice(-1)
								.toString()
								.replace('.jpg', '')
								.replace('_square', '')
								.replace('.gif', '');
							return (
								<article key={id} className="img_center">
									<div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
										<figure className="relative">
											<Link href={`/item/${itemLink}`}>
												<a className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20">
													<img
														src={img}
														alt={title}
														className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
														height="470"
														width="470"
													/>
												</a>
											</Link>
										</figure>
										<div className="pointer-events-none absolute bottom-0 w-full p-5">
											<h2 className="font-display text-base leading-none text-white xl:text-lg">
												{title}
											</h2>
											<span className="text-2xs text-white">{authorName}</span>
										</div>
									</div>
								</article>
							);
						})}
					</div>
					<div className="w-full lg:w-1/3">
						<div className="grid grid-cols-2 grid-rows-2 gap-5 grid_img">
							{hero_6_data.slice(5, 9).map((item) => {
								const { id, title, img, authorName } = item;
								const itemLink = img
									.split('/')
									.slice(-1)
									.toString()
									.replace('.jpg', '')
									.replace('_square', '')
									.replace('.gif', '');
								return (
									<article key={id}>
										<div className="relative overflow-hidden rounded-2.5xl bg-white dark:bg-jacarta-700">
											<figure className="relative">
												<Link href={`/item/${itemLink}`}>
													<a className="group block after:absolute after:inset-0 after:block after:bg-jacarta-900/20">
														<img
															src={img}
															alt={title}
															className="w-full object-cover transition-transform duration-[1600ms] will-change-transform group-hover:scale-105"
															height="470"
															width="470"
														/>
													</a>
												</Link>
											</figure>
											<div className="pointer-events-none absolute bottom-0 w-full p-5">
												<h2 className="font-display text-base leading-none text-white xl:text-lg">
													{title}
												</h2>
												<span className="text-2xs text-white">{authorName}</span>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</div>
				</div>
			</section>
			{/* <!-- end hero --> */}
		</>
	);
};

export default Hero_6;
