"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import { setLoginSession } from "@/lib/auth";
import { loginRequest } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      if (!username.trim() || !password.trim()) {
        setError("Username dan password wajib diisi.");
        return;
      }

      const user = await loginRequest(username, password);

      setLoginSession(user);
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat login.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl rounded-xl bg-white px-10 py-12 shadow-2xl transition duration-300 hover:shadow-purple-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-purple-700 leading-tight">
          Sistem Pendaftaran Ruang Sidang
        </h1>
        <p className="text-xl text-slate-700 mt-4">Universitas Papua</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label className="block font-bold text-slate-800 mb-3">
            Username
          </label>

          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={23}
            />
            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full h-16 border border-slate-300 rounded-lg pl-14 pr-4 text-xl outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-3">
            Password
          </label>

          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={23}
            />
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full h-16 border border-slate-300 rounded-lg pl-14 pr-4 text-xl outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-16 w-full items-center justify-center gap-3 rounded-lg bg-purple-700 text-lg font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-purple-800 hover:shadow-lg disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
        >
          {loading && <LoadingSpinner size={22} />}
          {loading ? "Memproses login..." : "Login"}
        </button>
      </form>

      <div className="text-center mt-8 text-slate-700">
        <p>Default credentials untuk testing:</p>
        <code className="text-sm">kaprodi_informatika / password123</code>
      </div>
    </div>
  );
}
