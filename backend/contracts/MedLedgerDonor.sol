pragma solidity ^0.8.18;

contract MedLedgerDonor {
    uint256 public donorCount;
    mapping(uint256 => string) public donorRecords;

    event DonorRegistered(uint256 indexed donorId, string ipfsUrl);

    function registerDonor(string memory ipfsUrl) public returns (uint256) {
        uint256 donorId = donorCount;
        donorRecords[donorId] = ipfsUrl;
        donorCount++;
        emit DonorRegistered(donorId, ipfsUrl);
        return donorId;
    }

    function getRecord(uint256 donorId) public view returns (string memory) {
        return donorRecords[donorId];
    }
}
