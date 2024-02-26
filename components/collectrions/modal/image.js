async function MetaNft(tokenUri) {
    let origLink = tokenUri.replace('ipfs://', 'https://ipfs.moralis.io:2053/ipfs/');
    let NFT;
    try {
        await fetch(origLink)
            .then((response) => response.json())
            .then((data) => {
                NFT = data.image;
            });
    } catch (error) {
        console.log(error);
    }
    return NFT;

} export default MetaNft;
