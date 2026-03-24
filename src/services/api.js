// src/services/api.js
const API_URL = "http://sua-vm-backend:3000"; // O endereço da sua VM

export const api = {
  // Buscar todos os equipamentos
  getEquipamentos: async () => {
    const response = await fetch(`${API_URL}/equipamentos`);
    return await response.json();
  },

  // Cadastrar um novo
  postEquipamento: async (dados) => {
    const response = await fetch(`${API_URL}/equipamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return await response.json();
  },

  // Autenticação
  login: async (credenciais) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciais)
    });
    return response; // Retornamos a resposta para tratar o ok/erro no componente
  }
};