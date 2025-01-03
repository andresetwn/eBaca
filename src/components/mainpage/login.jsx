"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login({
  isLoginOpen,
  onClose,
  onSwitchToSignUp,
  onLoginSuccess,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Login berhasil!");
        localStorage.setItem("token", data.token);
        onLoginSuccess(username);
        onClose();
        router.push("/");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Login gagal. Coba lagi.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
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
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Masuk Akun eBaca
            </h2>

            {message && (
              <p
                className={`text-center mb-4 ${
                  message.includes("berhasil")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full p-3 text-black border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Kata Sandi:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full p-3 text-black border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                  required
                />
              </div>

              <p className="text-sm text-gray-600 text-center mb-6">
                Anda belum punya akun?{" "}
                <button
                  onClick={onSwitchToSignUp}
                  className="text-blue-500 hover:underline"
                  type="button"
                >
                  Daftar disini!
                </button>
              </p>

              <button
                type="submit"
                className={`w-full text-white py-3 rounded-lg transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
