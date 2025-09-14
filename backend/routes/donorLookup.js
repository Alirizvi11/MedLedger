import express from 'express';
import { contracts } from '../config/contract.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const donorId = parseInt(req.params.id);
    if (isNaN(donorId) || donorId < 0) {
      return res.status(400).json({ error: 'Invalid donor id' });
    }
    // Donor structs are stored in MedLedgerOrgan
    const donor = await contracts.organ.getDonorById(donorId);
    // Optional: basic empty check
    if (!donor || (!donor.name && !donor.organ && !donor.location)) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    res.json(donor);
  } catch (err) {
    console.error('❌ Donor lookup failed:', err.message);
    res.status(500).json({ error: 'Donor not found or contract error' });
  }
});

export default router;
