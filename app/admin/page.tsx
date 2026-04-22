export default function AdminPage() {
  const actions = ["Add Player", "Update Score", "Manage Users"];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 fade-in">
      
      <h1 className="text-3xl text-orange-400 mb-6">
        Admin Panel
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {actions.map((a, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 card-hover"
          >
            {a}
          </div>
        ))}
      </div>

    </div>
  );
}