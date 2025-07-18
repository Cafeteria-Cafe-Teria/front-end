import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeButton from '../components/WelcomeButton';
import logo from '../assets/LOGO.svg';
import ApiService from '../service/ApiService';
import './ClienteWelcome.css';

const ClientePagamento = () => {
  const { uuid } = useParams();
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState('');
  const [erro, setErro] = useState('');
  const [precoTotal, setPrecoTotal] = useState(null);
  const [precoFinal, setPrecoFinal] = useState(null);
  const [detalhes, setDetalhes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotal = async () => {
      const pedidoUuid = uuid || localStorage.getItem('pedidoUuid');
      if (!pedidoUuid) return;
      try {
        let dados;
        if (pagamentoSelecionado) {
          dados = await ApiService.simularNotaComPagamento(pedidoUuid, pagamentoSelecionado);
        } else {
          dados = await ApiService.gerarNotaDePedido(pedidoUuid);
        }
        setDetalhes(dados);

        setPrecoTotal(
          typeof dados.preco_total === 'number'
            ? dados.preco_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : 'R$ 0,00'
        );
        setPrecoFinal(
          typeof dados.preco_final === 'number'
            ? dados.preco_final.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : null
        );
      } catch {
        setPrecoTotal('R$ 0,00');
        setPrecoFinal(null);
        setDetalhes(null);
      }
    };
    fetchTotal();
  }, [pagamentoSelecionado, uuid]);

  const opcoes = [
    { label: 'Cartão Fidelidade', desconto: '10% de desconto', value: 'Cartão Fidelidade' },
    { label: 'Pix', desconto: '5% de desconto', value: 'Pix' },
    { label: 'Cartão', desconto: 'Sem desconto', value: 'Cartão' },
  ];

  const handleAvancar = async () => {
    if (!pagamentoSelecionado) {
      setErro('Selecione uma forma de pagamento.');
      return;
    }
    try {
      const pedidoUuid = uuid || localStorage.getItem('pedidoUuid');
      // Envia o pedido para o backend (muda status para "Recebido")
      await ApiService.enviarPedido(pedidoUuid);
      // Finaliza o pagamento se necessário
      if (ApiService.finalizarPagamento) {
        await ApiService.finalizarPagamento(pedidoUuid, pagamentoSelecionado);
      }
      navigate(`/cliente/status/${uuid}`);
    } catch {
      setErro('Erro ao finalizar pagamento. Tente novamente.');
    }
  };

  return (
    <div className="cliente-pagamento-container">
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo2" />
      <div className="cliente-welcome-buttons" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '-20px'
      }}>
        <span className="cliente-adicionais-title" style={{ fontSize: 18}}>
          Forma de pagamento<br />com seu respectivo desconto
        </span>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}>
{opcoes.map(opcao => (
  <WelcomeButton
    key={opcao.value}
    type="caixa"
    width={300}
    height={100}
    onClick={() => setPagamentoSelecionado(opcao.value)}
    disabled={!precoTotal || precoTotal === 'R$ 0,00'}
    style={{
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}
    text={
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        fontSize: 20,
        fontWeight: 700
      }}>
        <span style={{
          textAlign: 'left',
          lineHeight: 1.2,
          fontSize: 20,
          fontWeight: 700
        }}>
          {opcao.label.split(' ').map((word, idx, arr) =>
            arr.length > 1 && idx === 0 ? (
              <React.Fragment key={idx}>
                {word}
                <br />
              </React.Fragment>
            ) : (
              <React.Fragment key={idx}>
                {idx > 0 ? ' ' : ''}
                {word}
              </React.Fragment>
            )
          )}
        </span>
        <span style={{
          textAlign: 'right',
          fontSize: 18,
          fontWeight: 700,
          color: '#5F2D29',
          marginLeft: 25
        }}>
          {opcao.desconto}
        </span>
                </div>
              }
            />
          ))}
        </div>
        <div style={{
          fontSize: 20,
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between',
          width: 260,
          maxWidth: 400
        }}>
          <span>Preço total:</span>
          <div style={{
          fontSize: 20,
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          }}
          >
            {precoFinal && precoFinal !== precoTotal ? (
              <>
                <span style={{ color: '#ffececff' }}>{precoFinal}</span>
                <span style={{ textDecoration: 'line-through', color: '#000000ff', fontSize: 14 }}>
                {precoTotal}
                </span>
              </>
            ) : (
              <span>{precoTotal}</span>
            )}
          </div>
        </div>
        {erro && (
          <span style={{ color: 'red', fontSize: 16 }}>{erro}</span>
        )}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}>
          <WelcomeButton
            type="botao3"
            text="Voltar"
            width={140}
            height={50}
            onClick={() => navigate(-1)}
          />
          <WelcomeButton
            type="botao2"
            text="Finalizar"
            width={140}
            height={50}
            onClick={handleAvancar}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientePagamento;