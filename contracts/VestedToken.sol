// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
//importing modules
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//solidity contract for creating tokens
contract VestedToken is ERC20 {
    //constructor takes paramenters and mints tokens based on them using ERC20
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) ERC20(_name, _symbol) {
        _mint(address(this), _initialSupply);
    }
    //transfers the tokens to the stakeholder
    function claimTokens(address _address, uint256 _amount) external {
        require(_address != address(0), "Invalid address");
        require(_amount > 0, "Invalid token amount");
        _transfer(address(this), _address, _amount);
    }
}
