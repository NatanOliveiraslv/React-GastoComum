import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdOutlineLock, MdOutlinePerson } from "react-icons/md";
import { register } from "../../services/auth";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(form); // <-- chama o service
      alert("Usuário cadastrado com sucesso!");
      navigate("/"); // Redireciona para login
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="w-full outline-none"
              />
              <MdOutlinePerson className="text-gray-400 ml-2" />
            </div>
          </div>

          {/* Sobrenome */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="text"
                name="lastName"
                placeholder="Your lastname"
                value={form.name}
                onChange={handleChange}
                className="w-full outline-none"
              />
              <MdOutlinePerson className="text-gray-400 ml-2" />
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full outline-none"
              />
              <MdOutlineEmail className="text-gray-400 ml-2" />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full outline-none"
              />
              <MdOutlineLock className="text-gray-400 ml-2" />
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
          >
            Register
          </button>
        </form>

        {/* Link para login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
