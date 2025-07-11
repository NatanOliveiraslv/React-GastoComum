import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.13:8080",
});

// Adiciona o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
