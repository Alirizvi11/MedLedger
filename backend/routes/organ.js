import express from 'express';
import { uploadToIPFS } from '../utils/uploadToIPFS.js';
import { contracts } from '../config/contract.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // 🧼 Sanitize inputs
    const name = req.body.name?.trim();
    const organ = req.body.organ?.trim();
    const bloodGroup = req.body.bloodGroup?.trim().replace('+', '_positive');
    const location = req.body.location?.trim();

    if (!name || !organ || !bloodGroup || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('🫀 Incoming payload:', { name, organ, bloodGroup, location });

    // 📦 Upload to IPFS
    const cid = await uploadToIPFS({ name, organ, bloodGroup, location });
    console.log('✅ IPFS CID:', cid);

    // 🛡️ Validate CID format
    if (!cid || typeof cid !== 'string' || (!cid.startsWith('Qm') && !cid.startsWith('bafy'))) {
      throw new Error('Invalid CID format');
    }

    // ✅ Now simulate the contract call
    try {
      await contracts.organ.callStatic.registerDonor(
        name,
        organ,
        bloodGroup,
        location,
        cid,
        true
      );
      console.log('✅ Simulation passed: registerDonor inputs are valid');
    } catch (simErr) {
      console.error('❌ Simulation failed:', simErr.reason || simErr.message);
      return res.status(400).json({
        error: 'Simulation failed. Smart contract may reject these inputs.',
        details: simErr.reason || simErr.message
      });
    }

    // 🚀 Smart contract call
    const tx = await contracts.organ.registerDonor(
      name,
      organ,
      bloodGroup,
      location,
      cid,
      true
    );

    await tx.wait(); // ⛓️ Wait for confirmation

    const count = await contracts.organ.donorCount();
    const assignedId = Number(count) - 1;

    console.log('✅ TxHash:', tx.hash, 'Assigned Donor ID:', assignedId);
    res.json({ cid, txHash: tx.hash, donorId: assignedId });

  } catch (err) {
    console.error('❌ Full error:', err);
    res.status(500).json({
      error: 'Smart contract reverted. Check input values, CID format, or wallet balance.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const organId = req.params.id;
    console.log('🔍 Organ lookup for ID:', organId);

    // Optional: mock response for dev mode
    if (process.env.DEV_MODE === 'true') {
      return res.json({
        id: organId,
        name: "Mock Organ",
        organ: "Kidney",
        bloodGroup: "A+",
        location: "Delhi",
        consent: true
      });
    }

    const organRecord = await contracts.organ.getDonorById(parseInt(organId));
    res.json(organRecord);
  } catch (err) {
    console.error('❌ Organ lookup error:', err);
    res.status(404).json({ error: 'Organ not found' });
  }
});



export default router;
