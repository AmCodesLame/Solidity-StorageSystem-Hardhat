const { ethers, run, network } = require("hardhat");
require("@nomicfoundation/hardhat-verify");

async function main() {
  const deployedContract = await ethers.deployContract("StorageSystem");
  console.log("[main] Waiting for Deployment...");
  await deployedContract.waitForDeployment();

  const address = await deployedContract.getAddress();
  console.log("SimpleStorage Contract Address:", address);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await deployedContract.deploymentTransaction().wait(20);
    await verify(address, []);
  }

  const currentValue = await deployedContract.getNum();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await deployedContract.setNum(420);
  await transactionResponse.wait(1);
  const updatedValue = await deployedContract.getNum();
  console.log(`Updated Value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("already verified!");
    } else {
      console.log("oopsie");
      console.log(error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
