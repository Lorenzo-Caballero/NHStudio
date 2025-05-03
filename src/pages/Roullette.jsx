import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const premios = [
  { nombre: '10% OFF', color: '#4ade80', peso: 0.2375 },
  { nombre: '20% OFF', color: '#60a5fa', peso: 0.2375 },
  { nombre: 'Nada 😢', color: '#d1d5db', peso: 0.2375 },
  { nombre: '50% OFF', color: '#facc15', peso: 0.05 },
  { nombre: '2x1', color: '#f472b6', peso: 0.2375 },
];

const calcularAngulo = (index, total) => (360 / total) * index;

export default function JuegoAzar() {
  const [girando, setGirando] = useState(false);
  const [premio, setPremio] = useState(null);
  const [rotacionVisual, setRotacionVisual] = useState(0);
  const [keyAnimacion, setKeyAnimacion] = useState(0);
  const [uuid, setUuid] = useState('');
  const [premiosExistentes, setPremiosExistentes] = useState([]);
  const [botonBloqueado, setBotonBloqueado] = useState(false);

  useEffect(() => {
    const traerPremiosExistentes = async () => {
      try {
        const res = await fetch('https://dimgrey-gnu-703361.hostingersite.com/index.php?recurso=premios');
        const data = await res.json();
        setPremiosExistentes(data); // [{ uuid, premio, date }]
      } catch (error) {
        console.error('Error al traer premios existentes:', error);
      }
    };
    traerPremiosExistentes();
  }, []);

  const seleccionarPremioConPeso = () => {
    const random = Math.random();
    let acumulado = 0;
    for (let i = 0; i < premios.length; i++) {
      acumulado += premios[i].peso;
      if (random <= acumulado) return i;
    }
    return premios.length - 1;
  };

  const girar = () => {
    setGirando(true);
    setBotonBloqueado(false);

    const indice = seleccionarPremioConPeso();
    const gradosPorPremio = 360 / premios.length;
    const anguloCentroSector = gradosPorPremio * indice + gradosPorPremio / 2;
    const anguloFinal = 270 - anguloCentroSector;
    const vueltasExtra = 360 * 20;
    const rotacionTotal = vueltasExtra + anguloFinal;

    setRotacionVisual(rotacionTotal);
    setKeyAnimacion((prev) => prev + 1);

    setTimeout(() => {
      const nuevoUuid = crypto.randomUUID();

      const uuidYaReclamado = premiosExistentes.some(p => p.uuid === nuevoUuid);

      if (!uuidYaReclamado) {
        setPremio(premios[indice]);
        setUuid(nuevoUuid);
      } else {
        alert("Ya giraste la ruleta. Intenta más tarde.");
      }

      setGirando(false);
    }, 4000);
  };

  const reclamarPremio = async () => {
    if (!premio || !uuid || premio.nombre === 'Nada 😢') return;

    setBotonBloqueado(true);

    const mensaje = `Hola fauno me gane un ${premio.nombre} en tu pagina web! Quiero reclamarlo , y mi codigo de premio es ${uuid}`;
    const urlWhatsApp = `https://wa.me/2233407440?text=${encodeURIComponent(mensaje)}`;

    try {
      const fechaArgentina = new Date().toLocaleString('sv-SE', {
        timeZone: 'America/Argentina/Buenos_Aires'
      }).replace(' ', 'T');

      await fetch('https://dimgrey-gnu-703361.hostingersite.com/index.php?recurso=premios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          premio: premio.nombre,
          uuid: uuid,
          date: fechaArgentina
        }),
      });

      window.open(urlWhatsApp, '_blank');
    } catch (error) {
      alert('Hubo un error al guardar el premio.');
      console.error(error);
      setBotonBloqueado(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 to-purple-300">
      <div className="relative w-80 h-80 mb-6">
        <motion.div
          key={keyAnimacion}
          className="relative w-full h-full rounded-full overflow-hidden"
          animate={{ rotate: rotacionVisual }}
          transition={{ duration: 4, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {premios.map((p, i) => {
              const startAngle = calcularAngulo(i, premios.length);
              const endAngle = calcularAngulo(i + 1, premios.length);
              const largeArc = endAngle - startAngle > 180 ? 1 : 0;

              const x1 = 100 + 100 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 100 + 100 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 100 + 100 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 100 + 100 * Math.sin((Math.PI * endAngle) / 180);

              return (
                <g key={i}>
                  <path
                    d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={p.color}
                  />
                  <text
                    x={100 + 60 * Math.cos((Math.PI * (startAngle + endAngle) / 2) / 180)}
                    y={100 + 60 * Math.sin((Math.PI * (startAngle + endAngle) / 2) / 180)}
                    fill="#000"
                    fontSize="8"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${(startAngle + endAngle) / 2}, ${100 + 60 * Math.cos((Math.PI * (startAngle + endAngle) / 2) / 180)}, ${100 + 60 * Math.sin((Math.PI * (startAngle + endAngle) / 2) / 180)})`}
                  >
                    {p.nombre}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-black z-20"></div>
      </div>

      <button
        onClick={girar}
        disabled={girando}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
      >
        {girando ? 'Girando...' : 'Girar Ruleta'}
      </button>

      {premio && !girando && (
        <motion.div
          className="mt-6 p-4 bg-white rounded-xl shadow-lg text-center text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>¡Felicidades! Ganaste: <strong>{premio.nombre}</strong></p>

          {premio.nombre !== 'Nada 😢' && (
            <button
              onClick={reclamarPremio}
              disabled={botonBloqueado}
              className={`mt-4 px-5 py-2 ${
                botonBloqueado ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              } text-white font-semibold rounded-lg shadow-md transition`}
            >
              {botonBloqueado ? 'Premio Reclamado' : 'Reclamar Premio'}
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
