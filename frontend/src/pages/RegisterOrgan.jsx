import { useState } from 'react';
import QRViewer from '../components/QRViewer.jsx';

function RegisterOrgan({ onBack, isDark, onToggleTheme }) {
  const [form, setForm] = useState({ 
    name: '', 
    organ: '', 
    bloodGroup: '', 
    location: '' 
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/organ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      const data = await response.json();
      setResult(data);
      
      // Clear form after success
      setForm({ name: '', organ: '', bloodGroup: '', location: '' });
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register organ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
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
              ? 'bg-gradient-to-r from-red-400 to-pink-500' 
              : 'bg-gradient-to-r from-red-600 to-pink-600'
          }`}>
            Register Organ Donor
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Register organ donation details on the blockchain
          </p>
        </div>

        <div className={`backdrop-blur-md border rounded-2xl p-6 mb-6 ${
          isDark 
            ? 'bg-gray-900/50 border-gray-800/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter donor name"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full p-3 rounded-xl border transition-colors ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Organ Type
                </label>
                <select
                  value={form.organ}
                  onChange={(e) => handleInputChange('organ', e.target.value)}
                  className={`w-full p-3 rounded-xl border transition-colors ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white' 
                      : 'bg-white/80 border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  <option value="">Select organ</option>
                  <option value="Heart">Heart</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Liver">Liver</option>
                  <option value="Lungs">Lungs</option>
                  <option value="Pancreas">Pancreas</option>
                  <option value="Intestine">Intestine</option>
                  <option value="Cornea">Cornea</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Blood Group
                </label>
                <select
                  value={form.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  className={`w-full p-3 rounded-xl border transition-colors ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white' 
                      : 'bg-white/80 border-gray-300 text-gray-900'
                  }`}
                  required
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city/location"
                  value={form.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full p-3 rounded-xl border transition-colors ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:scale-[1.02]'
              } text-white`}
            >
              {loading ? "Registering..." : "Register Organ Donor"}
            </button>
          </form>
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

        {result && (
          <div className={`backdrop-blur-md border rounded-2xl p-6 mb-6 ${
            isDark 
              ? 'bg-gray-900/50 border-gray-800/50' 
              : 'bg-white/80 border-gray-200/50'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Registration Successful!
            </h3>
            
            <div className="space-y-2 mb-6">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Donor ID:</strong> {result.donorId || 'Generated'}
              </p>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Transaction Hash:</strong> 
                <code className="ml-2 text-sm">{result.txHash}</code>
              </p>
            </div>

            {result.cid && (
              <QRViewer cid={result.cid} label="Organ Donor Record" type="organ" />
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

export default RegisterOrgan;