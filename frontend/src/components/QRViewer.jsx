import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from 'html2canvas';

function QRViewer({ cid, label = 'IPFS CID', type = 'medicine' }) {
  const [qrError, setQrError] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrWrapperRef = useRef(null);

  if (!cid) {
    return (
      <div className="glass-card">
        <p className="error-text">⚠️ No CID provided</p>
      </div>
    );
  }

  const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = async () => {
    if (!qrWrapperRef.current) return;
    try {
      const canvas = await html2canvas(qrWrapperRef.current);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `CID-${cid}.png`;
      link.click();
    } catch (err) {
      console.error('QR download failed:', err);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'medicine': return '💊';
      case 'organ': return '🫀';
      case 'donor': return '🧬';
      default: return '📄';
    }
  };

  return (
    <div className="glass-card">
      <div className="qr-header">
        <span className="type-icon">{getTypeIcon(type)}</span>
        <h3>{label}</h3>
      </div>

      {!qrError ? (
        <div ref={qrWrapperRef} className="qr-container bg-white p-4 inline-block rounded">
          <QRCodeCanvas
           value={url}
           size={128}
           level="M"
           includeMargin={true}
           onError={() => setQrError(true)}
          aria-label={`QR code for ${label} with CID ${cid}`}
          />

        </div>
      ) : (
        <div className="qr-error">
          <p>❌ QR Code generation failed</p>
        </div>
      )}

      <div className="cid-section">
        <div className="cid-text-container">
          <code className="cid-text">{cid}</code>
          <button
            className="copy-btn"
            onClick={copyToClipboard}
            title="Copy CID"
          >
            {copied ? '✓' : '📋'}
          </button>
        </div>
      </div>

      <div className="actions space-y-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ipfs-link"
        >
          🔗 View on IPFS
        </a>
        <button
          className="verify-btn"
          onClick={() => window.open(`/verify/${cid}`, '_blank')}
        >
          ✅ Verify Record
        </button>
        <button
          className="download-btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleDownload}
        >
          ⬇️ Download QR Code
        </button>
      </div>
    </div>
  );
}

export default QRViewer;
