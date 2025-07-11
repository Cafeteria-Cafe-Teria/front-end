import React from 'react';
import caixa from '../assets/caixa.svg';
import './CheckboxButton.css';

/**
 * Componente de checkbox personalizado inspirado no WelcomeButton
 * @param {Object} props
 * @param {string} props.text - Texto a ser exibido no checkbox
 * @param {string} props.textPrice - Preço a ser exibido ao lado do texto
 * @param {function} props.onClick - Função a ser executada no clique
 * @param {boolean} props.checked - Se o checkbox está marcado
 * @param {string} props.className - Classes CSS adicionais
 * @param {Object} props.style - Estilos inline adicionais
 * @param {string|number} props.width - Largura do componente
 * @param {string|number} props.height - Altura do componente
 * @param {boolean} props.disabled - Se o checkbox está desabilitado
 */
const CheckboxButton = ({ 
  text = '', 
  textPrice = '',
  onClick,
  checked = false,
  className = '', 
  style = {},
  width = 280,
  height = 80,
  disabled = false,
  ...props 
}) => {
  
  return (
    <button
      onClick={onClick}
      className={`checkbox-button ${className} ${checked ? 'checked' : ''}`}
      disabled={disabled}
      style={{
        backgroundImage: `url(${caixa})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textDecoration: 'none',
        padding: '0 20px',
        transition: 'filter 0.2s ease, transform 0.1s ease',
        filter: checked ? 'brightness(0.95)' : 'none',
        transform: checked ? 'scale(0.99)' : 'scale(1)',
        opacity: disabled ? 0.6 : 1,
        ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
        ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
        ...style
      }}
      {...props}
    >
      {/* Lado esquerdo - Checkbox personalizado */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* Checkbox visual */}
        <div style={{
          width: '20px',
          height: '20px',
          border: '2px solid #333',
          borderRadius: '4px',
          backgroundColor: checked ? '#4CAF50' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          position: 'relative'
        }}>
          {/* Checkmark */}
          {checked && (
            <div style={{
              width: '6px',
              height: '12px',
              border: 'solid white',
              borderWidth: '0 2px 2px 0',
              transform: 'rotate(45deg)',
              marginTop: '-2px'
            }} />
          )}
        </div>
        
        {/* Texto do adicional */}
        <span style={{ 
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: checked ? 'bold' : 'normal',
          color: checked ? '#2E7D32' : '#333',
          transition: 'all 0.2s ease'
        }}>
          {text}
        </span>
      </div>
      
      {/* Lado direito - Preço */}
      {textPrice && (
        <span style={{ 
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 'bold',
          color: checked ? '#2E7D32' : '#666',
          transition: 'color 0.2s ease'
        }}>
          {textPrice}
        </span>
      )}
    </button>
  );
};

export default CheckboxButton;