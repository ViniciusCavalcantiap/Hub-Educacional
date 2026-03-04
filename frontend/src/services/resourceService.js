const API_URL = `${import.meta.env.VITE_API_URL}/resources`;

export async function getResources() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar recursos");
  }

  return response.json();
}

export async function createResource(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar recurso");
  }

  return response.json();
}

export async function updateResource(data) {
  const response = await fetch(`${API_URL}/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar recurso");
  }

  return response.json();
}

export async function deleteResource(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar recurso");
  }
}