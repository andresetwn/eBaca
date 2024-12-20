"use client";

import Image from "next/image";

export default function RekomendasiBuku() {
  const buku = [
    {
      title: "Matematika dalam Al-Qur'an",
      category: "Matematika",
      image: "/bukumtk.svg",
    },
    {
      title: "Ensiklopedia SAINS",
      category: "Sains",
      image: "/bukusains.svg",
    },
    {
      title: "Isu Sosial yang Berserak",
      category: "Sosial",
      image: "/bukusosial.svg",
    },
    {
      title: "Komputer & Masyarakat",
      category: "Teknologi",
      image: "/bukutech.svg",
    },
    {
      title: "BUMI MANUSIA",
      category: "Sastra",
      image: "/bukusastra.svg",
    },
    {
      title: "The Intelligent Investor",
      category: "Ekonomi",
      image: "/bukuekonomi.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/bgrekomen.svg')] bg-cover bg-center flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-center text-white mb-12">
        Rekomendasi Dari Kami
      </h2>
      <div className="container mx-auto px-0 flex items-center justify-center gap-8">
        {buku.map((buku, index) => (
          <div
            key={index}
            className="bg-[#E9E4E6] h-[23rem] shadow-lg rounded-lg w-60 px-2 py-4 flex flex-col items-center relative"
          >
            <Image
              src={buku.image}
              alt={buku.title}
              width={120}
              height={200}
              className="rounded-md h-48 w-auto"
            />
            <div className="bg-white rounded-lg mt-4 text-center p-1 flex flex-col items-center justify-between h-[220px] w-full relative">
              <span className="absolute -top-4 right-4 text-xs text-black px-3 py-1 bg-white rounded-full shadow">
                {buku.category}
              </span>

              <h3 className="mt-4 text-black w-full text-md text-center font-semibold min-h-[3rem]">
                {buku.title}
              </h3>
              <button className="mt-4 bg-[#9A0000] text-white w-48 py-1 rounded-full hover:bg-red-700">
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
