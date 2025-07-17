import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeButton from '../components/WelcomeButton';
import ApiService from '../service/ApiService';
import logo from '../assets/LOGO.svg';
import './ClienteWelcome.css';

const ClienteNome = () => {
  const { uuid } = useParams();
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSalvarNome = async () => {
    setErro('');
    if (!nome.trim()) {
      setErro('Por favor, digite seu nome.');
      return;
    }
    const pedidoUuid = uuid || localStorage.getItem('pedidoUuid');
    if (!pedidoUuid) {
      setErro('Pedido não encontrado.');
      return;
    }
    try {
      setLoading(true);
      await ApiService.definirNomeDoCliente(pedidoUuid, nome.trim());
      navigate(`/cliente/${uuid}/pagamento`);
    } catch (error) {
      setErro('Erro ao salvar nome. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cliente-welcome-container">
      <img src={logo} alt="Logo do Restaurante" className="cliente-welcome-logo2" />
      <div className="cliente-welcome-buttons" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        marginTop: '-20px'
      }}>
        <span className="cliente-adicionais-title" style={{ fontSize: 22 }}>
          Qual o seu nome?
        </span>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Escreva seu nome..."
          style={{
            fontSize: 20,
            padding: '12px 18px',
            borderRadius: 5,
            border: '1px solid #ccc',
            outline: 'none',
            width: 280,
            textAlign: 'left',
            fontFamily: 'inherit',
            fontWeight: 'bold',
            color: '#5F2D29',
          }}
          disabled={loading}
        />
        {erro && (
          <span style={{ color: 'red', fontSize: 16 }}>{erro}</span>
        )}
        <div style={{
         position: 'fixed',
         bottom: '20px',
         left: '50%',
         transform: 'translateX(-50%)',
         display: 'flex',
         gap: '20px',
         alignItems: 'center'
        }}>
          <WelcomeButton
            type="botao3"
            text="Voltar"
            width={180}
            height={60}
            onClick={() => {
              localStorage.removeItem('tipoBebida');
              localStorage.removeItem('bebidaId');
              navigate(`/cliente/${uuid}/total`);
            }}
          />
          <WelcomeButton
            type="botao2"
            text="Pagamento"
            width={180}
            height={60}
            onClick={handleSalvarNome}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

  export default ClienteNome;