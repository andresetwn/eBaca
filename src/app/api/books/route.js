import { dbBooks } from "../../db";

export async function GET(req) {
  try {
    const { search, category } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    let query = "SELECT * FROM buku";
    const queryParams = [];

    if (search) {
      query += " WHERE judul LIKE ?";
      queryParams.push(`%${search}%`);
    }

    if (category) {
      query += search ? " AND kategori = ?" : " WHERE kategori = ?";
      queryParams.push(category);
    }

    const [rows] = await dbBooks.query(query, queryParams);

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return new Response(JSON.stringify({ message: "Error fetching books" }), {
      status: 500,
    });
  }
}
