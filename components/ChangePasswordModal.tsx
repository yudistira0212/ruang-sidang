"use client";

import { useState } from "react";
import { KeyRound, Save, X } from "lucide-react";
import { changePasswordRequest } from "@/lib/api";
import { getSessionUser, setLoginSession } from "@/lib/auth";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ChangePasswordModalProps {
  onClose: () => void;
}

export default function ChangePasswordModal({
  onClose,
}: ChangePasswordModalProps) {
  const currentUser = getSessionUser();

  const [username, setUsername] = useState(
    currentUser?.username || "kaprodi_informatika",
  );
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);

      if (!username.trim()) {
        setError("Username tidak boleh kosong.");
        return;
      }

      const updatedUser = await changePasswordRequest(
        username,
        password.trim() ? password : undefined,
      );

      setLoginSession(updatedUser);
      setMessage("Data login berhasil diperbarui.");

      setTimeout(() => {
        onClose();
      }, 800);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal mengubah data login.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl animate-[modalIn_0.2s_ease-out] rounded-xl bg-white p-10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-8 top-8 text-slate-500 hover:text-slate-800"
        >
          <X size={32} />
        </button>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
          Ubah Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block font-bold text-slate-700 mb-3">
              Username Baru
            </label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full h-16 border border-slate-300 rounded-lg px-5 text-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-3">
              Password Baru &#40;opsional&#41;
            </label>

            <div className="relative">
              <KeyRound
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={24}
              />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Kosongkan jika tidak ingin mengubah"
                className="w-full h-16 border border-slate-300 rounded-lg pl-14 pr-5 text-lg outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3">
              {message}
            </div>
          )}

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
            {loading ? <LoadingSpinner size={24} /> : <Save size={24} />}
            {loading ? "Menyimpan perubahan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}
