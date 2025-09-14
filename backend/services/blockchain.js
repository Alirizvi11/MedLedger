// For Ethers v6+
require('dotenv').config();
const { ethers, JsonRpcProvider, Wallet } = require('ethers');

// Load ABIs
const MedLedgerABI = require('../abi/MedLedger.json');
const MedLedgerOrganABI = require('../abi/MedLedgerOrgan.json');
const MedLedgerDonorABI = require('../abi/MedLedgerDonor.json');

// Setup provider and signer
const provider = new JsonRpcProvider(process.env.FUJI_RPC);
const signer = new Wallet(process.env.PRIVATE_KEY, provider);

// Contract instances
const medLedgerContract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS_MEDICINE,
  MedLedgerABI.abi,
  signer
);

const medLedgerOrganContract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS_ORGAN,
  MedLedgerOrganABI.abi,
  signer
);

const medLedgerDonorContract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS_DONOR,
  MedLedgerDonorABI.abi,
  signer
);

// Register medicine batch
async function registerMedicine(data, cid) {
  try {
    const tx = await medLedgerContract.registerMedicine(
      data.name,
      data.batch,
      data.expiry,
      cid
    );
    await tx.wait();
    console.log('✅ Medicine registered on-chain');
    return tx.hash;
  } catch (err) {
    console.error('❌ Medicine registration failed:', err);
    throw err;
  }
}

// Register donor organization (organ-specific)
async function registerDonor(data, cid) {
  try {
    const tx = await medLedgerOrganContract.registerDonor(
      data.name,
      data.organ,
      data.bloodGroup,
      data.location,
      cid,
      data.consent
    );
    await tx.wait();
    console.log('✅ Donor registered on-chain');
    return tx.hash;
  } catch (err) {
    console.error('❌ Donor registration failed:', err);
    throw err;
  }
}

// Register general donor info (blood group, location)
async function storeDonorRecord(tokenId, cid) {
  try {
    const tx = await medLedgerDonorContract.storeRecord(tokenId, `ipfs://${cid}`);
    await tx.wait();
    console.log('✅ Donor record stored on-chain');
    return tx.hash;
  } catch (err) {
    console.error('❌ Donor record storage failed:', err);
    throw err;
  }
}

module.exports = {
  registerMedicine,
  registerDonor,
  storeDonorRecord
};
