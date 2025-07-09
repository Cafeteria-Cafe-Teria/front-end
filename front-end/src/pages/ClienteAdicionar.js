import React from 'react';
import './ClienteWelcome.css';
import logo from '../assets/LOGO.svg';
import WelcomeButton from '../components/WelcomeButton';
import { Link } from 'react-router-dom';

const Cliente = () => {
  
  const handleChaClick = () => {
    const chaData = {
      id: 1,
      nome: "Chá",
      preco: 3.00,
      tipo: "bebida",
      categoria: "cha",
      timestamp: new Date().toISOString(),
      quantidade: 1
    };
    console.log('Chá selecionado:', JSON.stringify(chaData, null, 2));
  };

  const handleCafeClick = () => {
    const cafeData = {
      id: 2,
      nome: "Café",
      preco: 4.50,
      tipo: "bebida",
      categoria: "cafe",
      timestamp: new Date().toISOString(),
      quantidade: 1
    };
    console.log('Café selecionado:', JSON.stringify(cafeData, null, 2));
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
        />
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
      <Link to="/cliente">  
        <WelcomeButton
          type="botao3"
          text="Voltar"
          width={200}
          height={60}
          onClick={() => console.log('Voltar clicado!')}
        />
      </Link>
        <WelcomeButton
          type="botao2"
          text="Avançar"
          width={200}
          height={60}
          onClick={() => console.log('Avançar clicado!')}
        />
      </div>
    </div>
  );
};

export default Cliente;