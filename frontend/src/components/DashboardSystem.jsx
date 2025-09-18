export default function DashboardSystem() {
  return (
    <>
      <div className="bg-card p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">📋 Recent Activity</h2>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>New donor registered</li>
          <li>Medicine verification completed</li>
          <li>Transaction initiated</li>
          <li>Medicine confirmed on blockchain</li>
          <li>System health check</li>
        </ul>
      </div>

      <div className="bg-card p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">🛠️ System Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <StatusBadge label="Blockchain Network" status="Operational" />
          <StatusBadge label="IPFS Network" status="Operational" />
          <StatusBadge label="Smart Contracts" status="Operational" />
          <StatusBadge label="API Gateway" status="Maintenance" />
        </div>
      </div>
    </>
  );
}

function StatusBadge({ label, status }) {
  const color = status === "Operational" ? "text-green-500" : "text-yellow-500";
  return (
    <div className="bg-muted p-2 rounded text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm font-semibold ${color}`}>{status}</p>
    </div>
  );
}