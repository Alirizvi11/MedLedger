import { useState } from "react";
import axios from "axios";
import QRViewer from "../components/QRViewer.jsx";

export default function Medicine({ onBack, isDark, onToggleTheme }) {
  const [input, setInput] = useState("");
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/medicine/${input}`);
      const data = res.data.ipfsData ? res.data.ipfsData : res.data;
      setRecord({ ...data, cid: res.data.cid || input });
      setError("");
    } catch (err) {
      setRecord(null);
      setError("❌ No record found for this identifier.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">🔍 Lookup Medicine</h2>

        <input
          type="text"
          placeholder="Enter Batch No or CID"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 rounded border border-border bg-card text-card-foreground mb-4"
        />

        <button
          onClick={handleLookup}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          Lookup
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {record && (
          <div className="mt-6 bg-card p-4 rounded shadow">
            <p><strong>Name:</strong> {record.name}</p>
            <p><strong>Manufacturer:</strong> {record.manufacturer}</p>
            <p><strong>Expiry Date:</strong> {record.expiryDate}</p>
            <p><strong>Dosage:</strong> {record.dosage}</p>
            <p><strong>Description:</strong> {record.description}</p>
            <p><strong>CID:</strong> {record.cid}</p>

            <QRViewer cid={record.cid} label="Medicine Record" />
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button onClick={onBack} className="text-sm underline text-muted-foreground">
            ← Back
          </button>
          <button onClick={onToggleTheme} className="text-sm underline text-muted-foreground">
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
}
