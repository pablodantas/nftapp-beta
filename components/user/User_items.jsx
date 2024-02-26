import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from 'next/image';

import 'react-tabs/style/react-tabs.css';
import Profile_Nfs from '../collectrions/profile/Profile_Nfs';
import Profile_Post from '../collectrions/profile/profilePost';

const User_items = () => {
	const [itemActive, setItemActive] = useState(1);
	const tabItem = [
		{
			id: 1,
			text: 'ON SALE',
			icon: 'on-sale',
		},
		{
			id: 2,
			text: 'NFTs',
			icon: 'owned',
		},
		{
			id: 3,
			text: 'POSTS',
			icon: 'created',
		},
	];
	return (
		<>
			<section className="relative py-24">
				<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
					{/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
					<Image
						src="/images/gradient_light.jpg"
						alt="gradient"
						className="h-full w-full"
						layout="fill"
					/>
				</picture>
				<div className="container">
					{/* <!-- Tabs Nav --> */}
					<Tabs className="tabs">
						<TabList className="no-scrollbar nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
							{tabItem.map(({ id, text, icon }) => {
								return (
									<Tab
										className="nav-item"
										role="presentation"
										key={id}
										onClick={() => setItemActive(id)}
									>
										<button
											className={
												itemActive === id
													? 'mb-1 relative rounded-2.5xl  border-jacarta-100 p-10 dark:border-jacarta-700 nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active'
													: 'nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white'
											}
										>
											<svg className="icon mr-1 h-5 w-5 fill-current">
												<use xlinkHref={`/icons.svg#icon-${icon}`}></use>
											</svg>
											<span className="font-display text-base font-medium">{text}</span>
										</button>
									</Tab>
								);
							})}
						</TabList>

						<TabPanel>
							<div className="flex mk_gap">
								<Profile_Nfs  table={"Marketplace"} />
							</div>
						</TabPanel>
						<TabPanel>
							<div className="flex mk_gap">
								<Profile_Nfs  table={"NFTs"} />
							</div>
						</TabPanel>
						<TabPanel>
							<div className="flex mk_gap">
								<Profile_Post table={"Posts"}/>
							</div>
						</TabPanel>
					</Tabs>
				</div>
			</section>
		</>
	);
};

export default User_items;
