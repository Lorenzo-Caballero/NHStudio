import React from "react";
import { Link } from "react-router-dom";

const Overview = () => {
    return (
        <div className="w-full bg-[#f1f5f8] py-20 md:py-32 text-center">
            <div className="px-3 lg:px-0 lg:w-[55%] mx-auto">
                <h2 className="font-extrabold text-5xl text-[#242833] capitalize mb-10 tracking-widest leading-10">Lennita BB</h2>
                <p className="text-lg text-[#555] tracking-widest font-normal mb-5 leading-7">¡Bienvenidos a Lennita BB! Somos un emprendimiento artesanal ubicado en Santa Clara del Mar, Argentina. Nos especializamos en la producción de adorables muñequitos de amigurumis hechos con mucho amor y dedicación.
En Lennita BB, cada creación es única, diseñada para traer alegría y diversión a tu vida. Desde simpáticos animales hasta personajes fantásticos, nuestros amigurumis son el regalo perfecto para todas las ocasiones.
¡Déjanos ser parte de tus momentos especiales con nuestros encantadores muñequitos de amigurumis!</p>
                <Link className="inline-block px-6 py-3 font-semibold tracking-wider text-white bg-primary uppercase mt-8 text-lg hover:bg-secondary-200 transition-all duration-300" to='/about'>
                    Más sobre nosotros
                </Link>
            </div>
        </div>
    );
};

export default Overview;
