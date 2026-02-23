import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ setUser, setError }) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail, password }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };
  return (
    <div className="login">
      <h2>Login</h2>
      <form className="userForm" onSubmit={handleLoginSubmit}>
        <input
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          value={userEmail}
          placeholder="email"
          type="text"
        />

        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="senha"
          type="password"
        />

        <button type="submit">Entrar</button>
      </form>
      <Link to="/register">Não tem conta? Criar usuário</Link>
      <Link to="/forgotPassword">Esqueci minha senha</Link>
    </div>
  );
}

export default Login;
