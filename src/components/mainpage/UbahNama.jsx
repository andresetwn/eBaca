"use client";

import { useEffect, useState } from "react";

export default function UbahNama({ isOpen, onClose, onSubmit }) {
  const [userId, setUserId] = useState(null);
  const [namaBaru, setNamaBaru] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token tidak ditemukan. Silakan login kembali.");
      return;
    }

    const decoded = decodeToken(token);
    if (decoded && decoded.id) {
      setUserId(decoded.id);
    } else {
      setError("Token tidak valid. Silakan login kembali.");
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Kesalahan saat mendekode token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "ubah-nama",
          newUsername: namaBaru,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Nama berhasil diubah!");
        onSubmit(namaBaru);
        onClose();
      } else {
        setError(data.message || "Terjadi kesalahan saat mengubah nama.");
      }
    } catch (err) {
      console.error("Kesalahan saat mengubah nama pengguna:", err);
      setError("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Ubah Nama Pengguna
        </h2>
        {/* Tampilkan ID Pengguna */}
        {userId && (
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>ID Pengguna:</strong> {userId}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block mb-2 text-gray-600">
            Nama Baru:
          </label>
          <input
            id="name"
            type="text"
            value={namaBaru}
            onChange={(e) => setNamaBaru(e.target.value)}
            placeholder="Masukkan nama baru"
            className="w-full border text-black border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-red-600 outline-none"
            required
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Simpan"}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
