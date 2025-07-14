import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeButton from '../components/WelcomeButton';
import ApiService from '../service/ApiService';
import logo from '../assets/LOGO.svg';
import './ClienteWelcome.css';

const ClienteNovaBebida = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const handleFinalizarPedido = async () => {
    const pedidoUuid = localStorage.getItem('pedidoUuid');
    if (!pedidoUuid) {
      alert('Pedido não encontrado!');
      return;
    }
    try {
      await ApiService.enviarPedido(pedidoUuid);
      // Limpa o localStorage para evitar adicionar bebida em pedido já finalizado
      localStorage.removeItem('tipoBebida');
      localStorage.removeItem('bebidaId');
      // Não remova o pedidoUuid ainda, pois ClienteTotal precisa dele
      navigate(`/cliente/${uuid}/total`);
    } catch (error) {
      alert('Erro ao finalizar pedido!');
    }
  };

  return (
    <div className="cliente-welcome-container">
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo2" />
      <div className="cliente-welcome-buttons" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        marginTop: '-20px'
      }}>
        <span className="cliente-adicionais-title" style={{ fontSize: 22 }}>
          Deseja adicionar uma nova bebida?
        </span>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
            <WelcomeButton
            type="botao1"
            text="Sim, adicionar bebida"
            width={240}
            height={130}
            onClick={() => {
                localStorage.removeItem('tipoBebida');
                localStorage.removeItem('bebidaId');
                navigate(`/cliente/${uuid}/bebida`);
            }}
            />
          <WelcomeButton
            type="botao1"
            text="Não, Finalizar pedido"
            width={240}
            height={130}
            onClick={handleFinalizarPedido}
          />
        </div>
      </div>
    </div>
  );
};

export default ClienteNovaBebida;