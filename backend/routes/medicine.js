import express from 'express';
import { uploadToIPFS } from '../utils/uploadToIPFS.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { contracts } from '../config/contract.js';

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, batchNumber, expiryDate, manufacturer, dosage, description } = req.body;

    const sanitized = {
      name: name?.trim(),
      batchNumber: batchNumber?.trim(),
      expiryDate: expiryDate?.trim(),
      manufacturer: manufacturer?.trim(),
      dosage: dosage?.trim(),
      description: description?.trim()
    };

    // Validate all fields
    if (
      !sanitized.name ||
      !sanitized.batchNumber ||
      !sanitized.expiryDate ||
      !sanitized.manufacturer ||
      !sanitized.dosage ||
      !sanitized.description
    ) {
      return res.status(400).json({ error: 'Missing medicine fields' });
    }

    console.log('💊 Medicine payload:', sanitized);

    // Upload to IPFS
    const cid = await uploadToIPFS(sanitized);
    console.log('✅ IPFS CID:', cid);

    // Smart contract call
    const tx = await contracts.medicine.registerMedicine(
      sanitized.name,
      sanitized.batchNumber,
      sanitized.expiryDate,
      cid
    );

    console.log('✅ TxHash:', tx.hash);

    // Save to local index
    const indexPath = path.resolve(__dirname, '../data/medicineIndex.json');
    const dir = path.dirname(indexPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const index = fs.existsSync(indexPath)
      ? JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
      : {};

    index[sanitized.batchNumber] = {
      cid,
      txHash: tx.hash,
      name: sanitized.name,
      expiryDate: sanitized.expiryDate,
      manufacturer: sanitized.manufacturer,
      dosage: sanitized.dosage,
      description: sanitized.description
    };

    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));

    console.log('🗂️  Medicine index updated at:', indexPath);
    console.log('🔑 Index keys:', Object.keys(index));

    res.json({ cid, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Medicine contract call failed:', err.reason || err.message);
    res.status(500).json({ error: 'Smart contract reverted. Check input values or wallet balance.' });
  }
});

export default router;
