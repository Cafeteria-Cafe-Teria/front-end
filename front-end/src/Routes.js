import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ClienteWelcome from './pages/ClienteWelcome';
import CozinhaWelcome from './pages/CozinhaWelcome';
import Cozinha from './pages/Cozinha';
import NotFound from './pages/NotFound';
import ClienteAdicionarBebida from './pages/ClienteAdicionarBebida';
import ClienteAdicionais from './pages/ClienteAdicionais';
import ClienteNovaBebida from './pages/ClienteNovaBebida';
import ClienteTotal from './pages/ClienteTotal';
import ClienteNome from './pages/ClienteNome';
import ClientePagamento from './pages/ClientePagamento';
import ClienteStatusFinal from './pages/ClienteStatusFinal';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cliente" element={<ClienteWelcome />} />
      <Route path="/cliente/:uuid/bebida" element={<ClienteAdicionarBebida />} />
      <Route path="/cliente/:uuid/bebida/adicionais" element={<ClienteAdicionais/>} />
      <Route path="/cliente/:uuid/nova-bebida" element={<ClienteNovaBebida />} />
      <Route path="/cliente/:uuid/total" element={<ClienteTotal />} />
      <Route path="/cliente/:uuid/nome" element={<ClienteNome />} />
      <Route path="/cliente/:uuid/pagamento" element={<ClientePagamento />} />
      <Route path="/cliente/status/:uuid" element={<ClienteStatusFinal />} />
      <Route path="/cozinha" element={<CozinhaWelcome />} />
      <Route path="/cozinha/dashboard" element={<Cozinha />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

