import React from 'react';
import { Link } from 'react-router-dom';
import './Cozinha.css';

const Cozinha = () => {
  return (
    <div className="cozinha-container">
      <div className="cozinha-header">
        <h1 className="cozinha-title">👨‍🍳 Área da Cozinha</h1>
        <Link to="/" className="cozinha-back-link">
          ← Voltar ao início
        </Link>
      </div>
      
      <div className="cozinha-main-grid">
        <div className="cozinha-card">
          <h3>📋 Pedidos Pendentes</h3>
          <div style={{ marginTop: '15px' }}>
            <div className="pedido-item">
              <span className="pedido-mesa">Mesa 5</span>
              <span className="status-badge status-pendente">Pendente</span>
              <p className="pedido-descricao">2x Hambúrguer, 1x Batata Frita</p>
            </div>
            <div className="pedido-item">
              <span className="pedido-mesa">Mesa 2</span>
              <span className="status-badge status-pendente">Pendente</span>
              <p className="pedido-descricao">1x Pizza Margherita, 2x Refrigerante</p>
            </div>
          </div>
        </div>
        
        <div className="cozinha-card">
          <h3>🔥 Em Preparo</h3>
          <div style={{ marginTop: '15px' }}>
            <div className="pedido-item">
              <span className="pedido-mesa">Mesa 1</span>
              <span className="status-badge status-preparando">Preparando</span>
              <p className="pedido-descricao">1x Lasanha, 1x Salada Caesar</p>
            </div>
          </div>
        </div>
        
        <div className="cozinha-card">
          <h3>📊 Estatísticas</h3>
          <div className="estatisticas" style={{ marginTop: '15px' }}>
            <p><strong>Pedidos hoje:</strong> 23</p>
            <p><strong>Tempo médio:</strong> 18 min</p>
            <p><strong>Em preparo:</strong> 3</p>
            <p><strong>Pendentes:</strong> 5</p>
          </div>
        </div>
      </div>
      
      <div className="cozinha-secondary-grid">
        <div className="cozinha-card">
          <h3>🍳 Gerenciar Cardápio</h3>
          <p>Adicionar, editar ou remover itens do cardápio</p>
        </div>
        
        <div className="cozinha-card">
          <h3>📈 Relatórios</h3>
          <p>Visualizar relatórios de vendas e performance</p>
        </div>
        
        <div className="cozinha-card">
          <h3>⚙️ Configurações</h3>
          <p>Ajustar configurações da cozinha</p>
        </div>
      </div>
    </div>
  );
};

export default Cozinha;
