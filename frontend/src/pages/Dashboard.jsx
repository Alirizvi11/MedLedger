import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas'
import {
  ArrowLeft, Users, Shield, TrendingUp, Hash, Moon, Sun,
  Plus, Search, QrCode, Heart, UserCheck, CheckCircle,
  Database, X, Activity
} from 'lucide-react';

import ScanQR from '../pages/ScanQR';
import QRViewer from '../components/QRViewer.jsx';
import ContactSection from "../sections/ContactSection.jsx";
import FooterSection from "../sections/FooterSection.jsx";

const API_BASE = 'https://medledger.onrender.com';
const api = (path) => `${API_BASE}${path}`;

const Navbar = ({ isDark }) => {
  // yaha jo sections hai unke id tumhare components me match karne chahiye
  const links = ["Home", "About Us", "Team", "Contact"];

  return (
   <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b 
      ${isDark ? "bg-gray-900/70 border-gray-800" : "bg-white/70 border-gray-200"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <h2
          className={`font-bold text-xl ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          MedLedger
        </h2>

        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
                className={`font-medium transition-colors hover:text-blue-500 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};


// Theme Toggle Component
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full ${
        isDark 
          ? 'bg-white/10 hover:bg-white/20 border border-white/20' 
          : 'bg-gray-900/10 hover:bg-gray-900/20 border border-gray-900/20'
      } backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110`}
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  );
};
const Modal = ({ isOpen, onClose, title, children, isDark }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl border ${
        isDark 
          ? 'bg-gray-900/95 border-gray-800/50' 
          : 'bg-white/95 border-gray-200/50'
      } backdrop-blur-md p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'hover:bg-white/10' : 'hover:bg-gray-900/10'
            }`}
          >
            <X size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const RegisterMedicineForm = ({ isDark, onClose }) => {
  const [formData, setFormData] = useState({
    name: '', manufacturer: '', batchNumber: '', expiryDate: '', dosage: '', description: ''
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
      console.log('Submitting to:', api('/api/medicine'));
      
      const response = await fetch(api('/api/medicine'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Registration failed' }));
        throw new Error(errorData.error || `HTTP ${response.status}: Registration failed`);
      }

      const data = await response.json();
      console.log('Success data:', data);
      
      setSuccess(data);
      setFormData({
        name: '', manufacturer: '', batchNumber: '', 
        expiryDate: '', dosage: '', description: ''
      });

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register medicine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = async () => {
    if (!qrRef.current) return;
    try {
      const canvas = await html2canvas(qrRef.current);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `Medicine-CID-${success.cid}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading QR:', error);
    }
  };

  const inputClass = `w-full p-3 rounded-xl border transition-colors ${
    isDark 
      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  return (
    <div className="space-y-6">
      {error && (
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {success && (
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-green-900/50 border-green-700 text-green-300' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <h3 className="font-bold mb-2">Medicine Registered Successfully!</h3>
          <p><strong>CID:</strong> <code className="break-all">{success.cid}</code></p>
          <p><strong>Transaction Hash:</strong> <code className="break-all">{success.txHash}</code></p>

          <div ref={qrRef} className="mt-4 inline-block bg-white p-4 rounded-lg shadow-md">
            <QRViewer cid={success.cid} label="Medicine Record" type="medicine" />
          </div>

          <button
            onClick={handleDownloadQR}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
          >
            Download QR Code
          </button>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Medicine Name *" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={inputClass} 
            required 
          />
          <input 
            type="text" 
            placeholder="Manufacturer *" 
            value={formData.manufacturer}
            onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
            className={inputClass} 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Batch Number *" 
            value={formData.batchNumber}
            onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
            className={inputClass} 
            required 
          />
          <input 
            type="date" 
            placeholder="Expiry Date *"
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            className={inputClass} 
            required 
          />
        </div>
        
        <input 
          type="text" 
          placeholder="Dosage (e.g., 500mg) *" 
          value={formData.dosage}
          onChange={(e) => setFormData({...formData, dosage: e.target.value})}
          className={inputClass} 
          required 
        />
        
        <textarea 
          placeholder="Description *" 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className={`${inputClass} resize-none h-24`} 
          required 
        />
        
        <button 
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
            loading 
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02]'
          } text-white`}
        >
          {loading ? 'Registering...' : 'Register Medicine'}
        </button>
      </div>
    </div>
  );
};
// export default RegisterMedicineForm;

// Medicine Lookup Form
const MedicineLookupForm = ({ isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a batch number or CID');
      return;
    }
    
    setError('');
    setResults(null);
    setLoading(true);

    try {
      let response;
      if (searchQuery.startsWith('baf') || searchQuery.startsWith('Qm')) {
        response = await fetch(api(`/api/medicine/cid/${searchQuery}`));
      } else {
        response = await fetch(api(`/api/medicine/batch/${searchQuery}`));
      }
      
      if (!response.ok) {
        throw new Error('Medicine not found');
      }
      
      const data = await response.json();
      
      if (searchQuery.startsWith('baf') || searchQuery.startsWith('Qm')) {
        setResults({ ...data, cid: searchQuery });
      } else {
        setResults({ 
          ...data.ipfsData, 
          ...data,
          cid: data.cid 
        });
      }
    } catch (err) {
      setError("Medicine not found. Please check the batch number or CID.");
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter batch number (e.g., BATCH123) or CID (e.g., bafybei...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          className={`w-full p-3 rounded-xl border transition-colors ${
            isDark
              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          required
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 hover:scale-[1.02]'
          } text-white`}
        >
          {loading ? 'Searching...' : 'Search Medicine'}
        </button>
      </div>

      {error && (
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {results && (
        <div className={`p-6 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50/80 border-gray-200'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Medicine Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Name', value: results.name },
              { label: 'Manufacturer', value: results.manufacturer }, 
              { label: 'Batch Number', value: results.batchNumber },
              { label: 'Expiry Date', value: results.expiryDate },
              { label: 'Dosage', value: results.dosage },
              { label: 'Description', value: results.description }
            ].map(({ label, value }) => (
              <div key={label} className={`p-2 rounded ${isDark ? 'bg-gray-700/30' : 'bg-white/50'}`}>
                <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {label}
                </p>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {value || '—'}
                </p>
              </div>
            ))}
          </div>

          {results.cid && (
            <QRViewer cid={results.cid} label="Medicine Record" type="medicine" />
          )}
        </div>
      )}
    </div>
  );
};


const RegisterOrganForm = ({ isDark, onClose }) => {
  const [form, setForm] = useState({ 
    name: '', 
    organ: '', 
    bloodGroup: '', 
    location: '' 
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
      const response = await fetch(api("/api/organ"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      
      const data = await response.json();
      setSuccess(data);
      setForm({ name: '', organ: '', bloodGroup: '', location: '' });
      
    } catch (err) {
      setError(err.message || "Failed to register organ.");
      console.error('Organ registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = async () => {
    if (!qrRef.current) return;
    try {
      const canvas = await html2canvas(qrRef.current);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `Organ-CID-${success.cid}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading QR:', error);
    }
  };

  const inputClass = `w-full p-3 rounded-xl border transition-colors ${
    isDark 
      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  return (
    <div className="space-y-6">
      {error && (
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {success && (
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-green-900/50 border-green-700 text-green-300' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <h3 className="font-bold mb-2">Organ Registered Successfully!</h3>
          <p><strong>CID:</strong> <code className="break-all">{success.cid}</code></p>
          <p><strong>Donor ID:</strong> <code className="break-all">{success.donorId}</code></p>
          <p><strong>Transaction Hash:</strong> <code className="break-all">{success.txHash}</code></p>

          {success.cid && (
            <div ref={qrRef} className="mt-4 inline-block bg-white p-4 rounded-lg shadow-md">
              <QRViewer cid={success.cid} label="Organ Donor Record" type="organ" />
            </div>
          )}

          <button
            onClick={handleDownloadQR}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
          >
            Download QR Code
          </button>
        </div>
      )}
      
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Donor Name *" 
          value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} 
          className={inputClass} 
          required 
        />
        <input 
          type="text" 
          placeholder="Organ Type (e.g., Heart, Kidney) *" 
          value={form.organ} 
          onChange={(e) => setForm({...form, organ: e.target.value})} 
          className={inputClass} 
          required 
        />
        <input 
          type="text" 
          placeholder="Blood Group (e.g., O+, A-) *" 
          value={form.bloodGroup} 
          onChange={(e) => setForm({...form, bloodGroup: e.target.value})} 
          className={inputClass} 
          required 
        />
        <input 
          type="text" 
          placeholder="Location *" 
          value={form.location} 
          onChange={(e) => setForm({...form, location: e.target.value})} 
          className={inputClass} 
          required 
        />
        
        <button 
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
            loading 
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:scale-[1.02]'
          } text-white`}
        >
          {loading ? 'Registering...' : 'Register Organ'}
        </button>
      </div>
    </div>
  );
};
//Donor Register form
const RegisterDonorForm = ({ isDark, onClose }) => {
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
      const response = await fetch(api("/api/donor"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      setSuccess(data);
      setForm({ name: '', age: '', bloodGroup: '', location: '' });
    } catch (err) {
      setError(err.message || "Failed to register donor.");
      console.error('Donor registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = async () => {
    if (!qrRef.current) return;
    try {
      const canvas = await html2canvas(qrRef.current);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `Donor-CID-${success.cid}.png`;
      link.click();
    } catch (error) {
      console.error('Error downloading QR:', error);
    }
  };

  const inputClass = `w-full p-3 rounded-xl border transition-colors ${
    isDark 
      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  return (
    <div className="space-y-6">
      {error && (
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {success && (
        <div className={`p-4 rounded-lg border ${
          isDark ? 'bg-green-900/50 border-green-700 text-green-300' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <h3 className="font-bold mb-2">Donor Registered Successfully!</h3>
          <p><strong>CID:</strong> <code className="break-all">{success.cid}</code></p>
          <p><strong>Transaction Hash:</strong> <code className="break-all">{success.txHash}</code></p>

          {success.cid && (
            <div ref={qrRef} className="mt-4 inline-block bg-white p-4 rounded-lg shadow-md">
              <QRViewer cid={success.cid} label="Donor Record" type="donor" />
            </div>
          )}

          <button
            onClick={handleDownloadQR}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
          >
            Download QR Code
          </button>
        </div>
      )}

      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Donor Name *" 
          value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} 
          className={inputClass} 
          required 
        />
        <input 
          type="number" 
          placeholder="Age *" 
          value={form.age} 
          onChange={(e) => setForm({...form, age: e.target.value})} 
          className={inputClass} 
          required 
        />
        <input 
          type="text" 
          placeholder="Blood Group (e.g., O+, A-) *" 
          value={form.bloodGroup} 
          onChange={(e) => setForm({...form, bloodGroup: e.target.value})} 
          className={inputClass} 
          required 
        />
        <input 
          type="text" 
          placeholder="Location *" 
          value={form.location} 
          onChange={(e) => setForm({...form, location: e.target.value})} 
          className={inputClass} 
          required 
        />

        <button 
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
            loading 
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02]'
          } text-white`}
        >
          {loading ? 'Registering...' : 'Register Donor'}
        </button>
      </div>
    </div>
  );
};


// Donor Lookup Form
const DonorLookupForm = ({ isDark }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a donor ID');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(api(`/api/donor/${query}`));
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Donor not found');
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Donor lookup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Donor ID *"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          className={`w-full p-3 rounded-xl border transition-colors ${
            isDark
              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          required
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 hover:scale-[1.02]'
          } text-white`}
        >
          {loading ? 'Searching...' : 'Search Donor'}
        </button>
      </div>

      {error && (
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {result && (
        <div className={`p-6 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50/80 border-gray-200'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Donor Details
          </h3>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/30' : 'bg-white/50'}`}>
            <pre className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
// Verify Consent Form
const VerifyConsentForm = ({ isDark }) => {
  const [donorId, setDonorId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!donorId.trim()) {
      setError('Please enter a donor ID');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(api(`/api/consent/${donorId}`));
      if (!response.ok) {
        throw new Error('Verification failed');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Consent verification failed. Please check the donor ID.");
      console.error('Consent verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Enter Donor ID (numeric)" 
          value={donorId} 
          onChange={(e) => setDonorId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleVerify(e)}
          className={`w-full p-3 rounded-xl border transition-colors ${
            isDark 
              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          required 
        />
        <button 
          type="button"
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
            loading 
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 hover:scale-[1.02]'
          } text-white`}
        >
          {loading ? 'Verifying...' : 'Verify Consent'}
        </button>
      </div>
      
      {error && (
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium">{error}</p>
        </div>
      )}
      
      {result && (
        <div className={`p-4 rounded-xl border ${
          result.consent 
            ? isDark ? 'bg-green-900/50 border-green-700 text-green-300' : 'bg-green-50 border-green-200 text-green-700'
            : isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="text-center font-semibold">
            {result.consent ? 'Consent Verified ✅' : 'No Consent Found ❌'}
          </p>
          <p className="text-center text-sm mt-2">
            Donor ID: {result.id}
          </p>
        </div>
      )}
    </div>
  );
};
// Verify CID Form
const VerifyCIDForm = ({ isDark }) => {
  const [cid, setCid] = useState('');
  const [record, setRecord] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!cid.trim()) {
      setError('Please enter a CID');
      return;
    }
    
    setLoading(true);
    setError('');
    setRecord(null);

    try {
      const res = await fetch(api(`/api/medicine/cid/${cid}`));
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'CID not found');
      }
      const data = await res.json();
      setRecord(data);
    } catch (err) {
      setError(err.message || 'CID lookup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter CID *"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleVerify(e)}
          className={`w-full p-3 rounded-xl border transition-colors ${
            isDark
              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          required
        />
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 hover:scale-[1.02]'
          } text-white`}
        >
          {loading ? 'Verifying...' : 'Verify CID'}
        </button>
      </div>

      {error && (
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {record && (
        <div className={`p-6 rounded-xl border ${
          isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50/80 border-gray-200'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            CID Record Details
          </h3>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/30' : 'bg-white/50'}`}>
            <pre className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
              {JSON.stringify(record, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ onBack, isDark, onToggleTheme }) => {
  const [currentModal, setCurrentModal] = useState(null);

  const [stats, setStats] = useState([
    { title: "Total Donors", value: "128", icon: Users, gradient: "from-purple-500 to-pink-500", change: "+12%" },
    { title: "Verified Medicines", value: "342", icon: Shield, gradient: "from-blue-500 to-cyan-500", change: "+8%" },
    { title: "Active Transactions", value: "56", icon: TrendingUp, gradient: "from-green-500 to-teal-500", change: "+24%" },
    { title: "Latest CID", value: "bafybeib3...xv7q", icon: Hash, gradient: "from-orange-500 to-red-500", change: "2m ago" }
  ]);

  const [activities, setActivities] = useState([
    { action: "New donor registered", time: "5 minutes ago", type: "success" },
    { action: "Medicine verification completed", time: "12 minutes ago", type: "info" },
    { action: "Transaction initiated", time: "45 minutes ago", type: "warning" },
    { action: "Medicine confirmed on blockchain", time: "1 hour ago", type: "success" }
  ]);

  const features = [
    { label: "Register Medicine", icon: Plus, gradient: "from-blue-500 to-cyan-500", action: () => setCurrentModal('register-medicine') },
    { label: "Medicine Lookup", icon: Search, gradient: "from-green-500 to-teal-500", action: () => setCurrentModal('lookup-medicine') },
    { label: "Scan QR Code", icon: QrCode, gradient: "from-purple-500 to-indigo-500", action: () => setCurrentModal('scan-qr') },
    { label: "Register Organ", icon: Heart, gradient: "from-red-500 to-pink-500", action: () => setCurrentModal('register-organ') },
    { label: "Register Donor", icon: Users, gradient: "from-orange-500 to-yellow-500", action: () => setCurrentModal('register-donor')},
    { label: "Lookup Donor", icon: UserCheck, gradient: "from-orange-500 to-yellow-500", action: () => setCurrentModal('lookup-donor') },
    { label: "Verify Consent", icon: CheckCircle, gradient: "from-emerald-500 to-green-500", action: () => setCurrentModal('verify-consent') },
    { label: "Verify CID", icon: Database, gradient: "from-indigo-500 to-purple-500", action: () => setCurrentModal('verify-cid') }
  ];

  const renderModalContent = () => {
    switch (currentModal) {
      case 'register-medicine':
        return <RegisterMedicineForm isDark={isDark} onClose={() => setCurrentModal(null)} />;
      case 'lookup-medicine':
        return <MedicineLookupForm isDark={isDark} />;
      case 'scan-qr':
       return <ScanQR isDark={isDark} onBack={() => setCurrentModal(null)} onToggleTheme={onToggleTheme} />;
      case 'register-organ':
        return <RegisterOrganForm isDark={isDark} onClose={() => setCurrentModal(null)} />;
      case 'register-donor':
        return <RegisterDonorForm isDark={isDark} onClose={() => setCurrentModal(null)} />;  
      case 'lookup-donor':
        return <DonorLookupForm isDark={isDark} />;
      case 'verify-consent':
        return <VerifyConsentForm isDark={isDark} />;
      case 'verify-cid':
        return <VerifyCIDForm isDark={isDark} />;
      default:
        return (
          <div className="text-center py-8">
            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              This feature is coming soon!
            </p>
          </div>
        );
    }
  };

  const getModalTitle = () => {
    const titles = {
      'register-medicine': 'Register New Medicine',
      'lookup-medicine': 'Medicine Lookup',
      'scan-qr': 'QR Code Scanner',
      'register-organ': 'Register Organ Donation',
      'register-donor': 'Register Donor Donation',
      'lookup-donor': 'Donor Lookup',
      'verify-consent': 'Verify Consent',
      'verify-cid': 'Verify CID'
    };
    return titles[currentModal] || 'Feature';
  };
const AboutUs = ({ isDark }) => {
  const team = [
    { name: "Abhay Kushwaha", role: "VAPT Expert", bio: "Expert in User Authenticity & Security.", img: "https://i.postimg.cc/RVK1gQFN/Abhayprofile.jpg" },
    { name: "Ali Rizvi", role: "Oracle DBA", bio: "Specialist in backend Intregration &  Oracle Dba.", img: "https://i.postimg.cc/Bb1bQgyD/Ali.jpg" },
    { name: "Lokendra Singh", role: "Data Analyst", bio: "Specialist in Data Management & Visualization.", img: "https://i.postimg.cc/0560wq1G/Lokendra-Profile.jpg" }
  ];
  return (
    <section id="aboutus" className="py-20 max-w-7xl mx-auto px-6">
      <h2 className={`text-3xl font-bold text-center mb-10 ${isDark ? "text-white" : "text-gray-900"}`}>
        Meet Our Team
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {team.map((member, i) => (
          <div key={i} className={`rounded-2xl p-6 shadow-lg text-center ${
            isDark ? "bg-gray-900/60 border border-gray-700" : "bg-white border border-gray-200"
          }`}>
            <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{member.name}</h3>
            <p className={`text-sm mb-2 ${isDark ? "text-cyan-400" : "text-blue-600"}`}>{member.role}</p>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

  return (
    <div className={`relative min-h-screen font-sans overflow-hidden transition-all duration-500 ${
      isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white'
      : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]'
        } bg-[size:50px_50px]`} />
      </div>
      
      {/* Navbar */}
      <Navbar isDark={isDark} />

      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

      {/* Back Button */}
      <button
        onClick={onBack}
        className={`fixed top-6 left-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 ${
          isDark 
            ? 'bg-gray-900/50 border-gray-800/50 text-white hover:bg-gray-900/70' 
            : 'bg-white/80 border-gray-200/50 text-gray-900 hover:bg-white/90'
        }`}
      >
        <ArrowLeft size={20} />
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto pt-20 pb-8">
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-black mb-4 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              MedLedger Dashboard
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Decentralized Healthcare Management System
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-900/50 border-gray-800/50 hover:border-cyan-400/50' 
                    : 'bg-white/80 border-gray-200/50 hover:border-blue-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-orange-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={feature.action}
                className={`backdrop-blur-md border rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 group ${
                  isDark 
                    ? 'bg-gray-900/50 border-gray-800/50 hover:border-cyan-400/50' 
                    : 'bg-white/80 border-gray-200/50 hover:border-blue-500/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.label}
                </h3>
              </button>
            ))}
          </div>

          {/* Activity Feed */}
          <div className={`backdrop-blur-md border rounded-2xl p-6 ${
            isDark 
              ? 'bg-gray-900/50 border-gray-800/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <Activity className={`${isDark ? 'text-cyan-400' : 'text-blue-500'}`} />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    isDark ? 'border-gray-700/50 bg-gray-800/30' : 'border-gray-200/50 bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' : 
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <span className={isDark ? 'text-white' : 'text-gray-900'}>
                      {activity.action}
                    </span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={!!currentModal} 
        onClose={() => setCurrentModal(null)} 
        title={getModalTitle()} 
        isDark={isDark}
      >
        {renderModalContent()}
      </Modal>
      
      <AboutUs isDark={isDark} />
      <ContactSection isDark={isDark} />
      <FooterSection />
    </div>
  );
};

export default Dashboard;