import { dbUsers } from "../../db";
import bcrypt from "bcrypt";
import { jwtVerify } from "jose";

export async function PUT(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Token tidak ditemukan atau salah format." }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    let userId;
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      userId = payload.id;
    } catch (error) {
      console.error("Kesalahan validasi token:", error.message);
      return new Response(
        JSON.stringify({ message: "Token tidak valid atau kadaluwarsa." }),
        { status: 401 }
      );
    }

    console.log("User ID dari token:", userId);

    const { action, newUsername, currentPassword, newPassword } =
      await req.json();

    if (action === "ubah-nama") {
      if (!newUsername) {
        return new Response(
          JSON.stringify({ message: "Nama pengguna baru wajib diisi." }),
          { status: 400 }
        );
      }

      console.log("Menjalankan query ubah nama:", userId, newUsername);

      const [result] = await dbUsers.query(
        "UPDATE pengguna SET username = ? WHERE id = ?",
        [newUsername, userId]
      );

      if (result.affectedRows === 0) {
        return new Response(
          JSON.stringify({ message: "Gagal mengubah nama pengguna." }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({ message: "Nama pengguna berhasil diubah." }),
        { status: 200 }
      );
    }

    if (action === "ubah-sandi") {
      if (!currentPassword || !newPassword) {
        return new Response(
          JSON.stringify({
            message: "Kata sandi saat ini dan kata sandi baru wajib diisi.",
          }),
          { status: 400 }
        );
      }

      console.log(
        "Menjalankan query validasi kata sandi untuk userId:",
        userId
      );

      const [users] = await dbUsers.query(
        "SELECT password FROM pengguna WHERE id = ?",
        [userId]
      );

      if (users.length === 0) {
        return new Response(
          JSON.stringify({ message: "Pengguna tidak ditemukan." }),
          { status: 404 }
        );
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        users[0].password
      );

      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ message: "Kata sandi saat ini salah." }),
          { status: 401 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const [result] = await dbUsers.query(
        "UPDATE pengguna SET password = ? WHERE id = ?",
        [hashedPassword, userId]
      );

      if (result.affectedRows === 0) {
        return new Response(
          JSON.stringify({ message: "Gagal mengubah kata sandi." }),
          { status: 500 }
        );
      }

      return new Response(
        JSON.stringify({ message: "Kata sandi berhasil diubah." }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ message: "Aksi tidak valid." }), {
      status: 400,
    });
  } catch (error) {
    console.error("Kesalahan server:", error.message);
    return new Response(
      JSON.stringify({
        message: "Terjadi kesalahan server.",
        detail: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Token tidak ditemukan atau salah format." }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    let userId;
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      userId = payload.id;
    } catch (error) {
      console.error("Kesalahan validasi token:", error.message);
      return new Response(
        JSON.stringify({ message: "Token tidak valid atau kadaluwarsa." }),
        { status: 401 }
      );
    }

    console.log("User ID dari token untuk DELETE:", userId);

    const [result] = await dbUsers.query("DELETE FROM pengguna WHERE id = ?", [
      userId,
    ]);

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({
          message: "Pengguna tidak ditemukan atau gagal dihapus.",
        }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ message: "Akun berhasil dihapus." }), {
      status: 200,
    });
  } catch (error) {
    console.error("Kesalahan server:", error.message);
    return new Response(
      JSON.stringify({
        message: "Terjadi kesalahan server.",
        detail: error.message,
      }),
      { status: 500 }
    );
  }
}
