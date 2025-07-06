// pages/Login.jsx
import { useState } from "react";
import { authenticate } from "../../services/auth";
import { MdOutlineEmail, MdOutlineLock  } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      await authenticate(login, password);
      alert("Login realizado com sucesso!");
      window.location.href = "/home";
    } catch (error) {
      console.error(erro);
      setErro("Login ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Bem vindo</h2>
        <p className="text-center text-gray-500 mb-6">
          Entre para gerenciar suas despesas compartilhadas <br /> com o <strong>Gasto Comum</strong>.
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
                value={login}
              />
              <MdOutlineEmail className="text-gray-400 ml-2" size={25} />
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
              <MdOutlineLock  className="text-gray-400 ml-2" size={25}  />
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
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
          <a href="#" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

