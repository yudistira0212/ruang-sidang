"use client";

import { useMemo, useState } from "react";
import type { Booking, DayName, ProgramStudi } from "@/types/booking";
import { PROGRAM_STUDI, DAYS, TIME_SLOTS } from "@/data/schedule";
import { createBookingRequest } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

interface BookingFormProps {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  reloadBookings: () => Promise<void>;
}

export default function BookingForm({
  bookings,
  setBookings,
  reloadBookings,
}: BookingFormProps) {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [programStudi, setProgramStudi] = useState<ProgramStudi | "">("");
  const [hari, setHari] = useState<DayName | "">("");
  const [jam, setJam] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const availableTimeSlots = useMemo(() => {
    if (!hari) return [];

    const bookedTimes = bookings
      .filter((booking) => booking.hari === hari)
      .map((booking) => booking.jam);

    return TIME_SLOTS[hari].filter((slot) => !bookedTimes.includes(slot));
  }, [hari, bookings]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      if (!nama.trim() || !nim.trim() || !programStudi || !hari || !jam) {
        setError("Semua form wajib diisi.");
        return;
      }

      const newBooking = await createBookingRequest({
        nama,
        nim,
        programStudi,
        hari,
        jam,
      });

      setBookings((previousBookings) => [...previousBookings, newBooking]);
      await reloadBookings();

      setNama("");
      setNim("");
      setProgramStudi("");
      setHari("");
      setJam("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal membuat booking.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-fit rounded-xl bg-white p-8 shadow transition duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-7">
        Form Pendaftaran Ruang Sidang
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-bold text-slate-800 mb-2">
            Nama Lengkap
          </label>
          <input
            value={nama}
            onChange={(event) => setNama(event.target.value)}
            placeholder="Masukkan nama lengkap"
            className="w-full h-14 border border-slate-300 rounded-lg px-4 text-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-2">NIM</label>
          <input
            value={nim}
            onChange={(event) => setNim(event.target.value)}
            placeholder="Masukkan NIM"
            className="w-full h-14 border border-slate-300 rounded-lg px-4 text-lg outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-2">
            Program Studi
          </label>
          <select
            value={programStudi}
            onChange={(event) =>
              setProgramStudi(event.target.value as ProgramStudi)
            }
            className="w-full h-14 border border-slate-300 rounded-lg px-4 text-lg outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Pilih Program Studi</option>
            {PROGRAM_STUDI.map((prodi) => (
              <option key={prodi} value={prodi}>
                {prodi}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-2">Hari</label>
          <select
            value={hari}
            onChange={(event) => {
              setHari(event.target.value as DayName);
              setJam("");
            }}
            className="w-full h-14 border border-slate-300 rounded-lg px-4 text-lg outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Pilih Hari</option>
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-800 mb-2">Jam</label>
          <select
            value={jam}
            onChange={(event) => setJam(event.target.value)}
            disabled={!hari}
            className="w-full h-14 border border-slate-300 rounded-lg px-4 text-lg outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-slate-100"
          >
            <option value="">
              {hari ? "Pilih Jam" : "Pilih hari terlebih dahulu"}
            </option>

            {availableTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-slate-600 text-lg font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-lg disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
        >
          {loading && <LoadingSpinner size={20} />}
          {loading ? "Menyimpan booking..." : "Buat Booking"}
        </button>
      </form>

      <div className="mt-8 border border-yellow-300 bg-yellow-50 rounded-lg p-5">
        <h3 className="font-extrabold text-slate-900 mb-3">
          Petunjuk Penggunaan:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-slate-800">
          <li>Isi form pendaftaran dengan lengkap</li>
          <li>Pilih hari dan jam yang tersedia</li>
          <li>Klik tombol Buat Booking</li>
          <li>Booking akan langsung masuk di jadwal</li>
        </ol>
      </div>
    </div>
  );
}
