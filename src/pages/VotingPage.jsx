import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getElectionById, castVote,   getCandidateVotes} from '../service/electionContractUtils';

export default function VotingPage() {
    const { id: electionId } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [election, setElection] = useState({});

    useEffect(() => {
        async function render(){
            const renderedElection = await getElectionById(electionId);
            console.log(renderedElection)
            setCandidates(renderedElection[4])
            setElection(renderedElection)
           console.log( await getCandidateVotes(0, 0))
        }
        render();
    }, []) // add empty dependency array to useEffect to prevent infinite loop
   
    function submitVote(index) {
        console.log(`Clicked candidate with index ${index}`);
        castVote(electionId, index);

    }
    return (
        <div>
            <div>Election {election[0]}</div>
            <div>
                {candidates.map((candidate, index) => {
                    return (
                        <button className="m-auto" key={index} onClick={() => submitVote(index)}>
                            {candidate}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}