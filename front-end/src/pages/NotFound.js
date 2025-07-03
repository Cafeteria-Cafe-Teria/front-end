import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Página Não Encontrada</h1>
      <p className="not-found-message">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link to="/" className="not-found-link">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
