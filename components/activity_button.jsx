import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";
import { closeMblMenu } from "../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";
const Activity_button = () => {
  const { Moralis, user } = useMoralis();
  const walletAddress = user?.attributes?.ethAddress;
  const dispatch = useDispatch();
  const [notification, setNotifications] = useState(null);

  async function notificationn() {
    if (walletAddress) {
      const notifications = Moralis.Object.extend("Notifications");
      const query = new Moralis.Query(notifications);
      query.equalTo("postOwner", walletAddress.toLowerCase());
      const result = await query.first();
      return result;
    }
  }

  const { data } = useQuery(`Notifications${walletAddress}`, notificationn, {
    staleTime: 1000 * 50,
    //cacheTime: 111120000,
  });

  useEffect(() => {
    if (data) {
      setNotifications(data.attributes.notifications);
    }
  }, [data]);

  async function Disable() {
    dispatch(closeMblMenu());
    const notifications = Moralis.Object.extend("Notifications");
    const query = new Moralis.Query(notifications);
    query.equalTo("postOwner", walletAddress?.toLowerCase());
    const myDetails = await query.first();
    if (myDetails) {
      if (walletAddress) {
        myDetails.set("notifications", false);
        await myDetails.save();
      }
    } else {
      const notifications = Moralis.Object.extend("Notifications");
      const query = new notifications();
      if (walletAddress) {
        query.set("notifications", false);
        query.set("postOwner", walletAddress?.toLowerCase());
      }
      await query.save();
    }
  }

  return (
    <Link href={"/activity"}>
      <button
        href="#"
        className="dark:hover:bg-jacarta-600 hover:bg-jacarta-50 border-jacarta-100  group flex items-center justify-center border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] text-center font-semibold text-white  dark:bg-jacarta-700 text-center font-semibold text-white transition-all border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent js-dark-mode-trigger ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] fill-dark dark:fill-white hover:fill-white"
        aria-label="dark"
        onClick={() => notification ? Disable() : dispatch(closeMblMenu())}
        title={notification ? "Notification": "No notifications"}
      >
        {notification ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="dark:fill-white" d="M12.0073 22.4522C11.4275 22.4522 10.9206 22.2403 10.4867 21.8165C10.0528 21.3927 9.83589 20.8832 9.83589 20.2881H14.1783C14.1783 20.8975 13.9646 21.4105 13.5372 21.8272C13.1099 22.2439 12.5999 22.4522 12.0073 22.4522Z"/>
            <path className="dark:fill-white" d="M3.32281 19.3218V17.2283H5.56087V10.0478C5.56087 8.56444 5.99221 7.23399 6.85489 6.05649C7.71757 4.87899 8.86993 4.11218 10.312 3.75606V3.10761C10.312 2.64035 10.4774 2.25234 10.8082 1.94359C11.139 1.63482 11.5359 1.48044 11.999 1.48044C12.4621 1.48044 12.8593 1.63482 13.1908 1.94359C13.5223 2.25234 13.6881 2.64035 13.6881 3.10761V3.75606C14.3466 3.91336 14.9463 4.15654 15.4871 4.4856C14.2584 5.24728 13.44 6.60808 13.44 8.16001C13.44 10.5459 15.3742 12.48 17.76 12.48C18.0135 12.48 18.2618 12.4582 18.5033 12.4163V17.2283H20.6913V19.3218H3.32281Z"/>
            <circle cx="17.76" cy="8.15999" r="3.36" className="dark:fill-accent"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="dark:fill-white" d="M3.32281 19.3218V17.2283H5.56087V10.0478C5.56087 8.56444 5.99221 7.23399 6.85489 6.05649C7.71757 4.87899 8.86993 4.11218 10.312 3.75606V3.10761C10.312 2.64035 10.4774 2.25234 10.8082 1.94359C11.139 1.63482 11.5359 1.48044 11.999 1.48044C12.4621 1.48044 12.8593 1.63482 13.1908 1.94359C13.5223 2.25234 13.6881 2.64035 13.6881 3.10761V3.75606C15.1395 4.10275 16.3049 4.86659 17.1843 6.04759C18.0636 7.22857 18.5033 8.56199 18.5033 10.0478V17.2283H20.6913V19.3218H3.32281ZM12.0073 22.4522C11.4275 22.4522 10.9206 22.2403 10.4867 21.8165C10.0528 21.3927 9.83589 20.8832 9.83589 20.2881H14.1783C14.1783 20.8975 13.9646 21.4105 13.5372 21.8272C13.1099 22.2439 12.5999 22.4522 12.0073 22.4522Z" fill="black"/>
          </svg>
        )}
      </button>
    </Link>
  );
};

export default Activity_button;
