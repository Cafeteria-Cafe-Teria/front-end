import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cozinha.css';
import logo from '../assets/LOGO.svg';
import PedidosBox from '../components/PedidosBox';

const Cozinha = () => {
  const [activeStatus, setActiveStatus] = useState('recebido');

  // Dados dos pedidos organizados por status
  const [pedidos, setPedidos] = useState({
    recebido: [
      { id: 1, mesa: 'Mesa 5', descricao: '2x Hambúrguer, 1x Batata Frita', tempo: '2 min' },
      { id: 2, mesa: 'Mesa 2', descricao: '1x Pizza Margherita, 2x Refrigerante', tempo: '5 min' },
      { id: 3, mesa: 'Mesa 8', descricao: '1x Lasanha, 1x Salada Caesar', tempo: '1 min' },
      { id: 10, mesa: 'Mesa 12', descricao: '1x Salmão Grelhado, 2x Água com Gás', tempo: '3 min' },
      { id: 11, mesa: 'Mesa 15', descricao: '3x Tacos, 1x Cerveja, 1x Nachos', tempo: '7 min' },
      { id: 12, mesa: 'Mesa 20', descricao: '2x Ramen, 1x Chá Verde', tempo: '4 min' }
    ],
    preparo: [
      { id: 4, mesa: 'Mesa 1', descricao: '1x Risotto, 2x Suco Natural', tempo: '15 min' },
      { id: 5, mesa: 'Mesa 3', descricao: '3x Sanduíche, 1x Batata Frita', tempo: '10 min' }
    ],
    pronto: [
      { id: 6, mesa: 'Mesa 7', descricao: '2x Pasta Carbonara, 1x Vinho', tempo: '20 min' },
      { id: 7, mesa: 'Mesa 4', descricao: '1x Bife, 2x Guaraná', tempo: '18 min' }
    ],
    entregue: [
      { id: 8, mesa: 'Mesa 6', descricao: '1x Frango Grelhado, 1x Água', tempo: '25 min' },
      { id: 9, mesa: 'Mesa 9', descricao: '2x Hambúrguer Vegano, 2x Suco', tempo: '22 min' }
    ]
  });

  const statusLabels = {
    recebido: 'Recebido',
    preparo: 'Em Preparo', 
    pronto: 'Pronto',
    entregue: 'Entregue'
  };

  // Função para mudar o status do pedido
  const handleStatusChange = (pedidoId, currentStatus) => {
    const statusOrder = ['recebido', 'preparo', 'pronto', 'entregue'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = statusOrder[currentIndex + 1];
    
    if (nextStatus) {
      setPedidos(prevPedidos => {
        const newPedidos = { ...prevPedidos };
        
        // Encontrar o pedido atual
        const pedido = newPedidos[currentStatus].find(p => p.id === pedidoId);
        
        if (pedido) {
          // Remover do status atual
          newPedidos[currentStatus] = newPedidos[currentStatus].filter(p => p.id !== pedidoId);
          
          // Adicionar ao próximo status
          newPedidos[nextStatus] = [...newPedidos[nextStatus], pedido];
        }
        
        return newPedidos;
      });
    }
  };

  return (
    <div className="cozinha-container">
      {/* Header com Logo */}
      <div className="cozinha-header">
        <Link to="/" className="cozinha-back-link">
          ← Voltar
        </Link>
        <div className="cozinha-header-content">
          <img src={logo} alt="Logo do Restaurante" className="cozinha-logo" />
        </div>
      </div>

      {/* Área de Pedidos */}
      <div className="pedidos-container">
        <h2 className="pedidos-title">{statusLabels[activeStatus]}</h2>
        <PedidosBox 
          pedidos={pedidos[activeStatus]}
          onStatusChange={handleStatusChange}
          currentStatus={activeStatus}
        />
      </div>

      {/* Botões de Navegação */}
      <div className="status-navigation">
        {Object.keys(statusLabels).map((status) => (
          <button
            key={status}
            className={`status-button ${activeStatus === status ? 'active' : ''}`}
            onClick={() => setActiveStatus(status)}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cozinha;
