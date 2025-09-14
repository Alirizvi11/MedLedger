export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Total Donors" value={stats?.donors || "—"} change="+2%" />
      <StatCard label="Verified Medicines" value={stats?.batches || "—"} change="+2%" />
      <StatCard label="Active Transactions" value={stats?.transactions || "—"} change="+2%" />
      <StatCard label="Latest CID" value={stats?.latestCID || "—"} change="2m ago" />
    </div>
  );
}

function StatCard({ label, value, change }) {
  return (
    <div className="bg-card p-4 rounded shadow text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-xs text-green-500">{change}</p>
    </div>
  );
}
