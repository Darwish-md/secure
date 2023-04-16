import React from 'react';
import BarChart from '../components/visualizations/BarChart';
import PieChart from '../components/visualizations/PieChart';
import { getCandidates, getElectionById } from '../service/electionContractUtils';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const { id: electionId } = useParams();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function render() {
      const renderedElection = await getElectionById(electionId);
      const electionCandidates = await getCandidates(renderedElection.id);
      const candidatesArray = electionCandidates.map((candidate) => ({
        id: candidate.id,
        name: candidate.name,
        votes: candidate.votes
      }));
      setCandidates(candidatesArray);
    }
    render();
  }, [electionId]);
  
  return (
    <div className="text-center">
      <div className="text-4xl">Election Dashboard</div>
      <div>
        <div className="flex flex-row justify-around">
          <BarChart candidates={candidates} />
          <PieChart candidates={candidates} />
        </div>
      </div>
    </div>
  );
}
