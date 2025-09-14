import express from 'express';
import { uploadToIPFS } from '../utils/uploadToIPFS.js';
import { contracts } from '../config/contract.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Sanitize inputs
    const name = req.body.name?.trim();
    const organ = req.body.organ?.trim();
    const bloodGroup = req.body.bloodGroup?.trim().replace('+', '_positive');
    const location = req.body.location?.trim();

    if (!name || !organ || !bloodGroup || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('🫀 Incoming payload:', { name, organ, bloodGroup, location });

    const cid = await uploadToIPFS({ name, organ, bloodGroup, location });
    console.log('✅ IPFS CID:', cid);

    const tx = await contracts.organ.registerDonor(
      name,
      organ,
      bloodGroup,
      location,
      cid,
      true // consent
    );

    // Wait for inclusion to ensure donorCount is updated on-chain
    await tx.wait();
    const count = await contracts.organ.donorCount();
    const assignedId = Number(count) - 1;

    console.log('✅ TxHash:', tx.hash, 'Assigned Donor ID:', assignedId);
    res.json({ cid, txHash: tx.hash, donorId: assignedId });
  } catch (err) {
    console.error('❌ Contract call failed:', err.reason || err.message);
    res.status(500).json({
      error: 'Smart contract reverted. Check input values, CID format, or wallet balance.'
    });
  }
});

export default router;
