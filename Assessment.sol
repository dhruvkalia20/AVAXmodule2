// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract Assessment {
    address  public holder;
    uint256 public balance;

    constructor(uint256 currentbalance) payable {
        holder = msg.sender;
        balance = currentbalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    modifier onlyOwner() {
        require(msg.sender == holder, "You are not the owner of this account");
        _;
    }

    function deposit(uint256 _amount) public payable onlyOwner {
        balance += _amount;
    }

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
    }
}