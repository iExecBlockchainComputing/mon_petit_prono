// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PetitProno{
    address public owner;
    string public League;
    mapping (string => string) LeaguePool;

    constructor() {
        owner = msg.sender;
    }

    modifier OnlyOwner(){
        require (msg.sender == owner);
        _;
    }

    function get(string memory league_addr) public view returns (string memory) {
        return LeaguePool[league_addr];
    }

    function set(string memory league_addr, string memory ipfs_link) public OnlyOwner {
        LeaguePool[league_addr] = ipfs_link;
    }

    function remove(string memory league_addr) public OnlyOwner{
        delete LeaguePool[league_addr];
    }
}