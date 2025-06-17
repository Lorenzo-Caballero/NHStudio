import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full pt-10">
      <div className="flex flex-col md:flex-row justify-center items-center text-center h-20 bg-gradient-to-br from-[#e9d5c6] via-[#f8f3ed] to-[#d5bfa3] text-[#5c504b] tracking-wide font-medium px-6">
        <h4 className="text-sm md:text-base">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-[#3b2f2a] font-semibold">Luciana Avalos Tattoo</span>
        </h4>
        <h4 className="text-sm md:text-base text-[#3b2f2a] md:ml-4 mt-2 md:mt-0">
          Todos los derechos reservados.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
