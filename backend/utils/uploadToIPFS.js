import axios from 'axios';

export async function uploadToIPFS(data) {
  if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_API_KEY) {
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
    throw err;
  }
}
