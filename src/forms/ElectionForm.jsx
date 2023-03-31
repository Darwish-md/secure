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
        description: elements.description.value,
        endDate: elements.endDate.value,
        creatorName: elements.creatorName.value,
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
        <div className='mb-4'>
          <label
            className='block text-sm font-bold mb-2'
            htmlFor='endDate'
          >
            End Date
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            name='endDate'
            type='date'
            placeholder='End Date'
          />
        </div>
        <div>
        <label htmlFor="message" className="block text-sm font-semibold leading-6">
              Description
            </label>
            <textarea
                name="description"
                rows={4}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
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
