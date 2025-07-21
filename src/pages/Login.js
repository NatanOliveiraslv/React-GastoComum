import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { GoLock, GoMail } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../contexts/AuthContext';

import SubmitButton from "../components/form/SubmitButton";

function Login() {
  const { login } = useAuth();
  const [username, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      await login({username, password});
      navigate('/home');
    } catch (error) {
      console.error(error);
      setErro("Login ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-none sm:bg-gray-100 ">
      <div className="bg-white bg-none sm:shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-10">Bem vindo!</h2>
        <p className="text-center text-gray-500 mb-6">
          Entre para gerenciar suas despesas compartilhadas com o <strong>Gasto Comum</strong>.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm mb-1 text-gray-600">
              E-mail
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                className="w-full outline-none"
                onChange={(e) => setLogin(e.target.value)}
                value={username}
              />
              <GoMail className="text-gray-400 ml-2" size={25} />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm mb-1 text-gray-600">
              Senha
            </label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                id="password"
                type="password"
                placeholder="Entre com a sua senha"
                className="w-full outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <GoLock className="text-gray-400 ml-2" size={25} />
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <span className="text-sm text-blue-600 hover:underline">
              Esqueceu sua senha?
            </span>
          </div>

          {/* Mensagem de erro */}
          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          {/* Login Button */}
          <SubmitButton
            text="Login"
            classButton="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold !mt-10"
          />

          {/* Divider */}
          <div className="flex items-center gap-4 my-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">OU</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Sign-in */}
          <button
            type="button"
            className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            Entrar com o Google
          </button>
        </form>

        {/* Sign up */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Não tem uma conta?{" "}
          <Link to={"/register"}>
            <span className="text-blue-600 hover:underline">
              Cadastre-se
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

