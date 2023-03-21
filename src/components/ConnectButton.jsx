import React from "react";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ConnectButton() {
  /* To connect using MetaMask */
  const [connected, setConnected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function checkConnection() {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setConnected(true);
      }
    }
    checkConnection();
  }, [location]);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        if (window.ethereum.selectedAddress) {
          setConnected(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Please install MetaMask!");
    }
  };
  return (
    <button
      className={`hidden md:block pl-7 pr-7 p-3 rounded-full text-xl hover:bg-denimLight ${
        connected ? "bg-denimLight" : "bg-denimBlue"
      }`}
      onClick={connectToMetaMask}
      disabled={connected}
    >
      {connected ? "Connected" : "Connect"}
    </button>
  );
}
