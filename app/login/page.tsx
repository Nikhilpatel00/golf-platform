"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">

      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-800 animate-fadeIn">

        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-gray-800 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none transition"
        />

        {/* BUTTON */}
        <button
          className="w-full bg-red-600 hover:bg-red-700 transform hover:scale-[1.03] transition duration-300 p-3 rounded font-semibold shadow-lg"
        >
          Login
        </button>

        {/* LINK */}
        <p className="text-center text-gray-400 mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-400 hover:underline">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}