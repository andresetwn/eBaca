import { dbUsers } from "../../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({
          message: "Nama pengguna dan kata sandi wajib diisi.",
        }),
        { status: 400 }
      );
    }

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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Nama pengguna atau kata sandi salah." }),
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({
        message: "Login berhasil!",
        token,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Kesalahan pada saat login:", error);
    return new Response(
      JSON.stringify({
        message: "Terjadi kesalahan server.",
        detail: error.message,
      }),
      { status: 500 }
    );
  }
}
