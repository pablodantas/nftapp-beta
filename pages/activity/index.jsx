import React from "react";
import Activity_item from "../../components/collectrions/Activity_item";
import Head from "next/head";
import Footer from "../../components/footer";
import Meta from "../../components/Meta";

const index = () => {
  return (
    <>
      <Meta title="Activity" />
      <section className="relative mt-24 lg:pb-48 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient teste"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Activity
          </h1>

          <Activity_item />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default index;
