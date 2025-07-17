import React from 'react';
import './PedidosBox.css';
import checkIcon from '../assets/check.svg';

const PedidosBox = ({ pedidos, onStatusChange }) => {
  const handleCheckClick = (pedidoId, pedidoStatus) => {
    if (onStatusChange) {
      onStatusChange(pedidoId, pedidoStatus);
    }
  };

  return (
    <div className="pedidos-box">
      <div className="pedidos-scroll-container">
        {pedidos.map((pedido, index) => (
          <div key={pedido.uuid || pedido.id}>
            <div className="pedido-item-box">
              <div className="pedido-info">
                <div className="pedido-header-box">
                  <span className="pedido-mesa-box">
                    {pedido.nome_do_cliente || 'Cliente'}
                  </span>
                </div>
                <div className="pedido-descricao-box">
                  {pedido.bebidas && pedido.bebidas.length > 0 ? (
                    <ul>
                      {pedido.bebidas.map((bebida) => (
                        <li key={bebida.id}>
                          <strong>{bebida.tipo}</strong>
                          {bebida.adicionais && bebida.adicionais.length > 0 && (
                            <span>
                              {' '}| Adicionais: {bebida.adicionais.join(', ')}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>Nenhuma bebida</span>
                  )}
                </div>
              </div>
              
              {/* Botão de Check - só aparece se não for "Entregue" */}
              {pedido.status !== 'Entregue' && (
                <button 
                  className="check-button"
                  onClick={() => handleCheckClick(pedido.uuid || pedido.id, pedido.status)}
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