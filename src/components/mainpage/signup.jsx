"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUp({ isSignupOpen, onClose, onSwitchToLogin }) {
  // State untuk mengontrol visibilitas password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <AnimatePresence>
      {isSignupOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Daftar Akun eBaca
            </h2>

            {/* Input Nama Pengguna */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nama Pengguna:</label>
              <input
                type="text"
                placeholder="Masukkan nama pengguna"
                className="w-full text-black p-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            {/* Input Alamat Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Alamat E-mail:</label>
              <input
                type="email"
                placeholder="Masukkan alamat e-mail"
                className="w-full text-black p-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            {/* Input Kata Sandi */}
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2">Kata Sandi:</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                className="w-full text-black p-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <span
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </span>
            </div>

            {/* Input Ulangi Kata Sandi */}
            <div className="mb-6 relative">
              <label className="block text-gray-700 mb-2">
                Ulangi Kata Sandi:
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ulangi kata sandi"
                className="w-full text-black p-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <span
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
              </span>
            </div>

            {/* Navigasi ke Login */}
            <p className="text-sm text-gray-600 text-center mb-6">
              Anda sudah punya akun?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-500 hover:underline"
              >
                Masuk disini!
              </button>
            </p>

            <button
              onClick={onClose}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              Daftar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
