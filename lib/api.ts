import type { Booking, UserAccount } from "@/types/booking";

export async function loginRequest(username: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login gagal.");
  }

  return data.user as UserAccount;
}

export async function getBookingsRequest() {
  const response = await fetch("/api/bookings", {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gagal mengambil data booking.");
  }

  return data.bookings as Booking[];
}

export async function createBookingRequest(
  booking: Omit<Booking, "id" | "createdAt">,
) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gagal membuat booking.");
  }

  return data.booking as Booking;
}

export async function deleteBookingRequest(id: string) {
  const response = await fetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gagal menghapus booking.");
  }

  return data;
}

export async function changePasswordRequest(
  username: string,
  password?: string,
) {
  const response = await fetch("/api/auth/change-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gagal mengubah data login.");
  }

  return data.user as UserAccount;
}
