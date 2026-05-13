"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Booking } from "@/types/booking";
import { isLoggedIn } from "@/lib/auth";
import { getBookingsRequest } from "@/lib/api";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import ScheduleBoard from "@/components/ScheduleBoard";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function DashboardPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");

  async function loadBookings() {
    try {
      setError("");
      const data = await getBookingsRequest();
      setBookings(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data booking.";

      setError(message);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function initializeDashboard() {
      if (!isLoggedIn()) {
        router.push("/login");
        return;
      }

      try {
        const data = await getBookingsRequest();

        if (isMounted) {
          setBookings(data);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Gagal mengambil data booking.";

        if (isMounted) {
          setError(message);
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    void initializeDashboard();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (!isReady) {
    return (
      <main className="min-h-screen bg-gray-100">
        <Navbar onOpenPasswordModal={() => setShowPasswordModal(true)} />

        <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-[98px]">
          <LoadingSpinner size={36} className="text-purple-700" />
          <p className="text-lg font-semibold text-slate-600">
            Memuat data booking...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-gray-100">
      <Navbar onOpenPasswordModal={() => setShowPasswordModal(true)} />

      <section className="grid h-screen grid-cols-1 gap-7 overflow-hidden px-3 pb-3 pt-[90px] lg:grid-cols-[440px_1fr]">
        <aside className="h-full overflow-y-auto pr-1">
          <BookingForm
            bookings={bookings}
            setBookings={setBookings}
            reloadBookings={loadBookings}
          />
        </aside>

        <section className="h-full overflow-y-auto pr-1">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <ScheduleBoard
            bookings={bookings}
            setBookings={setBookings}
            reloadBookings={loadBookings}
          />
        </section>
      </section>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </main>
  );
}
