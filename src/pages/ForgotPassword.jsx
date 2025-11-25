import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el correo");
      }

      setMessage("✅ " + data.message + " Revisa tu bandeja de entrada y spam.");
      setEmail("");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      marginBottom: "30px",
      lineHeight: 1.5,
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
    backText: {
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
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

        <div style={styles.rightPanel}>
          <h2 style={styles.rightTitle}>Recuperar Contraseña</h2>
          <p style={styles.rightSubtitle}>
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <p style={styles.backText}>
            ¿Recordaste tu contraseña?{" "}
            <Link
              to="/login"
              style={styles.link}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;