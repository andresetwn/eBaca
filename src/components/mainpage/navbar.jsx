"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Login from "./login";
import SignUp from "./signup";
import UbahNama from "./UbahNama";
import UbahSandi from "./UbahSandi";
import HapusAkun from "./HapusAkun";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("Agung");
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isSignupOpen, setSignupIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // Track the currently open modal

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token yang ditemukan di localStorage:", token);
    const storedUsername = localStorage.getItem("username");

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const openModal = (type) => {
    setModalType(type);
    setDropdownOpen(false); // Close the dropdown when a modal is opened
  };

  const closeModal = () => {
    setModalType("");
  };

  const handleModalSubmit = (data) => {
    if (modalType === "ubah-nama") {
      setUsername(data); // Update the username
    }
    closeModal();
  };

  const handleAccountDeletion = () => {
    console.log("Account deleted");
    handleLogout();
    closeModal();
  };

  return (
    <div className="relative">
      <nav className="fixed top-0 w-full z-50 bg-[#6B0000] p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-white text-xl font-bold px-6"
          >
            <Link href="/">eBaca</Link>
          </motion.div>

          {/* Navigation Links */}
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
                  className="text-white scroll-smooth text-lg hover:underline hover:text-blue-300"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex space-x-4 relative">
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center">
                <div className="relative">
                  <motion.div
                    className="text-white text-lg font-semibold flex items-center cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Halo, {username}!
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`w-5 h-5 ml-2 transition-transform ${
                        dropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                      <ul className="py-2 text-gray-800">
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => openModal("ubah-nama")}
                        >
                          Ubah Nama Pengguna
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => openModal("ubah-sandi")}
                        >
                          Ubah Kata Sandi
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                          onClick={() => openModal("hapus-akun")}
                        >
                          Hapus Akun Pengguna
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <motion.button
                  className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md ml-4"
                  whileHover={{ scale: 1.1 }}
                  onClick={handleLogout}
                >
                  Keluar
                </motion.button>
              </div>
            )}
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
        onLoginSuccess={(username) => {
          setUsername(username);
          setIsLoggedIn(true);
          localStorage.setItem("username", username);
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

      {modalType === "ubah-nama" && (
        <UbahNama
          isOpen={modalType === "ubah-nama"}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
      {modalType === "ubah-sandi" && (
        <UbahSandi
          isOpen={modalType === "ubah-sandi"}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
      {modalType === "hapus-akun" && (
        <HapusAkun
          isOpen={modalType === "hapus-akun"}
          onClose={closeModal}
          onConfirm={handleAccountDeletion}
        />
      )}
    </div>
  );
};

export default Navbar;
