const express = require('express');
const router = express.Router();
const { uploadToPinata } = require('../services/pinataUploader');
const {
  registerMedicine,
  registerDonor,
  storeDonorRecord
} = require('../services/blockchain');
require('dotenv').config();

// 🫀 Organ Donor Registration (MedLedgerOrgan)
router.post('/upload-organ', async (req, res) => {
  try {
    const cid = await uploadToPinata('./services/test.png', {
      name: 'Organ Record',
      keyvalues: { type: 'organ', urgency: 'high' }
    });

    const donorData = {
      name: 'Ali Rizvi',
      organ: 'Kidney',
      bloodGroup: 'O+',
      location: 'Lucknow',
      consent: true
    };

    const txHash = await registerDonor(donorData, `ipfs://${cid}`);
    res.json({ cid, txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 💊 Medicine Registration (MedLedger)
router.post('/upload-medicine', async (req, res) => {
  try {
    const cid = await uploadToPinata('./services/test.png', {
      name: 'Medicine Record',
      keyvalues: { type: 'medicine', dosage: '500mg' }
    });

    const medicineData = {
      name: 'Paracetamol',
      batch: 'BATCH123',
      expiry: '2026-12-31'
    };

    const txHash = await registerMedicine(medicineData, `ipfs://${cid}`);
    res.json({ cid, txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🧬 Donor Info Record (MedLedgerDonor)
router.post('/upload-donor', async (req, res) => {
  try {
    const cid = await uploadToPinata('./services/test.png', {
      name: 'Donor Info',
      keyvalues: { bloodGroup: 'O+', location: 'Lucknow' }
    });

    const tokenId = 1; // You can make this dynamic later
    const txHash = await storeDonorRecord(tokenId, cid);
    res.json({ cid, txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
