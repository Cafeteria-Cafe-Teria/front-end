import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ClienteWelcome from './pages/ClienteWelcome';
import CozinhaWelcome from './pages/CozinhaWelcome';
import Cliente from './pages/ClienteAdicionar';
import Cozinha from './pages/Cozinha';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cliente" element={<ClienteWelcome />} />
      <Route path="/cliente/dashboard" element={<Cliente />} />
      <Route path="/cozinha" element={<CozinhaWelcome />} />
      <Route path="/cozinha/dashboard" element={<Cozinha />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

