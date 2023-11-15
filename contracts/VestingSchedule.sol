// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Importing modules
import "./VestedToken.sol";
import "hardhat/console.sol";

// Solidity contract for vesting schedule
contract VestingSchedule {
   // Organization structure
   struct Organization {
       address ceo;
       string nameOrg;
   }
   
   // Public variables
   address public owner;
   VestedToken public vestedToken;
   Organization public org;
   mapping(address => bool) public isWhitelisted;
   mapping(address => uint256) public stakeholders;

   // Modifiers
   modifier checkWhitelisted() {
       require(isWhitelisted[msg.sender], "Not authorized to claim tokens");
       _;
   }

   modifier vestingPeriodCompleted() {
       require(block.timestamp >= stakeholders[msg.sender], "Vesting period not over yet");
       _;
   }

   modifier onlyCEO() {
       require(msg.sender == org.ceo, " Not authorized to whitelist");
       _;
   }

   // Functions

   //register organization doone by ceo
   function registerOrganization(string memory _nameOrg) public {
       org = Organization(msg.sender, _nameOrg);
       console.log("Organization ", org.nameOrg, " Registered");
   }
    //ceo will register tokens
   function registerToken(string memory _name, string memory _symbol, uint256 _initialSupply) public {
       vestedToken = new VestedToken(_name, _symbol, _initialSupply);
       console.log("Token ", _symbol, " Registered");
   }
    //ceo will add stakeholders
   function addStakeholder(address _address, uint256 _vestingPeriod) public {
       stakeholders[_address] = _vestingPeriod + block.timestamp;
       console.log("Stakeholder ", _address, " Registered");
   }
    //ceo will whitelist the desired stakeholders who will be able to claim tokens once vesting period is over
   function whitelist(address _address) public onlyCEO {
       isWhitelisted[_address] = true;
       console.log("Stakeholder ", _address, " Whitelisted");
   }
    //stakeholders will be able to claim tokens
   function claimTokens(uint256 _amt) public vestingPeriodCompleted {
       vestedToken.claimTokens(msg.sender, _amt);
       console.log(_amt, " Tokens Claimed");
   }
}
