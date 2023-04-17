import React, { useState } from "react";
import { createElection } from "../service/electionContractUtils";
import { useNavigate } from "react-router-dom";

export default function ElectionForm() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([""]);
  const [errors, setErrors] = useState({
    electionName: "",
    creatorName: "",
    endDate: "",
    candidates: [],
  });

  const addCandidate = () => {
    setCandidates([...candidates, ""]);
    setErrors({ ...errors, candidates: [...errors.candidates, ""] });
  };

  const handleTextboxChange = (index, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = value;
    setCandidates(updatedCandidates);

    const updatedErrors = { ...errors };
    updatedErrors.candidates[index] = value.trim() ? "" : "Candidate name is required.";
    setErrors(updatedErrors);
  };

  const validateForm = (electionData) => {
    let isValid = true;
    const newErrors = {
      electionName: "",
      creatorName: "",
      endDate: "",
      candidates: [],
    };
  
    const today = new Date();
    const inputDate = new Date(electionData.endDate);
  
    if (!electionData.electionName.trim() || electionData.electionName.length < 3) {
      newErrors.electionName = "Election name must be at least 3 characters long.";
      isValid = false;
    }
  
    if (!electionData.creatorName.trim() || electionData.creatorName.length < 3) {
      newErrors.creatorName = "Owner name must be at least 3 characters long.";
      isValid = false;
    }
  
    if (!electionData.endDate || inputDate <= today) {
      newErrors.endDate = "End date must be in the future.";
      isValid = false;
    }
  
    if (!electionData.description || electionData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long.";
      isValid = false;
    }
  
    electionData.candidates.forEach((candidate, index) => {
      if (!candidate.trim() || candidate.trim().length < 3) {
        newErrors.candidates[index] = "Candidate name must be at least 3 characters long.";
        isValid = false;
      }
    });
  
    if (electionData.candidates.length < 2) {
      newErrors.candidatesError = "There must be at least 2 candidates.";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const electionData = {
      electionName: elements.electionName.value,
      description: elements.description.value,
      endDate: elements.endDate.value,
      creatorName: elements.creatorName.value,
      candidates: candidates,
    };

    if (!validateForm(electionData)) {
      return;
    }

    const electionId = await createElection(electionData);
    if (electionId) navigate(`/elections/vote/${electionId}`);
  };

  return (
<div className="w-fit m-auto mt-7 p-auto bg-white w-2/6  border rounded-lg">
  <form
    onSubmit={handleSubmit}
    className="shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 animate-fade-in"
  >
    <div className="mb-4">
      <label
        className="block text-gray-600 text-sm font-bold mb-2"
        htmlFor="election"
      >
        Election
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="electionName"
        type="text"
        placeholder="Election name"
      />
        {errors.electionName && (
          <p className="text-red-500 text-xs italic">{errors.electionName}</p>
        )}
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-600 text-sm font-bold mb-2"
        htmlFor="owner"
      >
        Owner
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="creatorName"
        type="text"
        placeholder="Owner name"
      />
        {errors.creatorName && (
          <p className="text-red-500 text-xs italic">{errors.creatorName}</p>
        )}
    </div>
    <div className="mb-4">
      <label
        className="block  text-gray-600 text-sm font-bold mb-2"
        htmlFor="endDate"
      >
        End Date
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="endDate"
        type="date"
        placeholder="End Date"
      />
        {errors.endDate && (
          <p className="text-red-500 text-xs italic">{errors.endDate}</p>
        )}
    </div>
    <div>
      <label htmlFor="message" className="block text-gray-600 text-sm font-semibold leading-6">
        Description
      </label>
      <textarea
        name="description"
        rows={4}
        className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={''}
      />
        {errors.description && (
          <p className="text-red-500 text-xs italic">{errors.description}</p>
        )}
    </div>
    <div>
      <div className="flex flex-col mb-4">
        {candidates.map((candidate, index) => (
          <div key={index}>
            <label
              className="block text-gray-600 text-sm font-bold mb-2"
              htmlFor=""
            >
              {`Candidate ${index + 1}`}
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              key={index}
              placeholder={`Candidate ${index + 1}`}
              value={candidate}
              onChange={(event) =>
                handleTextboxChange(index, event.target.value)
              }
            />
             {errors.candidates[index] && (
                <p className="text-red-500 text-xs italic">
                  {errors.candidates[index]}
                </p>
              )}
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={addCandidate}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Candidate
        </button>
      </div>
    </div>
    <div>
    <button
          type="submit"
          className="bg-green text-white px-4 py-2 rounded mt-4 hover:bg-lightGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Submit
        </button>
      </div>
      <p className="text-center text-gray-500 text-xs p-3">
      &copy;2023 Secure Corp. All rights reserved.
    </p>
    </form>

  </div>
  );
}
