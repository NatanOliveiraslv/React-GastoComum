// pages/Login.jsx
import { useState } from "react";
import { authenticate } from "../../services/auth";

function Login() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      await authenticate(loginInput, password);
      alert("Login realizado com sucesso!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setErro("Login ou senha inválidos.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Login:</label>
          <input
            type="text"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
