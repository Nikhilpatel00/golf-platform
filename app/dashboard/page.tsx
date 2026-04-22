"use client";

import { players } from "../../lib/data";

export default function Dashboard() {
  const avg =
    players.reduce((acc, p) => acc + p.score, 0) / players.length;

  const best = Math.min(...players.map(p => p.score));

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card">👥 Players: {players.length}</div>
        <div className="card">📊 Avg Score: {avg.toFixed(1)}</div>
        <div className="card">🏆 Best Score: {best}</div>
      </div>

      {/* Players */}
      <div className="space-y-3">
        {players.map((p, i) => (
          <div key={i} className="player-card">
            <span>{p.name}</span>
            <span className="text-red-400">{p.score}</span>
          </div>
        ))}
      </div>

    </div>
  );
}