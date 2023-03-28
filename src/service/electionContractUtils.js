import { ethers } from "ethers";
import Elections from "../artifacts/contracts/Elections.sol/Elections.json";

const ELECTIONS_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

async function getElectionsList() {
  const elections = await getElections();
  const electionsList = [];

  for (let i = 0; i < elections[0].length; i++) {
    electionsList.push({
      electionName: elections[0][i],
      startDate: convertToDate(elections[1][i]),
      endDate: convertToDate(elections[2][i]),
      isValid: elections[3][i],
    });
  }

  return electionsList;
}

async function getElections() {
  const contract = await getContract();
  try {
    const data = await contract.getElections();
    return data;
  } catch (e) {
    console.log("Err: ", e);
  }
}

function convertToDate(unixStamp) {
  const date = new Date(unixStamp * 1000);
  return date.toDateString();
}

function convertToUnixStamp(date) {
  return Date.parse(date) / 1000;
}

async function getContract() {
  if (typeof window.ethereum !== "undefined") {
    //ethereum is usable, get reference to the contract
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //signer needed for transaction that changes state
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      ELECTIONS_ADDRESS,
      Elections.abi,
      signer
    );
    return contract;
  }
}

async function getCandidateVotes(electionId, candidateId) {
  const contract = await getContract();
  try {
    const votes = await contract.getCandidateVotes(electionId, candidateId);
    return votes;
  } catch (e) {
    console.log("Err: ", e);
  }
}

async function castVote(electionId, candidateId){
  const contract = await getContract();
  try {
    const transaction = await contract.castVote(electionId, candidateId);
    const transactionResult = await transaction.wait();
    console.log(transactionResult);
    // const electionId = transactionResult.events[0];
    //return data;
  } catch (e) {
    console.log("Err: ", e);
  }
}

async function addCandidates(electionId, candidates, contract) {
  for (let index = 0; index < candidates.length; index++) {
    console.log("index:", index, electionId)
    const transaction = await contract.addCandidate(
      electionId,
      index,
      candidates[index]
    );
    const result = await transaction.wait();
    console.log(result);
  }
}

async function getElectionById(electionId) {
  const contract = await getContract();
  try {
    const data = await contract.getElectionData(parseInt(electionId));
    return data;
  } catch (e) {
    console.log("Err: ", e);
  }
}

async function createElection(electionData) {
  const contract = await getContract();
  //preform transaction
  try {
    const transaction = await contract.createElection(
      electionData.electionName,
      electionData.creatorName,
      convertToUnixStamp(electionData.endDate)
    );
    const transactionResult = await transaction.wait();
    console.log(transactionResult);
    const electionId = transactionResult.events[0].args[0].toNumber();
    console.log("electionId:", transactionResult.events[0].args[0].toNumber())
    await addCandidates(electionId, electionData.candidates, contract);

    console.log(await getElectionById(electionId));
    return electionId;
  } catch (err) {
    console.log(err);
  }
}

export { createElection, getElectionsList, getElectionById, castVote, getCandidateVotes};
