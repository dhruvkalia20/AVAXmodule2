import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (account) => {
    if (account && account.length > 0) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    setLoading(true);
    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);
      getATMContract();
    } catch (error) {
      console.error("Error connecting account:", error);
    } finally {
      setLoading(false);
    }
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      setLoading(true);
      try {
        const tx = await atm.deposit(1);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      setLoading(true);
      try {
        const tx = await atm.withdraw(1);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderUserInterface = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    if (!account) {
      return (
        <div>
          <p>MetaMask wallet need to be connected first:</p>
          <button onClick={connectAccount} disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Add Wallet
          </button>
        </div>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Account you are connected with : {account}</p>
        <p>Balance of your account: {balance} ETH</p>
        <button onClick={deposit} disabled={loading} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
          INCREMENT 1 ETH
        </button>
        <button onClick={withdraw} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
          EXTRACT 1 ETH
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container mx-auto mt-5">
      <header>
        <h1 className="text-4xl font-bold text-center">Hello! Welcome To Your Wallet.</h1>
      </header>
      <div className="mt-4">
        {renderUserInterface()}
      </div>
    </main>
  );
}
