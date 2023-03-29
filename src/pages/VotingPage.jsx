import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getElectionById,  getCandidateVotes} from '../service/electionContractUtils';
import Loader from "../components/shared/Loader";
import CandidateCard from '../components/shared/CandidateCard';

export default function VotingPage() {
    const { id: electionId } = useParams();
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        async function renderCandidates(){
            const renderedElection = await getElectionById(electionId);
            setCandidates(renderedElection[4])
           console.log( await getCandidateVotes(0, 0))
        }
        const timeoutId = setTimeout(() => {
            setLoading(false);
          }, 1000);
        renderCandidates();
        return () => clearTimeout(timeoutId);
    }, []) // add empty dependency array to useEffect to prevent infinite loop
   

    const renderedCandidates = candidates.map((candidate, index) => <CandidateCard candidate={candidate} candidateId={index} electionId={electionId}/>)

    return (
        <div className='flex justify-center items-center'>
            {loading? (<Loader />):
            (
            <div>
            <div>{renderedCandidates}</div>
            </div>) }
            
        </div>
    )
}