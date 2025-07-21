import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/Api'; // Sua instância do Axios
import { jwtDecode } from 'jwt-decode'; // Para decodificar JWTs
import { setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken, getAccessToken } from '../services/AuthClientStore'
import Loading from '../components/layout/Loading';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para salvar tokens no localStorage
  const saveTokens = (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  // Função para remover tokens do localStorage
  const removeTokens = () => {
    removeAccessToken()
    removeRefreshToken()
  };

  // Função para decodificar e definir o usuário com base no token de acesso
  const decodeAndSetUser = useCallback((token) => {

    if (typeof token === 'string' && token.length > 0) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // Assumindo que seu JWT contém dados do usuário
      } catch (error) {
        console.error("Falha ao decodificar token:", error);
        setUser(null);
        removeTokens();
      }
    } else {
      setUser(null);
    }
  }, []);

  // Função de Login envolvida em useCallback
  const login = useCallback(async (credentials) => {
    try {
      const response = await api.post('/auth/sign-in', credentials);
      const { accessToken, refreshToken } = response.data;
      saveTokens(accessToken, refreshToken);
      decodeAndSetUser(accessToken);
      return true;
    } catch (error) {
      console.error("Falha no login:", error);
      removeTokens();
      setUser(null);
      throw error; // Re-lança para permitir que o componente lide com erros
    }
  }, [decodeAndSetUser]);

  // Função de Cadastro (Register)
  const register = useCallback(async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      // ToDo
      // if (response.data.accessToken && response.data.refreshToken) {
      //   const { accessToken, refreshToken } = response.data;
      //   saveTokens(accessToken, refreshToken);
      //   decodeAndSetUser(accessToken);
      // }
      if (response.status === "200") {
        return true;
      }
    } catch (error) {
      console.error("Falha no cadastro:", error);
      throw error;
    }
  }, []);

  // Função de Logout
  const logout = useCallback(() => {
    removeTokens();
    setUser(null);
    api.post('/auth/logout').catch(error => console.error("Erro no logout do servidor:", error));
  }, []);

  // Inicializa o estado de autenticação ao montar o componente
  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) {
      decodeAndSetUser(accessToken);
    }
    setLoading(false);
  }, [decodeAndSetUser]);

  // Memoriza o valor do contexto para evitar re-renderizações desnecessárias
  const contextValue = React.useMemo(() => ({
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  }), [user, loading, login, logout, register]);

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};