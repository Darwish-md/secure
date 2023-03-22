import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getElectionsList } from "../service/electionContractUtils";

export default function ElectionPage() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    async function ElectionsList() {
      const newElections = await getElectionsList();
      setElections(newElections);
      console.log(elections);
    }
    ElectionsList();
  }, []);

  const renderedCards = elections.map((election, index) => {
    return (
      <div
        key={index}
        className='rounded overflow-hidden shadow-lg flex flex-row'
      >
        <div className='mb-2 rounded'>{`${election.electionName}`}</div>
        <div className='mb-2 rounded'>{`${election.startDate}`}</div>
        <div className='mb-2'>{`${election.endDate}`}</div>
        <div className='mb-2'>{`${election.isValid}`}</div>
      </div>
    );
  });

  return (
    <div>
      <div className='m-auto'>{renderedCards}</div>
      <div>
        <Link
        to='/elections/create'
          className={`hidden md:block pl-7 pr-7 p-3 rounded-full text-xl bg-denimBlue hover:bg-denimDark cursor-pointer`}
        >
          Create Election
        </Link>
      </div>
    </div>
  );
}
