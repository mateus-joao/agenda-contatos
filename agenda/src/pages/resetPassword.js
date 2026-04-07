import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccountRecovery } from '../hooks/useAccountRecovery';
import { validations } from '../utils/validations';

function ResetPassword({ setError }) {
  const { changePassword } = useAccountRecovery(setError);
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const handleRecover = async (e) => {
    e.preventDefault();
    const passwordError = validations.password(password);
    if (passwordError) {
      setErrorMsg(passwordError);
      return;
    }
    setErrorMsg('');
    await changePassword(token, password);
    navigate('/');
  };
  return (
    <div>
      <h3> Digite sua nova senha:</h3>
      <form className="userForm" onSubmit={handleRecover}>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg('');
          }}
          value={password}
          placeholder="Nova senha"
          type="password"
        />
        {errorMsg && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</span>
        )}
        <button type="Submit">Enviar</button>
      </form>
    </div>
  );
}

export default ResetPassword;
