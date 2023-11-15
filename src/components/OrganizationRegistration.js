// Importing required components and libraries
import React, { useState } from 'react';

// OrganizationRegistration component
function OrganizationRegistration({ provider, dapp }) {
  // State variable for organization name
  const [organizationName, setOrganizationName] = useState('');
  // State variable for registration status
  const [isRegistered, setIsRegistered] = useState(false);

  // Function to handle input change
  const handleInputChange = (e) => {
    setOrganizationName(e.target.value);
  };

  // Function to handle registration
  const handleRegistration = async () => {
    // If dapp exists
    if (dapp) {
      // Get signer from provider
      const signer = await provider.getSigner();
      // Register organization
      let transaction = await dapp.connect(signer).registerOrganization(organizationName);
      // Wait for transaction to be mined
      await transaction.wait();
      // Set registration status to true
      setIsRegistered(true);
    }
  };

  // Return JSX
  return (
    <div>
      <h2 className="mt-10">Organization Registration</h2>
      {!isRegistered ? (
        <div>
          <label className="ml-10 mr-10 mt-5 mb-5">Organization Name:</label>
          <input className="border border-gray-300 rounded p-2"
            type="text"
            value={organizationName}
            onChange={handleInputChange}
            placeholder="Enter organization name"
          />
          <button onClick={handleRegistration} className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 m-10 rounded">Register</button>
        </div>
      ) : (
        <p className="ml-2 mr-2 mt-2 mb-2">Organization "{organizationName}" is registered successfully!</p>
      )}
    </div>
  );
}

// Export OrganizationRegistration component
export default OrganizationRegistration;
