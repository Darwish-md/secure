import React from "react";
import { mintProfile, uploadToIPFS } from "../service/socialContractUtils";
import { TiLockClosed } from "react-icons/ti";

export default function ProfileForm({loadMyNFTs}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const uploadedAvatar = event.target.elements.avatar.files[0];
    const ipfsURI = await uploadToIPFS(uploadedAvatar);
    await mintProfile(ipfsURI, username);
    await loadMyNFTs();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
    <form onSubmit={handleSubmit} className="flex flex-col items-center shadow-md rounded p-8">
      <label
        className="block w-full text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="w-full px-3 py-2 mb-5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
        type="text"
        id="username"
        name="username"
        required
      />
  
      <label
        className="block w-full text-gray-700 text-sm font-bold mb-2"
        htmlFor="avatar"
      >
        Avatar
      </label>
      <div className="relative w-full mb-5">
        <input
          className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          required
        />
        <div className="absolute top-0 right-0 h-full w-12 text-center text-gray-600 pointer-events-none flex items-center justify-center">
          <TiLockClosed className="h-6 w-6" />
        </div>
      </div>
  
      <button
        className="bg-green text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 hover:bg-lightGreen"
        type="submit"
      >
        Mint NFT Profile
      </button>
    </form>
  </div>
  
  );
}
