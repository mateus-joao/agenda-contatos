import AddContact from '../components/addContact';
import ContactList from '../components/contactList';
import { useEffect, useState } from 'react';
import SearchContact from '../components/searchContact';
import UserMenu from '../components/userMenu';
import EditUserModal from '../components/editUserModal';
const Main = ({ setError, setUser, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [newContactName, setContactName] = useState('');
  const [newContactPhone, setContactPhone] = useState('');
  const [id, setId] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  //botão de editar usuário
  const onUpdateUser = (e) => {
    setEditOpen(true);
  };
  //editar o usuário
  const handleUpdateUser = async (data) => {
    const res = await fetch(
      `http://localhost:3001/api/users/update/${user.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      setEditOpen(false);
    } else {
      console.log('erro', res);
    }
  };

  //deletar usuário
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação é irreversível.'
    );

    if (!confirm) return;
    const res = await fetch(
      `http://localhost:3001/api/users/delete/${user.id}`,
      {
        method: 'DELETE',
      }
    );
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(''));
      setUser(null);
    } else {
      console.log('error ', res);
    }
  };

  // voltar a tela inicial login/cadastro
  const handleExitUser = (e) => {
    e.preventDefault();
    const confirm = window.confirm('Tem certeza que deseja sair?');
    if (!confirm) return;
    localStorage.setItem('user', JSON.stringify(''));
    setUser(null);
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    //editar
    if (id) {
      const res = await fetch(
        `http://localhost:3001/api/contacts/${id}/user/${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newContactName, newContactPhone }),
        }
      );

      if (res.ok) {
        setContactName('');
        setContactPhone('');
        setId(null);
        const data = await res.json();
        setContacts(
          contacts.map((c) => (c.id === data.id ? { ...c, ...data } : c))
        );
      }
      //addcontato
    } else {
      const res = await fetch(
        `http://localhost:3001/api/contacts/user/${user.id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newContactName, newContactPhone }),
        }
      );
      if (res.ok) {
        setContactName('');
        setContactPhone('');
        const data = await res.json();
        setContacts([...contacts, data]);
      }
    }
  };
  const handleEditContact = (e) => {
    setId(e.id);
    setContactName(e.name);
    setContactPhone(e.phone);
  };

  useEffect(() => {
    if (!user?.id) return;
    async function getContacts() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/contacts/user/${user.id}`
        );
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    }

    getContacts();
  }, [user?.id]);

  //apagando contato
  const handleDeleteContact = async (e) => {
    const confirm = window.confirm(
      'Tem certeza que deseja excluir o contato? Essa ação é irreversível.'
    );

    if (!confirm) return;
    const res = await fetch(
      `http://localhost:3001/api/contacts/${e}/user/${user.id}`,
      {
        method: 'DELETE',
      }
    );
    if (res.ok) {
      setContacts(contacts.filter((c) => c.id !== e));
    } else {
      console.log('error ', res);
    }
  };

  return (
    <div className="mainContainer">
      <div className="userMain">
        <button onClick={() => setOpenMenu((prev) => !prev)}>
          {user.name} ⌄
        </button>
        {openMenu && (
          <div className="dropdown">
            <UserMenu
              handleExitUser={handleExitUser}
              handleDeleteUser={handleDeleteUser}
              onUpdateUser={onUpdateUser}
            />
          </div>
        )}
      </div>
      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        handleUpdateUser={handleUpdateUser}
      />
      <AddContact
        handleAddContact={handleAddContact}
        newContactName={newContactName}
        newContactPhone={newContactPhone}
        setContactName={setContactName}
        setContactPhone={setContactPhone}
      />
      <SearchContact setSearchTerm={setSearchTerm} />

      <ContactList
        searchTerm={searchTerm}
        handleEditContact={handleEditContact}
        handleDeleteContact={handleDeleteContact}
        contacts={contacts}
      />
    </div>
  );
};

export default Main;
