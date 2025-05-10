import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import HambergurMenu from "../assets/HambergurMenu.svg";
import { useAuth } from "../components/context/AuthContext";
import Ganamos from "./Ganamos.jpg";
const MainNavigation = () => {
  const [showNav, setShowNav] = useState(false);
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDesignDropdown, setShowDesignDropdown] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const totalItems = useSelector((state) => state.cart.totalQuantity);
  const [cartQuantity, setCartQuantity] = useState(0);

  const calculateCartQuantity = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  useEffect(() => {
    setCartQuantity(calculateCartQuantity());
    const handleStorageChange = () => {
      setCartQuantity(calculateCartQuantity());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleDesignDropdown = () => {
    setShowDesignDropdown(!showDesignDropdown);
  };

  const navHandler = () => {
    setShowNav(!showNav);
  };

  const logoutUser = async () => {
    logout();
    localStorage.removeItem('admin');
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 2px #ffffff",
      boxShadow: "0px 0px 4px #243E8B",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="w-full h-[80px]">
      {/* Navbar fijo */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
        <div className="flex justify-between items-center w-full h-full px-8 sm:mb-6 pt-4">
          <div className="flex">
            <div className="flex items-center">
              <motion.div
                initial={{ y: -250 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              >
                <NavLink to="/">
                  <img className="h-[30px] w-[auto]" src={Ganamos}>
                  </img>
                </NavLink>
              </motion.div>
            </div>
            <ul className="hidden md:flex items-center lg:ml-8 text-[#2c3e50]">
              <li>
                <NavLink className="ml-4 p-2 lg:text-lg font-semibold" to="/">
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink className="ml-2 p-2 lg:text-lg font-semibold" to="/about">
                  Sobre Mi
                </NavLink>
              </li>
              <li>
                <NavLink className="ml-2 p-2 lg:text-lg font-semibold" to="/products">
                  Diseños
                </NavLink>
              </li>
              <li>
                <NavLink className="ml-2 p-2 lg:text-lg font-semibold" to="/games">
                  Juegos
                </NavLink>
              </li>
            </ul>
          </div>

    

          {/* Menú hamburguesa */}
          <div className="md:hidden cursor-pointer" onClick={navHandler}>
            {!showNav ? (
              <img src={HambergurMenu} alt="Menu" />
            ) : (
              <XIcon className="w-5" />
            )}
          </div>
        </div>
      </div>

      {/* Menú de navegación para pantallas pequeñas */}
      <ul
        className={
          !showNav
            ? "hidden"
            : "md:hidden px-8 py-4 bg-white w-full h-[20rem] relative z-20"
        }
      >
        <li className="border-b-2 border-zinc-300 w-full text-lg font-semibold text-gray-600">
          <NavLink to="/" onClick={navHandler}>
            Inicio
          </NavLink>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          <NavLink to="/about" onClick={navHandler}>
            Sobre Mi
          </NavLink>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          <NavLink to="/products" onClick={navHandler}>
            Diseños
          </NavLink>
        </li>
        <li className="border-b-2 border-zinc-300 w-full mt-4 text-lg font-semibold text-gray-600">
          <NavLink to="/games" onClick={navHandler}>
            Juegos
          </NavLink>
        </li>
    
      </ul>
    </div>
  );
};

export default MainNavigation;
