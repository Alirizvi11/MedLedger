import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Users, Shield, TrendingUp, Hash, Moon, Sun,
  Plus, Search, QrCode, Heart, UserCheck, CheckCircle,
  Database, X
} from 'lucide-react';

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

// Modal Component
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

// Register Medicine Form
const RegisterMedicineForm = ({ isDark, onClose }) => {
  const [formData, setFormData] = useState({
    name: '', manufacturer: '', batchNumber: '', expiryDate: '', dosage: '', description: ''
  });
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/medicine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json(); // { cid, hashId }

    alert(`✅ Registered!\nCID: ${data.cid}\nHash ID: ${data.hashId}`);

    // Optional: show QR code
    // setQrData(data.cid); // if you want to render QR dynamically

    onClose();
  } catch (err) {
    alert("❌ Failed to register medicine.");
  }
};


  const inputClass = `w-full p-3 rounded-xl border transition-colors ${
    isDark 
      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Medicine Name" value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className={inputClass} required />
        <input type="text" placeholder="Manufacturer" value={formData.manufacturer}
          onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
          className={inputClass} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Batch Number" value={formData.batchNumber}
          onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
          className={inputClass} required />
        <input type="date" value={formData.expiryDate}
          onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
          className={inputClass} required />
      </div>
      <input type="text" placeholder="Dosage" value={formData.dosage}
        onChange={(e) => setFormData({...formData, dosage: e.target.value})}
        className={inputClass} required />
      <textarea placeholder="Description" value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        className={`${inputClass} resize-none h-24`} required />
      <button type="submit" className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02]">
        Register Medicine
      </button>
    </form>
  );
};

// Medicine Lookup Form
const MedicineLookupForm = ({ isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults(null);

    try {
      const res = await fetch(`http://localhost:5000/api/medicine/${searchQuery}`);
      const raw = await res.json();

      const data = raw.ipfsData ? raw.ipfsData : raw;
      const cid = raw.cid || searchQuery;

      setResults({ ...data, cid });
    } catch (err) {
      setError("❌ Medicine not found.");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Enter batch number or CID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full p-3 rounded-xl border transition-colors ${
            isDark
              ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          required
        />
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-300 hover:scale-[1.02]"
        >
          Search Medicine
        </button>
      </form>

      {error && (
        <p className="text-red-500 font-medium text-center">{error}</p>
      )}

      {results && (
        <div
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50/80 border-gray-200'
          }`}
        >
          <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Medicine Details
          </h3>
          <div className="space-y-2">
            {['name', 'manufacturer', 'expiryDate', 'dosage', 'description', 'cid'].map((key) => (
              <div key={key} className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                  {results[key] || '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
const QRScanner = ({ isDark }) => {
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState(null);

  // ✅ API call
  const handleScan = async (cid) => {
    if (!cid) return;
    try {
      const res = await fetch(`http://localhost:5000/api/medicine/cid/${cid}`);
      const data = await res.json();
      setResults(data);
      console.log("✅ API Response:", data);
    } catch (err) {
      console.error("❌ Scan error:", err);
      alert("❌ CID not found.");
    }
  };

  const handleError = (err) => {
    console.error("❌ Scanner Error:", err);
  };

  return (
    <div className="text-center space-y-4">
      {/* Box */}
      <div
        className={`w-64 h-64 mx-auto rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden ${
          isDark ? "border-gray-600" : "border-gray-400"
        }`}
      >
        {isActive ? (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        ) : (
          <QrCode
            size={80}
            className={isDark ? "text-gray-400" : "text-gray-500"}
          />
        )}
      </div>

      {/* Info text */}
      <p className={isDark ? "text-gray-300" : "text-gray-700"}>
        {isActive
          ? "📷 Point your camera at a QR code"
          : "QR Scanner will be activated here"}
      </p>

      {/* Toggle Button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
      >
        {isActive ? "Deactivate Camera" : "Activate Camera"}
      </button>

      {/* Show API results */}
      {results && (
        <div className="mt-4 text-left w-72 mx-auto bg-gray-100 p-3 rounded-xl">
          <h3 className="font-semibold mb-2">🔍 Scan Result</h3>
          <pre className="text-sm">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
const RegisterOrganForm = ({ isDark, onClose }) => {
  const [form, setForm] = useState({ donorId: '', organType: '', bloodGroup: '', notes: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/organ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json(); // { cid }
      alert(`✅ Organ Registered\nCID: ${data.cid}`);
      onClose();
    } catch {
      alert("❌ Failed to register organ.");
    }
  };

  const inputClass = `w-full p-3 rounded-xl border ${isDark ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-white/80 border-gray-300 text-gray-900'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Donor ID" value={form.donorId} onChange={(e) => setForm({...form, donorId: e.target.value})} className={inputClass} required />
      <input type="text" placeholder="Organ Type" value={form.organType} onChange={(e) => setForm({...form, organType: e.target.value})} className={inputClass} required />
      <input type="text" placeholder="Blood Group" value={form.bloodGroup} onChange={(e) => setForm({...form, bloodGroup: e.target.value})} className={inputClass} required />
      <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} className={`${inputClass} resize-none h-24`} />
      <button type="submit" className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium">Register Organ</button>
    </form>
  );
};

const DonorLookupForm = ({ isDark }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/donor/${query}`);
      const data = await res.json();
      setResult(data);
    } catch {
      alert("❌ Donor not found.");
    }
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <input type="text" placeholder="Enter Donor ID" value={query} onChange={(e) => setQuery(e.target.value)} required className="w-full p-3 rounded-xl border" />
      <button type="submit" className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium">Search Donor</button>
      {result && <pre className="text-sm bg-gray-100 p-3 rounded-xl">{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
};

const VerifyConsentForm = ({ isDark }) => {
  const [donorId, setDonorId] = useState('');
  const [status, setStatus] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/consent/${donorId}`);
      const data = await res.json();
      setStatus(data.status); // "Verified" or "Not Found"
    } catch {
      alert("❌ Consent verification failed.");
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <input type="text" placeholder="Donor ID" value={donorId} onChange={(e) => setDonorId(e.target.value)} required className="w-full p-3 rounded-xl border" />
      <button type="submit" className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium">Verify Consent</button>
      {status && <p className="text-center mt-4 font-semibold">Consent Status: {status}</p>}
    </form>
  );
};

const VerifyCIDForm = ({ isDark }) => {
  const [cid, setCid] = useState('');
  const [record, setRecord] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/medicine/cid/${cid}`);
      const data = await res.json();
      setRecord(data);
    } catch {
      alert("❌ CID not found.");
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <input type="text" placeholder="Enter CID" value={cid} onChange={(e) => setCid(e.target.value)} required className="w-full p-3 rounded-xl border" />
      <button type="submit" className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium">Verify CID</button>
      {record && <pre className="text-sm bg-gray-100 p-3 rounded-xl">{JSON.stringify(record, null, 2)}</pre>}
    </form>
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

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => prevStats.map(stat => {
        const randomChange = Math.floor(Math.random() * 10) - 5;
        const newValue = Math.max(0, parseInt(stat.value) + randomChange);
        const changePercent = Math.floor(Math.random() * 20) - 10;
        
        return {
          ...stat,
          value: stat.title === "Latest CID" ? `bafybeib${Math.random().toString(36).substr(2, 8)}` : newValue.toString(),
          change: stat.title === "Latest CID" ? `${Math.floor(Math.random() * 10) + 1}m ago` : 
                  changePercent >= 0 ? `+${changePercent}%` : `${changePercent}%`
        };
      }));

      if (Math.random() > 0.7) {
        const newActivities = ["New medicine registered", "Donor consent verified", "Blockchain transaction completed"];
        const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
        
        setActivities(prev => [
          { action: randomActivity, time: "Just now", type: "success" },
          ...prev.slice(0, 3)
        ]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { label: "Register Medicine", icon: Plus, gradient: "from-blue-500 to-cyan-500", action: () => setCurrentModal('register-medicine') },
    { label: "Medicine Lookup", icon: Search, gradient: "from-green-500 to-teal-500", action: () => setCurrentModal('lookup-medicine') },
    { label: "Scan QR Code", icon: QrCode, gradient: "from-purple-500 to-indigo-500", action: () => setCurrentModal('scan-qr') },
    { label: "Register Organ", icon: Heart, gradient: "from-red-500 to-pink-500", action: () => setCurrentModal('register-organ') },
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
      return <QRScanner isDark={isDark} />;

    case 'register-organ':
      return <RegisterOrganForm isDark={isDark} onClose={() => setCurrentModal(null)} />;

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
      'lookup-donor': 'Donor Lookup',
      'verify-consent': 'Verify Consent',
      'verify-cid': 'Verify CID'
    };
    return titles[currentModal] || 'Feature';
  };

  return (
    <div className={`relative min-h-screen font-sans overflow-hidden transition-all duration-500 ${
      isDark ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' 
      : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark ? 'bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)]' 
          : 'bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]'
        } bg-[size:50px_50px]`} />
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDark ? 'bg-gradient-to-r from-cyan-400/15 to-purple-600/15' 
          : 'bg-gradient-to-r from-blue-400/20 to-purple-500/20'
        }`} />
      </div>

      <div className="relative z-10 min-h-screen px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
          <div>
            <h1 className={`text-4xl font-bold bg-clip-text text-transparent ${
              isDark ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}>
              🧠 MedLedger Dashboard
            </h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome back! Here's your medical data overview.
            </p>
          </div>
          <button onClick={onBack} className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
              isDark ? 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20' 
              : 'bg-gray-900/10 backdrop-blur-md text-gray-900 border border-gray-900/20 hover:bg-gray-900/20'
            }`}>
            <div className="flex items-center gap-2">
              <ArrowLeft size={18} />← Back
            </div>
          </button>
        </header>

        <main className="max-w-7xl mx-auto space-y-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`backdrop-blur-md border rounded-2xl p-6 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/70 hover:border-gray-700' 
                  : 'bg-white/80 border-gray-200/50 hover:bg-white/90 hover:border-gray-300'
                }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.includes('+') ? 'text-green-500' : stat.change.includes('ago') ? 'text-gray-500' : 'text-red-500'
                  }`}>{stat.change}</span>
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                <div className={`mt-4 w-full h-1 rounded-full bg-gradient-to-r ${stat.gradient} opacity-30`} />
              </div>
            ))}
          </div>

          {/* Feature Navigation */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <button key={index} onClick={feature.action} className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                    isDark ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/70' 
                    : 'bg-white/80 border-gray-200/50 hover:bg-white/90'
                  }`}>
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Activity & Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`backdrop-blur-md border rounded-2xl p-6 ${
              isDark ? 'bg-gray-900/50 border-gray-800/50' : 'bg-white/80 border-gray-200/50'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>📋 Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'info' ? 'bg-blue-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{activity.action}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`backdrop-blur-md border rounded-2xl p-6 ${
              isDark ? 'bg-gray-900/50 border-gray-800/50' : 'bg-white/80 border-gray-200/50'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>🛠️ System Status</h3>
              <div className="space-y-4">
                {[
                  { service: "Blockchain Network", status: "Operational", uptime: "99.9%" },
                  { service: "AI Verification", status: "Operational", uptime: "99.8%" },
                  { service: "Data Storage", status: "Operational", uptime: "100%" },
                  { service: "API Gateway", status: "Maintenance", uptime: "98.5%" }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.service}</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Uptime: {service.uptime}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.status === 'Operational' ? 'bg-green-100 text-green-800' 
                      : service.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                    }`}>{service.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={!!currentModal} onClose={() => setCurrentModal(null)} title={getModalTitle()} isDark={isDark}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Dashboard;