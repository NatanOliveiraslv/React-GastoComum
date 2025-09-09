import axios from 'axios';
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from './AuthClientStore';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});

// Variáveis de controle
let isRefreshing = false;
let failedQueue = [];

// Helper para lidar com a fila de requisições
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor de requisição — adiciona o token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta — tenta renovar o token ao receber 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // Aguarda a renovação terminar e repete a requisição
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject: (err) => reject(err)
        });
      });
    }

    isRefreshing = true;


    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh-token`, {}, {
        withCredentials: true
      });
      const { accessToken } = response.data;

      setAccessToken(accessToken);
      processQueue(null, accessToken);

      // Atualiza e reenvia a requisição original
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      removeAccessToken();
      window.location.href = '/';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
