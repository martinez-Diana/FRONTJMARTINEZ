import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; // ← AGREGAR ESTA LÍNEA

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"; // ← ELIMINAR O COMENTAR

const Login = () => {
  const [loginMethod, setLoginMethod] = useState("traditional");
  const [formData, setFormData] = useState({ username: "", password: "", email: "", code: "" });
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

  // 🎯 FUNCIÓN CENTRALIZADA PARA REDIRECCIONAR SEGÚN ROL
  const redirectByRole = (user) => {
    if (user.role_id === 1) {
      navigate("/administrador");
    } else if (user.role_id === 2) {
      navigate("/empleado");
    } else if (user.role_id === 3) {
      navigate("/catalogo"); // 👈 CLIENTES VAN AL CATÁLOGO
    } else {
      navigate("/home"); // Fallback
    }
  };

  // ========================================
  // 🔑 LOGIN TRADICIONAL
  // ========================================
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

    setMessage("¡Inicio de sesión exitoso! Redirigiendo...");

    setTimeout(() => {
      redirectByRole(data.user);
    }, 1500);

  } catch (err) {
    setError(err.response?.data?.error || err.message || "Error al iniciar sesión");
  } finally {
    setLoading(false);
  }
};

  // ========================================
  // 📧 SOLICITAR CÓDIGO POR EMAIL
  // ========================================
const handleRequestCode = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");
  setLoading(true);

  try {
    const response = await API.post("/api/auth/email/request-code", {
      email: formData.email,
    });

    const data = response.data;

    setCodeSent(true);
    setMessage("📧 Código enviado a tu correo. Revisa tu bandeja de entrada.");

  } catch (err) {
    setError(err.response?.data?.error || err.message || "Error al solicitar código");
  } finally {
    setLoading(false);
  }
};
  // ========================================
  // ✅ VERIFICAR CÓDIGO
  // ========================================
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

    setMessage("¡Verificación exitosa! Redirigiendo...");

    setTimeout(() => {
      redirectByRole(data.user);
    }, 1500);

  } catch (err) {
    setError(err.response?.data?.error || err.message || "Código inválido");
  } finally {
    setLoading(false);
  }
};

  // ========================================
  // 🔵 LOGIN CON GOOGLE
  // ========================================
 const handleGoogleSuccess = async (credentialResponse) => {
  setError("");
  setMessage("");
  setLoading(true);

  try {
    const response = await API.post("/api/auth/google", {
      credential: credentialResponse.credential,
    });

    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setMessage("¡Inicio de sesión con Google exitoso! Redirigiendo...");

    setTimeout(() => {
      redirectByRole(data.user);
    }, 1500);

  } catch (err) {
    setError(err.response?.data?.error || err.message || "Error al iniciar sesión con Google");
  } finally {
    setLoading(false);
  }
};

  const handleGoogleError = () => {
    setError("Error al iniciar sesión con Google. Inténtalo de nuevo.");
  };

  // Estilos
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fef5fb",
      fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "20px",
    },
    card: {
      display: "flex",
      width: "100%",
      maxWidth: "850px",
      minHeight: "500px",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 10px 40px rgba(139, 92, 246, 0.08)",
      overflow: "hidden",
    },
    leftPanel: {
      flex: 1,
      background: "#ec4899",
      color: "white",
      textAlign: "center",
      padding: "50px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    leftTitle: {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: 1.3,
      margin: 0,
    },
    leftSubtitle: {
      fontWeight: 700,
      fontSize: "28px",
      color: "#fcd34d",
      margin: "10px 0",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.15)",
    },
    line: {
      width: "60px",
      height: "3px",
      background: "#67e8f9",
      border: "none",
      margin: "15px auto",
      borderRadius: "2px",
    },
    leftDescription: {
      fontSize: "14px",
      marginTop: "10px",
      opacity: 0.95,
    },
    circles: {
      display: "flex",
      justifyContent: "center",
      marginTop: "25px",
      gap: "12px",
    },
    circle: {
      width: "25px",
      height: "25px",
      borderRadius: "50%",
    },
    circleCyan: {
      backgroundColor: "#67e8f9",
      boxShadow: "0 3px 8px rgba(103, 232, 249, 0.3)",
    },
    circleYellow: {
      backgroundColor: "#fcd34d",
      boxShadow: "0 3px 8px rgba(252, 211, 77, 0.3)",
    },
    circleOrange: {
      backgroundColor: "#f472b6",
      boxShadow: "0 3px 8px rgba(244, 114, 182, 0.3)",
    },
    rightPanel: {
      flex: 1,
      padding: "40px 50px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    rightTitle: {
      color: "#ec4899",
      fontSize: "22px",
      fontWeight: 700,
      marginBottom: "5px",
    },
    rightSubtitle: {
      color: "#666",
      fontSize: "14px",
      marginBottom: "25px",
    },
    methodButtons: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    methodButton: {
      flex: 1,
      padding: "10px",
      border: "2px solid #e5e7eb",
      borderRadius: "6px",
      background: "white",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: 600,
      transition: "all 0.3s ease",
      fontFamily: "'Poppins', sans-serif",
    },
    methodButtonActive: {
      borderColor: "#ec4899",
      background: "#fef5fb",
      color: "#ec4899",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "20px 0",
      color: "#999",
      fontSize: "13px",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "#e5e7eb",
    },
    dividerText: {
      padding: "0 15px",
    },
    googleButtonContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontWeight: 500,
      fontSize: "13px",
      marginBottom: "4px",
      color: "#333",
    },
    input: {
      padding: "10px 12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      outline: "none",
      fontSize: "14px",
      transition: "all 0.3s ease",
      fontFamily: "'Poppins', sans-serif",
    },
    button: {
      backgroundColor: "#ec4899",
      color: "white",
      border: "none",
      padding: "12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "15px",
      transition: "all 0.3s ease",
      marginTop: "8px",
      boxShadow: "0 3px 12px rgba(236, 72, 153, 0.25)",
    },
    buttonDisabled: {
      backgroundColor: "#d1d5db",
      cursor: "not-allowed",
    },
    message: {
      color: "#059669",
      marginTop: "15px",
      fontSize: "13px",
      textAlign: "center",
      padding: "10px",
      backgroundColor: "#ecfdf5",
      borderRadius: "6px",
      borderLeft: "4px solid #10b981",
    },
    error: {
      color: "#dc2626",
      marginTop: "15px",
      fontSize: "13px",
      textAlign: "center",
      padding: "10px",
      backgroundColor: "#fef2f2",
      borderRadius: "6px",
      borderLeft: "4px solid #ef4444",
    },
    registerText: {
      fontSize: "13px",
      textAlign: "center",
      marginTop: "20px",
      color: "#666",
    },
    link: {
      color: "#c084fc",
      textDecoration: "none",
      fontWeight: 600,
    },
    backButton: {
      background: "none",
      border: "none",
      color: "#c084fc",
      fontSize: "13px",
      cursor: "pointer",
      padding: "0",
      marginBottom: "15px",
      textAlign: "left",
      fontWeight: 600,
    },
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Panel izquierdo */}
          <div style={styles.leftPanel}>
            <h2 style={styles.leftTitle}>
              JUGUETERÍA Y
              <br />
              NOVEDADES
            </h2>
            <h1 style={styles.leftSubtitle}>MARTÍNEZ</h1>
            <hr style={styles.line} />
            <p style={styles.leftDescription}>Sistema de Gestión Integral</p>

            <div style={styles.circles}>
              <span style={{ ...styles.circle, ...styles.circleCyan }}></span>
              <span style={{ ...styles.circle, ...styles.circleYellow }}></span>
              <span style={{ ...styles.circle, ...styles.circleOrange }}></span>
            </div>
          </div>

          {/* Panel derecho */}
          <div style={styles.rightPanel}>
            <h2 style={styles.rightTitle}>Bienvenido</h2>
            <p style={styles.rightSubtitle}>Selecciona tu método de inicio de sesión</p>

            {/* Botón de Google */}
            <div style={styles.googleButtonContainer}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
                logo_alignment="left"
              />
            </div>

            {/* Divisor */}
            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>o elige otra opción</span>
              <div style={styles.dividerLine}></div>
            </div>

            {/* Botones para elegir método */}
            <div style={styles.methodButtons}>
              <button
                onClick={() => {
                  setLoginMethod("traditional");
                  setCodeSent(false);
                  setError("");
                  setMessage("");
                }}
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
                  setError("");
                  setMessage("");
                }}
                style={{
                  ...styles.methodButton,
                  ...(loginMethod === "email" ? styles.methodButtonActive : {}),
                }}
              >
                📧 Código por Email
              </button>
            </div>

            {/* LOGIN TRADICIONAL */}
            {loginMethod === "traditional" && (
              <form onSubmit={handleLogin} style={styles.form}>
                <label style={styles.label}>Nombre de Usuario o Email</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Ingresa tu usuario o email"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#c084fc";
                    e.target.style.boxShadow = "0 0 6px rgba(192, 132, 252, 0.25)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.boxShadow = "none";
                  }}
                />

                <label style={styles.label}>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#c084fc";
                    e.target.style.boxShadow = "0 0 6px rgba(192, 132, 252, 0.25)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.boxShadow = "none";
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.button,
                    ...(loading ? styles.buttonDisabled : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = "#db2777";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 5px 16px rgba(219, 39, 119, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = "#ec4899";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 3px 12px rgba(236, 72, 153, 0.25)";
                    }
                  }}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
              </form>
            )}

            {/* LOGIN CON EMAIL */}
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
                  disabled={loading}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#c084fc";
                    e.target.style.boxShadow = "0 0 6px rgba(192, 132, 252, 0.25)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.boxShadow = "none";
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.button,
                    ...(loading ? styles.buttonDisabled : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = "#db2777";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 5px 16px rgba(219, 39, 119, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = "#ec4899";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 3px 12px rgba(236, 72, 153, 0.25)";
                    }
                  }}
                >
                  {loading ? "Enviando código..." : "Enviar código"}
                </button>
              </form>
            )}

            {/* VERIFICAR CÓDIGO */}
            {loginMethod === "email" && codeSent && (
              <form onSubmit={handleVerifyCode} style={styles.form}>
                <button
                  type="button"
                  onClick={() => setCodeSent(false)}
                  style={styles.backButton}
                >
                  ← Volver
                </button>

                <label style={styles.label}>Código de Verificación</label>
                <input
                  type="text"
                  name="code"
                  placeholder="Ingresa el código de 6 dígitos"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  maxLength={6}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#c084fc";
                    e.target.style.boxShadow = "0 0 6px rgba(192, 132, 252, 0.25)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.boxShadow = "none";
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.button,
                    ...(loading ? styles.buttonDisabled : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = "#db2777";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 5px 16px rgba(219, 39, 119, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = "#ec4899";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 3px 12px rgba(236, 72, 153, 0.25)";
                    }
                  }}
                >
                  {loading ? "Verificando..." : "Verificar Código"}
                </button>
              </form>
            )}

            {/* Mensajes */}
            {message && <p style={styles.message}>{message}</p>}
            {error && <p style={styles.error}>{error}</p>}

            {/* Link de recuperación de contraseña */}
            {loginMethod === "traditional" && (
            <p style={styles.registerText}>
              <Link
                to="/forgot-password"
                style={styles.link}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                ¿Olvidaste tu contraseña?
             </Link>
           </p>
            )}    
            {/* Link de registro */}
            <p style={styles.registerText}>
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                style={styles.link}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;