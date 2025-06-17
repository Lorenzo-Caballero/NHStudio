import { motion } from "framer-motion";
import Tattoo1 from "./Tattoo1.jpg";
import Luciana1 from "./Luciana.jpg";
import Luciana2 from "./Luciana2.jpg";

const HeroTattoo = () => {
  const images = [Luciana1, Tattoo1, Luciana2];
  const whatsappMessage = encodeURIComponent("Hola Luciana! Te hablo desde tu página web. Quiero inscribirme al curso de tatuajes!");
  const whatsappLink = `https://api.whatsapp.com/send?phone=5492235453354&text=${whatsappMessage}`;

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-[#fef9f4] to-[#f3eee9] flex items-center justify-center p-6 pt-[calc(var(--navbar-height,4rem)+1rem)]">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1f1f1f] leading-tight">
            Aprendé a Tatuar Desde 0 <br />
            <span className="text-[#9f7042]">Hoy</span>
          </h1>
          <p className="text-[#4b4b4b] text-lg max-w-md">
            Transformá tu pasión en habilidad en solo tres días intensivos de
            aprendizaje práctico.
          </p>
      
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border-2 border-[#9f7042] text-[#9f7042] rounded-full font-semibold hover:bg-[#9f7042] hover:text-white transition"
          >
            Inscribite
          </motion.a>
        </motion.div>

        {/* Galería de imágenes */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[420px] clip-diagonal overflow-hidden group"
            >
              <img
                src={src}
                alt={`imagen-${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroTattoo;
