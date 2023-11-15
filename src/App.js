// Importing required components and libraries
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import StakeholderRegistration from './components/StakeholderRegistration';
import OrganizationRegistration from './components/OrganizationRegistration';
import TokenClaim from './components/TokenClaim';
import vestingabi from "./vestingabi.json";
import RegisterToken from './components/RegisterToken';
require('dotenv').config({ path: '../.env' });
// App component
function App({ provider }) {
  // State variable for contract
  const [contract, setContract] = useState(null);

  // UseEffect hook to initiate contract
  useEffect(() => {
    const initiateContract = async () => {
      // Get signer from provider
      const signer = provider.getSigner();
      // Contract address
      const contractAddress = process.env.CONTRACT_ADDRESS;
      // Create new contract instance
      const dapp = new ethers.Contract(contractAddress, vestingabi, signer);
      // Set contract state
      setContract(dapp);
    };
    // If provider exists, initiate contract
    if (provider) {
      initiateContract();
    }
  }, [provider]); // Dependency array

  // Return JSX
  return (
    <div className="App ml-10">
      <OrganizationRegistration provider={provider} dapp={contract} />
      <RegisterToken provider={provider} dapp={contract} />
      <StakeholderRegistration provider={provider} dapp={contract} />
      <TokenClaim provider={provider} dapp={contract} />
    </div>
  );
}

// Export App component
export default App;
