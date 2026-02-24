import { useState } from 'react';

function EditUserModal({ open, onClose, handleUpdateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function onSubmit(e) {
    e.preventDefault();

    handleUpdateUser({
      name,
      email,
      password,
    });
  }
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Editar usuário</h2>

        <form className="userForm" onSubmit={onSubmit}>
          <input
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <div className="actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
