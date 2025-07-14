import React from 'react';
import botao1 from '../assets/botao1.svg';
import botao2 from '../assets/botao2.svg';
import botao3 from '../assets/botao3.svg';
import caixa from '../assets/caixa.svg';
import Cafe from '../assets/cafe1.svg';
import Cha from '../assets/chá1.svg';
import './WelcomeButton.css';

/**
 * Componente reutilizável para botões de boas-vindas
 * @param {Object} props
 * @param {string} props.type - Tipo do botão: 'botao1', 'botao2' ou 'botao3'
 * @param {string} props.text - Texto a ser exibido no botão
 * @param {string} props.textPrice - Preço a ser exibido ao lado do texto
 * @param {function} props.onClick - Função a ser executada no clique
 * @param {string} props.className - Classes CSS adicionais
 * @param {Object} props.style - Estilos inline adicionais
 * @param {string|number} props.width - Largura do botão
 * @param {string|number} props.height - Altura do botão
 * @param {string} props.icon - Tipo do ícone: 'coffee', 'tea' ou null para não mostrar ícone
 * @param {number} props.iconSize - Tamanho do ícone em pixels
 * @param {string} props.iconColor - Cor do ícone
 */
const WelcomeButton = ({ 
  type = 'botao1', 
  text = '', 
  textPrice = '',
  onClick, 
  className = '', 
  style = {},
  width,
  height,
  icon = null,
  iconSize = 24,
  iconColor,
  ...props 
}) => {
  // Seleciona o SVG baseado no tipo
  const getButtonSvg = () => {
    switch (type) {
      case 'botao2':
        return botao2;
      case 'botao3':
        return botao3;
      case 'caixa': // Adicione esta variação
        return caixa;
      default:
        return botao1;
    }
  };
  
  const buttonSvg = getButtonSvg();
  
  // Renderiza o ícone baseado no tipo
  const renderIcon = () => {
    if (!icon) return null;
    
    switch (icon) {
      case 'coffee':
        return (
          <img 
            src={Cafe} 
            alt="Café" 
            style={{ 
              width: `${iconSize}px`, 
              height: `${iconSize}px`, 
              marginRight: '8px',
              ...(iconColor && { filter: `hue-rotate(${iconColor})` })
            }} 
          />
        );
      case 'tea':
        return (
          <img 
            src={Cha} 
            alt="Chá" 
            style={{ 
              width: `${iconSize}px`, 
              height: `${iconSize}px`, 
              marginRight: '8px',
              ...(iconColor && { filter: `hue-rotate(${iconColor})` })
            }} 
          />
        );
      default:
        return null;
    }
  };
  
   return (
    <button
      onClick={onClick}
      className={`welcome-button ${className}`}
      style={{
        background: `url(${buttonSvg}) no-repeat center center`,
        backgroundSize: 'contain',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
        ...style
      }}
      {...props}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        textDecoration: 'none' 
      }}>
        {renderIcon()}
        <span style={{ textDecoration: 'none' }}>
          {text}
          {textPrice && (
            <span style={{ 
              textDecoration: 'none',
              fontSize: '0.9em',
              fontWeight: 'bold',
              color: '#666',
              marginLeft: '20px',
            }}>
              {textPrice}
            </span>
          )}
        </span>
      </div>
    </button>
  );
};

export default WelcomeButton;