import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      
      {/* MAIN CARD */}
      <div className="bg-gradient-to-br from-red-900 via-red-700 to-black p-10 rounded-3xl shadow-2xl border border-red-500 text-center w-[420px]">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-red-400 mb-2">
          🏌️ Golf Platform
        </h1>

        <p className="text-gray-300 mb-8">
          Track performance like a pro
        </p>

        {/* BUTTONS (ALL SAME STYLE) */}
        <div className="grid grid-cols-2 gap-4 mb-8">

          <Link href="/signup" className="btn-main">
            Signup
          </Link>

          <Link href="/login" className="btn-main">
            Login
          </Link>

          <Link href="/dashboard" className="btn-main">
            Dashboard
          </Link>

          <Link href="/admin" className="btn-main">
            Admin
          </Link>

        </div>

        {/* STATS */}
        <div className="bg-black/40 rounded-xl p-4 border border-red-500 text-gray-300 text-sm">
          <p>👥 Players: <span className="text-red-400 font-semibold">8</span></p>
          <p>📊 Avg Score: <span className="text-red-400 font-semibold">70.5</span></p>
        </div>

      </div>
    </div>
  );
}