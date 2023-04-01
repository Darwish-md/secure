import React from 'react'
import { castVote } from '../../service/electionContractUtils';

export default function CandidateCard({ candidate, electionId }) {
  function getRandomAvatar() {
    const randomString = Math.random().toString(36).substring(7); // generates a random string
    const avatarUrl = `https://robohash.org/${randomString}.png?size=100x100`; // builds the avatar URL with custom width and height
    return avatarUrl;
  }
  
  async function submitVote(candidateId, electionId) {
    console.log(`Clicked candidate with index ${candidateId} and election ${electionId}`);
    await castVote(electionId, candidateId);
}

  return (
    <div className='block w-full max-w-lg mx-auto mb-4 ml-4 mr-4 border border-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
      <div>{candidate.name}</div>
      <button className="m-auto" onClick={() => submitVote(candidate.id, electionId)}>
                            Vote
                        </button>
                        <img src={getRandomAvatar()} alt={`Avatar for ${candidate}`} />
    </div>
  )
}

