import React, { useState, useEffect, useRef } from 'react';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiService from '../service/ApiService';

const ClienteAdicionarBebida = () => {
  const { uuid } = useParams();
  const [pedidoUuid, setPedidoUuid] = useState(uuid || null);
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

        const pedidoExistente = localStorage.getItem('pedidoUuid');
        let pedidoValido = false;

        if (pedidoExistente) {
          // Consulta o status do pedido na API
          try {
            const detalhes = await ApiService.gerarNotaDePedido(pedidoExistente);
            if (detalhes.status !== 'Recebido') {
              setPedidoUuid(pedidoExistente);
              setTipoBebidaSelecionada(localStorage.getItem('tipoBebida'));
              pedidoValido = true;
            }
          } catch (e) {
            // Se não conseguir buscar, trata como inválido
          }
        }

        if (!pedidoValido) {
          // Limpa localStorage se pedido não é válido
          localStorage.removeItem('pedidoUuid');
          localStorage.removeItem('tipoBebida');
          localStorage.removeItem('bebidaId');
          // Cria novo pedido
          const novoPedido = await ApiService.criarPedido();
          setPedidoUuid(novoPedido.uuid);
          localStorage.setItem('pedidoUuid', novoPedido.uuid);
          setTipoBebidaSelecionada(null);
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
    navigate(`/cliente/${pedidoUuid}/bebida/adicionais`);
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
        <span className="cliente-welcome-title">Deseja adicionar:</span>
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
          marginTop: '10px',
          padding: '15px',
        }}>
          <span style={{ fontSize: '18px', color: '#ffe3e1ff',  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>
            {tipoBebidaSelecionada} selecionado!
          </span>
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