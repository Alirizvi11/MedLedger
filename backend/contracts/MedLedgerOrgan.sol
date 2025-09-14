// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;



contract MedLedgerOrgan {
    struct Donor {
        string name;
        string organ;
        string bloodGroup;
        string location;
        string ipfsHash;
        bool consent;
    }

    mapping(uint => Donor) public donors;
    uint public donorCount;

    event DonorRegistered(uint indexed id, string name);

    function registerDonor(
        string memory name,
        string memory organ,
        string memory bloodGroup,
        string memory location,
        string memory ipfsHash,
        bool consent
    ) public {
        donors[donorCount] = Donor(name, organ, bloodGroup, location, ipfsHash, consent);
        emit DonorRegistered(donorCount, name);
        donorCount++;
    }

    function getDonorById(uint id) public view returns (Donor memory) {
        return donors[id];
    }

    function verifyConsent(uint id) public view returns (bool) {
        return donors[id].consent;
    }
}
