import { dbUsers } from "../../../db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Semua kolom wajib diisi." }),
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: "Format email tidak valid." }),
        { status: 400 }
      );
    }

    const [existingUser] = await dbUsers.query(
      "SELECT * FROM pengguna WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({ message: "Email sudah terdaftar." }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await dbUsers.query(
      "INSERT INTO pengguna (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return new Response(JSON.stringify({ message: "Pendaftaran berhasil!" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Kesalahan pada saat pendaftaran:", error);
    return new Response(
      JSON.stringify({
        message: "Terjadi kesalahan server.",
        detail: error.message,
      }),
      { status: 500 }
    );
  }
}
