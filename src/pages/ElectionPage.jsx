import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getElectionsList } from "../service/electionContractUtils";
import Loader from "../components/shared/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function ElectionPage() {
  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    async function ElectionsList() {
      const newElections = await getElectionsList();
      setElections(newElections);
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000); // set the timeout to 3 seconds

    ElectionsList();
    return () => clearTimeout(timeoutId);
  }, []);

  const renderedElections = elections.map((election, index) => {
    return (
      <Link
        key={index}
        className='block w-full max-w-lg mx-auto mb-4 ml-4 mr-4 border border-gray-300 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
        to={`/elections/vote/${index}`}
      >
        <div className='p-4'>
          <div className='mb-2'>{`Election: ${election.electionName}`}</div>
          <div className='mb-2'>{`Start date: ${election.startDate}`}</div>
          <div className='mb-2'>{`End date: ${election.endDate}`}</div>
          <div className='mb-2'>{`Active: ${election.isValid}`}</div>

          <div className='min-w-32 min-h-48 p-3 mb-4 font-medium text-center'>
            <div className='bg-blue text-white py-1 bg-denimBlue'>March</div>
            <div className='bg-white flex flex-col justify-center bold text-black'>
            <div className="text-7xl">17</div>
              <div className="text-3xl">2022</div>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex flex-col items-center'>
          <div className='m-auto flex flex-row'>{renderedElections}</div>
          <div>
            <Link
              to='/elections/create'
              className={`hidden md:block pl-7 pr-7 p-3 mt-4 text-center rounded-full text-xl bg-denimBlue hover:bg-denimDark cursor-pointer w-60`}
            >
              Create Election
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
