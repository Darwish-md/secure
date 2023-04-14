import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConnectButton() {
  const [connected, setConnected] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkConnection = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    };

    if (window.ethereum) {
      checkConnection();

      // Setup event listeners for MetaMask
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        checkConnection();
      });

      return () => {
        window.ethereum.removeListener("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.removeListener("accountsChanged", () => {
          checkConnection();
        });
      };
    }
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
<>
  {connected ? (
    <button
      className="hidden md:block pl-7 pr-7 p-3 rounded-full text-xl bg-green hover:bg-lightGreen text-white"
      onClick={() => navigate("/profile")}
    >
      My Profile
    </button>
  ) : (
    <button
      className="hidden md:block pl-7 pr-7 p-3 rounded-full text-xl bg-lightGreen hover:bg-green text-white"
      onClick={connectToMetaMask}
    >
      Connect
    </button>
  )}
</>


  );
}
