import Link from "next/link";
import Meta from "../components/Meta";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Error_page = ({ statusCode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    const router = useRouter();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 2000);
  };

  return (
    <div className="bg-jacarta-800 relative py-16 md:py-24">
      <Meta title={"Error 404"} />
      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- 404 --> */}
        <section className="bg-jacarta-800 relative md:py-24">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="container">
            <div className="mx-auto max-w-lg text-center">
                <img
                  src="/images/404.png"
                  alt=""
                  className="mb-16 inline-block"
                />
              <h1 className="font-display mb-6 text-4xl text-white md:text-6xl">
                Error 404
              </h1>
                <p className="text-jacarta-300 mb-12 text-lg leading-normal">
                  Oops! The page you are looking for does not exist. It might
                  have been moved or deleted.
                </p>
              <Link href="/">
                <a
                  className={
                    isLoading
                      ? "bg-accent hover:bg-accent-dark inline-block padding_load_blue text-center font-semibold text-white transition-all"
                      : "bg-accent hover:bg-accent-dark inline-block  py-3 px-8 text-center font-semibold text-white transition-all"
                  }
                  onClick={handleNavigate}
                >
                  {isLoading ? (
                    <div className="loader-container">
                      <div className="loader_blue"></div>
                    </div>
                  ) : (
                    <>Navigate Back</>
                  )}
                </a>
              </Link>
            </div>
          </div>
        </section>
        {/* <!-- end 404 --> */}
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error_page;
