import express from 'express';
import fetch from 'node-fetch';
import { contracts } from '../config/contract.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const donorId = parseInt(req.params.id);
    console.log('🔍 Incoming donor ID:', donorId);

    if (isNaN(donorId) || donorId < 0) {
      console.log('❌ Invalid donor ID');
      return res.status(400).json({ error: 'Invalid donor id' });
    }

    const ipfsUrl = await contracts.donor.getRecord(donorId);
    console.log('✅ CID from contract:', ipfsUrl);

    if (!ipfsUrl || ipfsUrl === '') {
      console.log('❌ Empty CID');
      return res.status(404).json({ error: 'Donor record not found on-chain' });
    }

    const ipfsEndpoint = `https://ipfs.io/ipfs/${ipfsUrl}`;
    console.log('🌐 Fetching from IPFS:', ipfsEndpoint);

    const ipfsResponse = await fetch(ipfsEndpoint);
    const raw = await ipfsResponse.text();
    console.log('📦 Raw IPFS response:', raw);

    let donorData;
    try {
      donorData = JSON.parse(raw);
      console.log('✅ Parsed donor data:', donorData);
    } catch (err) {
      console.error('❌ JSON parse failed:', err.message);
      return res.status(500).json({ error: 'Invalid IPFS JSON format' });
    }

    res.json({
      donorId,
      ipfsUrl,
      ...donorData
    });

  } catch (err) {
    console.error('❌ Donor lookup failed:', err.message);
    res.status(500).json({ error: 'Donor not found or IPFS/contract error' });
  }
});

export default router;
