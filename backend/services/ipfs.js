const fs = require('fs');
const path = require('path');
const { NFTStorage, File } = require('nft.storage');

require('dotenv').config();

const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

(async () => {
  const imageBuffer = fs.readFileSync(path.join(__dirname, 'test.png'));

  const metadata = {
    name: "Test Entry",
    description: "Testing IPFS upload",
    image: new File([imageBuffer], "test.png", { type: "image/png" })
  };

  try {
    const result = await client.store(metadata);
    console.log("✅ CID:", result.ipnft);
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
  }
})();
