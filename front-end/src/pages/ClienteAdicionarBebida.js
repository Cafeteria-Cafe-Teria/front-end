import React, { useState, useEffect, useRef } from 'react';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';

const ClienteAdicionarBebida = () => {
  const [pedidoUuid, setPedidoUuid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tipoBebidaSelecionada, setTipoBebidaSelecionada] = useState(null);
  const pedidoCriadoRef = useRef(false);
  const navigate = useNavigate();

  // Verificar se já existe um pedido ou criar um novo
  useEffect(() => {
    const gerenciarPedido = async () => {
      if (pedidoCriadoRef.current) {
        return;
      }

      try {
        setLoading(true);
        pedidoCriadoRef.current = true;
        
        // Verificar se já existe um pedido no localStorage
        const pedidoExistente = localStorage.getItem('pedidoUuid');
        const bebidaSelecionada = localStorage.getItem('tipoBebida');
        
        if (pedidoExistente) {
          // Usar pedido existente
          setPedidoUuid(pedidoExistente);
          setTipoBebidaSelecionada(bebidaSelecionada);
          console.log('Pedido existente recuperado:', pedidoExistente);
          console.log('Bebida selecionada:', bebidaSelecionada);
        } else {
          // Criar novo pedido apenas se não existir
          const novoPedido = await ApiService.criarPedido();
          setPedidoUuid(novoPedido.uuid);
          localStorage.setItem('pedidoUuid', novoPedido.uuid);
          console.log('Novo pedido criado:', novoPedido);
        }
      } catch (error) {
        console.error('Erro ao gerenciar pedido:', error);
        pedidoCriadoRef.current = false;
      } finally {
        setLoading(false);
      }
    };

    gerenciarPedido();
  }, []);

  const handleChaClick = async () => {
    if (!pedidoUuid) {
      console.error('Pedido não foi criado ainda');
      return;
    }

    localStorage.setItem('tipoBebida', 'Chá');
    setTipoBebidaSelecionada('Chá');

    console.log('Chá selecionado - dados salvos no localStorage');
    console.log('Pedido UUID:', pedidoUuid);
    console.log('Tipo de bebida:', 'Chá');
  };

  const handleCafeClick = async () => {
    if (!pedidoUuid) {
      console.error('Pedido não foi criado ainda');
      return;
    }

    localStorage.setItem('tipoBebida', 'Café');
    setTipoBebidaSelecionada('Café');

    console.log('Café selecionado - dados salvos no localStorage');
    console.log('Pedido UUID:', pedidoUuid);
    console.log('Tipo de bebida:', 'Café');
  };

  // Função para ir para adicionais SEM adicionar bebida ainda
  const handleAvancarParaAdicionais = () => {
    if (!pedidoUuid || !tipoBebidaSelecionada) {
      console.error('Pedido ou bebida não selecionada');
      return;
    }

    console.log('Avançando para adicionais - bebida será adicionada lá');
    navigate('/cliente/bebida/adicionais');
  };

  const handleCancelarPedido = async () => {
    if (!pedidoUuid) {
      console.error('Pedido não foi criado ainda');
      return;
    }

    try {
      setLoading(true);
      await ApiService.cancelarPedido(pedidoUuid);
      console.log('Pedido cancelado com sucesso!');
      
      // Limpar tudo após cancelar
      setPedidoUuid(null);
      setTipoBebidaSelecionada(null);
      pedidoCriadoRef.current = false;
      localStorage.removeItem('pedidoUuid');
      localStorage.removeItem('tipoBebida');
      localStorage.removeItem('bebidaId');
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !pedidoUuid) {
    return (
      <div className="cliente-welcome-container">
        <div>Carregando...</div>
      </div>
    );
  }

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
        <text className="cliente-welcome-title">Deseja adicionar:</text>
        <WelcomeButton
          type="botao1"
          text="Chá"
          textPrice="R$ 3,00"
          icon="tea"
          iconSize={40}
          width={230}
          height={120}
          onClick={handleChaClick}
          disabled={loading}
        />
        <WelcomeButton
          type="botao1"
          text="Café"
          textPrice="R$ 4,50"
          icon="coffee"
          iconSize={40}
          width={230}
          height={120}
          onClick={handleCafeClick}
          disabled={loading}
        />
      </div>
      
      {/* Mostrar bebida selecionada */}
      {tipoBebidaSelecionada && (
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          padding: '10px',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <text style={{ fontSize: '16px', fontWeight: 'bold', color: '#4CAF50' }}>
            {tipoBebidaSelecionada} selecionado!
          </text>
        </div>
      )}
      
      {/* Botões de navegação */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <Link to="/cliente">  
          <WelcomeButton
            type="botao3"
            text="Voltar"
            width={200}
            height={60}
            onClick={handleCancelarPedido}
            disabled={loading}
          />
        </Link>
        
        <WelcomeButton
          type="botao2"
          text="Avançar"
          width={200}
          height={60}
          onClick={handleAvancarParaAdicionais}
          disabled={loading || !tipoBebidaSelecionada}
        />
      </div>
    </div>
  );
};

export default ClienteAdicionarBebida;