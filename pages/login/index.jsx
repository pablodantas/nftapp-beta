import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Meta from "../../components/Meta";
import { useMoralis } from "react-moralis";
import Image from "next/image";
import { useRouter } from "next/router";
import Moralis from "moralis-v1";

const Login = () => {
  const { authenticate, enableWeb3, isAuthenticated, user } = useMoralis();
  const [authError, setAuthError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [Finaly, setIsFinaly] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    const chain = '0x1';
    try {
      setAuthError(null);
      setIsAuthenticating(true);
      // Enable web3 to get user address and chain
      await enableWeb3({
        throwOnError: true,
        provider: "metamask",
      });
      const { account, chainId } = Moralis;
      if (!account) {
        throw new Error("Login Failed");
      }
      if (!chainId) {
        throw new Error("Login Failed");
      }
      if (!isAuthenticated && account && chainId) {
        const chainId = parseInt(chain);
        //chainId must match the testnet/mainnet of the web3auth clientId's project settings or the login won't work
        // Get message to sign from the auth api
        const { message } = await Moralis.Cloud.run("requestMessage", {
          address: account,
          chain: chain,
          network: "evm",
        });
        await authenticate({
          signingMessage: message,
          throwOnError: true,
          provider: "metamask",
          chainId: chain,
        });
      }
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
      setIsFinaly(true);
    }
  };

  const Router = useRouter();
  useEffect(() => {
    if (user) {
      console.log("user", user.attributes.ethAddress);
      if (user.attributes.ethAddress) {
        const saveEdits = async () => {
          const User = Moralis.Object.extend("IfUser");
          const query = new Moralis.Query(User);
          query.equalTo("postOwner", user.attributes.ethAddress.toLowerCase());
          const myDetails = await query.first();
          if (!myDetails) {
            const User = Moralis.Object.extend("IfUser");
            const query = new User();
            query.set("postOwner", user.attributes.ethAddress.toLowerCase());
            query.set("carteira", 1000);
            query.set("nameUserLink", "");
            await query.save();
            Router.push("profile");
          } else {
            Router.push("myprofile");
          }
        };
        saveEdits();
      }
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div>
      <Meta title="Login" />
      <Navbar />
      {/* <!-- Login --> */}
      <section className="relative h-screen section_login">
        <div className="display_login pt-10">
          {/* <!-- Right --> */}
          <div className="display_login_color">
            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
              <img
                src="/images/gradient_light.jpg"
                alt="gradient"
                className="h-full w-full"
              />
            </picture>
            <div className="w-full max-w-[25.625rem] text-center">
              <h1 className=" font-display mb-6 text-4xl text-white">
                Sign In
              </h1>
              <p className="dark:text-jacarta-300 mb-10 text-lg leading-normal text-white">
                Choose one of available wallet providers or create a new wallet.{" "}
                <a href="#" className="text-accent">
                  What is a wallet?
                </a>
              </p>

              <Tabs className="tabs ">
                <TabList className="nav gap-aut nav-tabs flex justify-start scrollbar-custom border-jacarta-600  mb-12 flex items-center  overflow-x-auto  border-b pb-px"></TabList>
                {/* <!-- Ethereum --> */}
                <TabPanel>
                  <div className="tab-pane fade show active">
                    <button
                      className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all js-wallet bg-accent hover:bg-accent-dark mb-4 flex w-full items-center justify-center rounded border-2 border-transparent py-4 px-8 text-center font-semibold text-white transition-all"
                      onClick={() => handleLogin()}
                    >
                      <img
                        src="/images/socialverse.png"
                        className={
                          isLoading
                            ? "placeholder_img_rotate h-6 w-6"
                            : "inline-block h-6 w-6 placeholder_img_rotate"
                        }
                        alt=""
                      />
                      {Finaly ? (
                        <span className="ml-2.5 flex items-center">
                          Logging completed! Redirecting.
                        </span>
                      ) : (
                        <span className="ml-2.5 flex items-center">
                          {isLoading ? (
                            <>
                              <span>Wait! logging in...</span>
                            </>
                          ) : (
                            <>Login in BlackBuzz</>
                          )}
                        </span>
                      )}
                    </button>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end login --> */}
    </div>
  );
};

export default Login;
