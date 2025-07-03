import React from 'react';
import { Link } from 'react-router-dom';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';

const ClienteWelcome = () => {
  return (
    <div className="cliente-welcome-container">
      <h1 className="cliente-welcome-title">Boas-vindas à</h1>
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo" />
      <div className="cliente-welcome-buttons">
        <Link to="/cliente/dashboard" className="cliente-welcome-button primary">
          Inicie seu pedido!
        </Link>
      </div>
    </div>
  );
};

export default ClienteWelcome;
