import React from "react";
import { Link } from "react-router-dom";
import CalendarDay from "./CalendarDay";
import { TiLockClosed, TiLockOpen } from "react-icons/ti";

export default function ElectionCard({ election }) {

  const status = new Date(election.endDate) > new Date() ? (
    <div className="flex items-center justify-center text-green-500">
      <TiLockOpen className="mr-2 text-3xl" /> 
      <p className="text-sm font-medium pl-2">Election is now open</p>
    </div>
  ) : (
    <div className="flex items-center justify-center text-red-500">
      <TiLockClosed className="mr-2 text-3xl" /> 
      <p className="text-sm font-medium pl-2">Election is now closed</p>
    </div>
  );

  return (
    <Link
    className='w-full sm:w-1/2 lg:w-1/3 p-2 block w-full mt-8 max-w-lg mx-auto mb-4 mx-6 border border-gray-400 rounded-xl bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300'
      to={`/elections/vote/${election.id}`}
    >
      <div className='p-4'>
        <div className='bold text-3xl bg-denimBlue mb-3 py-5 px-2 rounded h-20 text-center'>{`${election.name}`}</div>
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
        <div className='mb-2 text-gray-500'>{status}</div>
      </div>
    </Link>
  );
}
