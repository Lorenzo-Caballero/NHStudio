import React from 'react';

import { motion } from 'framer-motion';

import Overview from '../components/home/Overview';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Collage from '../components/home/Collage';
import ChatBot from '../components/home/ChatBot';
import WhatsAppButton from './WhatsAppButton';
import HeroBanner from '../components/home/HeroBanner';

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
}


const Home = () => {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroBanner />
      <Overview />
      <FeaturedProducts />
      <WhatsAppButton/>
      <ChatBot/>
      <Collage />
    </motion.main>
  );
};

export default Home;
