import axios from "axios";

export default async function MoralisIPFSMetadata(abi) {

  const resposta = axios.post(
    "https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
    abi,
    {
      headers: {
        "X-API-KEY": "Chls3GxNualnNcfoaKHIWDlxTotOfI0zcnnGBKpnAiAdkGMq7PT84FF6qr4VXb7J",
        "Content-Type": "application/json",
        accept: "application/json",
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    }
  ).then((res) => {
    let origLink = res.data[0].path;
    const result = "ipfs://" + origLink.slice(34);
    return result;
  })
    .catch((error) => {
      console.log(error);
    });

    return resposta;
}