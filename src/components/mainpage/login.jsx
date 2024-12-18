"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Login({ isLoginOpen, onClose, onSwitchToSignUp }) {
  return (
    <AnimatePresence>
      {isLoginOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Card Modal */}
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
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Masuk Akun eBaca
            </h2>

            {/* Input Nama Pengguna */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nama Pengguna:</label>
              <input
                type="text"
                placeholder="Masukkan nama pengguna"
                className="w-full p-3 text-black border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            {/* Input Kata Sandi */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Kata Sandi:</label>
              <input
                type="password"
                placeholder="Masukkan kata sandi"
                className="w-full p-3 text-black border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            {/* Navigasi ke Sign Up */}
            <p className="text-sm text-gray-600 text-center mb-6">
              Anda belum punya akun?{" "}
              <button
                onClick={onSwitchToSignUp}
                className="text-blue-500 hover:underline"
              >
                Daftar disini!
              </button>
            </p>

            {/* Tombol Login */}
            <button
              onClick={onClose}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              Login
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
