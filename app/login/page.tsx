"use client";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">

      <div className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-[300px]">

        <h1 className="text-2xl text-purple-400 mb-4 text-center">
          Login
        </h1>

        <input placeholder="Email" className="input" />
        <input placeholder="Password" type="password" className="input" />

        <button className="btn-purple w-full mt-4">
          Login
        </button>

      </div>
    </div>
  );
}