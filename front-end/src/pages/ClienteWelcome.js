import React from 'react';
import { Link } from 'react-router-dom';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';

const ClienteWelcome = () => {
  return (
    <div className="cliente-welcome-container">
      <h1 className="cliente-welcome-title">Boas-vindas à</h1>
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo" />
      <div className="cliente-welcome-buttons">
        <Link to="/cliente/bebida">
          <WelcomeButton 
            type="botao2" 
            text="Inicie seu pedido!" 
          />
        </Link>
      </div>
    </div>
  );
};

export default ClienteWelcome;
