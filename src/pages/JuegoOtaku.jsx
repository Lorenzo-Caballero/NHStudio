import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TattooGachaMachine() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);

  const fetchRandomPopularCharacter = async () => {
    setLoading(true);
    setCharacter(null);
    setShowCharacter(false);

    const randomPage = Math.floor(Math.random() * 5) + 1;
    const response = await fetch(`https://api.jikan.moe/v4/characters?page=${randomPage}&limit=25&order_by=favorites&sort=desc`);
    const data = await response.json();
    const characters = data.data;
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

    setTimeout(() => {
      setCharacter(randomCharacter);
      setLoading(false);
      setShowCharacter(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white p-6 relative overflow-hidden">
      <h1 className="text-4xl font-extrabold mb-10 text-center drop-shadow-lg">Máquina Gacha de Tatuajes</h1>

      {/* Máquina de chicles mejorada */}
      <div className="relative w-64 h-[28rem] flex flex-col items-center">
        {/* Cúpula de cristal */}
        <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-white/70 to-blue-200 border-[10px] border-white shadow-inner relative overflow-hidden z-10">
          {/* Gomas */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full absolute"
              style={{
                backgroundColor: `hsl(${i * 12}, 70%, 60%)`,
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
              }}
            ></div>
          ))}
        </div>

        {/* Base superior */}
        <div className="w-44 h-12 bg-red-700 rounded-t-xl mt-[-1.5rem] border-t-4 border-red-800 shadow-md z-0" />

        {/* Cuerpo principal */}
        <div className="w-52 h-40 bg-red-600 rounded-b-3xl border-b-8 border-red-800 shadow-2xl flex flex-col items-center justify-center relative z-0">
          <div className="w-16 h-16 bg-yellow-300 border-4 border-yellow-500 rounded-full shadow-md hover:scale-110 transition-transform active:scale-95 cursor-pointer" onClick={fetchRandomPopularCharacter}></div>
          <p className="text-sm mt-2 font-semibold text-white uppercase">¡Presiona!</p>
        </div>

        {/* Compartimento de salida */}
        <div className="w-36 h-10 bg-gradient-to-br from-gray-700 to-gray-500 rounded-b-xl border-t-4 border-gray-400 mt-4 shadow-inner flex items-center justify-center text-xs text-gray-100 tracking-wider font-semibold uppercase">
          Aquí sale tu chicle
        </div>
      </div>

      {/* Mensaje de carga */}
      {loading && (
        <motion.div
          className="mt-10 text-pink-300 font-bold text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Sacando tu chicle...
        </motion.div>
      )}

      {/* Modal de personaje */}
      <AnimatePresence>
        {showCharacter && character && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-3xl border-4 border-pink-400 shadow-2xl flex flex-col items-center z-50 w-80 max-w-full relative"
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <button
                className="absolute top-3 right-3 text-white bg-pink-400 hover:bg-pink-500 rounded-full w-7 h-7 flex items-center justify-center font-bold"
                onClick={() => setShowCharacter(false)}
              >
                ×
              </button>

              <img
                src={character.images?.jpg?.image_url}
                alt={character.name}
                className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md mb-4"
              />
              <h2 className="text-2xl font-bold text-pink-300 mb-2 text-center">{character.name}</h2>
              <p className="text-gray-300 text-sm text-center">
                {character.about?.slice(0, 100).replace(/\n/g, ' ') || 'Sin descripción disponible.'}
              </p>
              <p className="mt-4 text-pink-400 font-semibold animate-pulse text-center">
                ¡Tatuate a {character.name} con un diseño exclusivo!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
