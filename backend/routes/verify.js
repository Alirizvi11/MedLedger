import express from 'express';
import axios from 'axios';
import { contracts } from '../config/contract.js';

const router = express.Router();

router.get('/verify/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;

    const ipfsData = await axios.get(ipfsUrl);
    console.log('📦 IPFS Data:', ipfsData.data);

    // No on-chain verification method provided; just return IPFS payload
    res.json({ ipfsData: ipfsData.data });
  } catch (err) {
    console.error('❌ Verification failed:', err.message);
    res.status(500).json({ error: 'CID not found or invalid' });
  }
});

export default router;
