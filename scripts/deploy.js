const hre = require("hardhat");
async function main() {
    // We get the contract to deploy
    const SwapExamples = await ethers.getContractFactory("SwapExamples");
    
    const swap = await SwapExamples.deploy("0xE592427A0AEce92De3Edee1F18E0157C05861564");
  
    await swap.deployed();
  
    console.log("swap deployed to:", swap.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });