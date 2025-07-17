const API_BASE_URL = 'http://localhost:8000'; // Ajuste conforme necessário

class ApiService {
  
  // Métodos do Cliente
  async criarPedido() {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/pedido/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  }

  async cancelarPedido(uuid) {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/pedido/${uuid}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      throw error;
    }
  }

  async adicionarBebida(uuid, bebida) {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/pedido/${uuid}/bebida`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bebida),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao adicionar bebida:', error);
      throw error;
    }
  }

  async removerBebida(uuid, idBebida) {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/pedido/${uuid}/bebida/${idBebida}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erro ao remover bebida:', error);
      throw error;
    }
  }

  async gerarNotaDePedido(uuid) {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/pedido/${uuid}/nota/`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao gerar nota:', error);
      throw error;
    }
  }

  async definirNomeDoCliente(uuid, nomeCliente) {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/pedido/${uuid}/nome/${nomeCliente}`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erro ao definir nome:', error);
      throw error;
    }
  }

  async enviarPedido(uuid) {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/pedido/${uuid}/`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      throw error;
    }
  }

  async simularNotaComPagamento(uuid, metodoDePagamento) {
    try {
      const response = await fetch(`${API_BASE_URL}/cliente/pedido/${uuid}/nota/metodo/${metodoDePagamento}`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao simular nota:', error);
      throw error;
    }
  }

  // Métodos da Cozinha
  async pegarTodosOsPedidos() {
    try {
      const response = await fetch(`${API_BASE_URL}/cozinha/pedido`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao pegar pedidos:', error);
      throw error;
    }
  }

  async mudarStatusDePedido(uuid, statusDePedido) {
    try {
      const response = await fetch(`${API_BASE_URL}/cozinha/pedido/${uuid}/status/${statusDePedido}`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Erro ao mudar status:', error);
      throw error;
    }
  }

  // WebSocket para cliente
  conectarWebSocketCliente(uuid, onMessage) {
    const ws = new WebSocket(`ws://localhost:8000/ws/${uuid}`);
    
    ws.onopen = () => {
      console.log('WebSocket cliente conectado');
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
    
    ws.onerror = (error) => {
      console.error('Erro WebSocket cliente:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket cliente desconectado');
    };
    
    return ws;
  }

  // WebSocket para cozinha
  conectarWebSocketCozinha(onMessage) {
    const ws = new WebSocket(`ws://localhost:8000/ws`);
    
    ws.onopen = () => {
      console.log('WebSocket cozinha conectado');
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
    
    ws.onerror = (error) => {
      console.error('Erro WebSocket cozinha:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket cozinha desconectado');
    };
    
    return ws;
  }
}

export default new ApiService();