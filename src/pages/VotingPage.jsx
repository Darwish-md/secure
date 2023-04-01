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
  const [election, setElection] = useState({})
  const [candidates, setCandidates] = useState([]);
  const [candidatesCards, setCandidatesCards] = useState();
  
  useEffect(() => {
    async function render() {
      const renderedElection = await getElectionById(electionId);
      setElection(renderedElection);
      const electionCandidates = await getCandidates(renderedElection.id);
      setCandidates(electionCandidates);
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    render();
    return () => clearTimeout(timeoutId);
  }, [electionId]);

  useEffect(() => {
    const renderedCards = candidates.map((candidate, index) => (
      <CandidateCard
        candidate={candidate}
        electionId={electionId}
        key={index}
      />
    ));
    setCandidatesCards(renderedCards);
  }, [candidates, electionId]);

  return (
    <div className='flex justify-center items-center'>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>{election.name}</div>
          <div>{candidatesCards}</div>
        </div>
      )}
    </div>
  );
}
