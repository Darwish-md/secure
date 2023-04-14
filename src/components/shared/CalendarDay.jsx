import React from "react";

export default function CalendarDay({ date }) {
  const dateObj = new Date(date);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className='mx-auto p-3 mb-2 font-medium text-center'>
      <div className='bg-blue text-white py-1 bg-denimBlue p-4 font-bold text-xl'>
        {months[dateObj.getMonth()]}
      </div>
      <div className='bg-white flex flex-col justify-center bold text-black'>
        <div className='text-7xl m-auto'>{dateObj.getDate()}</div>
        <div className='text-xl m-auto'>{dayName}</div>
        <div className='text-xl m-auto'>{dateObj.getFullYear()}</div>
      </div>
    </div>
  );
}
