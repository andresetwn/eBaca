"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      className="flex flex-col justify-between items-center h-[50vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bghome.svg')" }}
    >
      <motion.h1
        className="flex-grow flex items-center justify-center text-4xl font-bold text-white drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        Selamat Datang di eBaca!
      </motion.h1>

      <motion.p
        className="text-center text-lg text-white py-4"
        initial={{ opacity: 0 }}
        animate={{
          y: [0, -10, 0],
          opacity: 1,
        }}
        transition={{
          opacity: { duration: 2, delay: 1 },
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ⬇ Yuk Mulai Baca Buku! ⬇
      </motion.p>
    </div>
  );
}
