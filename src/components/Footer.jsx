import React from 'react'

import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';

const SocialMediaLinks = () => {
  return (
    <div className="flex justify-center space-x-6">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={24} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={24} />
      </a>
      <a href="https://github.com">
          <FaGithub size={24} />
      </a>
    </div>
  );
};


export default function Footer() {
  return (
   
    <footer id='mission' className="bg-veryDarkBlue flex-shrink-0">
      <div
        className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0"
      >
        <div className="flex justify-around space-x-32">
          <div className="flex flex-col space-y-3 text-white">
            <a  className="hover:text-brightRed">Home</a>
            <a  className="hover:text-brightRed">Pricing</a>
            <a  className="hover:text-brightRed">Products</a>
            <a  className="hover:text-brightRed">About</a>
          </div>
          <div className="flex flex-col space-y-3 text-white">
            <a  className="hover:text-brightRed">Careers</a>
            <a  className="hover:text-brightRed">Community</a>
          </div>
        </div>

        
        <div className="flex flex-col justify-around">
          <SocialMediaLinks></SocialMediaLinks>
          <div className="hidden text-white md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
