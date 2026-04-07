import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { validations } from '../utils/validations';

const NewUser = ({ setError, setUser }) => {
  const { addUser } = useUser(setUser, setError);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const nameError = validations.name(userName);
    const emailError = validations.email(email);
    const passwordError = validations.password(password);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await addUser({ userName, email, password });
  };
  return (
    <div>
      <h2>Novo usuário</h2>
      <form className="userForm" onSubmit={handleNewUserSubmit}>
        <input
          onChange={(e) => {
            setUserName(e.target.value);
            setErrors({ ...errors, name: null });
          }}
          value={userName}
          placeholder="Nome"
        />
        {errors.name && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>
        )}
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: null });
          }}
          value={email}
          placeholder="Email"
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
          placeholder="Senha"
          type="password"
        />
        {errors.password && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            {errors.password}
          </span>
        )}
        <button type="Submit">Enviar</button>
      </form>
      <Link to="/">Já tem conta? Fazer login</Link>
    </div>
  );
};

export default NewUser;
