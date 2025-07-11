import React from 'react';
import { Link } from 'react-router-dom';
import './CozinhaWelcome.css';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';

const CozinhaWelcome = () => {
  return (
    <div className="cozinha-welcome-container">
      <h1 className="cozinha-welcome-title">Cozinha do</h1>
      <img src={logo} alt="Logo do Restaurante" className="cozinha-welcome-logo" />
      <div className="cozinha-welcome-buttons">
        <Link to="/cozinha/bebida">
          <WelcomeButton 
            type="botao2" 
            text="Prepare pedidos!" 
          />
        </Link>
      </div>
    </div>
  );
};

export default CozinhaWelcome;
