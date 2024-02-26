export function base64IPFS(ipfs) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(ipfs);
    reader.onerror = () => {
      reject(new Error("filed ipfs"));
    };
  });
}