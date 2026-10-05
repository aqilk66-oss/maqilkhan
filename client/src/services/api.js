import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Crucial for sending and receiving HttpOnly authentication cookies
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Response interceptor for centralized error transformation
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorPayload = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred.',
      status: error.response?.status || 500,
      code: error.response?.data?.error || 'UNKNOWN_ERROR',
      data: error.response?.data || null,
    };
    return Promise.reject(errorPayload);
  }
);

export default api;
