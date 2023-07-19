# Connecting our solidity program with frontend:
Under this we project we are connecting our solidity program with the frontend using react.js and Using hardhat local network we are deploying our contract on the given local host and performing the deposit and withdrawal operations using metamask wallet.

# Description:
I will explain my Solidity code that focuses on incrementing and depositing Ethereum tokens. I will also demonstrate how to connect the code with the front end. The code utilizes SPDX License Identifier and pragma Solidity to ensure compatibility with version 0.8.9 or above. I have created a contract assessment with a balance variable, an address variable, and a constructor. The code includes three functions: get balance, deposit, and withdrawal. The get balance function allows viewing the current account balance, while the deposit function increments the balance when certain conditions are met. The withdrawal function deducts a specified amount from the balance if sufficient funds are available. I will also show how to connect the front end with the Solidity code using npm and npx hardhat

# Starter Next/Hardhat Project connecting with frontend:
After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
# Contract execution:
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract Assessment {
    uint256 public balance;
    address  public holder;

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
While interacting with the frontend we see the increment and extraction of ETH takes place, it will execute according to our programmed contract as above ,I have explained in description.

# Authors
Metacrafter Chris
@metacraftersio

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.

