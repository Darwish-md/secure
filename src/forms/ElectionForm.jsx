import React, { useState } from "react";
import { createElection } from "../service/electionContractUtils";
import { useNavigate } from "react-router-dom";

export default function ElectionForm() {
    const navigate = useNavigate();
  const [candidates, setCandidates] = useState([""]);

  const addCandidate = () => {
    setCandidates([...candidates, ""]);
  };

  const handleTextboxChange = (index, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = value;
    setCandidates(updatedCandidates);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const electionData = {
        electionName: elements.electionName.value,
        creatorName: elements.creatorName.value,
        endDate: elements.endDate.value,
        candidates: candidates
    }
    const electionId = await createElection(electionData);
    if (electionId) navigate(`/elections/vote/${electionId}`);
  };

  return (
    <div className='w-fit m-auto mt-7 p-auto'>
      <form
        onSubmit={handleSubmit}
        className='bg-transparent shadow-md rounded-xl px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-4'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='election'
          >
            Election
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='electionName'
            type='text'
            placeholder='Election name'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='owner'
          >
            Owner
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='creatorName'
            type='text'
            placeholder='Owner name'
          />
        </div>
        <div class='mb-4'>
          <label
            class='block text-sm font-bold mb-2'
            for='endDate'
          >
            End Date
          </label>
          <input
            class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='endDate'
            type='date'
            placeholder='End Date'
          />
        </div>
        <div>
          <div className='flex flex-col mb-4'>
            {candidates.map((candidate, index) => (
              <div key={index}>
                <label
                  className='block text-sm font-bold mb-2'
                  htmlFor=''
                >
                  {`Candidate ${index + 1}`}
                </label>
                <input
                  type='text'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  key={index}
                  placeholder={`Candidate ${index + 1}`}
                  value={candidate}
                  onChange={(event) =>
                    handleTextboxChange(index, event.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <div>
            <button type='button' onClick={addCandidate}>
              Add Textbox
            </button>
          </div>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <p className='text-center text-gray-500 text-xs'>
        &copy;2023 Secure Corp. All rights reserved.
      </p>
    </div>
  );
}
