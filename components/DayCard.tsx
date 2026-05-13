"use client";

import { useState } from "react";
import { CalendarDays, Clock, GraduationCap, Trash2, User } from "lucide-react";
import type { Booking, DayName } from "@/types/booking";
import { deleteBookingRequest } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

interface DayCardProps {
  day: DayName;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  reloadBookings: () => Promise<void>;
}

export default function DayCard({
  day,
  bookings,
  setBookings,
  reloadBookings,
}: DayCardProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    const confirmation = confirm("Yakin ingin menghapus booking ini?");

    if (!confirmation) return;

    try {
      setDeletingId(id);

      await deleteBookingRequest(id);

      setBookings((previousBookings) =>
        previousBookings.filter((booking) => booking.id !== id),
      );

      await reloadBookings();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal menghapus booking.";
      alert(message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-xl bg-purple-700 p-6 text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays size={26} />
          <h3 className="text-2xl font-extrabold">{day}</h3>
        </div>

        <span className="rounded-full bg-yellow-400 px-6 py-2 font-bold text-purple-800 shadow-sm">
          {bookings.length} booking
        </span>
      </div>

      {bookings.length === 0 ? (
        <p className="py-8 text-center text-lg opacity-90">
          Belum ada booking untuk hari {day}
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isDeleting = deletingId === booking.id;

            return (
              <div
                key={booking.id}
                className={`relative rounded-xl bg-yellow-50 p-5 text-slate-900 shadow-sm transition duration-300 ${
                  isDeleting
                    ? "scale-[0.98] opacity-60"
                    : "hover:-translate-y-0.5 hover:shadow-lg"
                }`}
              >
                <button
                  onClick={() => handleDelete(booking.id)}
                  disabled={isDeleting}
                  className="absolute right-5 top-5 rounded-lg p-1 text-red-500 transition hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  title="Hapus booking"
                >
                  {isDeleting ? (
                    <LoadingSpinner size={22} />
                  ) : (
                    <Trash2 size={24} />
                  )}
                </button>

                <div className="space-y-4 pr-10">
                  <div className="flex items-center gap-3">
                    <Clock className="text-purple-700" size={23} />
                    <p className="text-xl font-bold">{booking.jam}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <User className="text-slate-500" size={21} />
                      <p className="text-lg font-semibold">{booking.nama}</p>
                    </div>

                    <p className="text-lg text-slate-600">NIM: {booking.nim}</p>
                  </div>

                  <div className="flex items-center gap-3 text-purple-700">
                    <GraduationCap size={22} />
                    <p className="text-xl font-bold">{booking.programStudi}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
