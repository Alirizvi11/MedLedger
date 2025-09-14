import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stats')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Failed to fetch stats:', err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>📡 Loading stats...</div>;
  if (!stats) return <div>⚠️ No stats available</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>📊 MedLedger2 Dashboard</h2>
      <ul>
        <li><strong>Total Medicines:</strong> {stats.totalMedicines}</li>
        <li><strong>Total Donors:</strong> {stats.totalDonors}</li>
        <li><strong>Total Organs:</strong> {stats.totalOrgans}</li>
        <li><strong>Last Updated:</strong> {new Date(stats.timestamp).toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default StatsDashboard;
