import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../service/ApiService';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';
import './ClienteWelcome.css';

// Mapear os status do backend 
const statusLabels = {
  'Recebido': 'Pedido recebido',
  'Em preparo': 'Preparando...',
  'Pronto': 'Pronto para retirar!',
  'Entregue': 'Pedido entregue'
};

const ClienteStatusFinal = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [status, setStatus] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ws;
    let ignore = false;
    const statusFinalizados = ['Entregue', 'Cancelado'];
    const statusPermitidos = ['Recebido', 'Em preparo', 'Pronto', 'Entregue'];

    const buscarStatusInicial = async () => {
      if (!uuid) {
        setErro('Pedido não encontrado.');
        return;
      }
      try {
        // Buscar status inicial do pedido
        const pedidos = await ApiService.pegarTodosOsPedidos();
        const pedido = Array.isArray(pedidos)
          ? pedidos.find(p => (p.uuid || p.id) === uuid)
          : null;
        
        if (!pedido || !pedido.status) {
          setErro('Pedido não encontrado.');
          return;
        }
        
        const statusAtual = pedido.status; // Usar status exato do backend
        if (!statusPermitidos.includes(statusAtual)) {
          setErro('Aguardando início do pedido...');
          return;
        }
        
        setStatus(statusAtual);
        
        // Se status for finalizado/cancelado, não conecta WebSocket
        if (statusFinalizados.includes(statusAtual)) {
          return;
        }
        
    
        ws = ApiService.conectarWebSocketCozinha((msg) => {
          if (msg && msg.uuid && msg.status && !ignore) {
            // Verificar se a mensagem é do pedido específico
            if ((msg.uuid || msg.id) === uuid) {
              const novoStatus = msg.status;
              if (statusPermitidos.includes(novoStatus)) {
                setStatus(novoStatus);
              }
            }
          }
        });
      } catch {
        setErro('Erro ao buscar status do pedido.');
      }
    };

    buscarStatusInicial();
    
    return () => {
      ignore = true;
      if (ws && ws.close) ws.close();
    };
  }, [uuid]);

  return (
    <div className="cliente-welcome-container">
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo2" />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '-20px'
      }}>
        <span className="cliente-adicionais-title" style={{ fontSize: 22, marginBottom: 20 }}>
          Status do seu pedido
        </span>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          minWidth: '260px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '4px 4px 0 #5F2D29',
          marginBottom: '30px',
          padding: '32px 0',
          border: '3px solid #5F2D29',
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 700,
          color: '#5F2D29'
        }}>
          {erro ? erro : (statusLabels[status] || status || 'Aguardando...')}
        </div>
        <WelcomeButton
          type="botao1"
          text="Novo Pedido"
          width={200}
          height={60}
          onClick={async () => {
            localStorage.removeItem('pedidoUuid');
            try {
              const novoPedido = await ApiService.criarPedido();
              if (novoPedido && novoPedido.uuid) {
                localStorage.setItem('pedidoUuid', novoPedido.uuid);
                navigate(`/cliente/${novoPedido.uuid}/bebida`);
              } else {
                navigate('/cliente');
              }
            } catch {
              navigate('/cliente');
            }
          }}
        />
      </div>
    </div>
  );
};

export default ClienteStatusFinal;