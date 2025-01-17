"use client";

import { useState } from "react";

export default function UbahSandi({ isOpen, onClose, onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          action: "ubah-sandi",
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Kata sandi berhasil diubah!");
        onSubmit();
        onClose();
      } else {
        setError(data.message || "Terjadi kesalahan saat mengubah kata sandi.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
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
          Ubah Kata Sandi
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="currentPassword" className="block mb-2 text-gray-600">
            Kata Sandi Saat Ini:
          </label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Masukkan kata sandi saat ini"
            className="w-full border text-black border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-red-600 outline-none"
            required
          />
          <label htmlFor="newPassword" className="block mb-2 text-gray-600">
            Kata Sandi Baru:
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Masukkan kata sandi baru"
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
