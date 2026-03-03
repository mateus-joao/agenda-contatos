import { useState, useEffect } from 'react';

function EditUserModal({ open, onClose, editUser, user }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPassword('');
    }
  }, [user, open]);

  async function onSubmit(e) {
    e.preventDefault();

    await editUser(user.id, {
      name,
      email,
      password,
    });

    onClose();
  }

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Editar usuário</h2>

        <form className="userForm" onSubmit={onSubmit}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
