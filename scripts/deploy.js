const { ethers, run, network } = require("hardhat");

async function main() {
  const StorageFactory = await ethers.getContractFactory("StorageSystem");
  console.log("Deploying contract...");

  const StorageContract = await StorageFactory.deploy();
  await StorageContract.deployed();
  console.log(`Deployed contract to: ${StorageContract.address}`);

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await StorageContract.deployTransaction.wait(6);
    await verify(StorageContract.address, []);
  }

  const currentValue = await StorageContract.getNum();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await StorageContract.setNum(420);
  await transactionResponse.wait(1);
  const updatedValue = await StorageContract.getNum();
  console.log(`Updated Value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("verifying contract...");
  try {
    await run("verify: verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("already verified!");
    } else {
      console.log(error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
