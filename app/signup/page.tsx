"use client";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white fade-in">
      
      <div className="p-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 shadow-2xl card-hover">
        
        <h1 className="text-2xl mb-6 text-center">Signup</h1>

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-white/20 focus:ring-2 focus:ring-green-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full py-3 bg-black rounded btn-glow">
          Signup
        </button>
      </div>
    </div>
  );
}