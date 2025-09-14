import express from 'express';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();

// Unified route: handles both batch and CID
router.get('/cid/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
    const { data } = await axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
    res.status(200).json(data);
  } catch (err) {
    console.error(`❌ CID lookup failed for ${cid}:`, err.message);
    res.status(404).json({ error: 'CID not found on IPFS' });
  }



  // Batch lookup
  const indexPath = path.resolve(__dirname, '../data/medicineIndex.json');
  if (!fs.existsSync(indexPath)) {
    return res.status(404).json({ error: 'No medicine index found.' });
  }

  const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  const record = index[id];
  if (!record) {
    return res.status(404).json({ error: 'Batch not found' });
  }

  try {
    const { data } = await axios.get(`https://gateway.pinata.cloud/ipfs/${record.cid}`);
    res.json({ batch: id, ...record, ipfsData: data });
  } catch {
    res.json({ batch: id, ...record, ipfsData: null });
  }
});

export default router;
