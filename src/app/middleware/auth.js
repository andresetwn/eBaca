// src/middleware/auth.js

import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.headers.get("Authorization")?.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ message: "Anda perlu login untuk mengakses file ini" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan user terautentikasi dalam request untuk digunakan di handler berikutnya
    next(); // Melanjutkan ke handler berikutnya jika token valid
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token tidak valid atau kadaluwarsa" });
  }
};
