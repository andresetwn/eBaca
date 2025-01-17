import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  console.log("Middleware aktif. URL:", req.url);

  // Ambil token dari header Authorization
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Token tidak ditemukan atau salah format.");
    return NextResponse.json(
      { message: "Token tidak ditemukan atau salah format." },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("Payload token:", payload);

    const modifiedHeaders = new Headers(req.headers);
    modifiedHeaders.set("userId", payload.id);

    console.log("Middleware berhasil menambahkan userId:", payload.id);

    return NextResponse.next({
      request: {
        headers: modifiedHeaders,
      },
    });
  } catch (error) {
    console.error("Kesalahan validasi token:", error.message);
    return NextResponse.json(
      { message: "Token tidak valid atau kadaluwarsa." },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/users/:path*"],
};
