import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(request) {
  try {
    await db.getConnection();
    console.log("✅ Database connected successfully!");

    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    const [existingUser] = await db.query(
      "SELECT * FROM pengguna WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully!");

    await db.query(
      "INSERT INTO pengguna (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    console.log("✅ Pengguna berhasil didaftarkan!");

    return new Response(
      JSON.stringify({ message: "Pengguna berhasil didaftarkan!" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("❌ Error during signup:", error.message);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
