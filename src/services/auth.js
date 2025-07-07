// services/auth.js
import axios from "./api"; // ou diretamente de 'axios' para o login

export async function authenticate(login, password) {
  const response = await axios.post("/auth/sign-in", {
    login,
    password,
  });

  const token = response.data.token;
  localStorage.setItem("token", token);
  return token;
}

export const register = async (userData) => {
  const response = await axios.post(`/auth`, userData);
  return response.data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}

