import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      console.error('Error en autenticación:', error);
      navigate('/login?error=' + error);
      return;
    }

    if (token) {
      // Guardar token
      localStorage.setItem('token', token);
      
      // Decodificar token para obtener info del usuario (opcional)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('user', JSON.stringify(payload));
      } catch (e) {
        console.error('Error decodificando token:', e);
      }

      // Redirigir al dashboard o página principal
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="auth-loading">
      <div className="spinner"></div>
      <p>Completando autenticación...</p>
    </div>
  );
};

export default AuthSuccess;