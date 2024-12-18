"use client";

import { motion } from "framer-motion";

export default function Search() {
  return (
    <div className="min-h-screen bg-[url('/bgcari.svg')] bg-cover bg-center flex flex-col items-center justify-center">
      {/* Input Pencarian */}
      <motion.div
        className="w-full max-w-4xl mx-auto mt-16 p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Cari Judul atau Genre Buku Disini!"
            className="w-full text-black p-4 pl-8 rounded-full shadow-lg focus:outline-none"
          />
          <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-red-600 text-white px-8 py-2 rounded-full">
            Cari
          </button>
        </div>
      </motion.div>

      {/* Kategori */}
      <motion.div
        className="flex flex-wrap justify-center mt-12 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {[
          { name: "Matematika", icon: "➗", bg: "/mtk.svg" },
          { name: "Sains", icon: "⚗️", bg: "/sains.svg" },
          { name: "Sosial", icon: "👥", bg: "/sosial.svg" },
          { name: "Teknologi", icon: "💻", bg: "/tech.svg" },
          { name: "Sastra", icon: "📖", bg: "/sastra.svg" },
          { name: "Ekonomi", icon: "⚙️", bg: "/ekonomi.svg" },
        ].map((category, index) => (
          <motion.div
            key={category.name}
            className="w-40 h-52 flex flex-col items-center justify-center rounded-lg shadow-lg text-white font-semibold relative overflow-hidden"
            style={{
              backgroundImage: `url(${category.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3 + index * 0.2, // Animasi setiap item dimulai bergantian
              ease: "easeOut",
            }}
          >
            <span className="text-5xl drop-shadow-md">{category.icon}</span>
            <p className="mt-2 drop-shadow-md">{category.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
