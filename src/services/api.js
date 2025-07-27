import axios from 'axios';
import { setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken, getAccessToken, getRefreshToken } from '../services/AuthClientStore'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

// Interceptor de Requisição: Anexar token de acesso
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: Lidar com a renovação do token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 Não Autorizado e não for a própria requisição de refresh token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marca esta requisição como retentada

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post('auth/refresh-token', { refreshToken });
          const { accessToken, newRefreshToken } = response.data;

          setAccessToken(accessToken);
          // Se o seu backend emitir um novo refresh token a cada renovação, salve-o
          if (newRefreshToken) {
            setRefreshToken(newRefreshToken);
          }

          // Atualiza o cabeçalho da requisição original com o novo token de acesso
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Tenta novamente a requisição original com o novo token
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Não foi possível renovar o token:', refreshError);
          // Se a renovação falhar, desloga o usuário
          removeAccessToken();
          removeRefreshToken();
          window.location.href = '/'; // Redireciona para a página de login
          return Promise.reject(refreshError);
        }
      } else {
        // Nenhum refresh token disponível, redireciona para o login
        removeAccessToken()
        removeRefreshToken()
        window.location.href = '/';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;