const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

async function uploadToPinata(filePath, metadata = {}) {
  if (!fs.existsSync(filePath)) throw new Error(`❌ File not found: ${filePath}`);

  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const data = new FormData();
  data.append('file', fs.createReadStream(filePath));

  if (Object.keys(metadata).length > 0) {
    data.append('pinataMetadata', JSON.stringify({
      name: metadata.name || 'MedLedger Upload',
      keyvalues: metadata.keyvalues || {}
    }));
  }

  const headers = {
    ...data.getHeaders(),
    pinata_api_key: process.env.PINATA_API_KEY,
    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
  };

  const res = await axios.post(url, data, { headers });
  return res.data.IpfsHash;
}

module.exports = { uploadToPinata };
