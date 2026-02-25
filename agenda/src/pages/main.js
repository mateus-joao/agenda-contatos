import AddContact from '../components/addContact';
import ContactList from '../components/contactList';
import { useEffect, useState } from 'react';
import SearchContact from '../components/searchContact';
import UserMenu from '../components/userMenu';
import EditUserModal from '../components/editUserModal';
import { deleteUser, updateUser } from '../services/userServices';
import {
  createContact,
  deleteContact,
  updateContact,
  getContacts,
} from '../services/contactServices';
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
    try {
      const res = await updateUser(user.id, data);
      setUser(res);
      setEditOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  //deletar usuário
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação é irreversível.'
    );

    if (!confirm) return;
    try {
      await deleteUser(user.id);
      localStorage.setItem('user', JSON.stringify(''));
      setUser(null);
    } catch (err) {
      setError(err.message);
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
      try {
        const data = await updateContact(id, user.id, {
          newContactName,
          newContactPhone,
        });
        setContactName('');
        setContactPhone('');
        setId(null);
        setContacts(
          contacts.map((c) => (c.id === data.id ? { ...c, ...data } : c))
        );
      } catch (err) {
        setError(err.message);
      }
      //addcontato
    } else {
      try {
        const data = await createContact(user.id, {
          newContactName,
          newContactPhone,
        });
        setContactName('');
        setContactPhone('');
        setContacts([...contacts, data]);
      } catch (err) {
        setError(err.message);
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
    async function getContact() {
      try {
        const data = await getContacts(user.id);
        setContacts(data);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    }

    getContact();
  }, [user?.id]);

  //apagando contato
  const handleDeleteContact = async (e) => {
    const confirm = window.confirm(
      'Tem certeza que deseja excluir o contato? Essa ação é irreversível.'
    );

    if (!confirm) return;
    try {
      await deleteContact(e, user.id);
      setContacts(contacts.filter((c) => c.id !== e));
    } catch (err) {
      setError(err.message);
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
