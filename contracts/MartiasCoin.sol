// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MartiasCoin is ERC20, Ownable {
    uint256 public burnRate = 2; // 2% burn on transfers
    uint256 public treasuryRate = 3; // 3% to treasury
    address public treasuryWallet;

    constructor(address _treasury) ERC20("MartiasCoin", "MTC") {
        mint(msg.sender, 1000000000 * 10**decimals()); // 1B MTC supply
        treasuryWallet = _treasury;
    }

    function setBurnRate(uint256 _burnRate) external onlyOwner {
        require(_burnRate <= 5, "Burn rate too high");
        burnRate = _burnRate;
    }

    function setTreasuryRate(uint256 _treasuryRate) external onlyOwner {
        require(_treasuryRate <= 5, "Treasury rate too high");
        treasuryRate = _treasuryRate;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal override {
        uint256 burnAmount = (amount * burnRate) / 100;
        uint256 treasuryAmount = (amount * treasuryRate) / 100;
        uint256 transferAmount = amount - burnAmount - treasuryAmount;

        super._transfer(sender, recipient, transferAmount);
        if (burnAmount > 0) {
            burn(sender, burnAmount);
        }
        if (treasuryAmount > 0) {
            super._transfer(sender, treasuryWallet, treasuryAmount);
        }
    }
}
