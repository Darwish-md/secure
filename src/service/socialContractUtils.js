import { ethers } from "ethers";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";
import Social from "../artifacts/contracts/Social.sol/Social.json";

const SOCIAL_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const client = getInfuraClient();

let contractInstance;

function getInfuraClient() {
  const projectId = "2O9TiIF1D6KP3MxBW4hkfvsBxc0";
  const projectSecret = "08f7f9446357cd6fed017f1012fb4b89";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  });
  return client;
}

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

async function getContract() {
  if (contractInstance) {
    // return cached instance if it exists
    return contractInstance;
  }
  if (typeof window.ethereum !== "undefined") {
    //ethereum is usable, get reference to the contract
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //signer needed for transaction that changes state
    const signer = provider.getSigner();
    contractInstance = new ethers.Contract(SOCIAL_ADDRESS, Social.abi, signer);
    return contractInstance;
  }
}

async function mintProfile(avatar, username) {
  const contract = await getContract();
  try {
    const added = await client.add(JSON.stringify({ avatar, username }));

    await (await contract.mint(`https://ipfs.io/ipfs/${added.path}`)).wait();
  } catch (error) {
    window.alert("ipfs uri upload error: ", error);
  }
}

const getProfileNFTs = async () => {
  const contract = await getContract();
  // Get users nft ids
  const results = await contract.getMyNfts();

  // Fetch metadata of each nft and add that to nft object.
  let nfts = await Promise.all(
    results.map(async (i) => {
      // get uri url of nft
      const uri = await contract.tokenURI(i);
      const response = await fetch(uri);
      const metadata = await response.json();
      return {
        id: i,
        username: metadata.username,
        avatar: metadata.avatar,
      };
    })
  );
  return nfts;
};

const uploadToIPFS = async (uploadedAvatar) => {
  try {
    const added = await client.add(uploadedAvatar);
    const ipfsURI = `https://ipfs.io/ipfs/${added.path}`;
    return ipfsURI;
  } catch (error) {
    console.log("ipfs image upload error: ", error);
  }
};

const getCurrentProfileNFT = async (nfts) => {
  const contract = await getContract();
  const address = await contract.signer.getAddress();
  const id = await contract.profiles(address);
  const currentProfileNFT = nfts.find((i) => i.id.toString() === id.toString());
  return currentProfileNFT;
};

const switchProfile = async (id) => {
  const contract = await getContract();
  await contract.setProfile(id);
};

const getAllPosts = async () => {
  const contract = await getContract();
  // Get user's address
  let address = await contract.signer.getAddress();
  // Check if user owns an nft
  // and if they do set profile to true
  const balance = await contract.balanceOf(address);

  // Get all posts
  let results = await contract.getAllPosts();
  // Fetch metadata of each post and add that to post object.
  let posts = await Promise.all(
    results.map(async (i) => {
      // use hash to fetch the post's metadata stored on ipfs
      let response = await fetch(`https://ipfs.io/ipfs/${i.hash}`);
      const metadataPost = await response.json();
      // get authors nft profile
      const nftId = await contract.profiles(i.author);
      // get uri url of nft profile
      const uri = await contract.tokenURI(nftId);
      // fetch nft profile metadata
      response = await fetch(uri);
      const metadataProfile = await response.json();
      // define author object
      const author = {
        address: i.author,
        username: metadataProfile.username,
        avatar: metadataProfile.avatar,
      };
      // define post object
      let post = {
        id: i.id,
        content: metadataPost.post,
        tipAmount: i.tipAmount,
        author,
      };
      return post;
    })
  );
  posts = posts.sort((a, b) => b.tipAmount - a.tipAmount);
  console.log("posts:", posts.length, "balance", balance, "address", address);
  // Sort posts from most tipped to least tipped.
  return [address, balance, posts];
};

const uploadPost = async (post) => {
  const contract = await getContract();
  let hash;
  // Upload post to IPFS
  try {
    const result = await client.add(JSON.stringify({ post }));
    hash = result.path;
  } catch (error) {
    window.alert("ipfs image upload error: ", error);
  }
  // upload post to blockchain
  await contract.uploadPost(hash);
};
const tipPostOwner = async (post) => {
  const contract = await getContract();
  await contract.tipPostOwner(post.id, {
    value: ethers.utils.parseEther("0.1"),
  });
};

export {
  getContract,
  mintProfile,
  getProfileNFTs,
  uploadToIPFS,
  getCurrentProfileNFT,
  switchProfile,
  getAllPosts,
  uploadPost,
  tipPostOwner,
};
