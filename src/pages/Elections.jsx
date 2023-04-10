import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getElections } from "../service/electionContractUtils";
import Loader from "../components/shared/Loader";
import ElectionCard from "../components/shared/ElectionCard";

export default function Elections() {
  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    async function renderElections() {
      const elections = await getElections();
      console.log(elections[1]);
      setElections(elections);
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    renderElections();
    return () => clearTimeout(timeoutId);
  }, []);

  const renderedElections = elections.map((election, index) => <ElectionCard election={election} key={index} />)

  return (
    <div className='flex justify-center items-cen'>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex flex-col items-center'>
          <div className='m-auto flex flex-row flex-wrap'>{renderedElections}</div>
          <div>
            <Link
              to='/elections/create'
              className={`pl-7 pr-7 p-3 mt-8 text-center rounded-full text-xl bg-denimBlue hover:bg-denimDark cursor-pointer w-60`}
            >
              Create Election
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
