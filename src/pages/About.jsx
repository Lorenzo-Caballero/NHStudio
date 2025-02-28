import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../layout/PageHero';
import Logo from '../assets/LogoNH.png';
import ChatBot from '../components/home/ChatBot';
import WhatsAppButton from './WhatsAppButton';
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

const About = () => {
    return (
        <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <WhatsAppButton/>
                  <ChatBot/>

            <PageHero title="Acerca de NH Studio" />
            <div className='w-full py-20'>
                <div className='w-[85vw] flex mx-auto'>
                    <div className='grid sm:grid-cols-1 md:grid-cols-2'>
                        <div>
                            <motion.img 
                                src={Logo} 
                                alt="NH Studio" 
                                className="w-full" 
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                            />
                        </div>
                        <div>
                            <motion.h2 className='text-4xl lg:text-6xl font-bold capitalize tracking-wider text-[#2c3e50]'
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: .5 }}
                            >
                                Nuestra Historia
                                <svg
                                    className="svg-underline stroke-[#4779a4] relative z-10 w-1/2"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth={7}
                                    viewBox="0 0 422 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <motion.path
                                        d="M3 9C118.957 4.47226 364.497 -1.86658 419 9"
                                        variants={underlineAnimate}
                                        initial="hidden"
                                        animate="visible"
                                    />
                                </svg>
                            </motion.h2>
                            <motion.p className='leading-10 text-[#2c3e50] py-8 text-lg'
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: .5, duration: .8 }}
                            >
                                ¡Bienvenidos a NH Studio! Somos un estudio de tatuajes ubicado en Mar del Plata, diseñado para brindarte la mejor experiencia de tatuaje de tu vida. En NH Studio, nos enfocamos en ofrecer un ambiente único donde podrás disfrutar de cada paso del proceso, desde la elección de tu diseño hasta el cuidado post-tatuaje.
                                <br />
                                Contamos con los tatuadores más profesionales de la zona, quienes están comprometidos con la excelencia y la creatividad en cada uno de sus trabajos. Ya sea que estés buscando un diseño único o quieras hacer realidad tu idea, estamos aquí para hacer que tu tatuaje sea una obra de arte.
                                <br />
                                ¡Déjanos ser parte de tu historia con un tatuaje que te acompañará siempre!
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default About;
