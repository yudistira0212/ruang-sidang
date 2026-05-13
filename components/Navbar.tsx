"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  KeyRound,
  LogOut,
  UserCircle,
} from "lucide-react";
import { getSessionUser, logout } from "@/lib/auth";

interface NavbarProps {
  onOpenPasswordModal: () => void;
}

export default function Navbar({ onOpenPasswordModal }: NavbarProps) {
  const router = useRouter();
  const user = getSessionUser();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function handleOpenPasswordModal() {
    setIsProfileOpen(false);
    onOpenPasswordModal();
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-[80px] bg-purple-700 px-6 py-5 text-white shadow-lg">
      <div className="flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <CalendarDays size={34} />

          <div>
            <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
              Sistem Pendaftaran Ruang Sidang
            </h1>
            <p className="text-base md:text-lg">Universitas Papua</p>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((previous) => !previous)}
            className="flex items-center gap-3 rounded-xl bg-purple-800 px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:bg-purple-900 hover:shadow-lg"
          >
            <div className="hidden text-right md:block">
              <p className="text-sm leading-tight">
                {user?.programStudi || "Teknik Informatika"}
              </p>
              <p className="font-bold leading-tight">
                {user?.username || "kaprodi_informatika"}
              </p>
            </div>

            <UserCircle size={34} />

            <ChevronDown
              size={20}
              className={`transition ${
                isProfileOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] w-64 animate-[modalIn_0.18s_ease-out] overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
              <div className="border-b border-slate-200 px-4 py-4">
                <p className="text-sm text-slate-500">Login sebagai</p>
                <p className="font-bold">
                  {user?.username || "kaprodi_informatika"}
                </p>
                <p className="text-sm text-slate-600">
                  {user?.programStudi || "Teknik Informatika"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenPasswordModal}
                className="flex w-full items-center gap-3 px-4 py-3 text-left font-semibold transition hover:bg-slate-100"
              >
                <KeyRound size={20} className="text-purple-700" />
                Ubah Password
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-left font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
