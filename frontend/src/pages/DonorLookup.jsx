import { useState } from 'react';
import axios from 'axios';
import { api } from '@/apiBase';

function DonorLookup() {
  const [id, setId] = useState('');
  const [donor, setDonor] = useState(null);

  const fetchDonor = async () => {
    const res = await axios.get(api(`/api/donor/${id}`));
    setDonor(res.data);
  };

  return (
    <div className="glass-container">
      <h2>🔍 Lookup Donor</h2>
      <input placeholder="Donor ID" value={id} onChange={e => setId(e.target.value)} />
      <button onClick={fetchDonor}>Fetch</button>
      {donor && (
        <div className="glass-card">
          <p><strong>Name:</strong> {donor.name}</p>
          <p><strong>Organ:</strong> {donor.organ}</p>
          <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
          <p><strong>Location:</strong> {donor.location}</p>
          <p><strong>Consent:</strong> {donor.consent ? '✅ Yes' : '❌ No'}</p>
        </div>
      )}
    </div>
  );
}

export default DonorLookup;
