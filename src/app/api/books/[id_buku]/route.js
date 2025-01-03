import { dbBooks } from "../../../db";

export async function GET(req, { params }) {
  const { id_buku } = params;

  try {
    const [rows] = await dbBooks.query("SELECT * FROM buku WHERE id_buku = ?", [
      id_buku,
    ]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "Buku tidak ditemukan" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error fetching book detail:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan server" }),
      { status: 500 }
    );
  }
}
