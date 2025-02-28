import React from 'react';
import image from "./imagen1.jpg";
import image2 from "./imagen2.png";
import image3 from "./imagen3.png";
import image4 from "./imagen4.png";
import image5 from "./imagen5.png";
import image6 from "./imagen6.png";
import image7 from "./imagen7.png";
import image8 from "./imagen8.png";
import image9 from "./imagen8.png";

const Collage = () => {
    return (
        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-2 p-4 pt-8 overflow-hidden">
            {/* Imágenes de la izquierda (6 imágenes) */}
            <div className="grid grid-cols-3 gap-x-1 gap-y-0 w-full sm:w-2/3">
                {/* Las primeras 3 imágenes para pantallas móviles */}
                <img src={image} alt="Image 1" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                <img src={image2} alt="Image 2" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                <img src={image3} alt="Image 3" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                {/* Las siguientes 3 imágenes para pantallas móviles */}
                <img src={image4} alt="Image 4" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                <img src={image5} alt="Image 5" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                <img src={image6} alt="Image 6" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
            </div>

            {/* Imágenes de la derecha (2 grandes y 1 pequeña) */}
            <div className="flex flex-col gap-2 w-full sm:w-1/3">
                <img src={image7} alt="Image 7" className="w-full h-80 sm:h-80 lg:h-96 border-4 border-white object-cover" />
                <img src={image8} alt="Image 8" className="w-full h-80 sm:h-80 lg:h-96 border-4 border-white object-cover" />
                <img src={image3} alt="Image 9" className="w-full h-56 sm:h-56 lg:h-80 border-4 border-white object-cover" />
            </div>
        </div>
    );
};

export default Collage;
