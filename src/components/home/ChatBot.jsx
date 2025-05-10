import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { motion } from "framer-motion";
import { CohereClient } from "cohere-ai";
import axios from 'axios';
import assistent from "../../assets/assistent.png";
import API_URL from '../../config';
const ChatBot = () => {
  const [chatAbierto, setChatAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [cohereToken, setCohereToken] = useState(null);
  const [enviandoMensaje, setEnviandoMensaje] = useState(false);
  const mensajesRef = useRef(null);
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  useEffect(() => {
    obtenerTokenCohere();
  }, []);

  const obtenerTokenCohere = async () => {
    try {
      const response = await axios.get(API_URL);
      const token = response.data[0]?.ia;
      setCohereToken(token);
    } catch (error) {
      console.error('Error al obtener el token de la API:', error);
    }
  };

  const handleMouseEnter = () => setMostrarTooltip(true);
  const handleMouseLeave = () => setMostrarTooltip(false);

  const scrollToBottom = () => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  const handleEnviarMensaje = async () => {
    if (!nuevoMensaje.trim() || enviandoMensaje) return;
    setEnviandoMensaje(true);
    setMensajes(prev => [...prev, { texto: nuevoMensaje, origen: 'usuario' }]);
    setNuevoMensaje('');
    try {
      const respuesta = await obtenerRespuestaCohere(nuevoMensaje);
      setMensajes(prev => [...prev, { texto: respuesta, origen: 'asistente' }]);
    } finally {
      setEnviandoMensaje(false);
    }
  };

  const obtenerRespuestaCohere = async (userMessage) => {
    try {
      if (!cohereToken) throw new Error('Token de Cohere no disponible');

      const cohere = new CohereClient({
        token: cohereToken,
        language: "es",
        model: "command-r-plus",
      });

      setEscribiendo(true);

      const chatHistory = [
        {
          role: "SYSTEM",
          message: `Eres un asistente de Fauno, das respuestas breves las respuestas no deben superar los cuatro renglones, eres argentino , fauno es un tatuador profesional de Santa Clara del Mar, ahora tatua en Mar del Plata en el estudio de Nahuel Herrera , ubicado en Jara al 22 entre santa cruz y rio negro. Como asistente virtual de Fauno, debes conocer que Fauno es un tatuador con más de siete años de experiencia y se destaca en la realización de diseños exclusivos. Se inspira en la naturaleza, animales, insectos, flora y fauna, además tatua en el estudio de @Nahuelherreratattoo un reconocido artista de Mar del Plata , Nahuel es experto en hiperrealismo , ademas de Nahuel , Fauno es compañero de David Garcia @garciadavidtattoo, otro reconocido artista de Mar del Plata ,David es experto en retrato de Animales . Debes responder con amabilidad preguntas referenciadas al mundo del tatuaje. Si están fuera del contexto del tatuaje o del arte, responde con un 'No conozco esos temas', si te piden el numero de telefono de fauno ,fauno tiene 27 años dales el siguiente link para que accedan :https://wa.me/2233407440, si te preguntan por paloma , es la novia y musa inspiradora de fauno , si te preguntan por el valor minimo de un tattoo , es de 30 mil pesos argentinos el valor minimo . Además, ten en cuenta que tienes un límite de respuesta de 70 tokens, evita superarlo. usa emojis .`
        },
        { role: "USER", message: userMessage }
      ];

      const response = await cohere.chat({
        message: userMessage,
        model: "command-r-plus",
        chat_history: chatHistory,
        language: "es",
      });

      setEscribiendo(false);
      return response.text;
    } catch (error) {
      console.error('Error al llamar a Cohere AI:', error);
      setEscribiendo(false);
      return 'Lo siento, hubo un problema al procesar tu solicitud.';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleEnviarMensaje();
  };

  const handleChatToggle = () => setChatAbierto(!chatAbierto);
  const handleCloseChat = () => setChatAbierto(false);

  return (
    <div className="fixed bottom-6 right-6 z-10">
      <button
        onClick={handleChatToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center justify-center w-16 h-16 focus:outline-none ${chatAbierto ? 'hidden' : ''}`}
      >
        <img src={assistent} alt="Asistente" className="w-16 h-16" />
      </button>

      {mostrarTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-16 right-4 px-2 py-1 bg-[#4779a4] text-white text-sm rounded-md shadow-lg"
        >
          Soy tu asistente virtual
        </motion.div>
      )}

      {chatAbierto && (
        <div className="bg-gradient-to-br from-[#4779a4] to-[#f7e7ce] p-4 rounded-t-lg shadow-lg w-80">
          <div className="flex justify-between mb-2">
            <button onClick={handleCloseChat}><FiX className="text-gray-600" /></button>
          </div>

          <div ref={mensajesRef} className="h-60 overflow-y-auto mb-2">
            {mensajes.map((mensaje, index) => (
              <div key={index} className={`mb-2 ${mensaje.origen === 'usuario' ? 'text-right' : 'text-left'} px-4 py-2 rounded-lg bg-gradient-to-br from-[#6d9fcb]  to-[#1f6bae] text-white`}>
                <strong>{mensaje.origen === 'usuario' ? 'Tú' : 'Asistente de NH Studio'}</strong>: {mensaje.texto}
              </div>
            ))}
            {escribiendo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-2 text-left px-4 py-2 rounded-lg bg-[#4779a4]"
              >
                <strong>NH Studio</strong>: ...
              </motion.div>
            )}
          </div>

          <div className="flex justify-between">
            <input
              type="text"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribí algo acá"
              className="flex-1 border rounded-full px-4 py-2 outline-none"
              disabled={enviandoMensaje}
            />
            <button onClick={handleEnviarMensaje} disabled={enviandoMensaje} className="ml-2 bg-gradient-to-br from-[#f7e7ce]  to-[#4779a4] rounded-full px-4 py-2 text-white font-semibold">Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
