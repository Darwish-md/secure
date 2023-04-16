import React from 'react'

export default function Alert({setAlert}) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Error!</strong>
    <span className="block sm:inline"> Something went wrong. Please try again.</span>
    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg onClick={() => setAlert(false)} className="fill-current h-6 w-6 text-red-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>Close</title>
        <path fillRule="evenodd" d="M14.35 5.65a1 1 0 011.41 0l3 3a1 1 0 010 1.41l-3 3a1 1 0 01-1.41-1.41L15.59 10l-2.24-2.24a1 1 0 010-1.41z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M5.65 5.65a1 1 0 000 1.41L7.76 10l-2.11 2.24a1 1 0 101.41 1.41L9.18 11l2.24 2.24a1 1 0 001.41-1.41L10.59 10l2.24-2.24a1 1 0 00-1.41-1.41L9.18 9.99 6.93 7.75a1 1 0 00-1.28-.1z" clipRule="evenodd" />
      </svg>
    </span>
  </div>
  )
}
