import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword({ setError }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/api/users/forgotPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      const data = await res.json();
      alert(data.message);
      navigate('/');
    } else {
      const data = await res.json();
      setError(data.error);
    }
  }

  return (
    <form className="userForm" onSubmit={handleSubmit}>
      <h2>Recuperar senha</h2>

      <input
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Enviar link</button>
    </form>
  );
}

export default ForgotPassword;
