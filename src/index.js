// Importing required components and libraries
import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import ConnectButton from './components/ConnectButton';
import App from './App';

// Getting root from index.html
const root = createRoot(document.getElementById('root'));

let provider;

// Rendering the required code to root
root.render(
  <React.StrictMode>
    <ConnectButton setProvider={(newProvider) => {
      // Setting the provider and re-rendering the App component with the new provider
      provider = newProvider;
      root.render(
        <React.StrictMode>
          <App provider={provider} />
        </React.StrictMode>
      );
    }} />
  </React.StrictMode>
);
