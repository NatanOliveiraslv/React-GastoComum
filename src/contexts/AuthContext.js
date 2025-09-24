import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo
} from 'react';

import api from '../services/Api';
import { jwtDecode } from 'jwt-decode';
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken
} from '../services/AuthClientStore';

import Loading from '../components/layout/Loading';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false); // Novo estado

  const saveTokens = useCallback((accessToken) => {
    setAccessToken(accessToken);
  }, []);

  const removeTokens = useCallback(() => {
    removeAccessToken();
  }, []);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await api.get('/user/me');
      setUser(response.data);
    } catch (error) {
      console.error("Falha ao buscar detalhes do usuário:", error);
      setUser(null);
      removeTokens();
    }
  }, [removeTokens]);

  const decodeAndSetUser = useCallback(async (token) => {
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // Se expirado, o interceptor do axios cuidará da renovação
      if (decoded.exp * 1000 < Date.now()) {
        console.warn("Token expirado. Interceptor tentará renovar.");
      }

      await fetchUserDetails(); // sempre buscamos os dados atualizados
    } catch (error) {
      console.error("Erro ao decodificar ou validar token:", error);
      setUser(null);
      removeTokens();
    }
  }, [fetchUserDetails, removeTokens]);

  const login = useCallback(async (credentials) => {
    try {
      const response = await api.post('/auth/sign-in', credentials);
      const { accessToken } = response.data;
      saveTokens(accessToken);
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
      if (response.status === 200 || response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Falha no cadastro:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      removeTokens();
      setUser(null);
    }
  }, [removeTokens]);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();
      if (token) {
        await decodeAndSetUser(token);
      }
      setAuthInitialized(true); // Só depois que o processo estiver completo
    };

    initializeAuth();
  }, [decodeAndSetUser]);

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    register,
    decodeAndSetUser, // exposto para forçar atualização do usuário após OAuth
    isAuthenticated: !!user,
    authInitialized, // <- novo: para só exibir a app quando estiver tudo pronto
  }), [user, login, logout, register, decodeAndSetUser, authInitialized]);

  if (!authInitialized) {
    return <Loading />;
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
