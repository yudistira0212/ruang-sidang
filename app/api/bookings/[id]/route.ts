import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID booking tidak ditemukan." },
        { status: 400 },
      );
    }

    await prisma.booking.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Booking berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE_BOOKING_ERROR", error);

    return NextResponse.json(
      { message: "Gagal menghapus booking." },
      { status: 500 },
    );
  }
}
