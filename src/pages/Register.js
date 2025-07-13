import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import { FcGoogle } from "react-icons/fc";

import InputField from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setError] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    setFirstNameError(!firstName.trim());
    setLastNameError(!lastName.trim());
    setEmailError(!email.trim());
    setPasswordError(!password.trim());
    setConfirmPasswordError(!confirmPassword.trim());


    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const form = {
      firstName,
      lastName,
      email,
      login: email,
      password,
    };

    try {
      await register(form);
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
      setError("Erro ao realizar o cadastro");
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-none sm:bg-gray-100 px-4">
      <div className="bg-white bg-none sm:shadow-md rounded-xl p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Cadastre-se</h2>
        <p className="text-center text-gray-500 mb-6">
          Crie sua conta no Gasto Comum
        </p>

        {/* Botão Google */}
        <button className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-100 text-black  mb-4">
          <FcGoogle size={20} />
          Continue pelo Google
        </button>

        {/* Divisor */}
        <div className="flex items-center gap-4 mb-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">Or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <InputField
            label="Nome"
            type="text"
            placeholder="Digite seu nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={firstNameError}
            classLabel="text-sm text-gray-600" 
            classInput="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none transition-colors duration-200"
          />

          <InputField
            label="Sobrenome"
            type="text"
            placeholder="Digite seu sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={lastNameError}
            classLabel="text-sm text-gray-600" 
            classInput="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none transition-colors duration-200"
          />

          <InputField
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            classLabel="text-sm text-gray-600" 
            classInput="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none transition-colors duration-200"
          />

          <InputField
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            classLabel="text-sm text-gray-600" 
            classInput="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none transition-colors duration-200"
          />

          <InputField
            label="Confirme sua senha"
            type="password"
            placeholder="Digite novamente sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            classLabel="text-sm text-gray-600" 
            classInput="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none transition-colors duration-200"
          />

          {/* Mensagem de erro */}
          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          {/* Botão cadastrar */}
          <SubmitButton 
            text="Cadastrar-se"
            classButton="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold !mt-10"
          />
        </form>
        

        {/* Link para login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Já tem uma conta?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>

        {/* Termos 
        <p className="text-center text-xs text-gray-400 mt-4">
          By tapping Sign Up, you accept our{" "}
          <a href="#" className="underline text-blue-600">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="underline text-blue-600">
            Privacy Policy
          </a>
          .
        </p>
        */}
      </div>
    </div>
  );
}

export default Register;
