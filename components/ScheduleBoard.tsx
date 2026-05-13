"use client";

import type { Booking } from "@/types/booking";
import { DAYS } from "@/data/schedule";
import DayCard from "@/components/DayCard";

interface ScheduleBoardProps {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  reloadBookings: () => Promise<void>;
}

export default function ScheduleBoard({
  bookings,
  setBookings,
  reloadBookings,
}: ScheduleBoardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-5">
        Jadwal Ruang Sidang
      </h2>

      <p className="text-xl text-purple-700 mb-8">
        <span className="font-bold">Total Booking:</span> {bookings.length}{" "}
        booking terdaftar
      </p>

      <div className="space-y-5">
        {DAYS.map((day) => {
          const dayBookings = bookings.filter(
            (booking) => booking.hari === day,
          );

          return (
            <DayCard
              key={day}
              day={day}
              bookings={dayBookings}
              setBookings={setBookings}
              reloadBookings={reloadBookings}
            />
          );
        })}
      </div>
    </div>
  );
}
