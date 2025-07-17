import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeButton from '../components/WelcomeButton';
import ApiService from '../service/ApiService';
import logo from '../assets/LOGO.svg';
import './ClienteWelcome.css';

const ClienteTotal = () => {
  const { uuid } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState('R$ 0,00');
  const navigate = useNavigate();

  // Busca o pedido e atualiza o total
  const fetchPedido = async () => {
    const pedidoUuid = uuid || localStorage.getItem('pedidoUuid');
    if (!pedidoUuid) {
      navigate('/cliente');
      return;
    }
    try {
      setLoading(true);
      const detalhes = await ApiService.gerarNotaDePedido(pedidoUuid);
      setPedido(detalhes);
      const preco = detalhes.preco_total !== undefined ? detalhes.preco_total : 0;
      setTotal(
        typeof preco === 'number'
          ? preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          : 'R$ 0,00'
      );
    } catch (error) {
      setTotal('R$ 0,00');
      alert('Erro ao buscar detalhes do pedido!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedido();
    // eslint-disable-next-line
  }, [navigate]);

  // Remove bebida pelo id real
  const handleRemoverBebida = async (idBebida) => {
    const pedidoUuid = localStorage.getItem('pedidoUuid');
    if (!pedidoUuid || !pedido || !pedido.bebidas) return;
    try {
      setLoading(true);
      await ApiService.removerBebida(pedidoUuid, idBebida);
      await fetchPedido();
    } catch {
      alert('Erro ao remover bebida!');
      setLoading(false);
    }
  };

  // Edita bebida pelo id real
  // const handleEditarBebida = (idBebida) => {
  //   navigate(`/cliente/${uuid}/bebida/adicionais`, { state: { bebidaId: idBebida } });
  // };

  // Atualiza bebida usando a nova rota correta
  // const atualizarBebida = async (idBebida, bebida) => {
  //   const pedidoUuid = uuid || localStorage.getItem('pedidoUuid');
  //   if (!pedidoUuid) return;
  //   try {
  //     setLoading(true);
  //     await ApiService.atualizarBebidaEmPedido(pedidoUuid, idBebida, bebida);
  //     await fetchPedido();
  //   } catch {
  //     alert('Erro ao atualizar bebida!');
  //     setLoading(false);
  //   }
  // };

  // Monta lista de bebidas (compatível com estrutura da sua API)
  const getBebidasList = () => {
    if (!pedido || !pedido.bebidas) return [];
    if (!Array.isArray(pedido.bebidas)) {
      return Object.values(pedido.bebidas);
    }
    return pedido.bebidas;
  };

  if (loading) {
    return (
      <div className="cliente-welcome-container">
        <div>Carregando detalhes do pedido...</div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="cliente-welcome-container">
        <div>Pedido não encontrado.</div>
      </div>
    );
  }

  // Lista de bebidas agrupadas
  const bebidasList = getBebidasList();

  return (
    <div className="cliente-welcome-container">
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo2" />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '-20px'
      }}>
        <span className="cliente-adicionais-title" style={{ fontSize: 22, marginBottom: 20 }}>
          Total do pedido
        </span>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          minWidth: '260px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '4px 4px 0 #5F2D29',
          marginBottom: '30px',
          padding: '18px 0 0 0',
          border: '3px solid #5F2D29',
          position: 'relative'
        }}>
          {bebidasList.length > 0 ? bebidasList.map((bebidaArr, idx) => {
            // Cada bebidaArr é um array de objetos [{nome, preco, id}, ...]
            const nomeBebida = bebidaArr
              .filter(item => item.preco !== undefined && item.preco !== null)
              .map(item => item.nome)
              .join(' ');
            const precoBebida = bebidaArr
              .reduce((acc, item) => acc + (typeof item.preco === 'number' ? item.preco : 0), 0);
            const idBebida = bebidaArr[0]?.id ?? idx; // Use sempre o id real

            return (
              <div
                key={idBebida}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '2px solid #e0bdbb',
                  padding: '16px 24px 10px 24px',
                  fontFamily: 'monospace',
                  fontSize: 18,
                  fontWeight: 700
                }}
              >
                <span
                  style={{
                    color: '#5F2D29',
                    textAlign: 'left',
                    maxWidth: 180,
                    wordBreak: 'break-word'
                    // Remover: cursor: 'pointer',
                    // Remover: textDecoration: 'underline'
                  }}
                  // Remover: onClick={() => handleEditarBebida(idBebida)}
                  // Remover: title="Clique para editar"
                >
                  {nomeBebida}
                </span>
                <span style={{ color: '#5F2D29', fontWeight: 700 }}>
                  {precoBebida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <button
                  onClick={() => handleRemoverBebida(idBebida)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#5F2D29',
                    fontSize: 22,
                    cursor: 'pointer',
                    marginLeft: 12,
                    fontWeight: 'bold'
                  }}
                  title="Remover bebida"
                >
                  ×
                </button>
              </div>
            );
          }) : (
            <div style={{ padding: 24, color: '#5F2D29', textAlign: 'center' }}>
              Nenhuma bebida adicionada.
            </div>
          )}
          <div style={{
            textAlign: 'center',
            color: '#b85c5c',
            fontWeight: 600,
            fontSize: 16,
            margin: '18px 0 0 0'
          }}>
            Para <b>remover</b>, clique no "×".
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '260px',
          maxWidth: '400px',
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: 10
        }}>
          <span style={{ color: '#333' }}>Preço total:</span>
          <span style={{ color: '#2E7D32' }}>{total}</span>
        </div>
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          width: '100%',
          marginTop: '10px'
        }}>
          <WelcomeButton
            type="botao3"
            text="Voltar"
            width={180}
            height={60}
            onClick={() => navigate(-1)}
          />
          <WelcomeButton
            type="botao2"
            text="Avançar"
            width={180}
            height={60}
            onClick={() => {
              navigate(`/cliente/${uuid}/nome`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClienteTotal;