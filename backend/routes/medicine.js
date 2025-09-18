import express from 'express';
import { uploadToIPFS } from '../utils/uploadToIPFS.js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { contracts } from '../config/contract.js';

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// POST / - Register new medicine
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

    const cid = await uploadToIPFS(sanitized);
    console.log('✅ IPFS CID:', cid);

    const tx = await contracts.medicine.registerMedicine(
      sanitized.name,
      sanitized.batchNumber,
      sanitized.expiryDate,
      cid
    );

    console.log('✅ TxHash:', tx.hash);

    const indexPath = path.resolve(__dirname, '../data/medicineIndex.json');
    const dir = path.dirname(indexPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const index = fs.existsSync(indexPath)
      ? JSON.parse(fs.readFileSync(indexPath, 'utf-8'))
      : {};

    index[sanitized.batchNumber] = {
      cid,
      txHash: tx.hash,
      ...sanitized
    };

    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`🗂️ Medicine index updated at: ${indexPath}`);
    console.log(`🔑 Index keys:`, Object.keys(index));

    res.json({ cid, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Medicine registration failed:', err.reason || err.message);
    res.status(500).json({ error: 'Registration failed. Check blockchain connection.' });
  }
});

// GET /cid/:cid - Lookup by CID
router.get('/cid/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    console.log(`🔍 CID lookup request: ${cid}`);

    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`, {
      timeout: 10000
    });

    res.json(response.data);
  } catch (err) {
    console.error(`❌ CID lookup failed for ${req.params.cid}:`, err.message);
    res.status(404).json({ error: 'CID not found on IPFS' });
  }
});

// GET /batch/:batch - Lookup by batch number
router.get('/batch/:batch', async (req, res) => {
  try {
    const batch = req.params.batch;
    console.log(`🔍 Lookup request for batch: ${batch}`);

    const indexPath = path.resolve(__dirname, '../data/medicineIndex.json');
    if (!fs.existsSync(indexPath)) {
      return res.status(404).json({ error: 'No medicine index found' });
    }

    const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
    const record = index[batch];

    if (!record) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    try {
      const ipfsResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${record.cid}`, {
        timeout: 10000
      });

      console.log(`✅ IPFS data fetched for ${batch}`);
      res.json({
        ...record,
        ipfsData: ipfsResponse.data
      });
    } catch (ipfsErr) {
      console.warn(`⚠️ IPFS fetch failed for ${batch}, returning local record only`);
      res.json({
        ...record,
        ipfsData: null
      });
    }
  } catch (err) {
    console.error(`❌ Batch lookup failed: ${err.message}`);
    res.status(500).json({ error: 'Lookup failed' });
  }
});

export default router;
