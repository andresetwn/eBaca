"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/src/components/mainpage/navbar";
export default function DetailBuku() {
  const { id_buku } = useParams(); // Mengambil parameter dynamic 'id_buku' dari URL
  const router = useRouter();

  const [bukuTerpilih, setBukuTerpilih] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id_buku) {
      setError("Buku tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchBukuDetail = async () => {
      try {
        const response = await fetch(`/api/books/${id_buku}`);
        if (!response.ok) {
          throw new Error("Buku tidak ditemukan");
        }
        const data = await response.json();
        setBukuTerpilih(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBukuDetail();
  }, [id_buku]);

  if (loading) {
    return <div className="text-center py-20">Memuat detail buku...</div>;
  }

  if (error || !bukuTerpilih) {
    return (
      <div className="text-center py-20">
        <p>{error || "Buku tidak ditemukan"}</p>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 mt-4"
          onClick={() => router.push("/")}
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[url('/bghome.svg')] bg-cover bg-center flex justify-center items-center">
        <div className="bg-white bg-opacity-70 shadow-lg rounded-lg flex flex-col w-full max-w-5xl p-8 relative">
          <div className="flex justify-start mb-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 flex items-center gap-2"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <span>Kembali</span>
            </button>
          </div>

          <div className="flex">
            <div className="relative flex flex-col items-center w-1/3">
              <Image
                src={bukuTerpilih.cover}
                alt={bukuTerpilih.judul}
                width={180}
                height={280}
                className="rounded-md"
              />

              <div className="bg-white w-full py-4 px-3 text-center rounded-lg mt-4 shadow-md relative">
                <span className="absolute -top-4 right-4 bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-md">
                  {bukuTerpilih.kategori}
                </span>
                <h3 className="text-md font-semibold text-gray-800">
                  {bukuTerpilih.judul}
                </h3>
              </div>
            </div>

            <div className="w-3/4 pl-8 flex flex-col">
              <div className="w-[90%] pl-8 flex flex-col bg-white shadow-md rounded-lg p-8">
                <div className="text-black text-lg font-medium mb-6">
                  <div className="flex mb-2">
                    <p className="font-bold w-36 text-left">Penulis:</p>
                    <p>{bukuTerpilih.penulis}</p>
                  </div>

                  <div className="flex mb-2">
                    <p className="font-bold w-36 text-left">Tahun Rilis:</p>
                    <p>{bukuTerpilih.tahun_rilis}</p>
                  </div>
                </div>

                <hr className="border-gray-300 my-4" />

                <div className="text-base text-gray-700 leading-relaxed">
                  <strong className="font-bold">Sinopsis:</strong>
                  <p className="mt-2">{bukuTerpilih.sinopsis}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-10 justify-end">
                <a
                  href={bukuTerpilih.sumber}
                  download
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 flex items-center gap-2"
                >
                  <span>Download</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5V21h18v-4.5M12 3v12m6-6-6 6m0 0-6-6"
                    />
                  </svg>
                </a>
                <a
                  href={bukuTerpilih.sumber} // Link untuk membaca buku
                  target="_blank"
                  className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 flex items-center gap-2"
                >
                  <span>Baca Buku</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12h13.5m0 0-6-6m6 6-6 6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
