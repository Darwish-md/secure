import TypeWriterEffect from "react-typewriter-effect";
import { useRef } from "react";

import React from "react";

export default function Home() {
  const myAppRef = useRef(null);
  return (
    <section id='home'>
      <div className='flex flex-col-reverse items-center px-6 mx-auto space-y-0 md:space-y-0 md:flex-row animate-fade-in'>
        <div className='flex flex-col mb-32 space-y-12 md:w-1/2'>
          <h1 className='max-w-md font-bold text-center md:text-5xl md:text-left text-4xl'>
            Secure
          </h1>
          <p className='text-center md:text-left text-4xl leading-relaxed'>
            <TypeWriterEffect
              startDelay={100}
              cursorColor='white'
              text='Secure your voice, empower your vote with Blockchain !'
              typeSpeed={40}
              scrollArea={myAppRef.current}
            />
          </p>
        </div>
        <div className='md:w-1/2 mb-32'>
          <img src='/assets/blocks.png' alt='' />
        </div>
      </div>
    </section>
  );
}
