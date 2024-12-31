import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(request) {
  try {
    console.log("🚀 Login endpoint hit!");

    const { username, password } = await request.json();
    console.log("Request body:", { username, password });

    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: "Username and password are required" }),
        { status: 400 }
      );
    }

    const [users] = await db.query(
      "SELECT * FROM pengguna WHERE username = ?",
      [username]
    );
    console.log("Database query result:", users);

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid username or password" }),
        { status: 401 }
      );
    }

    const user = users[0];
    console.log("User found:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid username or password" }),
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("✅ Token generated:", token);

    return new Response(JSON.stringify({ message: "Login berhasil", token }), {
      status: 200,
    });
  } catch (error) {
    console.error("❌ Server error occurred:", error);
    return new Response(
      JSON.stringify({ message: "Server error", details: error.message }),
      { status: 500 }
    );
  }
}
