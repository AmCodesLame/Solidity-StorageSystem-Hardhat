const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("StorageSystem", function () {
  let StorageContract, StorageFactory;
  beforeEach(async function () {
    StorageFactory = await ethers.getContractFactory("StorageSystem");
    StorageContract = await StorageFactory.deploy();
    // simpleStorage.deployed();
  });
  it("Should start with a fav number of zero", async function () {
    const currentValue = await StorageContract.getNum();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });
  it("should update when we call store function", async function () {
    const expectedValue = "420";
    const transactionResponse = await StorageContract.setNum(expectedValue);
    await transactionResponse.wait(1);
    const currentValue = await StorageContract.getNum();

    assert.equal(currentValue.toString(), expectedValue);
    //both are same
    // expect(currentValue.toString()).to.equal(expectedValue);
  });
});
