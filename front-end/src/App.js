import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
