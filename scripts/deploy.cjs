const hre = require("hardhat");

async function main() {
  try {
    // Get the contract factory
    const EDUToken = await hre.ethers.getContractFactory("EDUToken");

    // Define the initial supply
    // const initialSupply = hre.ethers.utils.parseUnits("0.02", 18); // Example: 1000 tokens

    // Deploy the contract with the initial supply
    console.log("Deploying EDUToken contract...");
    const eDUToken = await EDUToken.deploy(
      "0x36fD41533d1c86225BDA5FB4E0bC0a8CD22D3180"
    );

    // Wait for deployment to finish
    await eDUToken.deployed();
    const contractAddress = eDUToken.address;

    console.log("EDUToken contract deployed to:", contractAddress);
    console.log("Save this address for interaction script!");
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
