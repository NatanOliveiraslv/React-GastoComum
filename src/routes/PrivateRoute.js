// src/routes/PrivateRoute.jsx
import { Navigate, Outlet  } from "react-router-dom";

export function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
}