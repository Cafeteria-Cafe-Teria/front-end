import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../service/ApiService';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';
import status1 from '../assets/status/status1.svg';
import status2 from '../assets/status/status2.svg';
import status3 from '../assets/status/status3.svg';
import status4 from '../assets/status/status4.svg';
import './ClienteWelcome.css';

// Mapear os status do backend 
const statusLabels = {
  'Recebido': 'Aguardando preparo',
  'Em preparo': 'Seu pedido está sendo preparado',
  'Pronto': 'Pronto para retirar!',
  'Entregue': 'Pedido entregue'
};

const statusImages = {
  'Recebido': status1,
  'Em preparo': status2,
  'Pronto': status3,
  'Entregue': status4
};

const ClienteStatusFinal = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [status, setStatus] = useState('');
  const [erro, setErro] = useState('');
  const [imgTransition, setImgTransition] = useState(false);

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
        const pedidos = await ApiService.pegarTodosOsPedidos();
        const pedido = Array.isArray(pedidos)
          ? pedidos.find(p => (p.uuid || p.id) === uuid)
          : null;
        
        if (!pedido || !pedido.status) {
          setErro('Pedido não encontrado.');
          return;
        }
        
        const statusAtual = pedido.status;
        if (!statusPermitidos.includes(statusAtual)) {
          setErro('Aguardando início do pedido...');
          return;
        }
        
        setStatus(statusAtual);

        if (statusFinalizados.includes(statusAtual)) {
          return;
        }

        ws = ApiService.conectarWebSocketCozinha((msg) => {
          if (msg && msg.uuid && msg.status && !ignore) {
            if ((msg.uuid || msg.id) === uuid) {
              const novoStatus = msg.status;
              if (statusPermitidos.includes(novoStatus)) {
                setImgTransition(true);
                setTimeout(() => {
                  setStatus(novoStatus);
                  setImgTransition(false);
                }, 350); // tempo da animação
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

  const statusImg = statusImages[status] || status1;
  const statusText = erro ? erro : (statusLabels[status] || status || 'Aguardando...');

return (
    <div className="cliente-welcome-container">
      <span className="cliente-adicionais-title" style={{ fontSize: 30, marginBottom: 0 }}>
      Agradecemos à sua compra!
      </span>
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo" />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '-20px'
      }}>
        <span className="cliente-adicionais-title" style={{ fontSize: 18, marginBottom: 20 }}>
          Acompanhe o status do seu pedido
        </span>
        <div style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 200,
          color: '#FCE5EB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
          transition: 'all 0.35s'
        }}>
          <img
            src={statusImg}
            alt={status}
            style={{
              width: 300,
              height: 50,
              marginBottom: 18,
              opacity: imgTransition ? 0 : 1,
              transform: imgTransition ? 'scale(0.95)' : 'scale(1)',
              transition: 'opacity 0.35s, transform 0.35s'
            }}
          />
          <span style={{
            fontSize: 22,
            fontWeight: 600,
            color: '#FCE5EB',
            marginBottom: 8,
          }}>
            {statusText}
          </span>
        </div>
        <WelcomeButton
          type="botao1"
          text="Novo Pedido"
          width={200}
          height={80}
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