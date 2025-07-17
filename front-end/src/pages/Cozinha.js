import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cozinha.css';
import logo from '../assets/LOGO.svg';
import PedidosBox from '../components/PedidosBox';
import ApiService from '../service/ApiService';

// Use os status exatamente como no backend
const statusLabels = {
  Recebido: 'Recebido',
  'Em preparo': 'Em Preparo ',
  Pronto: 'Pronto',
  Entregue: 'Entregue'
};

const statusOrder = ['Recebido', 'Em preparo', 'Pronto', 'Entregue'];

const Cozinha = () => {
  const [activeStatus, setActiveStatus] = useState('Recebido');
  const [pedidos, setPedidos] = useState({
    Recebido: [],
    'Em preparo': [],
    Pronto: [],
    Entregue: []
  });

  // Carrega pedidos da API e atualiza em tempo real via WebSocket
  useEffect(() => {
    let ws;
    let ignore = false;

    const fetchPedidos = async () => {
      try {
        const todos = await ApiService.pegarTodosOsPedidos();
        if (!ignore) {
          const agrupados = {
            Recebido: [],
            'Em preparo': [],
            Pronto: [],
            Entregue: []
          };
          todos.forEach(pedido => {
            const status = pedido.status;
            if (agrupados[status]) agrupados[status].push(pedido);
          });
          setPedidos(agrupados);
        }
      } catch (e) {
        // Pode exibir erro se quiser
      }
    };

    fetchPedidos();

    // WebSocket para atualização em tempo real
    ws = ApiService.conectarWebSocketCozinha((msg) => {
      if (!msg || !msg.uuid || !msg.status) return;
      setPedidos(prev => {
        const novo = {
          Recebido: [...prev.Recebido],
          'Em preparo': [...prev['Em preparo']],
          Pronto: [...prev.Pronto],
          Entregue: [...prev.Entregue]
        };
        // Remove o pedido de todos os status
        statusOrder.forEach(st => {
          novo[st] = novo[st].filter(p => (p.uuid || p.id) !== (msg.uuid || msg.id));
        });
        // Adiciona no status correto, se for um status válido e não for cancelado
        if (novo[msg.status] && msg.status !== 'Cancelado') {
          novo[msg.status] = [...novo[msg.status], msg];
        }
        return novo;
      });
    });

    return () => {
      ignore = true;
      if (ws && ws.close) ws.close();
    };
  }, []);

  const handleStatusChange = async (pedidoId, currentStatus) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = statusOrder[currentIndex + 1];
    if (nextStatus) {
      try {
        await ApiService.mudarStatusDePedido(pedidoId, nextStatus);
      } catch (e) {
        // Pode exibir erro se quiser
      }
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