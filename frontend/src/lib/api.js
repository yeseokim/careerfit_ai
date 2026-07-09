const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/$/, "");

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(apiUrl(path), options);

  if (!response.ok) {
    throw new Error(`서버 오류: ${response.status}`);
  }

  return response.json();
}

export { API_BASE_URL };