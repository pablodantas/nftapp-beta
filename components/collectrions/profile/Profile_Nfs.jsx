import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import ProfileExploreName from "../profileUser/ProfileExploreName";
import { useQuery } from "react-query";
import ImageNFT from "../metadata/nftImage";
import ImageNFTBuy from "../metadata/nftImageBuyOff";
import { useRouter } from "next/router";
import TimeAgo from "react-timeago";
import InfiniteScroll from "react-infinite-scroll-component";

const Profile_Nfs = ({ table }) => {
  const { Moralis } = useMoralis();

  const router = useRouter();
  const pid = router.query.user;
  const walletAddressProfile = pid;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    if (walletAddressProfile && table) {
      const toSkip = (page - 1) * pageSize;
      const query = new Moralis.Query(table);
      query.equalTo("owner", walletAddressProfile);
      query.descending("createdAt");
      query.skip(toSkip);
      query.limit(pageSize);
      const result = await query.find();
      const res = JSON.parse(JSON.stringify(result));
      return res;
    }
  };

  const { data, isLoading } = useQuery(
    `myCollectionNFT${walletAddressProfile}/${table}NFT${pageSize}`,
    fetchItem,
    {
      staleTime: 1000 * 90,
      //cacheTime: 111120000,
    }
  );

  useEffect(() => {
    if (data) {
      setLoading(false);
      setItem(data);
    }
  }, [data]);

  const fetchData = () => {
    setPageSize(pageSize + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={item.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={
          loading ? (
            <div className="loader-container flex justify-center btn_disable mb-3 w-full">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="col d-flex justify-content-center"></div>
          )
        }
      >
        <div className="flex mk_gap">
        {!isLoading && item.length === 0 && (
          <p className="text-center mb-3 font-display w-full">
            You don't have NFTs
          </p>
        )}
        {isLoading ? (
          <div className="loader-container flex justify-center btn_disable mb-3 w-full">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {item.map((item, index) => (
              <Link href={`/${item?.nftContract}/${item?.tokenId}`}>
                <article
                  key={index}
                  className="max-w-xs min-w-16 height_nft_card_hover"
                >
                  <div
                    className="rounded-2xl overflow-hidden transition-shadow hover:shadow-lg"
                    style={{ maxWidth: "256px" }}
                  >
                    <figure
                      className="group overflow-hidden"
                      style={{ maxWidth: "256px" }}
                    >
                      <span className="collection_item_img">
                        {table === 'NFTs' && <ImageNFT tokenURI={item.token_uri} />}
                        {table === 'Marketplace' && <ImageNFTBuy tokenURI={item.image} />}
                      </span>
                    </figure>
                    <div className="relative min-h-8 dark:border-jacarta-600 dark:bg-jacarta-700 border-jacarta-100 rounded-b-[1.25rem] border border-t-0 bg-white">
                      <div className="p-5_c">
                        <div className="mb-3 flex flex-wrap items-center space-x-1">
                          <div className="col flex items-center flex-w-col items-center">
                            <p className="font-normal text-sm text-jacarta-700 dark:hover:text-accent hover:text-accent dark:text-white">
                              Owned by{" "}
                              <span className="text-accent text-truncate">
                                <ProfileExploreName address={item?.owner} />
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div className="absolute_card"></div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h2 className="text-truncate font-display text-jacarta-700 dark:hover:text-accent hover:text-accent mb-4 text-xl dark:text-white">
                            {item?.name}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-jacarta-400 flex flex-wrap items-center space-x-2 text-sm">
                            <span>
                              <TimeAgo date={item.createdAt} />
                            </span>
                          </div>
                          <div className="flex items-center mr-3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </>
        )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Profile_Nfs;
