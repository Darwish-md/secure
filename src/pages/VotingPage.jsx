import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getElectionById,
  getCandidates,
} from "../service/electionContractUtils";
import Loader from "../components/shared/Loader";
import CandidateCard from "../components/shared/CandidateCard";

export default function VotingPage() {
  const { id: electionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState([])
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function renderCandidates() {
      const renderedElection = await getElectionById(electionId);
      setElection(renderedElection);
      setCandidates(renderedElection[4]);
      console.log(await getCandidates(0, 0));
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    renderCandidates();
    return () => clearTimeout(timeoutId);
  }, []);

  const renderedCandidates = candidates.map((candidate, index) => (
    <CandidateCard
      candidate={candidate}
      candidateId={index}
      electionId={electionId}
      key={index}
    />
  ));

  return (
    <div className='flex justify-center items-center'>
      {loading ? (
        <Loader />
      ) : (
        <div>
            <div>{election[0]}</div>
          <div>{renderedCandidates}</div>
        </div>
      )}
    </div>
  );
}
