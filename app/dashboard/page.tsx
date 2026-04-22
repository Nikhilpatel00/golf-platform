"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

import { motion } from "framer-motion";

/* ---------------- MEDAL LOGIC ---------------- */
const getMedal = (index: number) => {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return `#${index + 1}`;
};

/* ---------------- COMPONENT ---------------- */
export default function Dashboard() {
  const [players, setPlayers] = useState<any[]>([]);
  const [animatedScores, setAnimatedScores] = useState<number[]>([]);

  /* ---------------- FETCH ---------------- */
  const fetchPlayers = async () => {
    const { data, error } = await supabase.from("players").select("*");

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    setPlayers(data || []);
  };

  /* ---------------- REALTIME ---------------- */
  useEffect(() => {
    fetchPlayers();

    const channel = supabase
      .channel("players-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "players" },
        () => {
          fetchPlayers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ---------------- SORT ---------------- */
  const sorted = [...players].sort((a, b) => b.score - a.score);

  /* ---------------- SAFE ANIMATION (NO LOOP) ---------------- */
  useEffect(() => {
    if (!sorted.length) return;

    const intervals: NodeJS.Timeout[] = [];

    const initial = sorted.map(() => 0);
    setAnimatedScores(initial);

    sorted.forEach((p, i) => {
      let count = 0;

      const interval = setInterval(() => {
        count += Math.ceil(p.score / 20);

        if (count >= p.score) {
          count = p.score;
          clearInterval(interval);
        }

        setAnimatedScores((prev) => {
          if (prev[i] === count) return prev;

          const copy = [...prev];
          copy[i] = count;
          return copy;
        });
      }, 25);

      intervals.push(interval);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [players.length]); // ✅ IMPORTANT FIX

  /* ---------------- GRAPH COLORS ---------------- */
  const colors = ["#FFD700", "#C0C0C0", "#CD7F32", "#ef4444"];

  return (
    <div className="p-6">

      {/* TITLE */}
      <h1 className="text-3xl text-center text-red-500 mb-8 font-bold">
        Dashboard
      </h1>

      {/* ---------------- STATS ---------------- */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">

        <motion.div whileHover={{ scale: 1.05 }} className="card text-center">
          Players
          <p className="text-2xl font-bold">{players.length}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="card text-center">
          Avg
          <p className="text-2xl font-bold">
            {players.length
              ? (
                  players.reduce((a, b) => a + b.score, 0) /
                  players.length
                ).toFixed(1)
              : 0}
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="card text-center">
          Top
          <p className="text-2xl font-bold">
            {players.length ? Math.max(...players.map(p => p.score)) : 0}
          </p>
        </motion.div>

      </div>

      {/* ---------------- GRAPH ---------------- */}
      <div className="card max-w-3xl mx-auto mb-10 h-[350px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                borderRadius: "10px",
                border: "1px solid #444",
              }}
            />

            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {sorted.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index] || "#ef4444"}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* ---------------- LEADERBOARD ---------------- */}
      <div className="max-w-2xl mx-auto space-y-3">

        {sorted.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card flex justify-between items-center"
          >

            <span className="font-semibold text-lg flex items-center gap-2">
              {getMedal(i)} {p.name}
            </span>

            <span className="text-red-400 font-bold text-xl">
              {animatedScores[i] || 0}
            </span>

          </motion.div>
        ))}

      </div>
    </div>
  );
}