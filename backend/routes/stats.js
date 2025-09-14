import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Utility to safely read JSON file
function readIndex(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to read ${filePath}:`, err.message);
    return {};
  }
}

router.get('/', (req, res) => {
  const medicineIndex = readIndex(path.resolve('data/medicineIndex.json'));
  const donorIndex = readIndex(path.resolve('data/donorIndex.json'));
  const organIndex = readIndex(path.resolve('data/organIndex.json'));

  const stats = {
    totalMedicines: Object.keys(medicineIndex).length,
    totalDonors: Object.keys(donorIndex).length,
    totalOrgans: Object.keys(organIndex).length,
    timestamp: new Date().toISOString()
  };

  console.log("📊 Stats requested:", stats);
  res.status(200).json(stats);
});

export default router;
