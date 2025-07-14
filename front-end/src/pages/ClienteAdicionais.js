import React, { useState, useEffect, useRef } from 'react';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';
import CheckboxButton from '../components/CheckboxButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiService from '../service/ApiService';

const ClienteAdicionais = () => {
  const { uuid } = useParams();
  const [pedidoUuid, setPedidoUuid] = useState(uuid || null);
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
      preco: 'R$ 2,00',
      valor: 'Leite de Aveia'
    },
    { 
      nome: 'Canela', 
      preco: 'R$ 2,00',
      valor: 'Canela'
    },
    { 
      nome: 'Sem Açúcar', 
      preco: 'R$ 0,00',
      valor: 'Sem Açucar'
    }
  ];

  useEffect(() => {
    const recuperarPedidoExistente = () => {
      try {
        const pedidoExistente = localStorage.getItem('pedidoUuid');
        const bebidaSelecionada = localStorage.getItem('tipoBebida') || 'Café';
        
        if (pedidoExistente) {
          setPedidoUuid(pedidoExistente);
          setTipoBebida(bebidaSelecionada);
        } else {
        navigate(`/cliente/${uuid}/bebida`);
        }
      } catch (error) {
        // erro ao recuperar pedido
      }
    };

    recuperarPedidoExistente();
  }, [navigate]);

  const toggleAdicional = (adicional) => {
    setAdicionaisSelecionados(prev => {
      if (prev.includes(adicional.valor)) {
        return prev.filter(item => item !== adicional.valor);
      } else {
        return [...prev, adicional.valor];
      }
    });
  };

  const isAdicionalSelecionado = (adicional) => {
    return adicionaisSelecionados.includes(adicional.valor);
  };

  const getNomesAdicionaisSelecionados = () => {
    return adicionaisDisponiveis
      .filter(adicional => adicionaisSelecionados.includes(adicional.valor))
      .map(adicional => adicional.nome);
  };

  const handleAdicionarBebida = async () => {
    if (!pedidoUuid) return;

    try {
      setLoading(true);
      const bebidaCompleta = {
        tipo: tipoBebida,
        adicionais: adicionaisSelecionados
      };
      const resultado = await ApiService.adicionarBebida(pedidoUuid, bebidaCompleta);
      localStorage.setItem('bebidaId', resultado.id || '0');
      setBebidaAdicionada(true);
    } catch (error) {
      alert('Erro ao adicionar bebida!');
    } finally {
      setLoading(false);
    }
  };

  // Agora só adiciona a bebida, não finaliza o pedido
  const handleAvancar = async () => {
    if (!bebidaAdicionada) {
      await handleAdicionarBebida();
    }
    navigate(`/cliente/${uuid}/nova-bebida`);
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
        <span className="cliente-adicionais-title">
          Deseja acrescentar algum adicional ao seu {tipoBebida}?:
        </span>
        
        {/* Seção de Adicionais com CheckboxButton */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          alignItems: 'center',
          width: '100%'
        }}>
          {adicionaisDisponiveis.map((adicional, index) => (
            <CheckboxButton
              key={index}
              text={adicional.nome}
              textPrice={adicional.preco}
              checked={isAdicionalSelecionado(adicional)}
              width={250}
              height={100}
              onClick={() => toggleAdicional(adicional)}
              disabled={loading || bebidaAdicionada}
            />
          ))}
        </div>

        {/* Mostrar se bebida foi adicionada */}
        {bebidaAdicionada && (
          <div style={{
            textAlign: 'center',
            marginTop: '10px',
            padding: '10px',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderRadius: '8px',
            margin: '10px 20px',
            marginBottom: '40px'
          }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2E7D32' }}>
              {tipoBebida} adicionado ao pedido!
            </span>
          </div>
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
        <Link to={`/cliente/${uuid}/bebida`}>  
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
          text="Avançar"
          width={200}
          height={60}
          onClick={handleAvancar}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ClienteAdicionais;