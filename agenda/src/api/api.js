const API_URL = 'http://localhost:3001/api';

export async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  if (!res.ok) {
    let e;
    try {
      e = await res.json();
    } catch {
      throw new Error('Erro inesperado na requisição');
    }

    throw new Error(e.error || 'Erro na requisição');
  }
  if (res.status === 204) {
    return null;
  }
  return res.json();
}
