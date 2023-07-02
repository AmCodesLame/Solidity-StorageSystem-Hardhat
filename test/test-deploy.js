const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let deployedContract;
  beforeEach(async function () {
    deployedContract = await ethers.deployContract("StorageSystem");
    await deployedContract.waitForDeployment();
    // simpleStorage.deployed();
  });
  it("Should start with a fav number of zero", async function () {
    const currentValue = await deployedContract.getNum();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("should update when we call store function", async function () {
    const expectedValue = "420";
    const transactionResponse = await deployedContract.setNum(expectedValue);
    await transactionResponse.wait(1);
    const currentValue = await deployedContract.getNum();

    assert.equal(currentValue.toString(), expectedValue);
    //both are same
    // expect(currentValue.toString()).to.equal(expectedValue);
  });
});
