import { dbBooks } from "../../../db";

export async function GET() {
  try {
    const query = `
      SELECT b.*
      FROM buku b
      INNER JOIN (
        SELECT kategori, MIN(id_buku) AS min_id
        FROM buku
        GROUP BY kategori
      ) AS subquery
      ON b.kategori = subquery.kategori AND b.id_buku = subquery.min_id
    `;

    const [rows] = await dbBooks.query(query);

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Tidak ada buku ditemukan" }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching rekomendasi books:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan server" }),
      { status: 500 }
    );
  }
}
