import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import HambergurMenu from "../assets/HambergurMenu.svg";
import { useAuth } from "../components/context/AuthContext";
import ImageUploadModal from "../components/products/ImageUploadModal";
import NHVIDEO from "./NHLogo.png"; // Importando el video

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
                  <img className="h-[30px] w-[auto]" src={NHVIDEO}>
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

          {/* Sección del carrito y login */}
          <div className="hidden md:flex items-center pt-2">
            <NavLink to="/cart" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13l-1.5-6M7 13h10m-6 6a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-2 bg-secondary-100 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </NavLink>
            <div className="hidden md:flex">
              {!isAuthenticated && (
                <NavLink to="/login">
                  <motion.button className="border-primary border-4 text-primary font-bold px-4 py-2 ml-2 rounded-full shadow-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    Login
                  </motion.button>
                </NavLink>
              )}

              {isAuthenticated && isAdmin && (
                <div className="relative">
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center ml-2"
                    onClick={toggleDesignDropdown}
                  >
                    Crear +
                  </button>
                  {showDesignDropdown && (
                    <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg mt-2">
                      <button
                        className="p-2 w-full text-left hover:bg-gray-200"
                        onClick={openImageModal}
                      >
                        Diseño
                      </button>
                    </div>
                  )}
                </div>
              )}


              <ImageUploadModal
                isOpen={isImageModalOpen}
                onClose={closeImageModal}
              />
              {isAuthenticated && ( // Mostrar el botón de usuario redondo solo si está autenticado
                <div className="relative">
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center ml-2"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                  {showDropdown && (
                    <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg mt-2">
                      <p className="p-2">{user}</p>
                      <button
                        onClick={logoutUser}
                        className="p-2 w-full text-left hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
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
        {/* Carrito y login */}
        <div className="flex flex-col items-center">
          <NavLink to="/cart" className="relative ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13l-1.5-6M7 13h10m-6 6a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-2 bg-secondary-100 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartQuantity}
              </span>
            )}
          </NavLink>

          <div className="flex flex-col items-center m-4 space-y-4">

            {!isAuthenticated && (
              <NavLink
                onClick={navHandler}
                to="/login"
                className="border-primary border-4 text-primary font-bold px-9 py-2 ml-2 rounded-full shadow-lg"
              >
                Login
              </NavLink>
            )}
            <div className="flex items-center md:hidden">
              {isAuthenticated && isAdmin && (
                <div className="relative">
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center ml-2"
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      openImageModal();
                    }}
                  >
                    Crear +
                  </button>

                  {showDesignDropdown && (
                    <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg mt-2">
                      <button
                        className="p-2 w-full text-left hover:bg-gray-200"
                        onTouchEnd={openImageModal}
                      >
                        Diseño
                      </button>
                    </div>
                  )}

                </div>

              )}
              <ImageUploadModal
                isOpen={isImageModalOpen}
                onClose={closeImageModal}
              />
              {isAuthenticated && (
                <div className="relative">
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center ml-2"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                  {showDropdown && (
                    <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg mt-2">
                      <p className="p-2">{user}</p>
                      <button
                        onClick={logoutUser}
                        className="p-2 w-full text-left hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>


          </div>
        </div>
      </ul>
    </div>
  );
};

export default MainNavigation;
