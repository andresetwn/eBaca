"use client";
import Image from "next/image";
import Navbar from "@/src/components/mainpage/navbar";
import React from "react";
import Link from "next/link";
const buku = [
  {
    detail: "matematika-dalam-al-quran",
    title: "Matematika dalam Al-Qur'an",
    category: "Matematika",
    image: "/bukumtk.svg",
    synopsis:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis non voluptas quis repellendus suscipit, alias expedita eos reiciendis itaque. Fugiat?",
    author: "Dr. H. Abdussakir, M.Pd.",
    year: 2020,
    isbn: "1234567890",
  },
  {
    detail: "ensiklopedia-sains",
    title: "Ensiklopedia SAINS",
    category: "Sains",
    image: "/bukusains.svg",
    synopsis:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis non voluptas quis repellendus suscipit, alias expedita eos reiciendis itaque. Fugiat?",
    author: "Berbagai Penulis",
    year: 2018,
    isbn: "0987654321",
  },
  {
    detail: "isu-sosial-yang-berserak",
    title: "Isu Sosial yang Berserak",
    category: "Sosial",
    image: "/bukusosial.svg",
    synopsis:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis non voluptas quis repellendus suscipit, alias expedita eos reiciendis itaque. Fugiat?",
    author: "Dr. H. Abdul Aziz, M.Pd.",
    year: 2022,
    isbn: "9789876543210",
  },
  {
    detail: "komputer-dan-masyarakat",
    title: "Komputer & Masyarakat",
    category: "Teknologi",
    image: "/bukutech.svg",
    synopsis:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis non voluptas quis repellendus suscipit, alias expedita eos reiciendis itaque. Fugiat?",
    author: "Dr. H. Abdul Aziz, M.Pd.",
    year: 2016,
    isbn: "9789876543210",
  },
  {
    detail: "bumi-manusia",
    title: "Bumi Manusia",
    category: "Sastra",
    image: "/bukusastra.svg",
    synopsis:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis non voluptas quis repellendus suscipit, alias expedita eos reiciendis itaque. Fugiat?",
    author: "Dr. H. Abdul Aziz, M.Pd.",
    year: 2015,
    isbn: "9789876543210",
  },
  {
    detail: "the-intelligent-investor",
    title: "The Intelligent Investor",
    category: "Ekonomi",
    image: "/bukuekonomi.svg",
    synopsis:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis non voluptas quis repellendus suscipit, alias expedita eos reiciendis itaque. Fugiat?",
    author: "Dr. H. Abdul Aziz, M.Pd.",
    year: 2021,
    isbn: "9789876543210",
  },
];

export default function DetailBuku({ params }) {
  const { detail } = React.use(params);
  const bukuTerpilih = buku.find((b) => b.detail === detail);

  if (!bukuTerpilih) {
    return <div className="text-center py-20">Buku tidak ditemukan</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-[url('/bghome.svg')] bg-cover bg-center flex justify-center items-center">
        <div className="bg-white bg-opacity-70 shadow-lg rounded-lg flex flex-col w-full max-w-5xl p-8 relative">
          <div className="flex justify-start mb-4">
            <Link
              href="/"
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 flex items-center gap-2"
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
              <span>Back</span>
            </Link>
          </div>

          <div className="flex">
            <div className="relative flex flex-col items-center w-1/3">
              <div className="relative">
                <Image
                  src={bukuTerpilih.image}
                  alt={bukuTerpilih.title}
                  width={180}
                  height={280}
                  className="rounded-md"
                />
              </div>

              <div className="bg-white w-full py-4 px-3 text-center rounded-lg mt-4 shadow-md relative">
                <span className="absolute -top-4 right-4 bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-md">
                  {bukuTerpilih.category}
                </span>

                <h3 className="text-md font-semibold text-gray-800">
                  {bukuTerpilih.title}
                </h3>
              </div>
            </div>

            <div className="w-3/4 pl-8 flex flex-col">
              <div className="w-[90%] pl-8 flex flex-col bg-white shadow-md rounded-lg p-8">
                <div className="text-black text-lg font-medium mb-6">
                  <div className="flex mb-2">
                    <p className="font-bold w-36 text-left">Penulis:</p>
                    <p>{bukuTerpilih.author}</p>
                  </div>

                  <div className="flex mb-2">
                    <p className="font-bold w-36 text-left">Tahun Rilis:</p>
                    <p>{bukuTerpilih.year}</p>
                  </div>

                  <div className="flex mb-2">
                    <p className="font-bold w-36 text-left">ISBN:</p>
                    <p>{bukuTerpilih.isbn}</p>
                  </div>
                </div>

                <hr className="border-gray-300 my-4" />

                <div className="text-base text-gray-700 leading-relaxed">
                  <strong className="font-bold">Sinopsis:</strong>
                  <p className="mt-2">{bukuTerpilih.synopsis}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-10 justify-end">
                <button className="bg-gray-900 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 flex items-center gap-2">
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
                </button>
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 flex items-center gap-2">
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
