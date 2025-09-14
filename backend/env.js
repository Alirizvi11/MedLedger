// backend/env.js
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const env = {
  FUJI_RPC: process.env.FUJI_RPC,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  CONTRACT_ADDRESS_MEDICINE: process.env.CONTRACT_ADDRESS_MEDICINE,
  CONTRACT_ADDRESS_DONOR: process.env.CONTRACT_ADDRESS_DONOR,
  CONTRACT_ADDRESS_ORGAN: process.env.CONTRACT_ADDRESS_ORGAN
};
