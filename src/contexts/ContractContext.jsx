import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "./WalletContext";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/contractHelpers";

const ContractContext = createContext();

const ANCIENT8_TOKEN_ABI = CONTRACT_ABI;

const ANCIENT8_TOKEN_ADDRESS = CONTRACT_ADDRESS;

export const ContractProvider = ({ children }) => {
  const { signer, account } = useWallet();
  const [ancient8Contract, setAncient8Contract] = useState(null);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (signer && ANCIENT8_TOKEN_ADDRESS) {
      const contract = new ethers.Contract(
        ANCIENT8_TOKEN_ADDRESS,
        ANCIENT8_TOKEN_ABI,
        signer
      );
      setAncient8Contract(contract);
    }
  }, [signer]);

  useEffect(() => {
    const updateBalance = async () => {
      if (ancient8Contract && account) {
        try {
          const balance = await ancient8Contract.balanceOf(account);
          setBalance(ethers.utils.formatEther(balance));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    updateBalance();
    // Set up event listener for transfers
    if (ancient8Contract) {
      ancient8Contract.on("Transfer", (from, to, value) => {
        if (to.toLowerCase() === account?.toLowerCase()) {
          updateBalance();
        }
      });
    }

    return () => {
      if (ancient8Contract) {
        ancient8Contract.removeAllListeners("Transfer");
      }
    };
  }, [ancient8Contract, account]);

  const claimReward = async () => {
    if (!ancient8Contract || !account)
      throw new Error("Contract or account not initialized");

    try {
      const tx = await ancient8Contract.distributeReward(account);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ContractContext.Provider
      value={{ ancient8Contract, balance, claimReward }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => useContext(ContractContext);
