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
    event Debug(string key, string value); // ✅ Added debug event

    function registerDonor(
        string memory name,
        string memory organ,
        string memory bloodGroup,
        string memory location,
        string memory ipfsHash,
        bool consent
    ) public {
        // ✅ Emit debug logs for each input
        emit Debug("Name", name);
        emit Debug("Organ", organ);
        emit Debug("BloodGroup", bloodGroup);
        emit Debug("Location", location);
        emit Debug("CID", ipfsHash);
        emit Debug("Consent", consent ? "true" : "false");

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
