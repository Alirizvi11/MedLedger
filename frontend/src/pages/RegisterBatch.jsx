import { useState } from 'react';
import axios from 'axios';
import QRViewer from '../components/QRViewer.jsx';

function RegisterBatch() {
  const [form, setForm] = useState({ name: '', batchNo: '', expiryDate: '', manufacturer: '' });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/medicine', form);
    setResult(res.data);
  };

  return (
    <div className="glass-container">
      <h2>💊 Register Medicine Batch</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Batch No" onChange={e => setForm({ ...form, batchNo: e.target.value })} />
        <input placeholder="Expiry Date" onChange={e => setForm({ ...form, expiryDate: e.target.value })} />
        <input placeholder="Manufacturer" onChange={e => setForm({ ...form, manufacturer: e.target.value })} />
        <button type="submit">Register</button>
      </form>
      {result && <QRViewer cid={result.cid} label="Medicine CID" />}
    </div>
  );
}

export default RegisterBatch;
