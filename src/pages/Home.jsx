import React from 'react';

import { motion } from 'framer-motion';
import WhatYouLearn from '../components/home/WhatYouLearn';
import Hero from "../components/home/Hero";
import Overview from '../components/home/Overview';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ChatBot from '../components/home/ChatBot';
import WhatsAppButton from "../pages/WhatsAppButton";
import Collage from "../components/home/Collage"; 
import OnlyCollage from '../components/home/OnlyCollage';
import CourseContent from '../components/home/CourseContent';
import CoursePriceInfo from '../components/home/CoursePrice';
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
    >
      <Hero />
      <WhatYouLearn />
      <Overview />
      <CourseContent/>
      <WhatsAppButton/>
      <CoursePriceInfo/>
      <OnlyCollage/>
    </motion.main>
  );
};

export default Home;