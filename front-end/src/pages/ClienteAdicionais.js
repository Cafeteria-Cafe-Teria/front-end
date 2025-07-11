import React, { useState, useEffect, useRef } from 'react';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';
import CheckboxButton from '../components/CheckboxButton';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';

const ClienteAdicionais = () => {
  const [pedidoUuid, setPedidoUuid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tipoBebida, setTipoBebida] = useState('Café');
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState([]);
  const [bebidaAdicionada, setBebidaAdicionada] = useState(false);
  const pedidoCriadoRef = useRef(false);
  const navigate = useNavigate();

  // Lista de adicionais disponíveis (display vs valor do backend)
  const adicionaisDisponiveis = [
    { 
      nome: 'Leite de Aveia', 
      preco: 'R$ 1,50',
      valor: 'Leite de Aveia'  // Valor exato para o backend
    },
    { 
      nome: 'Canela', 
      preco: 'R$ 0,50',
      valor: 'Canela'  // Valor exato para o backend
    },
    { 
      nome: 'Sem Açúcar', 
      preco: 'Grátis',
      valor: 'Sem Açucar'  // Valor exato para o backend (sem acento)
    }
  ];

  // Recuperar dados do pedido existente
  useEffect(() => {
    const recuperarPedidoExistente = () => {
      try {
        const pedidoExistente = localStorage.getItem('pedidoUuid');
        const bebidaSelecionada = localStorage.getItem('tipoBebida') || 'Café';
        
        if (pedidoExistente) {
          setPedidoUuid(pedidoExistente);
          setTipoBebida(bebidaSelecionada);
          console.log('Pedido recuperado para adicionais:', pedidoExistente);
          console.log('Tipo de bebida:', bebidaSelecionada);
        } else {
          console.error('Nenhum pedido encontrado!');
          navigate('/cliente/bebida');
        }
      } catch (error) {
        console.error('Erro ao recuperar pedido:', error);
      }
    };

    recuperarPedidoExistente();
  }, [navigate]);

  // Função para alternar adicional (usando o valor do backend)
  const toggleAdicional = (adicional) => {
    setAdicionaisSelecionados(prev => {
      if (prev.includes(adicional.valor)) {
        return prev.filter(item => item !== adicional.valor);
      } else {
        return [...prev, adicional.valor];
      }
    });
  };

  // Função para verificar se adicional está selecionado (usando o valor do backend)
  const isAdicionalSelecionado = (adicional) => {
    return adicionaisSelecionados.includes(adicional.valor);
  };

  // Função para obter nomes dos adicionais selecionados para exibir
  const getNomesAdicionaisSelecionados = () => {
    return adicionaisDisponiveis
      .filter(adicional => adicionaisSelecionados.includes(adicional.valor))
      .map(adicional => adicional.nome);
  };

  const handleAdicionarBebida = async () => {
    if (!pedidoUuid) {
      console.error('Pedido não foi criado ainda');
      return;
    }

    try {
      setLoading(true);
      
      // Adicionar bebida completa (com ou sem adicionais)
      const bebidaCompleta = {
        tipo: tipoBebida,
        adicionais: adicionaisSelecionados  // Usando os valores exatos do backend
      };

      console.log('Adicionando bebida completa:', bebidaCompleta);
      
      const resultado = await ApiService.adicionarBebida(pedidoUuid, bebidaCompleta);
      console.log('Bebida adicionada:', resultado);
      
      // Salvar ID da bebida no localStorage
      localStorage.setItem('bebidaId', resultado.id || '0');
      
      setBebidaAdicionada(true);
      alert('Bebida adicionada ao pedido com sucesso!');
      
    } catch (error) {
      console.error('Erro ao adicionar bebida:', error);
      alert('Erro ao adicionar bebida!');
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarPedido = async () => {
    if (!pedidoUuid) {
      console.error('Pedido não foi criado ainda');
      return;
    }

    // Se a bebida ainda não foi adicionada, adicionar primeiro
    if (!bebidaAdicionada) {
      await handleAdicionarBebida();
    }

    try {
      setLoading(true);
      await ApiService.enviarPedido(pedidoUuid);
      console.log('Pedido enviado com sucesso!');
      
      // Limpar localStorage após enviar (finalizar o pedido)
      localStorage.removeItem('pedidoUuid');
      localStorage.removeItem('tipoBebida');
      localStorage.removeItem('bebidaId');
      
      alert('Pedido enviado com sucesso!');
      navigate('/cliente');
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Erro ao enviar pedido!');
    } finally {
      setLoading(false);
    }
  };

  if (!pedidoUuid) {
    return (
      <div className="cliente-welcome-container">
        <div>Carregando pedido...</div>
      </div>
    );
  }

  return (
    <div className="cliente-welcome-container">
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo2" />
      
      <div className="cliente-welcome-buttons" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        marginTop: '-20px'
      }}>
        <text className="cliente-welcome-title">
          Personalize seu {tipoBebida}:
        </text>
        
        {/* Seção de Adicionais com CheckboxButton */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          width: '100%'
        }}>
          <text style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            Adicionais:
          </text>
          
          {adicionaisDisponiveis.map((adicional, index) => (
            <CheckboxButton
              key={index}
              text={adicional.nome}
              textPrice={adicional.preco}
              checked={isAdicionalSelecionado(adicional)}
              width={280}
              height={80}
              onClick={() => toggleAdicional(adicional)}
              disabled={loading || bebidaAdicionada}
            />
          ))}
        </div>

        {/* Mostrar adicionais selecionados */}
        {adicionaisSelecionados.length > 0 && (
          <div style={{
            textAlign: 'center',
            marginTop: '10px',
            padding: '10px',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderRadius: '8px',
            margin: '10px 20px'
          }}>
            <text style={{ fontSize: '16px', fontWeight: 'bold', color: '#4CAF50' }}>
              Adicionais selecionados: {getNomesAdicionaisSelecionados().join(', ')}
            </text>
          </div>
        )}

        {/* Mostrar se bebida foi adicionada */}
        {bebidaAdicionada && (
          <div style={{
            textAlign: 'center',
            marginTop: '10px',
            padding: '10px',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderRadius: '8px',
            margin: '10px 20px'
          }}>
            <text style={{ fontSize: '16px', fontWeight: 'bold', color: '#2E7D32' }}>
              ✅ {tipoBebida} adicionado ao pedido!
            </text>
          </div>
        )}

        {/* Botão para adicionar bebida */}
        {!bebidaAdicionada && (
          <WelcomeButton
            type="botao3"
            text="Adicionar ao Pedido"
            width={280}
            height={70}
            onClick={handleAdicionarBebida}
            disabled={loading}
          />
        )}
      </div>
      
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
        <Link to="/cliente/bebida">  
          <WelcomeButton
            type="botao3"
            text="Voltar"
            width={200}
            height={60}
            disabled={loading}
          />
        </Link>
        <WelcomeButton
          type="botao2"
          text="Finalizar Pedido"
          width={200}
          height={60}
          onClick={handleEnviarPedido}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ClienteAdicionais;