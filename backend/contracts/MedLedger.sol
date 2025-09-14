// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MedLedger {
    struct Medicine {
        string name;
        string batch;
        string expiry;
        string cid;
    }

    mapping(uint256 => Medicine) public medicines;

    event MedicineRegistered(
        uint256 indexed tokenId,
        string name,
        string batch,
        string expiry,
        string cid
    );

    function registerMedicine(
        string memory name,
        string memory batch,
        string memory expiry,
        string memory cid
    ) public {
        uint256 tokenId = uint256(keccak256(abi.encodePacked(name, batch, block.timestamp)));
        medicines[tokenId] = Medicine(name, batch, expiry, cid);
        emit MedicineRegistered(tokenId, name, batch, expiry, cid);
    }
}
