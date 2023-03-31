import { ethers } from "ethers";
import Elections from "../artifacts/contracts/Elections.sol/Elections.json";

const ELECTIONS_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
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

function convertToDate(unixStamp) {
  const date = new Date(unixStamp * 1000);
  return date.toDateString();
}

function convertToUnixStamp(date) {
  return Date.parse(date) / 1000;
}
//////////////////////

async function getElections() {
  const contract = await getContract();
  try {
  const electionsCount = await contract.electionCount();
  const elections = [];
  for (let i=0; i < electionsCount; i++){
    let election = await getElectionById(i);
    election ={
      name: election[1],
      description: election[2],
      startDate: convertToDate(election[3]),
      endDate: convertToDate(election[4]),
      creator: election[6]
    }
    elections.push(election);
  }
  return elections;
}catch (e) {
    console.log("Err: ", e);
  }
}

async function getCandidates(electionId) {
  const contract = await getContract();
  try {
    const votes = await contract.getCandidates(electionId);
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

async function getElectionById(electionId) {
  const contract = await getContract();
  try {
    const data = await contract.getElectionById(parseInt(electionId));
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
      electionData.description,
      convertToUnixStamp(electionData.endDate),
      electionData.creatorName,
      electionData.candidates
    );
    const transactionResult = await transaction.wait();
    const electionId = transactionResult.events[2].args[0];
    console.log("candidates returned by function:",await getElectionById(electionId))
    console.log('election number:',await contract.electionCount())
    return electionId;
  } catch (err) {
    console.log(err);
  }
}

export { createElection, getElections, getElectionById, castVote, getCandidates};
