import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
const NewUser = ({ setError, setUser }) => {
  const { addUser } = useUser(setUser, setError);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    await addUser({ userName, email, password });
  };
  return (
    <div>
      <h2>Novo usuário</h2>
      <form className="userForm" onSubmit={handleNewUserSubmit}>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder="Nome"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Senha"
          type="password"
        />
        <button type="Submit">Enviar</button>
      </form>
      <Link to="/">Já tem conta? Fazer login</Link>
    </div>
  );
};

export default NewUser;
