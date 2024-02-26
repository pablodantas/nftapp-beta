const Item_details = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col flex">
          <figure className="mr-5 mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full d-none_700">
            <img
              src="../images/Doodles-Guide-Feature-Image.png"
              alt=""
              className="rounded-2xl cursor-pointer w-full"
            />
          </figure>
          <div className="ml-5 w-full">
            <div className="flex items-center">
              <a className="text-accent mr-2 text-sm font-bold" href="#">
                CryptoGuysNFT
              </a>
              <span
                className="dark:border-jacarta-600 bg-purple inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                data-tippy-content="Verified Collection"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-[.875rem] w-[.875rem] fill-white"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
              </span>
            </div>
            <div className="pt-3 mb-8 flex items-center space-x-4 whitespace-nowrap">
              <div className="flex items-center">
                <span className=" dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md py-1 px-2 -ml-1 mr-1">
                  <img src="/images/logo_black.png" className="logo_money" />
                </span>
                <span className="text-green text-sm font-medium tracking-tight">
                  0 $TAP
                </span>
              </div>
              <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                Highest bid
              </span>
              <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                1/1 available
              </span>
            </div>
            <div className="mb-4 flex">
              <figure className="mr-4 shrink-0">
                <a className="relative block" href="#">
                  <img
                    className="rounded-2lg h-12 w-12"
                    loading="lazy"
                    src="https://ipfs.moralis.io:2053/ipfs/QmUkjfws5aESgu1XUNenpUU159zQvxytSQ5R1wJmGKwwUv/ipfs.jpg"
                    alt="Socialverse"
                  />
                  <div
                    className="dark:border-jacarta-600 bg-purple absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                    data-tippy-content="Verified Collection"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-[.875rem] w-[.875rem] fill-white"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                  </div>
                </a>
              </figure>
              <div className="flex flex-col justify-center">
                <span className="text-jacarta-400 block text-sm dark:text-white">
                  Owned by
                </span>
                <a className="text-accent block" href="#">
                  <span className="text-sm font-bold">Socialverse</span>
                </a>
              </div>
            </div>
            <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-7">
              <div className="mb-3">
                <div className="flex items-center whitespace-nowrap">
                  <span className=" dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md py-1 px-2 -ml-1 mr-1">
                    <img src="/images/logo_black.png" className="logo_money" />
                  </span>
                  <span className="text-green text-lg font-medium leading-tight tracking-tight">
                    0 $TAP
                  </span>
                </div>
              </div>
              <button className="bg-accent hover:bg-accent-dark inline-block w-full rounded-button py-3 px-8 text-center font-semibold text-white transition-all">
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item_details;
