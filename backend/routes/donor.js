import express from 'express';
import { uploadToIPFS } from '../utils/uploadToIPFS.js';
import { contracts } from '../config/contract.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, age, bloodGroup, location } = req.body;

    const sanitized = {
      name: name?.trim(),
      age: parseInt(age),
      bloodGroup: bloodGroup?.trim().replace('+', '_positive'),
      location: location?.trim()
    };

    if (!sanitized.name || isNaN(sanitized.age) || !sanitized.bloodGroup || !sanitized.location) {
      return res.status(400).json({ error: 'Missing or invalid donor fields' });
    }

    console.log('🧬 Donor payload:', sanitized);

    const cid = await uploadToIPFS(sanitized);
    console.log('✅ IPFS CID:', cid);

    const tx = await contracts.donor.registerDonor(
      sanitized.name,
      sanitized.age,
      sanitized.bloodGroup,
      sanitized.location,
      cid,
      true
    );

    console.log('✅ TxHash:', tx.hash);
    res.json({ cid, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Donor contract call failed:', err.reason || err.message);
    res.status(500).json({ error: 'Smart contract reverted. Check input values or wallet balance.' });
  }
});

export default router;
