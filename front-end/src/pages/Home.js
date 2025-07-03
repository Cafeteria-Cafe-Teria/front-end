import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/LOGO.svg';

const Home = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo do Restaurante" className="home-logo" />
      <p className="home-subtitle">
        Bem-vindo! Escolha sua área de acesso:
      </p>
      
      <div className="home-buttons-container">
        <Link to="/cliente" className="home-button">
          Área do Cliente
        </Link>
        
        <Link to="/cozinha" className="home-button">
          Área da Cozinha
        </Link>
      </div>
    </div>
  );
};

export default Home;
