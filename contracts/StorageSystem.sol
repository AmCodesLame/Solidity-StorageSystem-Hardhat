// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract StorageSystem {
    uint256 storedNumber;

    mapping(string => uint256) public nameToNumberStored;

    function setNum(uint256 _storedNumber) public {
        storedNumber = _storedNumber;
    }

    function getNum() public view returns (uint256) {
        return storedNumber;
    }
}
