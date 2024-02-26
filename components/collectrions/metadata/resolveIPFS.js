export const resolveIPFS = (url) => {
    if (!url || !url.includes('ipfs://')) {
      console.log(url) ;
    }
    url.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');
    console.log(url);
  };