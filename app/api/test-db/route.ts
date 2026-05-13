import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookingCount = await prisma.booking.count();
    const userCount = await prisma.userAccount.count();

    return NextResponse.json({
      message: "Database berhasil terhubung.",
      bookingCount,
      userCount,
    });
  } catch (error) {
    console.error("TEST_DB_ERROR", error);

    return NextResponse.json(
      {
        message: "Database gagal terhubung.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
