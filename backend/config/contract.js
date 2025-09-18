import ethers from 'ethers';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read ABI JSONs
const MedLedgerABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abi/MedLedger.json')));
const MedLedgerDonorABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abi/MedLedgerDonor.json')));
const MedLedgerOrganABI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../abi/MedLedgerOrgan.json')));

// Ethers v5 syntax
const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract addresses
const addresses = {
  medicine: '0xF7Ec48737C405ed5f4cE61E1E7e4FE586AbFF9CB',
  donor: '0x7252071f955B5f5f2131977804faA94f017ba6ea',
  organ: '0x4B5B718380928049247280Fc2800856093D43D46'
};

// Export contracts
export const contracts = {
  medicine: new ethers.Contract(addresses.medicine, MedLedgerABI.abi, wallet),
  donor: new ethers.Contract(addresses.donor, MedLedgerDonorABI.abi, wallet),
  organ: new ethers.Contract(addresses.organ, MedLedgerOrganABI.abi, wallet)
};