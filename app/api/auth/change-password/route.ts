import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username) {
      return NextResponse.json(
        { message: "Username tidak boleh kosong." },
        { status: 400 },
      );
    }

    const currentUser = await prisma.userAccount.findFirst();

    if (!currentUser) {
      return NextResponse.json(
        { message: "Data user belum tersedia. Silakan login ulang." },
        { status: 404 },
      );
    }

    const updatedUser = await prisma.userAccount.update({
      where: {
        id: currentUser.id,
      },
      data: {
        username,
        ...(password ? { password } : {}),
      },
    });

    return NextResponse.json({
      message: "Data login berhasil diperbarui.",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        programStudi: updatedUser.programStudi,
      },
    });
  } catch (error) {
    console.error("CHANGE_PASSWORD_ERROR", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
