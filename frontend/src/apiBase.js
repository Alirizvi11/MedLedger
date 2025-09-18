// Centralized API base resolver
// Uses VITE_API_URL if provided, otherwise relative to current origin
export function getApiBase() {
  const envUrl = import.meta?.env?.VITE_API_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  return '';
}

export function api(path) {
  const base = getApiBase();
  if (!path.startsWith('/')) return `${base}/${path}`;
  return `${base}${path}`;
}


