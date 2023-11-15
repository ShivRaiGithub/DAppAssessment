// Importing required components and libraries
import React, { useState } from 'react';

// RegisterToken component
const RegisterToken = ({ provider, dapp }) => {
  // State variables for token details
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  // State variable for registration status
  const [isRegistered, setIsRegistered] = useState(false);

  // Function to handle token name change
  const handleTokenNameChange = (e) => {
    setTokenName(e.target.value);
  };

  // Function to handle token symbol change
  const handleTokenSymbolChange = (e) => {
    setTokenSymbol(e.target.value);
  };

  // Function to handle initial supply change
  const handleInitialSupplyChange = (e) => {
    setInitialSupply(e.target.value);
  };

  // Function to handle token registration
  const handleRegisterToken = async () => {
    // If all token details are provided
    if (tokenName && tokenSymbol && initialSupply) {
      // If dapp exists
      if (dapp) {
        // Get signer from provider
        const signer = await provider.getSigner();
        // Register token
        let transaction = await dapp.connect(signer).registerToken(tokenName, tokenSymbol, initialSupply);
        // Wait for transaction to be mined
        await transaction.wait();
        // Set registration status to true
        setIsRegistered(true);
      }
    }
  };

  // Return JSX
  return (
    <div>
      <h2 className="mt-10 mb-10">Token Registration</h2>
      {!isRegistered ? (
        <div>
          <div>
            <label className="ml-10 mr-10 mt-5 mb-5">Name: </label>
            <input className="border border-gray-300 rounded p-1 ml-10 mt-5 mb-5" type="text" value={tokenName} onChange={handleTokenNameChange} />
          </div>
          <div>
            <label className="ml-10 mr-10 mt-5 mb-5">Symbol:</label>
            <input className="border border-gray-300 rounded p-1 ml-9 mt-5 mb-5" type="text" value={tokenSymbol} onChange={handleTokenSymbolChange} />
          </div>
          <div>
            <label className="ml-10 mr-10 mt-5 mb-5">Initial Supply:</label>
            <input className="border border-gray-300 rounded p-1 mt-5 mb-5" type="number" min="0" value={initialSupply} onChange={handleInitialSupplyChange} />
          </div>
          <button onClick={handleRegisterToken} className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 m-10 rounded">Register Token</button>
        </div>
      ) : (
        <p className="ml-2 mr-2 mt-2 mb-2">Token "{tokenName}" is registered successfully!</p>
      )}
    </div>
  );
};

// Export RegisterToken component
export default RegisterToken;
