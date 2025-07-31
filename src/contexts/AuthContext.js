import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/Api';
import { jwtDecode } from 'jwt-decode'; 
import { setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken, getAccessToken } from '../services/AuthClientStore'
import Loading from '../components/layout/Loading';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Armazenará os dados do usuário do /api/user/me
  const [loading, setLoading] = useState(true);

  const saveTokens = useCallback((accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }, []);

  const removeTokens = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();
  }, []);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await api.get('/user/me'); 
      setUser(response.data); 
    } catch (error) {
      console.error("Falha ao buscar detalhes do usuário:", error);
      setUser(null);
      removeTokens();
      throw error;
    }
  }, [removeTokens]);

  const decodeAndSetUser = useCallback(async (token) => {
    if (typeof token === 'string' && token.length > 0) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expirado. Tentando refresh ou solicitando login novamente.");
          setUser(null);
          removeTokens();
          return;
        }

        // Se o token é válido e não expirado, busque os detalhes completos do usuário
        await fetchUserDetails(); // Chama a função que busca no backend
      } catch (error) {
        console.error("Falha ao decodificar ou validar token:", error);
        setUser(null);
        removeTokens();
      }
    } else {
      setUser(null);
      removeTokens(); // Remove tokens se o token for inválido/nulo
    }
  }, [fetchUserDetails, removeTokens]); // fetchUserDetails como dependência

  const login = useCallback(async (credentials) => {
    try {
      const response = await api.post('/auth/sign-in', credentials);
      const { accessToken, refreshToken } = response.data;
      saveTokens(accessToken, refreshToken);
      await decodeAndSetUser(accessToken); 
      return true;
    } catch (error) {
      console.error("Falha no login:", error);
      removeTokens();
      setUser(null);
      throw error;
    }
  }, [decodeAndSetUser, saveTokens, removeTokens]);

  const register = useCallback(async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      // Sua lógica atual é retornar true se o status for 200.
      // Se o registro também retorna tokens e você quer logar o usuário automaticamente:
      // if (response.data.accessToken && response.data.refreshToken) {
      //   const { accessToken, refreshToken } = response.data;
      //   saveTokens(accessToken, refreshToken);
      //   await decodeAndSetUser(accessToken);
      //   return true;
      // }
      if (response.status === 200 || response.status === 201) { 
        return true;
      }
      return false;
    } catch (error) {
      console.error("Falha no cadastro:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => { // Torne async para await o post
    try {
      await api.post('/auth/logout'); // Envia o logout para o backend
    } catch (error) {
      console.error("Erro no logout do servidor:", error);
      // Mesmo com erro no servidor, limpamos o estado local para deslogar o usuário
    } finally {
      removeTokens();
      setUser(null);
    }
  }, [removeTokens]);

  // Efeito principal para inicializar o estado de autenticação
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const accessToken = getAccessToken();
      if (accessToken) {
        await decodeAndSetUser(accessToken); // Chama a função async
      }
      setLoading(false);
    };

    initializeAuth();
  }, [decodeAndSetUser]); // Dependência: decodeAndSetUser

  const contextValue = React.useMemo(() => ({
    user,
    loading, // loading para o estado inicial de autenticação
    login,
    logout,
    register,
    isAuthenticated: !!user && !loading, // Considera autenticado se houver user e não estiver mais carregando
  }), [user, loading, login, logout, register]);

  if (loading) {
    return <Loading />; // Exibe um componente de loading enquanto o AuthProvider está inicializando
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};