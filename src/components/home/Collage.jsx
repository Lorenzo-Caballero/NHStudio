import React from 'react';

const Collage = () => {
    return (
        <div className="flex flex-wrap justify-between gap-4 p-4 overflow-hidden">
            {/* Imágenes de la izquierda (6 imágenes) */}
            <div className="flex flex-wrap gap-4 w-full sm:w-2/3 md:w-2/3">
                <img src="/images/imagen1.jpg" alt="Image 1" className="w-1/2 sm:w-1/3 md:w-1/3 h-auto border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
                <img src="/images/imagen2.jpg" alt="Image 2" className="w-1/2 sm:w-1/3 md:w-1/3 h-auto border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
                <img src="/images/imagen3.jpg" alt="Image 3" className="w-1/2 sm:w-1/3 md:w-1/3 h-auto border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
                <img src="/images/imagen4.jpg" alt="Image 4" className="w-1/2 sm:w-1/3 md:w-1/3 h-auto border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
                <img src="/images/imagen5.jpg" alt="Image 5" className="w-1/2 sm:w-1/3 md:w-1/3 h-auto border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
                <img src="/images/imagen6.jpg" alt="Image 6" className="w-1/2 sm:w-1/3 md:w-1/3 h-auto border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
            </div>

            {/* Imágenes de la derecha (2 grandes y 1 pequeña) */}
            <div className="flex flex-col gap-4 w-full sm:w-1/3 md:w-1/3">
                <img src="/images/imagen7.jpg" alt="Image 7" className="w-full h-64 border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
                <img src="/images/imagen8.jpg" alt="Image 8" className="w-full h-64 border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
                <img src="/images/imagen9.jpg" alt="Image 9" className="w-full h-40 border-4 border-transparent bg-gradient-to-r from-[#4f79b1] to-[#F1D8F4] object-cover" />
            </div>
        </div>
    );
};

export default Collage;
