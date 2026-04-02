import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - add token to every request
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('elitex_token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('elitex_token');
      localStorage.removeItem('elitex_role');
      localStorage.removeItem('elitex_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const registerUser = (data: any) => 
  API.post('/auth/register', data);

export const loginUser = (data: any) => 
  API.post('/auth/login', data);

export const getProfile = () => 
  API.get('/auth/profile');

export const logoutUser = () => 
  API.post('/auth/logout');

export const setupAdmin = (data: any) => 
  API.post('/admin/setup', data);

export default API;
