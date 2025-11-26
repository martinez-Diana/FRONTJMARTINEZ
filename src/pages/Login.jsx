import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  const [loginMethod, setLoginMethod] = useState("traditional");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    code: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const redirectByRole = (user) => {
    if (user.role_id === 1) navigate("/administrador");
    else if (user.role_id === 2) navigate("/empleado");
    else if (user.role_id === 3) navigate("/catalogo");
    else navigate("/home");
  };

  // -------------------------------
  // LOGIN TRADICIONAL
  // -------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await API.post("/api/login", {
        username: formData.username,
        password: formData.password,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("¡Inicio de sesión exitoso!");
      setTimeout(() => redirectByRole(data.user), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // SOLICITAR CÓDIGO EMAIL
  // -------------------------------
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await API.post("/api/auth/email/request-code", {
        email: formData.email,
      });

      setCodeSent(true);
      setMessage("📧 Código enviado a tu correo.");
    } catch (err) {
      setError(err.response?.data?.error || "Error al solicitar código");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // VERIFICAR CÓDIGO EMAIL
  // -------------------------------
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await API.post("/api/auth/email/verify-code", {
        email: formData.email,
        code: formData.code,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("¡Código verificado!");
      setTimeout(() => redirectByRole(data.user), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // LOGIN CON GOOGLE
  // -------------------------------
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await API.post("/api/auth/google", {
        credential: credentialResponse.credential,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("¡Inicio de sesión con Google exitoso!");

      setTimeout(() => redirectByRole(data.user), 1500);
    } catch (err) {
      setError("Error al iniciar sesión con Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("❌ Error al iniciar sesión con Google.");
  };

  // -------------------------------
  // ESTILOS (sin modificar)
  // -------------------------------
  const styles = { /* tus estilos aquí sin cambios */ };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div style={styles.container}>
        <div style={styles.card}>
          
          {/* Panel izquierdo */}
          <div style={styles.leftPanel}>
            <h2 style={styles.leftTitle}>JUGUETERÍA Y</h2>
            <h1 style={styles.leftSubtitle}>MARTÍNEZ</h1>
            <hr style={styles.line} />
            <p style={styles.leftDescription}>Sistema de Gestión Integral</p>
          </div>

          {/* Panel derecho */}
          <div style={styles.rightPanel}>
            <h2 style={styles.rightTitle}>Bienvenido</h2>
            <p style={styles.rightSubtitle}>Selecciona tu método de inicio de sesión</p>

            {/* BOTÓN GOOGLE */}
            <div style={styles.googleButtonContainer}>
              {GOOGLE_CLIENT_ID ? (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  logo_alignment="left"
                />
              ) : (
                <p style={styles.error}>⚠ No se encontró GOOGLE_CLIENT_ID en el .env</p>
              )}
            </div>

            {/* DIVISOR */}
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>o elige otra opción</span>
              <div style={styles.dividerLine}></div>
            </div>

            {/* MÉTODO DE LOGIN */}
            <div style={styles.methodButtons}>
              <button
                onClick={() => setLoginMethod("traditional")}
                style={{
                  ...styles.methodButton,
                  ...(loginMethod === "traditional" ? styles.methodButtonActive : {}),
                }}
              >
                🔑 Usuario/Contraseña
              </button>

              <button
                onClick={() => {
                  setLoginMethod("email");
                  setCodeSent(false);
                }}
                style={{
                  ...styles.methodButton,
                  ...(loginMethod === "email" ? styles.methodButtonActive : {}),
                }}
              >
                📧 Código por Email
              </button>
            </div>

            {/* FORMULARIOS */}
            {loginMethod === "traditional" && (
              <form onSubmit={handleLogin} style={styles.form}>
                <label style={styles.label}>Usuario o Email</label>
                <input
                  type="text"
                  name="username"
                  placeholder="correo o usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <label style={styles.label}>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <button type="submit" disabled={loading} style={styles.button}>
                  {loading ? "Cargando..." : "Iniciar Sesión"}
                </button>
              </form>
            )}

            {loginMethod === "email" && !codeSent && (
              <form onSubmit={handleRequestCode} style={styles.form}>
                <label style={styles.label}>Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />

                <button type="submit" disabled={loading} style={styles.button}>
                  {loading ? "Enviando..." : "Enviar Código"}
                </button>
              </form>
            )}

            {loginMethod === "email" && codeSent && (
              <form onSubmit={handleVerifyCode} style={styles.form}>
                <label style={styles.label}>Código de Verificación</label>
                <input
                  type="text"
                  name="code"
                  placeholder="123456"
                  value={formData.code}
                  onChange={handleChange}
                  maxLength={6}
                  required
                  style={styles.input}
                />

                <button type="submit" disabled={loading} style={styles.button}>
                  {loading ? "Verificando..." : "Verificar Código"}
                </button>
              </form>
            )}

            {message && <p style={styles.message}>{message}</p>}
            {error && <p style={styles.error}>{error}</p>}

            <p style={styles.registerText}>
              ¿No tienes cuenta?
              <Link to="/register" style={styles.link}> Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
