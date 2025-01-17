import { dbUsers } from "../../../db";
import bcrypt from "bcrypt";
import { SignJWT } from "jose"; // Import jose untuk membuat token

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Cari pengguna berdasarkan username
    const [users] = await dbUsers.query(
      "SELECT * FROM pengguna WHERE username = ?",
      [username]
    );

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ message: "Nama pengguna atau kata sandi salah." }),
        { status: 401 }
      );
    }

    const user = users[0];

    // Verifikasi kata sandi
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Nama pengguna atau kata sandi salah." }),
        { status: 401 }
      );
    }

    // Buat token menggunakan jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Gunakan TextEncoder untuk encoding
    const token = await new SignJWT({ id: user.id, username: user.username }) // Payload token
      .setProtectedHeader({ alg: "HS256" }) // Header
      .setExpirationTime("1h") // Waktu kadaluwarsa
      .sign(secret); // Tandatangani token dengan secret

    console.log("Token yang dibuat:", token);

    // Berikan respons sukses
    return new Response(
      JSON.stringify({
        message: "Login berhasil!",
        token,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Kesalahan saat login:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan server." }),
      { status: 500 }
    );
  }
}
