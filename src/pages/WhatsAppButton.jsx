import React from 'react';
import { motion } from 'framer-motion';
import whatsAppIcon from '../assets/whatshapp3d-removebg-preview.png'; // Asegúrate de proporcionar la ruta correcta a la imagen

const WhatsAppButton = () => {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "5492235453354";
    const message = "Hola Luciana! Te hablo desde tu página web. Quiero inscribirme al curso de tatuajes!";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }} // Escala al 110% en hover
      transition={{ duration: 0.3 }} // Transición suave de 0.3 segundos
      className="fixed bottom-4 left-6 z-10 p-3 focus:outline-none"
      onClick={handleWhatsAppRedirect}
    >
      <img src={whatsAppIcon} alt="WhatsApp" className="w-16 h-16" />
    </motion.div>
  );
};

export default WhatsAppButton;
