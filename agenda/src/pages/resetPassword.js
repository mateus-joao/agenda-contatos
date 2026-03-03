import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccountRecovery } from '../hooks/useAccountRecovery';
function ResetPassword({ setError }) {
  const { changePassword } = useAccountRecovery(setError);
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const handleRecover = async (e) => {
    e.preventDefault();
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
          }}
          value={password}
          placeholder="Nova senha"
        />
        <button type="Submit">Enviar</button>
      </form>
    </div>
  );
}

export default ResetPassword;
