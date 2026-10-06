import axios from 'axios';

export const normalizeApiBaseUrl = (rawUrl) => {
  let url = (rawUrl || 'http://localhost:3001/api').trim().replace(/\/+$/, '');
  if (!url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

export const getApiUrl = (endpoint = '') => {
  const base = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
  if (cleanEndpoint.startsWith('/api/')) {
    cleanEndpoint = cleanEndpoint.substring(4);
  }
  return base + cleanEndpoint;
};

const API_BASE_URL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('stakelab_token') || localStorage.getItem('digital_user_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
