import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import Link from "next/link";
import Meta from "../../components/Meta";
import { current } from "@reduxjs/toolkit";
import ProfileFeed from "../../components/objsFeed/profilefeed";
import Feed from "../../components/objsFeed/feed";
import Following from "./following";
import Mobile_button from "../../components/mobile_button"


const Global = () => {
  return (
    <>
      <Meta title="Feed" />
      {/* <Navbar />  */}
      <section className="secFeedpost">
        <div className="px-6 xl:px-24">
          <div className="row flex flex-nowrap md:justify-center justify-between lg:justify-between">
            <ProfileFeed />
            <Feed />
            {/* <Following /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Global;
