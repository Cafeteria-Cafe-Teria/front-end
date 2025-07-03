import React from 'react';
import { Link } from 'react-router-dom';
import './Cliente.css';

const Cliente = () => {
  return (
    <div className="cliente-container">
      <div className="cliente-header">
        <h1 className="cliente-title">🍽️ Área do Cliente</h1>
        <Link to="/" className="cliente-back-link">
          ← Voltar ao início
        </Link>
      </div>
      
      <div className="cliente-grid">
        <div className="cliente-card">
          <h3>📱 Fazer Pedido</h3>
          <p>Navegue pelo cardápio e faça seu pedido</p>
        </div>
        
        <div className="cliente-card">
          <h3>👀 Acompanhar Pedido</h3>
          <p>Veja o status do seu pedido em tempo real</p>
        </div>
        
        <div className="cliente-card">
          <h3>🧾 Histórico</h3>
          <p>Consulte seus pedidos anteriores</p>
        </div>
        
        <div className="cliente-card">
          <h3>👤 Meu Perfil</h3>
          <p>Gerencie suas informações pessoais</p>
        </div>
      </div>
    </div>
  );
};

export default Cliente;
