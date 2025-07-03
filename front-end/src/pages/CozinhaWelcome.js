import React from 'react';
import { Link } from 'react-router-dom';
import './CozinhaWelcome.css';
import logo from '../assets/LOGO.svg';

const CozinhaWelcome = () => {
  return (
    <div className="cozinha-welcome-container">
      <h1 className="cozinha-welcome-title">Cozinha do</h1>
      <img src={logo} alt="Logo do Restaurante" className="cozinha-welcome-logo" />
      <div className="cozinha-welcome-buttons">
        <Link to="/cozinha/dashboard" className="cozinha-welcome-button primary">
          Prepare pedidos!
        </Link>
      </div>
    </div>
  );
};

export default CozinhaWelcome;
