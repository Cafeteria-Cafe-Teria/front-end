import React from 'react';
import { Link } from 'react-router-dom';
import './CozinhaWelcome.css';
import logo from '../assets/LOGO.svg';

const CozinhaWelcome = () => {
  return (
    <div className="cozinha-welcome-container">
      <img src={logo} alt="Logo do Restaurante" className="cozinha-welcome-logo" />
      
      <h1 className="cozinha-welcome-title">👨‍🍳 Área da Cozinha</h1>
      
      <p className="cozinha-welcome-subtitle">
        Bem-vindo, Chef! Aqui você gerencia todos os pedidos e controla a produção da cozinha.
      </p>
      
      <div className="cozinha-welcome-features">
        <div className="feature-item">
          <span className="feature-icon">📋</span>
          <span>Gerenciar pedidos</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">⚡</span>
          <span>Atualizações em tempo real</span>
        </div>
        <div className="feature-item">
          <span className="feature-icon">📊</span>
          <span>Relatórios de produção</span>
        </div>
      </div>
      
      <div className="cozinha-welcome-buttons">
        <Link to="/cozinha/dashboard" className="cozinha-welcome-button primary">
          Entrar na Área da Cozinha
        </Link>
        <Link to="/" className="cozinha-welcome-button secondary">
          ← Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default CozinhaWelcome;
