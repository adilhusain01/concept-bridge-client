import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "./WalletContext";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/contractHelpers";

const ContractContext = createContext();

const EDU_TOKEN_ABI = CONTRACT_ABI;

const EDU_TOKEN_ADDRESS = CONTRACT_ADDRESS;

export const ContractProvider = ({ children }) => {
  const { signer, account } = useWallet();
  const [eduContract, setEduContract] = useState(null);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (signer && EDU_TOKEN_ADDRESS) {
      const contract = new ethers.Contract(
        EDU_TOKEN_ADDRESS,
        EDU_TOKEN_ABI,
        signer
      );
      setEduContract(contract);
    }
  }, [signer]);

  useEffect(() => {
    const updateBalance = async () => {
      if (eduContract && account) {
        try {
          const balance = await eduContract.balanceOf(account);
          setBalance(ethers.utils.formatEther(balance));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    updateBalance();
    // Set up event listener for transfers
    if (eduContract) {
      eduContract.on("Transfer", (from, to, value) => {
        if (to.toLowerCase() === account?.toLowerCase()) {
          updateBalance();
        }
      });
    }

    return () => {
      if (eduContract) {
        eduContract.removeAllListeners("Transfer");
      }
    };
  }, [eduContract, account]);

  const claimReward = async () => {
    if (!eduContract || !account)
      throw new Error("Contract or account not initialized");

    try {
      const tx = await eduContract.distributeReward(account);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ContractContext.Provider value={{ eduContract, balance, claimReward }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => useContext(ContractContext);
