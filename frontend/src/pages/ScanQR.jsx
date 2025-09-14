import { useState } from 'react';
import { QrReader } from "react-qr-reader"; // ✅


function ScanQR() {
  const [scanResult, setScanResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      console.log('✅ Scanned:', data);
    }
  };

  const handleError = (err) => {
    console.error('❌ Scan error:', err);
  };

  return (
    <div className="glass-container">
      <h2>📷 Scan QR Code</h2>
      <div className="glass-card">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {scanResult && (
        <div className="glass-card">
          <h3>🔍 Scanned Result</h3>
          <p>{scanResult}</p>
          <a href={scanResult} target="_blank" rel="noopener noreferrer">Open Link</a>
        </div>
      )}
    </div>
  );
}

export default ScanQR;
