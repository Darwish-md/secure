import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getElections } from "../service/electionContractUtils";
import Loader from "../components/shared/Loader";
import ElectionCard from "../components/shared/ElectionCard";
import gif from "../assets/fb_votingelection.gif";

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
<div className='flex flex-col items-center justify-center min-h-screen'>
  {loading ? (
    <Loader />
  ) : (
    <>
      <div className='elections m-auto w-screen flex flex-row flex-wrap justify-center gap-2'>
        {renderedElections}
      </div>
        <Link
        className={`pl-7 p-7 p-3 mt-8 text-center rounded-full text-xl bg-denimBlue hover:bg-denimDark cursor-pointer w-60`}
          to='/elections/create'
        >
          Create Election
        </Link>
    </>
  )}
</div>

  );
}
