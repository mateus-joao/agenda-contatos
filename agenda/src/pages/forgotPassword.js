import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountRecovery } from '../hooks/useAccountRecovery';
function ForgotPassword({ setError }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { requestRecovery } = useAccountRecovery(setError);
  async function handleSubmit(e) {
    e.preventDefault();
    await requestRecovery(email);
    navigate('/');
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
