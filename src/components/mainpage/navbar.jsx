"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Login from "./login";
import SignUp from "./signup";

const Navbar = () => {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isSignupOpen, setSignupIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#6B0000] p-4">
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

          <div className="flex space-x-8">
            {["Beranda", "Cari Buku", "Rekomendasi"].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Link
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  className="text-white scroll-smooth text-lg hover:underline hover:text-[#87CEEB]"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex space-x-4">
            <motion.button
              className="bg-[#B30000] text-white text-sm px-4 py-2 rounded-md"
              whileHover={{ scale: 1.1 }}
              onClick={() => setLoginIsOpen(true)}
            >
              Masuk
            </motion.button>
            <motion.button
              className="bg-[#FF0000] text-white text-sm px-4 py-2 rounded-md"
              whileHover={{ scale: 1.1 }}
              onClick={() => setSignupIsOpen(true)}
            >
              Daftar
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <Login
        isLoginOpen={isLoginOpen}
        onClose={() => setLoginIsOpen(false)}
        onSwitchToSignUp={() => {
          setLoginIsOpen(false);
          setSignupIsOpen(true);
        }}
      />
      <SignUp
        isSignupOpen={isSignupOpen}
        onClose={() => setSignupIsOpen(false)}
        onSwitchToLogin={() => {
          setSignupIsOpen(false);
          setLoginIsOpen(true);
        }}
      />
    </div>
  );
};

export default Navbar;
