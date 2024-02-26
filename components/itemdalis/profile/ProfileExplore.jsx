import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";

function ProfileExplore({ address }) {

  const { Moralis } = useMoralis();
  const [profileImg, setProfileImg] = useState("");

  async function ProfileImg() {
    try {
      const query = new Moralis.Query("IfUser");
      query.equalTo("postOwner", address);
      const Posts = await query.find();
      const fetchedContent = JSON.parse(JSON.stringify(Posts, ["avatarUser"]));
      const avatar = fetchedContent[0]?.avatarUser;
      if (avatar) {
        return avatar;
      }
    } catch (error) {
      console.error(error);
    }

  }

  const { data } = useQuery(`avatar${address}`, ProfileImg, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      setProfileImg(data);
    }
  }, [data]);

  return (<img className="user_pic rounded-pill" preview={null} src={profileImg ? profileImg : 'https://ipfs.moralis.io:2053/ipfs/QmQWybRGaJQEBYJdgrQdd8wgKzfZz5hmCqvjmXVBqJdrq6'} alt="owner" />);

} export default ProfileExplore;
