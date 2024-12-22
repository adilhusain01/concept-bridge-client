// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EDUToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Education Token", "EDU") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10**18);
    }

    function distributeReward(address to) external {
        require(msg.sender == owner(), "Only owner can distribute rewards");
        _transfer(address(this), to, 1); // 1 wei (smallest unit of EDU token)
    }
}