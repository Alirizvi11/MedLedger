import express from 'express';
import { uploadToIPFS } from '../utils/uploadToIPFS.js';
import { contracts } from '../config/contract.js';

const router = express.Router();

// Store donor medical record linked to a donor tokenId
router.post('/', async (req, res) => {
  try {
    const { tokenId, bloodGroup, location } = req.body;

    const parsedTokenId = parseInt(tokenId);
    const sanitized = {
      tokenId: isNaN(parsedTokenId) ? null : parsedTokenId,
      bloodGroup: bloodGroup?.trim(),
      location: location?.trim()
    };

    if (sanitized.tokenId === null || !sanitized.bloodGroup || !sanitized.location) {
      return res.status(400).json({ error: 'Missing or invalid donor info fields' });
    }

    const cid = await uploadToIPFS({
      bloodGroup: sanitized.bloodGroup,
      location: sanitized.location
    });

    const tx = await contracts.donor.storeRecord(sanitized.tokenId, `ipfs://${cid}`);

    res.json({ cid, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Donor info store failed:', err.reason || err.message);
    res.status(500).json({ error: 'Smart contract reverted. Check tokenId or wallet balance.' });
  }
});

export default router;


