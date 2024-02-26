import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from 'react-query';

export default function UseProfile({ addr }) {

	const { Moralis } = useMoralis();

	const fetchItemMan = async () => {
		if (addr) {
			const query = new Moralis.Query("IfUser");
			query.startsWith("nameUserLink", addr.toLowerCase());
			const result = await query.find();
			const res = JSON.parse(JSON.stringify(result));
			return res;
		}
	}
	const [item, setItem] = useState([]);

	const { data, isLoading } = useQuery(`MoralisfetchProfileAvatar${addr}`, fetchItemMan, {
		staleTime: 1000 * 90,
	})

	const perfilImag = useCallback((ipfs) => {
		let origLink = ipfs?.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');
		return origLink;
	}, []);

	useEffect(() => {
		if (data) {
			setItem(data);
		}
	}, [data]);

	return (
		<>
			{!isLoading && item.length === 0 && (
				<p className="text-center p-3">User not found.</p>
			)}
			{isLoading ? (
				<div className="loader-container  flex justify-center btn_disable">
					<div className="loader"></div>
				</div>
			) : (
				item.map((data, index) => (
					<>
						{data ? (
							<a href={`/user/${data?.postOwner}`} className="dark:hover:bg-jacarta-600 rounded-xl transition-colors hover:bg-jacarta-50 flex flex-col cursor-pointer p-2 mb-2" key={index}>
								<span className="flex items-center gap-1 user_name">
									<div className="w_h imgBorder2 mr-10-i">
										{isLoading ? (
											<div className="placeholder pulse mr-2 w-8 h-8">
												<div className="cicrle rounded-full w-8 h-8"></div>
											</div>
										) : (
											<img
												src={perfilImag(data?.avatarUser)}
												alt=""
												className="w_h user_pic rounded-pill"
											/>
										)}
									</div>
									<div className="">
										<p className="flex flex-col line_heigth_1">
											<span>{data?.userName} <span className="user_nick ml-1">@{data?.nameUserLink}</span></span>
											<small className="mt-1">
												{data?.postOwner.slice(0, 6)}...{data?.postOwner.slice(-6)}
											</small>
										</p>
									</div>
								</span>
							</a>
						) : null}
					</>
				))
			)}
		</>
	);

}

