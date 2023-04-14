import React from "react";
import { Link } from "react-router-dom";

export default function Mission() {
  return (
    <div className="flex justify-around mt-10 mb-10 px-20">
      <div className='max-w-lg rounded-lg overflow-hidden text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
        <div className="bold text-3xl bg-denimBlue mb-3 p-5">Mission</div>
        <p className="italic text-sm font-normal leading-loose text-justify p-4">
          At Secure, we believe that voting is a fundamental right and an
          essential pillar of democracy. Unfortunately, traditional voting
          systems can be vulnerable to fraud, manipulation, and other forms of
          interference, which can undermine the integrity of elections and erode
          trust in the democratic process. That's why we created Secure, a
          decentralized application that leverages the power of blockchain
          technology to enable secure, transparent, and tamper-proof elections.
          With Secure, organizations can hold their elections securely, and
          voters can cast their ballots with confidence, knowing that their
          voice will be heard and their vote will count. Our mission is to
          empower individuals and organizations to exercise their right to vote
          and ensure that every vote is counted accurately and transparently. We
          believe that by leveraging the power of blockchain, we can create a
          more secure, transparent, and trustworthy voting system that
          strengthens democracy and builds trust in the electoral process. With
          Secure, we are committed to providing a platform that is easy to use,
          accessible, and scalable, so that organizations of all sizes can hold
          secure elections that are resistant to manipulation and fraud. We
          envision a world where voting is a truly democratic process that
          empowers citizens to make their voices heard and shape the future of
          their communities and countries. Join us in our mission to secure your
          voice, empower your vote with blockchain. Together, we can build a
          better, more democratic future for all.
        </p>
        <div className="m-auto mt-5 mb-7 ">
        <Link
              to='/elections'
              className={`pl-7 pr-7 p-3 mt-4 text-center rounded-full text-xl border border-white hover:bg-denimDark cursor-pointer w-60`}
            >
                Get started
            </Link>
        </div>
      </div>
      <div className="max-w-lg flex-grow">
        <img src='/assets/mission.jpg' alt=''  class="h-full object-cover" /></div>
    </div>
  );
}
