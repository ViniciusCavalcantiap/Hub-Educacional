//Centraliza as chamadas de API

const BASE_URL = "http://127.0.0.1:8000";


// Função geral para requisição.
async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    });

    // Se a resposta não for 2xx, gera erro
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    // Algumas requisições DELETE podem não retornar JSON
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}


// Recursos (CRUD)

// Buscar todos os recursos
export const getResources = () => request("/resources");

// Criar novo recurso
export const createResource = (data) =>
  request("/resources", {
    method: "POST",
    body: JSON.stringify(data)
  });

// Atualizar recurso
export const updateResource = (id, data) =>
  request(`/resources/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

// Deletar recurso
export const deleteResource = (id) =>
  request(`/resources/${id}`, {
    method: "DELETE"
  });

// =============================

// Smart Assist
export const generateDescription = (titulo, tipo) =>
  request("/smart-assist", {
    method: "POST",
    body: JSON.stringify({ titulo, tipo })
  });