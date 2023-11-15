// Importing required components and libraries
import React, { useState } from 'react';

// StakeholderRegistration component
const StakeholderRegistration = ({ provider, dapp }) => {
  // State variables for stakeholder details
  const [stakeholders, setStakeholders] = useState([]);
  const [hexcode, setHexcode] = useState('');
  const [integerValue, setIntegerValue] = useState('');
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  // Function to handle hexcode change
  const handleHexcodeChange = (e) => {
    setHexcode(e.target.value);
  };

  // Function to handle integer value change
  const handleIntegerValueChange = (e) => {
    setIntegerValue(e.target.value);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsWhitelisted(e.target.checked);
  };

  // Function to handle stakeholder registration
  const handleAddStakeholder = async () => {
    // If all stakeholder details are provided
    if (hexcode && integerValue) {
      // If dapp exists
      if (dapp) {
        // Get signer from provider
        const signer = await provider.getSigner();
        // Register stakeholder
        let transaction = await dapp.connect(signer).addStakeholder(hexcode, integerValue);
        // Wait for transaction to be mined
        await transaction.wait();
        // Add stakeholder to stakeholders array
        setStakeholders([...stakeholders, { hexcode, integerValue, isWhitelisted }]);
        // Reset form fields
        setHexcode('');
        setIntegerValue('');
        setIsWhitelisted(false);
      }
    }
  };

  // Return JSX
  return (
    <div>
      <h2 className="mt-10 mb-10">Stakeholder Registration</h2>
      <div>
        <label className="ml-10 mr-10 mt-5 mb-5">Address (ETH Wallet Address): </label>
        <input className="border border-gray-300 rounded p-1 mt-5 mb-5" type="text" value={hexcode} onChange={handleHexcodeChange} />
      </div>
      <div>
        <label className="ml-10 mr-10 mt-5 mb-5">Vesting Period:</label>
        <input className="border border-gray-300 rounded p-1 ml-28 mt-5 mb-5" type="number" min="0" value={integerValue} onChange={handleIntegerValueChange} />
      </div>
      <div>
        <label className="ml-10 mr-10 mt-5 mb-5">Whitelist:</label>
        <input className="border border-gray-300 rounded p-1 ml-80 mt-5 mb-5" type="checkbox" checked={isWhitelisted} onChange={handleCheckboxChange} />
      </div>
      <button onClick={handleAddStakeholder} className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 m-10 rounded">Add Stakeholder</button>
      <div className="ml-10 mr-10 mt-5 mb-5">
        <h3 >Stakeholders:</h3>
        <ul>
          {stakeholders.map((stakeholder, index) => (
            <li className="ml-10 mr-10 mt-5 mb-5" key={index}>
              Address: {stakeholder.hexcode}, Time Period: {stakeholder.integerValue}, Whitelisted: {stakeholder.isWhitelisted ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export StakeholderRegistration component
export default StakeholderRegistration;
