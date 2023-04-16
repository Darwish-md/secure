import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getElectionById, getCandidates } from "../service/electionContractUtils";
import Loader from "../components/shared/Loader";
import CandidateCard from "../components/shared/CandidateCard";

export default function Vote() {
  const { id: electionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [candidatesCards, setCandidatesCards] = useState([]);

  useEffect(() => {
    async function render() {
      const renderedElection = await getElectionById(electionId);
      setElection(renderedElection);
      const electionCandidates = await getCandidates(renderedElection.id);
      setCandidates(electionCandidates);
      const renderedCards = electionCandidates.map((candidate, index) => (
        <CandidateCard
          candidate={candidate}
          electionId={electionId}
          key={index}
        />
      ));
      setCandidatesCards(renderedCards);
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);
    render();
    return () => clearTimeout(timeoutId);
  }, [electionId]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-4xl px-4 py-8 animate-fade-in rounded-lg shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold text-gray-300 mb-6">{election.name}</h2>
          <p className="text-l font-semibold text-gray-400 mb-6">{election.description}</p>
          <div className="gap-20 flex justify-center items-center">
  {candidatesCards}
</div>

          <div className="mt-8">
            <Link
              className="py-3 px-6 rounded-full text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              to={`/elections/dashboard/${electionId}`}
            >
              View Results
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
