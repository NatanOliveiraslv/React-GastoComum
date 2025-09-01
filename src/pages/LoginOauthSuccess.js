import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  setAccessToken,
  setRefreshToken
} from "../services/AuthClientStore";

export default function LoginOauthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // redireciona para dashboard/home
      navigate("/home", { replace: true });
    } else {
      console.error("Falha na autenticação. Token não encontrado.");
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  if (isAuthenticated) {
    return null; // evita flicker
  }

  return <p>Processando login...</p>;
}
