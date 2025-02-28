import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import './overview.css';
import { Link } from "react-router-dom";

const Overview = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollPos, setLastScrollPos] = useState(window.pageYOffset);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    useEffect(() => {
        setIsVisible(inView);
    }, [inView]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            document.documentElement.style.setProperty(
                "--scroll-direction",
                currentScrollPos > lastScrollPos ? "down" : "up"
            );
            setLastScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollPos]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="overview-container w-full bg-gradient-to-br from-[#4779a4] to-[#f7e7ce] py-20 md:py-32 text-center text-[#2c3e50]"
        >
            <div className="px-3 lg:px-0 lg:w-[55%] mx-auto">
                <h2 className="font-extrabold text-5xl capitalize mb-10 tracking-widest leading-10 text-white">
                    ¿Quiénes somos?
                </h2>
                <p className="text-lg tracking-widest font-normal mb-5 leading-7">
                    En <strong>NH Studio</strong>, nuestra misión es brindarte la mejor experiencia de tatuaje de tu vida.  
                    Nos aseguramos de que cada detalle de tu visita sea cómodo y memorable, desde la primera consulta hasta el cuidado post-tatuaje.  
                    <br /><br />
                    Somos un estudio privado en Mar del Plata, diseñado para ofrecer un ambiente acogedor y profesional, donde la creatividad y la autoexpresión se celebran en cada diseño.  
                    <br /><br />
                    Con tatuadores apasionados y comprometidos, estamos aquí para transformar tu idea en una obra de arte única.  
                    <br /><br />
                    ¡Te damos la bienvenida a nuestra comunidad!
                </p>
            </div>
            <Link 
                className="inline-block px-6 py-3 font-semibold tracking-wider text-[#f7e7ce] bg-[#2c3e50] uppercase mt-8 text-lg hover:bg-[#1f2d3d] transition-all duration-300" 
                to='/about'
            >
                Más sobre nosotros
            </Link>
        </motion.div>
    );
};

export default Overview;
