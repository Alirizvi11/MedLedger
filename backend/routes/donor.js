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

    // 📦 Upload to IPFS
    const cid = await uploadToIPFS(sanitized);
    console.log('✅ IPFS CID:', cid);

    // 🛡️ Simulate contract call (optional)
    try {
      await contracts.donor.callStatic.registerDonor(cid);
      console.log('✅ Simulation passed');
    } catch (simErr) {
      console.error('❌ Simulation failed:', simErr.reason || simErr.message);
      return res.status(400).json({
        error: 'Simulation failed. Smart contract may reject these inputs.',
        details: simErr.reason || simErr.message
      });
    }

    // 🚀 Actual contract call
    const tx = await contracts.donor.registerDonor(cid);
    await tx.wait();

    // 🔢 Get assigned donor ID
    const count = await contracts.donor.donorCount();
    const donorId = Number(count) - 1;

    console.log('✅ TxHash:', tx.hash, 'Donor ID:', donorId);
    res.json({ cid, txHash: tx.hash, donorId });

  } catch (err) {
    console.error('❌ Donor contract call failed:', err.reason || err.message);
    res.status(500).json({ error: 'Smart contract reverted. Check input values or wallet balance.' });
  }
});

// ✅ GET route - Lookup donor
router.get('/:id', async (req, res) => {
  try {
    const donorId = req.params.id;
    console.log('🔍 Donor lookup for ID:', donorId);

    if (process.env.DEV_MODE === 'true') {
      return res.json({
        id: donorId,
        name: "Mock Donor",
        age: 25,
        bloodGroup: "O+",
        location: "Mumbai",
        consent: true
      });
    }

    const ipfsUrl = await contracts.donor.getRecord(parseInt(donorId));
    res.json({ donorId, ipfsUrl });

  } catch (err) {
    console.error('❌ Donor lookup error:', err);
    res.status(404).json({ error: 'Donor not found' });
  }
});

export default router;
