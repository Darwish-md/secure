import React from "react";
import { Link } from "react-router-dom";
import CalendarDay from "./CalendarDay";
import { TiLockClosed, TiLockOpen } from "react-icons/ti";

export default function ElectionCard({ election, index }) {
  const status = election.isValid ? (
    <div className="flex flex-row">
      <TiLockOpen className="text-3xl"/> <p>Election is now open</p>
    </div>
  ) : (
    <div className="flex flex-row">
      <TiLockClosed className="text-3xl"/> <p>Election is now closed</p>
    </div>
  );

  return (
    <Link
      key={index}
      className='block w-full max-w-lg mx-auto mb-4 ml-4 mr-4 border border-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
      to={`/elections/vote/${index}`}
    >
      <div className='p-4'>
        <div className='bold text-3xl bg-denimBlue mb-3 p-5 rounded h-20 text-center'>{`${election.electionName}`}</div>
        <div className='bg-denimDark text-center'>
          <p>Started on</p>
        </div>
        <div className='mb-2'>
          <CalendarDay date={election.startDate} />
        </div>
        <div className='bg-denimDark text-center'>
          <p>Ending on</p>
        </div>
        <div className='mb-2'>
          <CalendarDay date={election.endDate} />
        </div>
        <div className='mb-2'>{status}</div>
      </div>
    </Link>
  );
}
