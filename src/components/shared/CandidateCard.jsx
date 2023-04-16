import React from 'react';
import { useNavigate } from "react-router-dom";
import { castVote } from '../../service/electionContractUtils';

const CandidateCard = ({ candidate, electionId }) => {
  const navigate = useNavigate();
  const getRandomAvatar = () => {
    const randomString = Math.random().toString(36).substring(7);
    return `https://robohash.org/${randomString}.png?size=100x100`;
  };

  const handleVoteClick = async () => {
    console.log(`Clicked candidate with index ${candidate.id} and election ${electionId}`);
    const voteCasted = await castVote(electionId, candidate.id);
    if (voteCasted) navigate(`/elections/dashboard/${electionId}`)
  };
  
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md w-60 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <div className="px-4 py-2 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-200">{candidate.name}</h3>
        <button onClick={handleVoteClick} className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Vote</button>
      </div>
      <img className="w-full h-48 object-cover" src={getRandomAvatar()} alt={`Avatar for ${candidate.name}`} />
    </div>
  );
};

export default CandidateCard;
