import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";

function ProfileActivity({ address }) {
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
        return avatar?.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
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

  return (
    <div className="imgBorder">
      <img
        className="rounded-full imageCardProfile width_content_especi"
        width={60}
        height={60}
        preview={null}
        src={profileImg ? profileImg : "/images/frame_2_1.png"}
        alt="owner"
        style={{minHeight: "60px"}}
      />
    </div>
  );
}
export default ProfileActivity;