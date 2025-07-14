import React from 'react';
import svgUnchecked from '../assets/check/1ponto.svg';
import svgChecked from '../assets/check/2ponto.svg';
import './CheckboxButton.css';

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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <span className="checkbox-visual">
          <img
            src={checked ? svgChecked : svgUnchecked}
            alt={checked ? 'Marcado' : 'Desmarcado'}
            className="checkbox-svg"
            draggable={false}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }}
          />
        </span>
        <span className="checkbox-text">
          {text}
        </span>
      </div>
      {textPrice && (
        <span className="checkbox-price">
          {textPrice}
        </span>
      )}
    </button>
  );
};

export default CheckboxButton;