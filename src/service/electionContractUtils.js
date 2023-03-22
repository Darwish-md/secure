import { ethers } from "ethers";
import Elections from "../artifacts/contracts/Elections.sol/Elections.json";

const ELECTIONS_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

async function getElectionsList () {
  const elections = await fetchElections();
  const electionsList = [];

  for (let i = 0; i < elections[0].length; i++) {
    electionsList.push({
      electionName: elections[0][i],
      startDate: convertToDate(elections[1][i]),
      endDate: convertToDate(elections[2][i]),
      isValid: elections[3][i]
    })
  }

  return electionsList;
}

async function fetchElections () {
  if (typeof window.ethereum !== "undefined") {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      ELECTIONS_ADDRESS,
      Elections.abi,
      provider
    );

    try {
      const data = await contract.getElections();
      return data;
    } catch (e) {
      console.log("Err: ", e);
    }
  }
}

function convertToDate(unixStamp) {
  const date = new Date(unixStamp * 1000);
  return date.toDateString();
}

function convertToUnixStamp(date) {
  return Date.parse(date) / 1000;
}

async function createElection(event) {
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

    const electionName = event.target.elements.electionName.value;
    const creatorName = event.target.elements.creatorName.value;
    const endDate = convertToUnixStamp(event.target.elements.endDate.value);

    //preform transaction
    const transaction = await contract.createElection(
      electionName,
      creatorName,
      endDate
    );
    await transaction.wait();
  }
}

export {createElection, getElectionsList };
