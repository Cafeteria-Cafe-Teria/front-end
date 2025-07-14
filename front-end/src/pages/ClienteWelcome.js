import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';

const ClienteWelcome = () => {
  const navigate = useNavigate();

  const handleIniciarPedido = async () => {
    localStorage.removeItem('pedidoUuid');
    localStorage.removeItem('tipoBebida');
    localStorage.removeItem('bebidaId');
    try {
      const novoPedido = await (await import('../service/ApiService')).default.criarPedido();
      if (novoPedido && novoPedido.uuid) {
        localStorage.setItem('pedidoUuid', novoPedido.uuid);
        navigate(`/cliente/${novoPedido.uuid}/bebida`);
      } else {
        alert('Erro ao criar pedido.');
      }
    } catch {
      alert('Erro ao criar pedido.');
    }
  };

  return (
    <div className="cliente-welcome-container">
      <h1 className="cliente-welcome-title">Boas-vindas à</h1>
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo" />
      <div className="cliente-welcome-buttons">
        <WelcomeButton
          type="botao2"
          text="Inicie seu pedido!"
          onClick={handleIniciarPedido}
        />
      </div>
    </div>
  );
};

export default ClienteWelcome;
