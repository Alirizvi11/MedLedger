import QRCode from 'react-qr-code';
import './QRViewer.css'; // optional styling

function QRViewer({ cid, label = 'IPFS CID', type = 'medicine' }) {
  const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
  return (
    <div className="glass-card">
      <h3>{label}</h3>
      <QRCode value={url} size={128} />
      <p className="cid-text">{cid}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">🔗 View on IPFS</a>
    </div>
  );
}

export default QRViewer;
