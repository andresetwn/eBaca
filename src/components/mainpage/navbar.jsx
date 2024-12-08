"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#6B0000] py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-white text-xl font-bold px-6"
        >
          <Link href="#">eBaca</Link>
        </motion.div>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex space-x-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="#"
              className="text-white text-lg hover:underline hover:text-[#87CEEB]"
            >
              Beranda
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="#"
              className="text-white text-lg hover:underline hover:text-[#87CEEB]"
            >
              Cari Buku
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              href="#"
              className="text-white text-lg hover:underline hover:text-[#87CEEB]"
            >
              Rekomendasi
            </Link>
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-4">
          <motion.button
            className="bg-[#B30000] text-white text-sm px-4 py-2 rounded-md"
            whileHover={{ scale: 1.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.3, delay: 0.9 } }}
          >
            Masuk
          </motion.button>
          <motion.button
            className="bg-[#FF0000] text-white text-sm px-4 py-2 rounded-md"
            whileHover={{ scale: 1.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ opacity: { duration: 0.3, delay: 1 } }}
          >
            Daftar
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center px-8">
          <button onClick={toggleMenu} className="text-white">
            <motion.img
              src="hamburger.svg"
              alt="Hamburger menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden flex flex-col gap-4 p-4 bg-[#6B0000]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="#"
            className="text-white text-lg text-center hover:underline hover:text-[#87CEEB]"
          >
            Beranda
          </Link>
          <Link
            href="#"
            className="text-white text-lg text-center hover:underline hover:text-[#87CEEB]"
          >
            Cari Buku
          </Link>
          <Link
            href="#"
            className="text-white text-lg text-center hover:underline hover:text-[#87CEEB]"
          >
            Rekomendasi
          </Link>
          <div className="flex justify-center gap-4">
            <motion.button
              className="bg-[#B30000] text-white text-sm px-4 py-2 rounded-md"
              whileHover={{ scale: 1.3 }}
            >
              Masuk
            </motion.button>
            <motion.button
              className="bg-[#FF0000] text-white text-sm px-4 py-2 rounded-md"
              whileHover={{ scale: 1.3 }}
            >
              Daftar
            </motion.button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
