import { useState } from 'react';
import axios from 'axios';
import QRViewer from '../components/QRViewer.jsx';

function RegisterBatch() {
  const [form, setForm] = useState({
    name: '',
    batchNumber: '',
    expiryDate: '',
    manufacturer: '',
    dosage: '',
    description: ''
  });

  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/medicine', form);
      setResult(res.data);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="glass-container max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">💊 Register Medicine Batch</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          className="w-full px-4 py-2 rounded border"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Batch Number"
          className="w-full px-4 py-2 rounded border"
          onChange={e => setForm({ ...form, batchNumber: e.target.value })}
        />
        <input
          placeholder="Expiry Date"
          className="w-full px-4 py-2 rounded border"
          onChange={e => setForm({ ...form, expiryDate: e.target.value })}
        />
        <input
          placeholder="Manufacturer"
          className="w-full px-4 py-2 rounded border"
          onChange={e => setForm({ ...form, manufacturer: e.target.value })}
        />
        <input
          placeholder="Dosage (e.g. 500mg)"
          className="w-full px-4 py-2 rounded border"
          onChange={e => setForm({ ...form, dosage: e.target.value })}
        />
        <input
          placeholder="Description"
          className="w-full px-4 py-2 rounded border"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <QRViewer cid={result.cid} label="Medicine CID" type="medicine" />
        </div>
      )}
    </div>
  );
}

export default RegisterBatch;
