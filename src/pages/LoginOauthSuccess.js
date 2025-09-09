import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    setAccessToken,
} from "../services/AuthClientStore";
import Loading from "../components/layout/Loading";

export default function LoginOauthSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { decodeAndSetUser, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);

     if (loading) {
        <Loading />;
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("accessToken");

        if (accessToken) {
            setAccessToken(accessToken);

            // força o contexto a setar o usuário agora
            decodeAndSetUser(accessToken);

            // só navega depois de ter atualizado o contexto
            navigate("/home", { replace: true });
            setLoading(false);
        } else {
            console.error("Falha na autenticação. Token não encontrado.");
            navigate("/", { replace: true });
        }
    }, [location, navigate, decodeAndSetUser]);

    if (isAuthenticated) {
        return null; // evita flicker
    }

    return <p>Processando login...</p>;
}
