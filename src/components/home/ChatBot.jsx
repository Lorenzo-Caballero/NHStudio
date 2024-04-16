import React, { useState, useEffect, useRef } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi'; // Importa el icono de cierre
import { motion } from "framer-motion";
import { CohereClient } from "cohere-ai";
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

const ChatButton = () => {
  const [chatAbierto, setChatAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [cohereToken, setCohereToken] = useState(null); // Estado para almacenar el token
  const [enviandoMensaje, setEnviandoMensaje] = useState(false); // Estado para controlar si se está enviando un mensaje
  const mensajesRef = useRef(null); // Referencia al contenedor de mensajes

  useEffect(() => {
    obtenerTokenCohere(); // Obtener el token de Cohere al montar el componente
  }, []);

  // Función para obtener el token de Cohere
  const obtenerTokenCohere = async () => {
    try {
      const response = await axios.get('https://nodejs-restapi-mysql-fauno-production.up.railway.app/api/ai');
      const token = response.data;
      console.log(token);
      setCohereToken(token); // Almacena el token en el estado
    } catch (error) {
      console.error('Error al obtener el token de la API:', error);
    }
  };

  // Función para hacer scroll hacia abajo en el contenedor de mensajes
  const scrollToBottom = () => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Hace scroll hacia abajo al cargar o actualizar mensajes
  }, [mensajes]); // Se ejecuta cada vez que se actualiza la lista de mensajes

  // Función para enviar un mensaje y obtener la respuesta de Cohere
  const handleEnviarMensaje = async () => {
    if (!nuevoMensaje.trim() || enviandoMensaje) return;
    setEnviandoMensaje(true); // Deshabilita el botón de enviar mensaje
    setMensajes(prevMensajes => [
      ...prevMensajes,
      { texto: nuevoMensaje, origen: 'usuario' }
    ]);
    setNuevoMensaje('');
    try {
      const respuestaCohere = await obtenerRespuestaCohere(nuevoMensaje);
      setMensajes(prevMensajes => [
        ...prevMensajes,
        { texto: respuestaCohere, origen: 'asistente' }
      ]);
    } finally {
      setEnviandoMensaje(false); // Habilita el botón de enviar mensaje
    }
  };

  // Función para obtener la respuesta de Cohere
  const obtenerRespuestaCohere = async (userMessage) => {
    try {
      if (!cohereToken) {
        throw new Error('Token de Cohere no disponible');
      }

      const cohere = new CohereClient({
        token: cohereToken,
        language: "es", // Configura el idioma español
        model: "command-r-plus",
      });
  
      setEscribiendo(true);
      // Agregar el contexto antes del userMessage
      const contexto = "sos un asistente virtual de Lennita BB! Somos un emprendimiento artesanal ubicado en Santa Clara del Mar, Argentina. Nos especializamos en la producción de adorables muñequitos de amigurumis hechos con mucho amor y dedicación. En Lennita BB, cada creación es única, diseñada para traer alegría y diversión a tu vida. Desde simpáticos animales hasta personajes fantásticos y figuras que vos quieras!, nuestros amigurumis son el regalo perfecto para todas las ocasiones. ¡Déjanos ser parte de tus momentos especiales con nuestros encantadores. Cada vez que el usuario te envie un mensaje debes responder solo con la informacion que te pregunta ,no ofrezcas descuentos ni promociones,ni des ningun precio y solo basandote en la informacion de lennitaBB ,no extiendas mucho las respuestas se breve,y no inventes datos que no te proporciono ,ademas si la pregunta del usuario se va de contexto del emprendimiento,responde con un : no se de esos temas!, si te preguntan sobre su numero de telefono coloca este:+54 9 341 216 8460 ademas, no hables en ingles y no repitas toda la informacion de lennitaBB cada vez que te manda un mensaje,usa el acento argentino. La pregunta del usuario es la siguiente:";
      const prompt = contexto + userMessage;
      
      const respuesta = await cohere.generate({
        language: "es", // Configura el idioma español
        model: "command-r-plus",
        prompt: prompt,
        maxTokens: 140,
      });
  
      setEscribiendo(false);
      console.log(respuesta);
      return respuesta.generations[0].text;
    } catch (error) {
      console.error('Error al llamar a Cohere AI:', error);
      setEscribiendo(false);
      return 'Lo siento, hubo un problema al procesar tu solicitud.';
    }
  };
  
  // Función para manejar el evento de presionar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEnviarMensaje();
    }
  };

  // Función para manejar el evento de alternar la visibilidad del chat
  const handleChatToggle = () => {
    setChatAbierto(!chatAbierto);
  };

  // Función para manejar el evento de cerrar el chat
  const handleCloseChat = () => {
    setChatAbierto(false);
  };

  return (
    <div className="fixed bottom-6 right-6" style={{ zIndex: 9999 }}> {/* Ajuste la posición del botón aquí */}
      <button onClick={handleChatToggle} className={`flex items-center justify-center bg-purple-300 rounded-full w-12 h-12 ${chatAbierto ? 'hidden' : ''}`}>
        <FiMessageSquare className="text-white text-2xl" />
      </button>
      {chatAbierto && (
        <div className="bg-purple-100 p-4 rounded-t-lg shadow-lg w-80">
          <div className="flex justify-between mb-2">
            <button onClick={handleCloseChat}><FiX className="text-gray-600" /></button> {/* Botón de cierre */}
          </div>
          <div ref={mensajesRef} className="h-60 overflow-y-auto mb-2">
            {mensajes.map((mensaje, index) => (
              <div key={index} className={`mb-2 ${mensaje.origen === 'usuario' ? 'text-right' : 'text-left'} px-4 py-2 rounded-lg bg-purple-200 text-gray-800`}>
                <strong>{mensaje.origen === 'usuario' ? 'Tú' : 'Asistente LennitaBB'}</strong>: {mensaje.texto}
              </div>
            ))}
            {escribiendo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-2 text-left px-4 py-2 rounded-lg bg-purple-200"
              >
                <strong>Asistente LennitaBB</strong>: ...
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
              disabled={enviandoMensaje} // Deshabilita el input mientras se está enviando un mensaje
            />
            <button onClick={handleEnviarMensaje} disabled={enviandoMensaje} className="ml-2 bg-purple-300 rounded-full px-4 py-2 text-white font-semibold">Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
