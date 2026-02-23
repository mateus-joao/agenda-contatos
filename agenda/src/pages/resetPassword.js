import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
function ResetPassword({ setError }) {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const handleRecover = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/users/resetPassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      alert(data.message);
      navigate('/');
    } else {
      const data = await res.json();
      console.log(data);
      setError(data.error);
    }
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
