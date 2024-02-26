import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from 'react-query';

function ProfileItem({ address }) {

	const { Moralis } = useMoralis();

	const addressId  = address;

	const [profileImg, setProfileImg] = useState();
	const [userName, setProfileuserName] = useState();

	const fetchItemMan = async () => {
		try {
		  const query = new Moralis.Query("IfUser");
		  query.equalTo("postOwner", addressId);
		  const res = await query.first();
		  return res?.attributes;
		} catch (error) {
		  console.log(error);
		  return null;
		}
	  };
	  

	const { data } = useQuery(`MoralisfetchProfileAvatar${addressId}`, fetchItemMan, {
		staleTime: 1000 * 1,
	})

	useEffect(() => {
		if (address) {
			setProfileImg(data?.avatarUser?.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/'))
			setProfileuserName(data?.userName);
		}
	}, [addressId, data, address]);


	return (<img src={profileImg} alt={userName} className="imgPostAuthor" loading="lazy" 
	style={{width: "56px", height: "56px"}}/>);

} export default ProfileItem;
