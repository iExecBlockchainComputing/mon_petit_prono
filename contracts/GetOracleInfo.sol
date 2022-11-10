// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

abstract contract Oracle {
    function getRaw(bytes32)public view virtual returns (bytes memory, uint256);
    function getString(bytes32)public view virtual returns (string memory, uint256);
    function getInt(bytes32) public view virtual returns (int256, uint256);
    function getBool(bytes32) public view virtual returns (bool, uint256);
} 

contract GetOracleInfo {
    string  storedValue;
    uint256 storedDate;
    address oracleAddress = 0x456891C78077d31F70Ca027a46D68F84a2b814D4;

    function getOracleData(bytes32 _oracleId) public returns (string memory) {
        Oracle oracleContract = Oracle(oracleAddress);
        (string memory value, uint256 date) = oracleContract.getString(_oracleId);
        storedValue = value;
        storedDate = date;
        return value;
    }

    function get() public view returns (string memory, uint256) {
        return (storedValue, storedDate);
    }
}
