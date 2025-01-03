"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RekomendasiBuku() {
  const router = useRouter();
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuku = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Gagal mengambil data buku");
        }
        const data = await response.json();

        const bukuPerKategori = [];
        const kategoriSet = new Set();

        data.forEach((bukuItem) => {
          if (!kategoriSet.has(bukuItem.kategori)) {
            kategoriSet.add(bukuItem.kategori);
            bukuPerKategori.push(bukuItem);
          }
        });

        setBuku(bukuPerKategori);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuku();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Memuat buku...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/bgrekomen.svg')] bg-cover bg-center flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-center text-white mb-12">
        Rekomendasi Dari Kami
      </h2>
      <div className="container mx-auto px-0 flex items-center justify-center gap-8">
        {buku.map((bukuItem, index) => (
          <div
            key={index}
            className="bg-[#E9E4E6] h-[23rem] shadow-lg rounded-lg w-60 px-2 py-4 flex flex-col items-center relative"
          >
            <Image
              src={bukuItem.cover}
              alt={bukuItem.judul}
              width={120}
              height={200}
              className="rounded-md h-44 w-32"
            />
            <div className="bg-white rounded-lg mt-4 text-center p-1 flex flex-col items-center justify-between h-[220px] w-full relative">
              <span className="absolute -top-4 right-4 text-xs text-black px-3 py-1 bg-white rounded-full shadow">
                {bukuItem.kategori}
              </span>

              <h3 className="mt-4 text-black w-full text-md text-center font-semibold min-h-[3rem]">
                {bukuItem.judul}
              </h3>
              <button
                onClick={() => router.push(`/detailpage/${bukuItem.id_buku}`)}
                className="mt-4 bg-[#9A0000] text-white w-48 py-1 rounded-full hover:bg-red-700"
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
