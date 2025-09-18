import axios from 'axios';

export async function uploadToIPFS(data) {
  // Dev-friendly fallback when creds are missing
  if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_API_KEY) {
    if (process.env.DEV_MODE === 'true') {
      console.warn('⚠️ Pinata credentials missing. Returning mock CID in DEV_MODE.');
      return 'bafybeihmockcidmockcidmockcidmockcidmockcidmockcidmockcid';
    }
    throw new Error('❌ Missing Pinata API credentials in .env');
  }

  try {
    const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
      headers: {
        'pinata_api_key': process.env.PINATA_API_KEY,
        'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
      }
    });

    if (!res.data?.IpfsHash) {
      throw new Error('❌ Pinata response missing IpfsHash');
    }

    return res.data.IpfsHash;
  } catch (err) {
    console.error('❌ IPFS upload failed:', err.message);
    if (process.env.DEV_MODE === 'true') {
      console.warn('⚠️ DEV_MODE active. Returning mock CID despite error.');
      return 'bafybeihmockcidmockcidmockcidmockcidmockcidmockcidmockcid';
    }
    throw err;
  }
}
