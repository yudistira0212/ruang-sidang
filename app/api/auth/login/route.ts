import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi." },
        { status: 400 },
      );
    }

    const user = await prisma.userAccount.findUnique({
      where: {
        username,
      },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Username atau password salah." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      message: "Login berhasil.",
      user: {
        id: user.id,
        username: user.username,
        programStudi: user.programStudi,
      },
    });
  } catch (error) {
    console.error("LOGIN_ERROR", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
