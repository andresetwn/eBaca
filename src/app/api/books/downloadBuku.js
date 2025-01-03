import { authMiddleware } from "../../../middleware/authMiddleware";
import fs from "fs";
import path from "path";

export async function GET(req, res) {
  authMiddleware(req, res, async () => {
    const { id_buku } = req.query;

    // Periksa apakah id_buku ada
    if (!id_buku) {
      return res.status(400).json({ message: "ID buku tidak ditemukan" });
    }

    // Logika untuk mencari file buku berdasarkan id_buku
    const filePath = path.join(__dirname, `/path/to/your/files/${id_buku}.pdf`);

    try {
      if (fs.existsSync(filePath)) {
        res.download(filePath); // Kirim file untuk diunduh
      } else {
        res.status(404).json({ message: "Buku tidak ditemukan" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Terjadi kesalahan saat mengunduh buku" });
    }
  });
}
