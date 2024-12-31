import jwt from "jsonwebtoken";

export async function GET(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new Response(
      JSON.stringify({ message: "Authorization header missing" }),
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return new Response(JSON.stringify({ message: "Token missing" }), {
      status: 401,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Contoh data profil pengguna, Anda bisa mengganti ini dengan data dari database
    return new Response(
      JSON.stringify({ message: "Access granted", user: decoded }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Invalid or expired token" }),
      { status: 401 }
    );
  }
}
