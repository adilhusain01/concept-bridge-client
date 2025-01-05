// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ancient8Token is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Ancient8 Token", "A8T") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10**decimals());
    }

    function distributeReward(address to) external onlyOwner {
        // Transfer from owner's balance instead of contract's balance
        _transfer(owner(), to, 1);
    }
}