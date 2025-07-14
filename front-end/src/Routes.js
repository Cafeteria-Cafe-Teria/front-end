import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ClienteWelcome from './pages/ClienteWelcome';
import CozinhaWelcome from './pages/CozinhaWelcome';
import Cozinha from './pages/Cozinha';
import NotFound from './pages/NotFound';
import ClienteAdicionarBebida from './pages/ClienteAdicionarBebida';
import ClienteAdicionais from './pages/ClienteAdicionais';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cliente" element={<ClienteWelcome />} />
      <Route path="/cliente/bebida" element={<ClienteAdicionarBebida />} />
      <Route path="/cliente/bebida/adicionais" element={<ClienteAdicionais/>} />
      <Route path="/cozinha" element={<CozinhaWelcome />} />
      <Route path="/cozinha/pedidos" element={<Cozinha />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

