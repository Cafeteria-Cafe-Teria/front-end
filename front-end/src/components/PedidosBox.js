import React from 'react';
import './PedidosBox.css';
import checkIcon from '../assets/check.svg';

const PedidosBox = ({ pedidos, onStatusChange, currentStatus }) => {
  const handleCheckClick = (pedidoId) => {
    if (onStatusChange) {
      onStatusChange(pedidoId, currentStatus);
    }
  };

  return (
    <div className="pedidos-box">
      <div className="pedidos-scroll-container">
        {pedidos.map((pedido, index) => (
          <div key={pedido.id}>
            <div className="pedido-item-box">
              <div className="pedido-info">
                <div className="pedido-header-box">
                  <span className="pedido-mesa-box">{pedido.mesa}</span>
                </div>
                <p className="pedido-descricao-box">{pedido.descricao}</p>
              </div>
              
              {/* Botão de Check - só aparece se não for "entregue" */}
              {currentStatus !== 'entregue' && (
                <button 
                  className="check-button"
                  onClick={() => handleCheckClick(pedido.id)}
                  title="Mudar status do pedido"
                >
                  <img src={checkIcon} alt="Check" className="check-icon" />
                </button>
              )}
            </div>
            
            {/* Linha divisória - não aparece no último item */}
            {index < pedidos.length - 1 && (
              <div className="pedido-divider"></div>
            )}
          </div>
        ))}
        
        {pedidos.length === 0 && (
          <div className="empty-box-state">
            <p>Nenhum pedido neste status</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PedidosBox;
