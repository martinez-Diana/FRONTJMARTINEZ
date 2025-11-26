import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Administrador from "./pages/Administrador";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CatalogoProductos from "./pages/Catalogo_Productos";
import AuthSuccess from "./pages/AuthSuccess";

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Redirección a /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 👇 Rutas principales */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Administrador />} />
        
        {/* 👇 Ruta de autenticación exitosa */}
        <Route path="/auth/success" element={<AuthSuccess />} />
        
        {/* 👇 Rutas de recuperación de contraseña */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* 👇 Ruta del catálogo para clientes */}
        <Route path="/catalogo" element={<CatalogoProductos />} />
      </Routes>
    </Router>
  );
}

export default App;