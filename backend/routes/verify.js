import express from 'express';
import fetch from 'node-fetch';
import { contracts } from '../config/contract.js';

const router = express.Router();

router.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  console.log('🔍 Verifying CID:', cid);

  try {
    const ipfsResponse = await fetch(`https://ipfs.io/ipfs/${cid}`);
    const raw = await ipfsResponse.text();
    const ipfsData = JSON.parse(raw);

    const onChain = await Promise.any([
      contracts.donor.isCIDRegistered(cid),
      contracts.organ.isCIDRegistered(cid)
    ]).catch(() => false);

    res.json({ cid, ipfsData, onChain });
  } catch (err) {
    console.error('❌ Verification failed:', err.message);
    res.status(500).json({ error: 'CID verification failed' });
  }
});

export default router;
