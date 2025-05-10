import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Roulette from "./pages/Roullette";
import TablaPremios from "./pages/TablaPremios";
const AppGames = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Roulette />} />
        <Route path="/games" element={<Roulette />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppGames;
