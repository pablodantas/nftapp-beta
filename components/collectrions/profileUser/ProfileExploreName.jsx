import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";

function ProfileExploreName({ address }) {

  const { Moralis } = useMoralis();
  const [profileName, setProfileName] = useState("");

  async function ProfileName() {
    try {
      const query = new Moralis.Query("IfUser");
      query.equalTo("postOwner", address);
      const Posts = await query.find()
      const fetchedContent = JSON.parse(JSON.stringify(Posts, ["userName"]))
      const userName = fetchedContent[0]?.userName;
      if (userName) {
        return userName;
      }
    } catch (error) {
      console.error(error);
    }

  }

  const { data } = useQuery(`name${address}`, ProfileName, {
    staleTime: 1000 * 60,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      setProfileName(data);
    }
  }, [data]);


  return (profileName);

} export default ProfileExploreName;
