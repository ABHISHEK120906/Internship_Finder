import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('elitex_token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => 
  API.post('/auth/register', data);

export const loginUser = (data) => 
  API.post('/auth/login', data);

export const getProfile = () => 
  API.get('/auth/profile');
