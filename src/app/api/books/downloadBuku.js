import jwt from "jsonwebtoken";
import { dbBooks } from "../../../db";

export async function GET(req, { params }) {
  const { id_buku } = params;
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return new Response("Login diperlukan untuk mendownload buku.", {
      status: 401,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [book] = await dbBooks.query("SELECT * FROM buku WHERE id_buku = ?", [
      id_buku,
    ]);

    if (!book) {
      return new Response("Buku tidak ditemukan", { status: 404 });
    }

    return new Response(JSON.stringify({ fileUrl: book[0].sumber }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Token tidak valid atau sudah kedaluwarsa.", {
      status: 401,
    });
  }
}
