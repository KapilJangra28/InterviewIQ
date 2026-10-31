import axios from 'axios';

// Set VITE_API_URL in Vercel to the Render backend origin, e.g.
// https://interviewiq-backend.onrender.com
const baseURL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('interviewiq_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
