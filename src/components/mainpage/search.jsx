"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Search() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category

  const router = useRouter();

  // Daftar kategori
  const categories = [
    { name: "Teknologi", icon: "💻", bg: "/tech.svg" },
    { name: "Matematika", icon: "➗", bg: "/mtk.svg" },
    { name: "Sains", icon: "⚗️", bg: "/sains.svg" },
    { name: "Sosial", icon: "👥", bg: "/sosial.svg" },
    { name: "Sastra", icon: "📖", bg: "/sastra.svg" },
    { name: "Ekonomi", icon: "⚙️", bg: "/ekonomi.svg" },
  ];

  // Fungsi untuk mengambil data buku berdasarkan input pencarian
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/books?search=${encodeURIComponent(search)}`
      );
      if (!response.ok) {
        throw new Error("Gagal mengambil data buku.");
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil buku berdasarkan kategori
  const handleCategoryClick = async (category) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category); // Set the selected category

    try {
      const response = await fetch(
        `/api/books?category=${encodeURIComponent(category)}`
      );
      if (!response.ok) {
        throw new Error("Gagal mengambil data buku berdasarkan kategori.");
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk navigasi ke detail buku
  const handleDetailClick = (id_buku) => {
    router.push(`/detailpage/${id_buku}`);
  };

  return (
    <div className="min-h-screen bg-[url('/bgcari.svg')] bg-cover bg-center flex flex-col items-center justify-center">
      {/* Input Pencarian */}
      <div className="w-full max-w-4xl mx-auto mt-16 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari Judul Buku Disini!"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-black p-4 pl-8 rounded-full shadow-lg focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-600 text-white px-8 py-2 rounded-full hover:bg-red-700 transition"
          >
            Cari
          </button>
        </div>
      </div>

      {/* Daftar Buku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-7xl transition-all ease-in-out duration-500 opacity-100">
        {loading ? (
          <p className="text-center text-gray-700">Memuat hasil...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : books.length > 0 ? (
          books.map((buku, index) => (
            <div
              key={index}
              className="bg-[#E9E4E6] h-[23rem] shadow-lg rounded-lg w-60 px-2 py-4 flex flex-col items-center relative cursor-pointer transform transition-all duration-500"
              onClick={() => handleDetailClick(buku.id_buku)} // Navigasi menggunakan id_buku
            >
              {buku.cover ? (
                <Image
                  src={buku.cover}
                  alt={buku.judul}
                  width={120}
                  height={200}
                  className="rounded-md h-44 w-32"
                />
              ) : (
                <div className="w-32 h-48 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500 text-sm">
                    Tidak ada gambar
                  </span>
                </div>
              )}
              <div className="bg-white rounded-lg mt-4 text-center p-1 flex flex-col items-center justify-between h-[220px] w-full relative">
                <span className="absolute -top-4 right-4 text-xs text-black px-3 py-1 bg-white rounded-full shadow">
                  {buku.kategori}
                </span>

                <h3 className="mt-4 text-black w-full text-md text-center font-semibold min-h-[3rem]">
                  {buku.judul}
                </h3>
                <button
                  onClick={() => handleDetailClick(buku.id_buku)} // Navigasi menggunakan id_buku
                  className="mt-4 bg-[#9A0000] text-white w-48 py-1 rounded-full hover:bg-red-700"
                >
                  Detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">
            Tidak ada hasil ditemukan.
          </p>
        )}
      </div>

      {/* Kategori */}
      <div className="flex flex-wrap justify-center mt-12 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="w-40 h-52 flex flex-col items-center justify-center rounded-lg shadow-lg text-white font-semibold relative overflow-hidden cursor-pointer hover:scale-105 transition-all transform duration-500 ease-in-out"
            style={{
              backgroundImage: `url(${category.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="text-5xl">{category.icon}</span>
            <p className="mt-2 text-white font-semibold">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
