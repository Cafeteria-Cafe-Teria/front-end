import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeButton from '../components/WelcomeButton';
import ApiService from '../service/ApiService';
import logo from '../assets/LOGO.svg';
import './ClienteWelcome.css';
import ClientePedidosBox from '../components/ClientePedidosBox';

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
    <div className="cliente-welcome-header">
      <div className="cliente-welcome-header-content">
        <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo2" />
      </div>
    </div>

    <div className="cliente-welcome-pedidos-container" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <h2 className="cliente-welcome-pedidos-title" style={{ fontSize: 22, marginBottom: 20 }}>
        Total do pedido
      </h2>
      <ClientePedidosBox bebidasList={bebidasList} onRemover={handleRemoverBebida} />
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
        <span style={{ color: '#EDE3E3' }}>Preço total:</span>
        <span style={{ color: '#EDE3E3' }}>{total}</span>
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