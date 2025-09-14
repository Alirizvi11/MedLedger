// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;



contract MedLedgerDonor {
    mapping(uint256 => string) public donorRecords;

    event DonorRecordStored(uint256 indexed tokenId, string ipfsUrl);

    function storeRecord(uint256 tokenId, string memory ipfsUrl) public {
        donorRecords[tokenId] = ipfsUrl;
        emit DonorRecordStored(tokenId, ipfsUrl);
    }

    function getRecord(uint256 tokenId) public view returns (string memory) {
        return donorRecords[tokenId];
    }
}
