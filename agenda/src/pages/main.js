import AddContact from '../components/addContact';
import ContactList from '../components/contactList';
import { useState } from 'react';
import SearchContact from '../components/searchContact';
import UserMenu from '../components/userMenu';
import EditUserModal from '../components/editUserModal';
import { useContacts } from '../hooks/useContacts';
import { useUser } from '../hooks/useUser';
const Main = ({ setError, setUser, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { contacts, removeContact, addContact, editContact } = useContacts(
    user?.id,
    setError
  );
  const { removeUser, editUser, logoutUser } = useUser(setUser, setError);
  const [editingContact, setEditingContact] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const handleDeleteUser = async () => {
    if (
      !window.confirm(
        'Tem certeza que deseja excluir sua conta? Essa ação é irreversível.'
      )
    )
      return;

    await removeUser(user.id);
  };

  const handleExitUser = () => {
    if (!window.confirm('Tem certeza que deseja sair?')) return;

    logoutUser();
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
              onUpdateUser={() => setEditOpen(true)}
            />
          </div>
        )}
      </div>
      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        editUser={editUser}
        user={user}
      />
      <AddContact
        addContact={addContact}
        editContact={editContact}
        editingContact={editingContact}
        clearEditingContact={() => setEditingContact(null)}
      />
      <SearchContact setSearchTerm={setSearchTerm} />

      <ContactList
        searchTerm={searchTerm}
        handleEditContact={setEditingContact}
        removeContact={removeContact}
        contacts={contacts}
      />
    </div>
  );
};

export default Main;
