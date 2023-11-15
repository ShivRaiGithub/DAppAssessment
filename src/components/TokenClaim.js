// Importing required components and libraries
import React, { useState } from 'react';

// TokenClaim component
const TokenClaim = ({ provider, dapp }) => {
  // State variables for withdrawal amount and claimed tokens
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [claimedTokens, setClaimedTokens] = useState(0);

  // Function to handle withdrawal amount change
  const handleWithdrawAmountChange = (e) => {
    setWithdrawAmount(e.target.value);
  };

  // Function to handle token claiming
  const handleClaimTokens = async () => {
    // Parse withdrawal amount to integer
    const tokensToClaim = parseInt(withdrawAmount);
    // Update claimed tokens
    setClaimedTokens((prevClaimedTokens) => prevClaimedTokens + tokensToClaim);

    // If dapp exists
    if (dapp) {
      // Get signer from provider
      const signer = await provider.getSigner();
      // Claim tokens
      let transaction = await dapp.connect(signer).claimTokens(tokensToClaim);
      // Wait for transaction to be mined
      await transaction.wait();
      // Reset withdrawal amount
      setWithdrawAmount('');
    }
  };

  // Return JSX
  return (
    <div>
      <h2 className="mt-20 mb-10">Token Claim</h2>
      <div>
        <label className="ml-10 mr-10 mt-5 mb-5">Amount of Tokens to Withdraw:</label>
        <input value={withdrawAmount} onChange={handleWithdrawAmountChange} className="border border-gray-300 rounded p-1 ml-28 mt-5 mb-5" type="number" min="0" />
        <button onClick={handleClaimTokens} className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 m-10 rounded">Claim Tokens</button>
      </div>
      {claimedTokens > 0 && <p>Successfully claimed {claimedTokens} tokens!</p>}
    </div>
  );
};

// Export TokenClaim component
export default TokenClaim;
