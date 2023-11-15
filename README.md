# SolidityAdvanceCourse
## DApp Assessment

This Solidity program is a simple program that can be used by a user to register his organization, create tokens, register stakeholders and whitelist them.
Whitelisted Stakeholders can claim tokens after their vesting period is over.



## Description

This program contains functions that are used by a user (ceo) to register his organization, register tokens of organization, register stakeholders and whitelist them so that they are able to claim tokens after their vesting period has been completed.



## Getting Started

### Installing
Hardhat and react, along with Tailwind css, are used in this project.
In order to deploy, .env file needs to have your API's URL ( Infura was chosen here, another alternative is alchemy), your private key of an account ( as it consumes sepolia ETH to deploy). And the last is the contract address of the deployed contract.
Install required dependancies.
Use hardhat commands for solidity contracts and npm/yarn commands for react.

### Executing program

You can use various code editors to run this program. VS Code was used here.

Go inside 'vesting' folder after deploying the contract to alchemy or infura.
Use ```npm run start``` to start a local server of react.

On starting server, a Connect Button is shown. You can connect using a Wallet. Metamask was used in this case.
Then you can perform the required operation, a pop-up will show up to confirm the transaction as it consumes SEPOLIA ETH so make sure to have some in you wallet account. After confirming transaction and waiting for it to complete, the result will be shown.


## Authors
Shiv  
