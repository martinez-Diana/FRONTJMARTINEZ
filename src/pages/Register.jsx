import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api"; // ← AGREGAR ESTA LÍNEA

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

  body {
    margin: 0;
    font-family: "Poppins", sans-serif;
    background: #fef5fb;
  }

  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .register-box {
    display: flex;
    background: #fff;
    width: 1300px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(139, 92, 246, 0.08);
    overflow: hidden;
  }

  .register-left {
    background: #ec4899;
    color: white;
    flex: 0.9;
    padding: 60px 40px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 280px;
  }

  .register-left h1 {
    font-size: 24px;
    margin: 0;
    line-height: 1.4;
  }

  .register-left h2 {
    font-size: 28px;
    font-weight: 700;
    color: #fcd34d;
    margin-top: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  }

  .register-left p {
    font-size: 14px;
    margin-top: 20px;
  }

  .line {
    width: 50px;
    height: 3px;
    background-color: #67e8f9;
    margin: 15px auto;
    border-radius: 2px;
  }

  .circles {
    margin-top: 30px;
  }

  .circle {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin: 0 6px;
  }

  .cyan {
    background-color: #67e8f9;
    box-shadow: 0 3px 8px rgba(103, 232, 249, 0.3);
  }

  .yellow {
    background-color: #fcd34d;
    box-shadow: 0 3px 8px rgba(252, 211, 77, 0.3);
  }

  .orange {
    background-color: #f472b6;
    box-shadow: 0 3px 8px rgba(244, 114, 182, 0.3);
  }

  .register-right {
    flex: 1.1;
    padding: 40px;
    background: #fff;
    overflow-y: auto;
    max-height: 95vh;
  }

  .register-right h2 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 5px;
    color: #ec4899;
  }

  .register-right p {
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 15px;
  }

  .form-row.three-cols {
    grid-template-columns: repeat(3, 1fr);
  }

  .form-row.full {
    grid-template-columns: 1fr;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: 500;
    margin-bottom: 4px;
    color: #333;
    font-size: 13px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="date"],
  select {
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 13px;
    outline: none;
    font-family: "Poppins", sans-serif;
  }

  input:focus,
  select:focus {
    border-color: #c084fc;
    box-shadow: 0 0 6px rgba(192, 132, 252, 0.25);
  }

  input.input-error {
    border-color: #ef4444;
  }

  input.input-success {
    border-color: #10b981;
  }

  select {
    background-color: #fff;
    cursor: pointer;
  }

  .validation-message {
    font-size: 11px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .validation-message.error {
    color: #ef4444;
  }

  .validation-message.success {
    color: #10b981;
  }

  .validation-message.warning {
    color: #f59e0b;
  }

  .password-requirements {
    font-size: 11px;
    margin-top: 6px;
    padding: 8px;
    background: #f9fafb;
    border-radius: 6px;
    border-left: 3px solid #e5e7eb;
  }

  .password-requirements.active {
    border-left-color: #c084fc;
  }

  .requirement {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 3px 0;
  }

  .requirement.met {
    color: #10b981;
  }

  .requirement.unmet {
    color: #9ca3af;
  }

  .checkbox-group {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
    flex-wrap: wrap;
    align-items: center;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    min-width: 220px;
  }

  .checkbox-container input[type="checkbox"] {
    margin: 0;
    cursor: pointer;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    accent-color: #ec4899;
  }

  .checkbox-container label {
    margin: 0;
    font-size: 12px;
    cursor: pointer;
    line-height: 1.3;
  }

  .register-btn {
    background: #ec4899;
    color: #fff;
    font-weight: 600;
    padding: 11px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 15px;
    margin-top: 8px;
    box-shadow: 0 3px 12px rgba(236, 72, 153, 0.25);
  }

  .register-btn:hover {
    background: #db2777;
    box-shadow: 0 5px 16px rgba(219, 39, 119, 0.3);
    transform: translateY(-2px);
  }

  .register-btn:active {
    transform: scale(0.98);
  }

  .register-btn:disabled {
    background: #d1d5db;
    cursor: not-allowed;
    transform: none;
  }

  .error-message {
    color: #dc2626;
    font-size: 13px;
    margin-bottom: 12px;
    padding: 8px;
    background-color: #fef2f2;
    border-radius: 6px;
    border-left: 4px solid #ef4444;
  }

  .success-message {
    color: #059669;
    font-size: 13px;
    margin-bottom: 12px;
    padding: 8px;
    background-color: #ecfdf5;
    border-radius: 6px;
    border-left: 4px solid #10b981;
  }

  .success-message a {
    color: #c084fc;
    text-decoration: none;
    font-weight: 600;
  }

  .success-message a:hover {
    text-decoration: underline;
  }

  @media (max-width: 1024px) {
    .register-box {
      flex-direction: column;
      width: 90%;
    }

    .register-left {
      padding: 40px 30px;
    }

    .register-right {
      padding: 25px;
      max-height: none;
    }

    .form-row,
    .form-row.three-cols {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .form-group {
      margin-bottom: 10px;
    }

    .checkbox-group {
      flex-direction: column;
      gap: 10px;
    }

    .checkbox-container {
      min-width: auto;
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    motherLastName: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
    username: "",
    userType: "Cliente",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailValidation, setEmailValidation] = useState({ valid: null, message: "" });
  const [birthDateValidation, setBirthDateValidation] = useState({ valid: null, message: "" });
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Validaciones en tiempo real
    if (name === "email") {
      validateEmail(value);
    }
    if (name === "birthDate") {
      validateBirthDate(value);
    }
  };

  const validateEmail = (email) => {
    if (!email) {
      setEmailValidation({ valid: null, message: "" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setEmailValidation({ valid: false, message: "Formato de correo inválido" });
      return;
    }

    const domain = email.split("@")[1]?.toLowerCase();
    
    // Dominios para cada tipo de usuario
    const adminDomains = ["admin.jugueteria.com", "admin.martinez.com"];
    const employeeDomains = ["empleado.jugueteria.com", "staff.martinez.com"];
    const clientDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"];

    if (formData.userType === "Administrador") {
      if (adminDomains.includes(domain)) {
        setEmailValidation({ valid: true, message: "✓ Correo válido para Administrador" });
      } else {
        setEmailValidation({ 
          valid: false, 
          message: `Para Administrador usa: ${adminDomains.join(", ")}` 
        });
      }
    } else if (formData.userType === "Empleado") {
      if (employeeDomains.includes(domain)) {
        setEmailValidation({ valid: true, message: "✓ Correo válido para Empleado" });
      } else {
        setEmailValidation({ 
          valid: false, 
          message: `Para Empleado usa: ${employeeDomains.join(", ")}` 
        });
      }
    } else {
      if (clientDomains.some(d => domain?.includes(d))) {
        setEmailValidation({ valid: true, message: "✓ Correo válido" });
      } else {
        setEmailValidation({ 
          valid: false, 
          message: "Usa correos comunes: Gmail, Hotmail, Outlook, Yahoo" 
        });
      }
    }
  };

  const validateBirthDate = (date) => {
    if (!date) {
      setBirthDateValidation({ valid: null, message: "" });
      return;
    }

    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Ajustar edad si aún no ha cumplido años este año
    const actualAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;

    if (birthDate > today) {
      setBirthDateValidation({ valid: false, message: "La fecha no puede ser futura" });
      return;
    }

    if (actualAge < 13) {
      setBirthDateValidation({ valid: false, message: "Debes tener al menos 13 años" });
      return;
    }

    if (actualAge > 120) {
      setBirthDateValidation({ valid: false, message: "Fecha no válida" });
      return;
    }

    setBirthDateValidation({ valid: true, message: `✓ Edad válida (${actualAge} años)` });
  };

  const getPasswordRequirements = () => {
    const password = formData.password;
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`-]/.test(password),
    };
  };

  const isPasswordValid = () => {
    const req = getPasswordRequirements();
    return req.length && req.uppercase && req.number && req.symbol;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      firstName,
      lastName,
      motherLastName,
      email,
      phone,
      birthDate,
      password,
      confirmPassword,
      username,
      userType,
      termsAccepted,
      privacyAccepted,
    } = formData;

    if (!firstName.trim()) {
      setError("El nombre es requerido");
      return;
    }

    if (!lastName.trim()) {
      setError("El apellido paterno es requerido");
      return;
    }

    if (!motherLastName.trim()) {
      setError("El apellido materno es requerido");
      return;
    }

    if (!username.trim()) {
      setError("El nombre de usuario es requerido");
      return;
    }

    if (!emailValidation.valid) {
      setError("Corrige el correo electrónico según tu tipo de usuario");
      return;
    }

    if (!birthDateValidation.valid) {
      setError("La fecha de nacimiento no es válida");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!isPasswordValid()) {
      setError("La contraseña no cumple con todos los requisitos");
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      setError("Debes aceptar los términos y condiciones y la política de privacidad");
      return;
    }

try {
  const response = await API.post("/api/register", {
    first_name: firstName,
    last_name: lastName,
    mother_lastname: motherLastName,
    email: email,
    phone: phone,
    birthdate: birthDate,
    username: username,
    password: password,
    role_id: userType === "Cliente" ? 3 : userType === "Empleado" ? 2 : 1
  });

  const data = response.data;
      setSuccess(data.message);
      setFormData({
        firstName: "",
        lastName: "",
        motherLastName: "",
        email: "",
        phone: "",
        birthDate: "",
        password: "",
        confirmPassword: "",
        username: "",
        userType: "Cliente",
        termsAccepted: false,
        privacyAccepted: false,
      });
      setEmailValidation({ valid: null, message: "" });
      setBirthDateValidation({ valid: null, message: "" });
    } catch (error) {
      setError("Error en la conexión con el servidor");
    }
  };

  const passwordReq = getPasswordRequirements();

  return (
    <>
      <style>{styles}</style>
      <div className="register-container">
        <div className="register-box">
          <div className="register-left">
            <h1>
              JUGUETERÍA Y <br /> NOVEDADES
            </h1>
            <h2>MARTÍNEZ</h2>
            <div className="line"></div>
            <p>Sistema de Gestión Integral</p>
            <div className="circles">
              <span className="circle cyan"></span>
              <span className="circle yellow"></span>
              <span className="circle orange"></span>
            </div>
          </div>

          <div className="register-right">
            <h2>Crear Cuenta</h2>
            <p>Completa tus datos para registrarte</p>

            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">❌ {error}</div>}
              {success && (
                <div className="success-message">
                  ✅ {success} <br />
                  <Link to="/login">Iniciar sesión</Link>
                </div>
              )}

              <div className="form-row three-cols">
                <div className="form-group">
                  <label htmlFor="firstName">Nombre</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Apellido Paterno</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Apellido paterno"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="motherLastName">Apellido Materno</label>
                  <input
                    type="text"
                    id="motherLastName"
                    name="motherLastName"
                    value={formData.motherLastName}
                    onChange={handleChange}
                    placeholder="Apellido materno"
                    required
                  />
                </div>
              </div>

              <div className="form-row full">
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    className={
                      emailValidation.valid === true ? "input-success" : 
                      emailValidation.valid === false ? "input-error" : ""
                    }
                    required
                  />
                  {emailValidation.message && (
                    <div className={`validation-message ${emailValidation.valid ? "success" : "error"}`}>
                      {emailValidation.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (123) 456-7890"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birthDate">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={
                      birthDateValidation.valid === true ? "input-success" : 
                      birthDateValidation.valid === false ? "input-error" : ""
                    }
                    required
                  />
                  {birthDateValidation.message && (
                    <div className={`validation-message ${birthDateValidation.valid ? "success" : "error"}`}>
                      {birthDateValidation.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setPasswordFocus(true)}
                    placeholder="Min. 8 caracteres, mayúscula, número y símbolo"
                    className={isPasswordValid() ? "input-success" : ""}
                    required
                  />
                  {(passwordFocus || formData.password) && (
                    <div className={`password-requirements ${formData.password ? "active" : ""}`}>
                      <div className={`requirement ${passwordReq.length ? "met" : "unmet"}`}>
                        {passwordReq.length ? "✓" : "○"} Mínimo 8 caracteres
                      </div>
                      <div className={`requirement ${passwordReq.uppercase ? "met" : "unmet"}`}>
                        {passwordReq.uppercase ? "✓" : "○"} Una letra mayúscula
                      </div>
                      <div className={`requirement ${passwordReq.number ? "met" : "unmet"}`}>
                        {passwordReq.number ? "✓" : "○"} Un número
                      </div>
                      <div className={`requirement ${passwordReq.symbol ? "met" : "unmet"}`}>
                        {passwordReq.symbol ? "✓" : "○"} Un símbolo (!@#$%^&*)
                      </div>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirmar contraseña"
                    className={
                      formData.confirmPassword && formData.password === formData.confirmPassword 
                        ? "input-success" 
                        : formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? "input-error"
                        : ""
                    }
                    required
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="validation-message error">
                      Las contraseñas no coinciden
                    </div>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="validation-message success">
                      ✓ Las contraseñas coinciden
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username">Nombre de Usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Tu usuario"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="userType">Tipo de Usuario</label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={(e) => {
                      handleChange(e);
                      // Re-validar email cuando cambie el tipo de usuario
                      if (formData.email) validateEmail(formData.email);
                    }}
                    required
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
              </div>

              <div className="checkbox-group">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="terms"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="terms">
                    Acepto términos y condiciones
                  </label>
                </div>

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="privacy">
                    Acepto política de privacidad
                  </label>
                </div>
              </div>

              <button type="submit" className="register-btn">
                Crear Cuenta
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;