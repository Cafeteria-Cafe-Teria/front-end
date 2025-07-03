import React from 'react';
import { Link } from 'react-router-dom';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';

const ClienteWelcome = () => {
  return (
    <div className="cliente-welcome-container">
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo" />
      
      <h1 className="cliente-welcome-title">🍽️ Área do Cliente</h1>
      
      <p className="cliente-welcome-subtitle">
        Seja bem-vindo! Aqui você pode fazer seus pedidos e acompanhar o status das suas refeições.
      </p>
      
      <div className="cliente-welcome-features">
        <div className="feature-item">
          <span className="feature-icon">📱</span>
          <span>Faça pedidos online</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">⏰</span>
          <span>Acompanhe em tempo real</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">💳</span>
          <span>Pagamento seguro</span>
        </div>
      </div>
      
      <div className="cliente-welcome-buttons">
        <Link to="/cliente/dashboard" className="cliente-welcome-button primary">
          Entrar na Área do Cliente
        </Link>
        <Link to="/" className="cliente-welcome-button secondary">
          ← Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default ClienteWelcome;
