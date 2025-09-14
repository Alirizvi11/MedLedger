import { useState } from 'react';
import axios from 'axios';

function ScanVerify() {
  const [cid, setCid] = useState('');
  const [data, setData] = useState(null);

  const verifyCID = async () => {
    const res = await axios.get(`http://localhost:5000/api/verify/${cid}`);
    setData(res.data.ipfsData);
  };

  return (
    <div className="glass-container">
      <h2>🔍 Verify CID</h2>
      <input placeholder="Enter CID" value={cid} onChange={e => setCid(e.target.value)} />
      <button onClick={verifyCID}>Verify</button>
      {data && (
        <div className="glass-card">
          {Object.entries(data).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScanVerify;
