export default function DashboardPage() {
  const players = [
    { name: "Nikhil", score: 72 },
    { name: "Rahul", score: 68 },
    { name: "Arjun", score: 75 },
    { name: "Kiran", score: 70 },
    { name: "Vikram", score: 66 },
  ];

  // 📊 Calculations
  const totalPlayers = players.length;
  const totalScore = players.reduce((sum, p) => sum + p.score, 0);
  const averageScore = (totalScore / totalPlayers).toFixed(1);
  const bestScore = Math.min(...players.map(p => p.score));

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 fade-in">
      
      <h1 className="text-3xl text-blue-400 mb-8">
        Dashboard
      </h1>

      {/* 📊 Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 card-hover">
          <p className="text-sm">Total Players</p>
          <h2 className="text-2xl font-bold">{totalPlayers}</h2>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 card-hover">
          <p className="text-sm">Average Score</p>
          <h2 className="text-2xl font-bold">{averageScore}</h2>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 card-hover">
          <p className="text-sm">Best Score</p>
          <h2 className="text-2xl font-bold">{bestScore}</h2>
        </div>

      </div>

      {/* 🧑 Player List */}
      <div className="grid md:grid-cols-2 gap-6">
        {players.map((player, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 card-hover"
          >
            <h2 className="text-xl font-semibold">{player.name}</h2>
            <p className="text-2xl font-bold">{player.score}</p>
          </div>
        ))}
      </div>

    </div>
  );
}