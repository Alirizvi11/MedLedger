import { useState } from 'react';
import axios from 'axios';
import QRViewer from '../components/QRViewer.jsx';

function RegisterOrgan() {
  const [form, setForm] = useState({ name: '', organ: '', bloodGroup: '', location: '' });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/organ', form);
    setResult(res.data);
  };

  return (
    <div className="glass-container">
      <h2>🫀 Register Organ Donor</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Organ" onChange={e => setForm({ ...form, organ: e.target.value })} />
        <input placeholder="Blood Group" onChange={e => setForm({ ...form, bloodGroup: e.target.value })} />
        <input placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
        <button type="submit">Register</button>
      </form>
      {result && <QRViewer cid={result.cid} label="Organ CID" />}
    </div>
  );
}

export default RegisterOrgan;
