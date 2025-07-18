import React from 'react';
import './PedidosBox.css'; // Reutiliza o mesmo estilo!
import closeIcon from '../assets/close.svg'; // Use um ícone de fechar, ou ×

const ClientePedidosBox = ({ bebidasList, onRemover }) => (
  <div className="pedidos-box">
    <div className="pedidos-scroll-container">
      {bebidasList.length > 0 ? bebidasList.map((bebidaArr, idx) => {
        const nomeBebida = bebidaArr
          .filter(item => item.preco !== undefined && item.preco !== null)
          .map(item => item.nome)
          .join(' ');
        const precoBebida = bebidaArr
          .reduce((acc, item) => acc + (typeof item.preco === 'number' ? item.preco : 0), 0);
        const idBebida = bebidaArr[0]?.id ?? idx;

        return (
          <div key={idBebida}>
            <div className="pedido-item-box">
              <div className="pedido-info">
                <div className="pedido-header-box">
                  <span className="pedido-mesa-box">
                    {nomeBebida}
                  </span>
                </div>
                <div className="pedido-descricao-box">
                  <span>
                    {precoBebida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>
              <button
                className="check-button"
                onClick={() => onRemover(idBebida)}
                title="Remover bebida"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <img src={closeIcon} alt="Remover" className="close-icon" />
              </button>
            </div>
            {idx < bebidasList.length - 1 && (
              <div className="pedido-divider"></div>
            )}
          </div>
          
        );
      }) : (
        <div className="empty-box-state">
          <p>Nenhuma bebida adicionada.</p>
        </div>
      )}
    <div style={{
        textAlign: 'center',
        color: '#b85c5c',
        fontWeight: 600,
        fontSize: 16,
        margin: '18px 0 0 0'
      }}>
        Para <b>remover</b>, clique no "×".
      </div>
    </div>
  </div>
);

export default ClientePedidosBox;