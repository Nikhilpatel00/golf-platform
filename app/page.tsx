import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center fade-in">
      
      <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-black via-red-900 to-black shadow-2xl">
        
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          🏌️ Golf Platform
        </h1>

        <p className="text-gray-300 mb-6">
          Track scores and improve your game
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/signup" className="px-5 py-2 bg-red-600 rounded btn-glow">
            Signup
          </Link>

          <Link href="/login" className="px-5 py-2 bg-red-600 rounded btn-glow">
            Login
          </Link>

          <Link href="/dashboard" className="px-5 py-2 bg-red-600 rounded btn-glow">
            Dashboard
          </Link>

          <Link href="/admin" className="px-5 py-2 bg-red-600 rounded btn-glow">
            Admin
          </Link>
        </div>

      </div>
    </div>
  );
}