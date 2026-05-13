import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: [
        {
          hari: "asc",
        },
        {
          jam: "asc",
        },
      ],
    });

    return NextResponse.json({
      bookings,
    });
  } catch (error) {
    console.error("GET_BOOKINGS_ERROR", error);

    return NextResponse.json(
      { message: "Gagal mengambil data booking." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, nim, programStudi, hari, jam } = body;

    if (!nama || !nim || !programStudi || !hari || !jam) {
      return NextResponse.json(
        { message: "Semua form wajib diisi." },
        { status: 400 },
      );
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        hari,
        jam,
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "Jam ini sudah dibooking. Silakan pilih jam lain." },
        { status: 409 },
      );
    }

    const booking = await prisma.booking.create({
      data: {
        nama,
        nim,
        programStudi,
        hari,
        jam,
      },
    });

    return NextResponse.json(
      {
        message: "Booking berhasil dibuat.",
        booking,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE_BOOKING_ERROR", error);

    return NextResponse.json(
      { message: "Gagal membuat booking." },
      { status: 500 },
    );
  }
}
