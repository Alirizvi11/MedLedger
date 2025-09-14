import express from 'express';
import { contracts } from '../config/contract.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
      return res.status(400).json({ error: 'Invalid donor id' });
    }
    const consent = await contracts.organ.verifyConsent(id);
    res.json({ id, consent });
  } catch (err) {
    console.error('❌ Consent verification failed:', err.message);
    res.status(500).json({ error: 'CID not found or contract error' });
  }
});

export default router;
