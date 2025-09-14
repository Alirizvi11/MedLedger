// server.js
import express from 'express';
import cors from 'cors';
import { env } from './env.js'; // ✅ Centralized env loader

// ✅ Initialize Express app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Route imports
import medicineRoute from './routes/medicine.js';
import medicineLookupRoute from './routes/medicineLookup.js';
import donorRoute from './routes/donor.js';
import donorLookupRoute from './routes/donorLookup.js';
import donorInfoRoute from './routes/donorInfo.js';
import organRoute from './routes/organ.js';
import consentRoute from './routes/consent.js';
import verifyRoute from './routes/verify.js';
import statsRoute from './routes/stats.js';

// ✅ Mount routes
app.use('/api/medicine', medicineRoute);
app.use('/api/medicine', medicineLookupRoute);
app.use('/api/donor', donorRoute);
app.use('/api/donor-lookup', donorLookupRoute);
app.use('/api/donor-info', donorInfoRoute);
app.use('/api/organ', organRoute);
app.use('/api/consent', consentRoute);
app.use('/api/verify', verifyRoute);
app.use('/api/stats', statsRoute);

// ✅ Start server
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 MedLedger2 backend running on port ${PORT}`);
  console.log(`🔑 PRIVATE_KEY loaded: ${env.PRIVATE_KEY ? '✅' : '❌ MISSING'}`);
});
