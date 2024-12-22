import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

const EDUCHAIN_NETWORK = {
  chainId: "0xa045c",
  chainName: "EDU Chain Testnet",
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: ["https://open-campus-codex-sepolia.drpc.org"],
  blockExplorerUrls: ["https://explorer.educhain.network"],
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  useEffect(() => {
    const savedAccount = localStorage.getItem("walletAddress");
    if (savedAccount) {
      setAccount(savedAccount);
      connectWallet();
    }
    checkNetwork();
  }, []);

  const checkNetwork = async () => {
    if (!window.ethereum) return;

    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      console.log("Current Chain ID:", chainId);
      console.log("Expected Chain ID:", EDUCHAIN_NETWORK.chainId);

      const isCorrect =
        chainId.toLowerCase() === EDUCHAIN_NETWORK.chainId.toLowerCase();
      setIsCorrectNetwork(isCorrect);
      return isCorrect;
    } catch (error) {
      console.error("Error checking network:", error);
      return false;
    }
  };

  const switchNetwork = async () => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: EDUCHAIN_NETWORK.chainId }],
      });

      await checkNetwork();
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [EDUCHAIN_NETWORK],
          });

          // Check network after adding
          await checkNetwork();
        } catch (addError) {
          console.error("Error adding network:", addError);
        }
      } else {
        console.error("Error switching network:", switchError);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return null;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const networkCorrect = await checkNetwork();
      if (!networkCorrect) {
        await switchNetwork();
      }

      setSigner(signer);
      setAccount(address);
      localStorage.setItem("walletAddress", address);

      window.ethereum.on("accountsChanged", handleAccountChange);
      window.ethereum.on("chainChanged", handleChainChange);

      return signer;
    } catch (error) {
      console.error("Connection error:", error);
      return null;
    }
  };

  const handleAccountChange = async (accounts) => {
    try {
      if (accounts.length === 0) {
        setAccount("");
        setSigner(null);
        localStorage.removeItem("walletAddress");
      } else {
        setAccount(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        await connectWallet();
      }
    } catch (error) {
      console.error("Error handling account change:", error);
    }
  };

  const handleChainChange = async (chainId) => {
    const isCorrect =
      chainId.toLowerCase() === EDUCHAIN_NETWORK.chainId.toLowerCase();
    setIsCorrectNetwork(isCorrect);
    if (!isCorrect) {
      await switchNetwork();
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
      window.ethereum.on("chainChanged", handleChainChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
        window.ethereum.removeListener("chainChanged", handleChainChange);
      }
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        account,
        signer,
        isOwner,
        setIsOwner,
        connectWallet,
        isCorrectNetwork,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
