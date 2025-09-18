import { api } from '@/apiBase';
import { useState } from "react";
import QRViewer from "../components/QRViewer.jsx";

export default function Medicine({ onBack, isDark, onToggleTheme }) {
  const [input, setInput] = useState("");
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    if (!input.trim()) {
      setError("Please enter a batch number or CID");
      return;
    }

    setLoading(true);
    setError("");
    setRecord(null);

    try {
      let response;
     if (input.startsWith('baf') || input.startsWith('Qm')) {
     setRecord({
      ...data,
      cid: input
     });
    } else {
     setRecord({
    ...data.ipfsData,
    cid: data.cid,
    batchNumber: input
     });
    }

      if (!response.ok) {
        throw new Error('Record not found');
      }
      
      const data = await response.json();
      
      if (input.startsWith('baf') || input.startsWith('Qm')) {
        setRecord({
          ...data,
          cid: input
        });
      } else {
        setRecord({
          ...data.ipfsData,
          cid: data.cid,
          batch: input
        });
      }
      
      setError("");
    } catch (err) {
      console.error("Lookup error:", err);
      setRecord(null);
      setError("Record not found. Please check the batch number or CID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-colors ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 bg-clip-text text-transparent ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}>
            Medicine Lookup
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Search by batch number or IPFS CID
          </p>
        </div>

        <div className={`backdrop-blur-md border rounded-2xl p-6 mb-6 ${
          isDark 
            ? 'bg-gray-900/50 border-gray-800/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Batch Number or CID (e.g., BATCH123 or bafybeib...)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLookup()}
              className={`flex-1 p-3 rounded-xl border transition-colors ${
                isDark 
                  ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={handleLookup}
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 hover:scale-105'
              } text-white`}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {error && (
          <div className={`p-4 rounded-xl mb-6 ${
            isDark 
              ? 'bg-red-900/50 border border-red-700/50 text-red-300' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {record && (
          <div className={`backdrop-blur-md border rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-900/50 border-gray-800/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Medicine Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Name', value: record.name },
                { label: 'Manufacturer', value: record.manufacturer },
                { label: 'Batch Number', value: record.batchNumber || record.batch },
                { label: 'Expiry Date', value: record.expiryDate },
                { label: 'Dosage', value: record.dosage },
                { label: 'Description', value: record.description }
              ].map(({ label, value }) => (
                <div key={label} className={`p-3 rounded-lg ${
                  isDark ? 'bg-gray-800/30' : 'bg-gray-50'
                }`}>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {label}
                  </p>
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {value || '—'}
                  </p>
                </div>
              ))}
            </div>

            {record.cid && (
              <QRViewer cid={record.cid} label="Medicine Record" type="medicine" />
            )}
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={onBack} 
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/50 hover:bg-gray-800/70 text-white' 
                : 'bg-gray-200/50 hover:bg-gray-200/70 text-gray-900'
            }`}
          >
            Back to Dashboard
          </button>
          <button 
            onClick={onToggleTheme} 
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/50 hover:bg-gray-800/70 text-white' 
                : 'bg-gray-200/50 hover:bg-gray-200/70 text-gray-900'
            }`}
          >
            {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
}