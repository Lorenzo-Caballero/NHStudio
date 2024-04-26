import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import conejita1 from "../../assets/conejimarron.png";
import conejita2 from "../../assets/coneji-removebg-preview.png";
import conejita3 from "../../assets/osito-removebg-preview (2).png";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(conejita1);
  const controls = useAnimation();
  const [borderRadius, setBorderRadius] = useState("100%");
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        switch (prevImage) {
          case conejita1:
            return conejita2;
          case conejita2:
            return conejita3;
          case conejita3:
            return conejita1;
          default:
            return conejita1;
        }
      });
    }, 8000); // Cambiar cada 8 segundos

    controls.set({ scale: 50, transition: { duration: 8, ease: "easeInOut" } });

    const stopAnimation = async () => {
      await controls.start({ scale: 1 });
      setBorderRadius("0");
      controls.start({
        scale: 50,
        transition: { duration: 8, ease: "easeInOut" },
      });
    };

    stopAnimation();

    // Generar lunares aleatorios
    const generateDots = () => {
      const newDots = [];
      for (let i = 0; i < 30; i++) {
        newDots.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 50 + 20, // Tamaño aleatorio entre 20 y 70
          opacity: Math.random(), // Opacidad aleatoria
          delay: Math.random() * 5, // Retardo aleatorio para la animación
          shouldPulse: Math.random() < 0.2, // 20% de posibilidad de que el lunar pulse
        });
      }
      setDots(newDots);
    };

    generateDots();

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#9F5D23" }}
    >
      {/* Letras "LennitaBB" */}
      

      {/* Decoración de lunares */}
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            top: dot.y,
            left: dot.x,
            backgroundColor: "#C4B5E1", // Color violeta clarito
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            opacity: dot.opacity,
            scale: dot.shouldPulse ? [1, 1.2, 1] : 1, // Si el lunar debe pulsar, se define la animación
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: dot.delay, duration: 1 + Math.random() * 2 },
          }}
        />
      ))}

      {/* Contenido principal */}
      <motion.div className="flex flex-col items-center justify-start text-white py-10">
        {/* Imágenes de las conejitas */}
        <motion.img
          key={currentImage}
          src={currentImage}
          alt="conejita"
          className="w-60 md:w-72 lg:w-80 mx-auto rounded-lg z-10"
          initial="hidden"
          animate="visible"
          transition={{
            duration: 2,
            ease: "easeInOut",
            scale: { duration: 1.5, yoyo: Infinity, ease: "easeInOut" },
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-12 z-20">
          <Link to="/products">
            <motion.button
              className="px-4 py-2 font-serif font-bold rounded-full shadow-md m-2 bg-purple-600 bg-opacity-30 text-white"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              transition={{ duration: 0.3 }}
              style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.4)" }}
            >
              Ver diseños
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Capa de fondo animada */}
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
        transition={{ duration: 8, ease: "easeInOut", loop: Infinity }} // Loop de la animación
      />
    </motion.div>
  );
};

export default Hero;
