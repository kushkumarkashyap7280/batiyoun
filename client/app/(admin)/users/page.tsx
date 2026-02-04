export default function SystemUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-muted-foreground">View and manage all platform users</p>
      </div>
      
      <div className="border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No users registered yet</p>
      </div>
    </div>
  )
}