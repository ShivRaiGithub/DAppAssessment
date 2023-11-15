// Importing required components and libraries
import React, { useState } from 'react';
import { BrowserProvider } from 'ethers/providers';

// ConnectButton component
const ConnectButton = ({ setProvider }) => {
  // State variable for wallet connection status
  const [walletConnected, setWalletConnected] = useState(false);

  // Function to handle wallet connection
  const handleConnectWallet = async () => {
    try {
      // Check if window.ethereum exists
      if (window.ethereum) {
        // Request accounts from the user's wallet
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        // If accounts are available
        if (accounts.length > 0) {
          // Create a new provider using the user's wallet
          const provider = new BrowserProvider(window.ethereum);
          // Set the provider
          setProvider(provider);
          // Set wallet connection status to true
          setWalletConnected(true);
        } else {
          console.error("No accounts selected");
        }
      } else {
        console.error("MetaMask not found");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  // Return JSX
  return (
    <div>
      {!walletConnected ? (
        <button onClick={handleConnectWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-10 rounded-full">Connect Wallet</button>
      ) : (
        <p>Connected</p>
      )}
    </div>
  );
};

// Export ConnectButton component
export default ConnectButton;
