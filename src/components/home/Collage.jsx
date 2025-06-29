import React from 'react';
import image from "./imagen1.jpg";
import image2 from "./imagen2.jpg";
import image3 from "./imagen3.jpg";
import image4 from "./imagen4.jpg";
import image5 from "./imagen5.jpeg";
import image6 from "./imagen6.jpg";
import image7 from "./imagen7.jpg";
import image8 from "./imagen9.jpg";
import image10 from "./imagen10.jpeg";
import PageHero from '../../layout/PageHero';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: { duration: .3 }
    },
    exit: {
        x: '-100vw',
        transition: { ease: 'easeInOut' }
    }
};

const imageVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.5, // Ajusta el retraso según sea necesario
            duration: 0.5
        }
    }
};

const underlineAnimate = {
    hidden: {
        opacity: 0,
        pathLength: 0,
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            delay: 1,
            duration: .8,
        },
    },
};

const Collage = () => {
    return (
        <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >


            <PageHero title="Tattoos" />
            <div className="w-full ">
                <div className='w-[95vw] flex mx-auto'>
                        <div className="flex flex-wrap sm:flex-nowrap justify-between pt-8 gap-2 overflow-hidden">
                            {/* Imágenes de la izquierda (6 imágenes) */}
                            <div className="grid grid-cols-3 gap-x-1 gap-y-0 w-full sm:w-2/3">
                                {/* Las primeras 3 imágenes para pantallas móviles */}
                                <img src={image} alt="Image 1" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                                <img src={image3} alt="Image 2" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                                <img src={image2} alt="Image 3" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                                {/* Las siguientes 3 imágenes para pantallas móviles */}
                                <img src={image4} alt="Image 4" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                                <img src={image5} alt="Image 5" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                                <img src={image6} alt="Image 6" className="w-full h-96 sm:h-112 lg:h-full border-4 border-white object-cover" />
                            </div>

                            {/* Imágenes de la derecha (2 grandes y 1 pequeña) */}
                            <div className="flex flex-col gap-2 w-full sm:w-1/3">
                                <img src={image8} alt="Image 7" className="w-full h-80 sm:h-80 lg:h-96 border-4 border-white object-cover" />
                                <img src={image7} alt="Image 8" className="w-full h-80 sm:h-80 lg:h-96 border-4 border-white object-cover" />
                                <img src={image10} alt="Image 9" className="w-full h-56 sm:h-56 lg:h-80 border-4 border-white object-cover" />
                            </div>

                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default Collage;
