export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Platform Overview</h2>
        <p className="text-muted-foreground">Monitor platform-wide activity</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Total Users</h3>
          <p className="text-2xl font-bold text-primary">0</p>
        </div>
        
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Active Spaces</h3>
          <p className="text-2xl font-bold text-primary">0</p>
        </div>
        
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Messages Today</h3>
          <p className="text-2xl font-bold text-primary">0</p>
        </div>
        
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">System Health</h3>
          <p className="text-2xl font-bold text-green-600">OK</p>
        </div>
      </div>
    </div>
  )
}