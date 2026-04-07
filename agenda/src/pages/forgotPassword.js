import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountRecovery } from '../hooks/useAccountRecovery';
import { validations } from '../utils/validations';

function ForgotPassword({ setError }) {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { requestRecovery } = useAccountRecovery(setError);

  async function handleSubmit(e) {
    e.preventDefault();
    const emailError = validations.email(email);
    if (emailError) {
      setErrorMsg(emailError);
      return;
    }
    setErrorMsg('');
    await requestRecovery(email);
    navigate('/');
  }

  return (
    <form className="userForm" onSubmit={handleSubmit}>
      <h2>Recuperar senha</h2>

      <input
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorMsg('');
        }}
      />
      {errorMsg && (
        <span style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</span>
      )}

      <button type="submit">Enviar link</button>
    </form>
  );
}

export default ForgotPassword;
