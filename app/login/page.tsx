"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white fade-in">
      
      <div className="p-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-700 shadow-2xl w-96 card-hover">
        
        <h1 className="text-3xl mb-6 text-center">Login</h1>

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-white/20"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-white/20"
        />

        <button className="w-full py-3 bg-black rounded btn-glow">
          Login
        </button>

      </div>
    </div>
  );
}