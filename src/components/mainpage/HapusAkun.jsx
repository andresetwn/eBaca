"use client";

export default function HapusAkun({ isOpen, onClose, onConfirm }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Anda belum login. Silakan login terlebih dahulu.");
        return;
      }

      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Akun berhasil dihapus!");
        onConfirm();
        onClose();
      } else {
        alert(data.message || "Terjadi kesalahan saat menghapus akun.");
      }
    } catch (err) {
      console.error("Kesalahan saat menghapus akun:", err);
      alert("Terjadi kesalahan server. Silakan coba lagi.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-red-600 text-center">
          Hapus Akun
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat
          dibatalkan.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Hapus
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
