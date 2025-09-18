// server.js
import express from 'express';
import cors from 'cors';
import { env } from './env.js';

// Route imports
import medicineRoute from './routes/medicine.js';
import donorRoute from './routes/donor.js';
import donorLookupRoute from './routes/donorLookup.js';
import donorInfoRoute from './routes/donorInfo.js';
import organRoute from './routes/organ.js';
import consentRoute from './routes/consent.js';
import verifyRoute from './routes/verify.js';
import statsRoute from './routes/stats.js';

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://medledger-frontend.vercel.app', // ✅ Add your Vercel frontend domain
    'https://your-custom-domain.com'         // ✅ Add if you have custom domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());

// Mount routes correctly
app.use('/api/medicine', medicineRoute); // This handles both POST / and GET /cid/:cid, /batch/:batch
app.use('/api/donor', donorRoute);
app.use('/api/donor-lookup', donorLookupRoute);
app.use('/api/donor-info', donorInfoRoute);
app.use('/api/organ', organRoute);
app.use('/api/consent', consentRoute);
app.use('/api/verify', verifyRoute);
app.use('/api/stats', statsRoute);

// Start server
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 MedLedger2 backend running on port ${PORT}`);
  console.log(`🔑 PRIVATE_KEY loaded: ${env.PRIVATE_KEY ? '✅' : '❌ MISSING'}`);
});
