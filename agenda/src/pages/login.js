import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { validations } from '../utils/validations';

function Login({ setUser, setError }) {
  const { login } = useUser(setUser, setError);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailError = validations.email(userEmail);
    const passwordError = validations.password(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await login({ userEmail, password });
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <form className="userForm" onSubmit={handleLoginSubmit}>
        <input
          onChange={(e) => {
            setUserEmail(e.target.value);
            setErrors({ ...errors, email: null });
          }}
          value={userEmail}
          placeholder="email"
          type="text"
        />
        {errors.email && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>
        )}

        <input
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({ ...errors, password: null });
          }}
          value={password}
          placeholder="senha"
          type="password"
        />
        {errors.password && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.password}
          </span>
        )}

        <button type="submit">Entrar</button>
      </form>
      <Link to="/register">Não tem conta? Criar usuário</Link>
      <Link to="/forgotPassword">Esqueci minha senha</Link>
    </div>
  );
}

export default Login;
