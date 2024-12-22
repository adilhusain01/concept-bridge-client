const hre = require('hardhat');

async function main() {
  try {
    // Get the contract factory
    const SmartSavingsPot = await hre.ethers.getContractFactory(
      'SmartSavingsPot'
    );

    // Deploy the contract
    console.log('Deploying SmartSavingsPot contract...');
    const smartSavingsPot = await SmartSavingsPot.deploy();

    // Wait for deployment to finish
    // await smartSavingsPot.waitForDeployment();
    const contractAddress = await smartSavingsPot.address;

    console.log('SmartSavingsPot contract deployed to:', contractAddress);
    console.log('Save this address for interaction script!');
  } catch (error) {
    console.error('Error during deployment:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
