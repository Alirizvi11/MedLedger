import { useState } from 'react';
import axios from 'axios';

function ConsentVerify() {
  const [id, setId] = useState('');
  const [consent, setConsent] = useState(null);

  const checkConsent = async () => {
    const res = await axios.get(`http://localhost:5000/api/consent/${id}`);
    setConsent(res.data.consent);
  };

  return (
    <div className="glass-container">
      <h2>✅ Verify Donor Consent</h2>
      <input placeholder="Donor ID" value={id} onChange={e => setId(e.target.value)} />
      <button onClick={checkConsent}>Verify</button>
      {consent !== null && (
        <p className="status">{consent ? '✅ Consent Given' : '❌ No Consent'}</p>
      )}
    </div>
  );
}

export default ConsentVerify;
