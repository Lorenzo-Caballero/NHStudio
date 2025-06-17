import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import HambergurMenu from "../assets/HambergurMenu.svg";
import { useAuth } from "../components/context/AuthContext";
import Ganamos from "../components/home/Luciana1.jpg";

const MainNavigation = () => {
  const [showNav, setShowNav] = useState(false);
  const { logout } = useAuth();
  const [cartQuantity, setCartQuantity] = useState(0);

  const calculateCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  useEffect(() => {
    setCartQuantity(calculateCartQuantity());
    const handleStorageChange = () => setCartQuantity(calculateCartQuantity());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const navHandler = () => setShowNav(!showNav);

  const logoutUser = async () => {
    logout();
    localStorage.removeItem("admin");
  };

  return (
    <div className="w-full">
      {/* Navbar fijo */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 h-[70px]">
          {/* Logo */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="flex items-center"
          >
            <NavLink to="/">
              <img
                src={Ganamos}
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
            </NavLink>
          </motion.div>

          {/* Menú Desktop */}
          <ul className="hidden md:flex items-center gap-6 text-[#2c3e50] font-semibold text-base lg:text-lg">
            <li>
              <NavLink to="/" className="hover:text-blue-600 transition">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/FAQ" className="hover:text-blue-600 transition">
                Preguntas Frecuentes
              </NavLink>
            </li>
            <li>
              <NavLink to="/tattoos" className="hover:text-blue-600 transition">
                Tattoos
              </NavLink>
            </li>
          </ul>

          {/* Menú hamburguesa móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={navHandler} className="focus:outline-none">
              {showNav ? (
                <XIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <img src={HambergurMenu} alt="Menu" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {showNav && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed top-[70px] left-0 w-full bg-white shadow-md z-40 py-4 px-6"
        >
          <li className="border-b py-2">
            <NavLink to="/" onClick={navHandler} className="block text-gray-700 font-semibold">
              Inicio
            </NavLink>
          </li>
          <li className="border-b py-2">
            <NavLink to="/FAQ" onClick={navHandler} className="block text-gray-700 font-semibold">
              Preguntas Frecuentes
            </NavLink>
          </li>
          <li className="border-b py-2">
            <NavLink to="/tattoos" onClick={navHandler} className="block text-gray-700 font-semibold">
              Tattoos
            </NavLink>
          </li>
        </motion.ul>
      )}
    </div>
  );
};

export default MainNavigation;
