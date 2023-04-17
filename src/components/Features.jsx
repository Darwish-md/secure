import React from "react";

export default function Features() {
  return (
    <section id="features" className="bg-veryLightGray">
      <div className="container px-5 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">What Makes Secure Unique?</h2>

        <div className="flex flex-col md:flex-row md:space-x-10">
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md md:w-1/3">
            <img src="img/avatar-anisha.png" className="w-16" alt="" />
            <h3 className="text-lg font-bold mb-3">Manage Elections</h3>
            <p className="text-sm text-gray-600 mb-6">
              Create your own elections and invite others to participate. Vote on candidates or proposals, and view real-time results. Engage with your community and participate in decision-making.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md md:w-1/3 mt-10 md:mt-0">
            <img src="img/avatar-ali.png" className="w-16" alt="" />
            <h3 className="text-lg font-bold mb-3">Mint Your NFT Profile</h3>
            <p className="text-sm text-gray-600 mb-6">
              Create a unique profile and mint it as an NFT on IPFS Infura. Choose one of your NFTs as your profile picture to showcase your creativity and express yourself in a new and exciting way.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md md:w-1/3 mt-10 md:mt-0">
            <img src="img/avatar-richard.png" className="w-16" alt="" />
            <h3 className="text-lg font-bold mb-3">Engage</h3>
            <p className="text-sm text-gray-600 mb-6">
              Publish posts and engage with others in our social platform. Stay up-to-date with what's trending in your community, share your thoughts and ideas, and connect with like-minded people.
            </p>
          </div>
        </div>

        <div className="my-16">
          <a
            href="#"
            className="inline-block bg-red-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-red-700 transition-colors duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
