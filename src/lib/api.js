import axios from 'axios';

export const normalizeApiBaseUrl = (rawUrl) => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    if (!isLocal) {
      const envUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1') || envUrl === 'https://digitalxtrade.com/api') {
        return 'https://api.digitalxtrade.com/api';
      }
    }
  }
  let url = (rawUrl || 'http://localhost:3001/api').trim().replace(/\/+$/, '');
  if (url === 'https://digitalxtrade.com/api') {
    url = 'https://api.digitalxtrade.com/api';
  }
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
    config.baseURL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);
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
