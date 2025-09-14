// import { ethers } from 'ethers';
// import abiMedicine from '../abi/MedLedger.jsonc' assert { type: "json" };

//  // adjust path if needed

// const provider = new ethers.JsonRpcProvider(process.env.AVALANCHE_RPC);

// // ✅ RPC Connection Test
// provider.getNetwork()
//   .then(net => console.log("🌐 Connected to network:", net))
//   .catch(err => console.error("❌ RPC connection failed:", err.message));

// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// export const contracts = {
//   medicine: new ethers.Contract(
//     process.env.CONTRACT_ADDRESS_MEDICINE,
//     abiMedicine,
//     wallet
//   )
// };
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { env } from '../env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const abiPath = path.resolve(__dirname, '../abi/MedLedger.json');
const abiRaw = fs.readFileSync(abiPath, 'utf-8');
const abiMedicine = JSON.parse(abiRaw).abi;

const provider = new ethers.JsonRpcProvider(env.FUJI_RPC);
const wallet = new ethers.Wallet(env.PRIVATE_KEY, provider);

export const contracts = {
  medicine: new ethers.Contract(env.CONTRACT_ADDRESS_MEDICINE, abiMedicine, wallet)
};
