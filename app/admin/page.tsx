"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  /* ---------------- FETCH ---------------- */
  const fetchPlayers = async () => {
    const { data } = await supabase
      .from("players")
      .select("*")
      .order("id", { ascending: false });

    setPlayers(data || []);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  /* ---------------- ADD / UPDATE ---------------- */
  const savePlayer = async () => {
    if (!name.trim() || !score) return;

    if (editId) {
      await supabase
        .from("players")
        .update({
          name: name.trim(),
          score: Number(score),
        })
        .eq("id", editId);
    } else {
      await supabase.from("players").insert([
        {
          name: name.trim(),
          score: Number(score),
        },
      ]);
    }

    setName("");
    setScore("");
    setEditId(null);
    fetchPlayers();
  };

  /* ---------------- DELETE ---------------- */
  const deletePlayer = async (id: number) => {
    await supabase.from("players").delete().eq("id", id);
    fetchPlayers();
  };

  /* ---------------- START EDIT ---------------- */
  const startEdit = (p: any) => {
    setName(p.name);
    setScore(String(p.score));
    setEditId(p.id);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* TITLE */}
      <h1 className="text-3xl text-center text-red-500 mb-8 font-bold">
        Admin Panel
      </h1>

      {/* ---------------- FORM ---------------- */}
      <div className="max-w-xl mx-auto bg-gray-900 p-6 rounded-xl mb-8 space-y-4">

        {/* PLAYER NAME */}
        <input
          placeholder="Enter Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
        />

        {/* SCORE */}
        <input
          placeholder="Enter Score"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
        />

        {/* BUTTON */}
        <button
          onClick={savePlayer}
          className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded font-semibold"
        >
          {editId ? "Update Player" : "Add Player"}
        </button>

        {/* CANCEL (ONLY IN EDIT) */}
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setName("");
              setScore("");
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 transition p-2 rounded"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* ---------------- LIST ---------------- */}
      <div className="max-w-xl mx-auto space-y-3">

        {players.map((p) => (
          <div
            key={p.id}
            className="bg-gray-900 p-4 rounded-lg flex justify-between items-center"
          >

            {/* PLAYER DATA */}
            <div>
              <p className="font-semibold text-lg">{p.name}</p>
              <p className="text-gray-400">Score: {p.score}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button
                onClick={() => startEdit(p)}
                className="px-4 py-1 border border-yellow-500 text-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition"
              >
                Edit
              </button>

              <button
                onClick={() => deletePlayer(p.id)}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}