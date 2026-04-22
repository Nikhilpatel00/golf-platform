"use client";

import { players } from "../../lib/data";

export default function Admin() {
  const totalScore = players.reduce((acc, p) => acc + p.score, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 to-black text-white p-10">

      <h1 className="text-3xl font-bold text-red-400 mb-6">
        Admin Panel
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="card">Total Players: {players.length}</div>
        <div className="card">Total Score: {totalScore}</div>
      </div>

      <div className="space-y-3">
        {players.map((p, i) => (
          <div key={i} className="player-card">
            {p.name} — {p.score}
          </div>
        ))}
      </div>

    </div>
  );
}