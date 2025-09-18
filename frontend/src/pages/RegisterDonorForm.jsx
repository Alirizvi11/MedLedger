import React, { useState, useRef } from 'react';
import QRViewer from '../components/QRViewer.jsx';
import html2canvas from 'html2canvas';

const RegisterDonorForm = ({ isDark }) => {
  const [form, setForm] = useState({
    name: '', age: '', bloodGroup: '', location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const qrRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(null);

    try {
      const res = await fetch('http://localhost:5000/api/donor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      setSuccess(data);
      setForm({ name: '', age: '', bloodGroup: '', location: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = async () => {
    if (!qrRef.current) return;
    const canvas = await html2canvas(qrRef.current);
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `Donor-CID-${success.cid}.png`;
    link.click();
  };

  const inputClass = `w-full p-3 rounded-xl border ${
    isDark ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-white/80 border-gray-300 text-gray-900'
  }`;

  return (
    <div className="space-y-6">
      {error && <div className="text-red-500">{error}</div>}
      {success && (
        <div className="p-4 rounded-lg border bg-green-50 text-green-700">
          <h3 className="font-bold mb-2">Donor Registered Successfully!</h3>
          <p><strong>CID:</strong> {success.cid}</p>
          <p><strong>TxHash:</strong> {success.txHash}</p>
          <div ref={qrRef} className="mt-4 inline-block bg-white p-4 rounded-lg shadow-md">
            <QRViewer cid={success.cid} label="Donor Record" type="donor" />
          </div>
          <button
            onClick={handleDownloadQR}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ⬇️ Download QR Code
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required />
        <input placeholder="Age" type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className={inputClass} required />
        <input placeholder="Blood Group (e.g. O+)" value={form.bloodGroup} onChange={e => setForm({ ...form, bloodGroup: e.target.value })} className={inputClass} required />
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputClass} required />
        <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          {loading ? 'Registering...' : 'Register Donor'}
        </button>
      </form>
    </div>
  );
};

export default RegisterDonorForm;
