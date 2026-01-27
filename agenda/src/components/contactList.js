import { FaEdit, FaWindowClose} from "react-icons/fa"

function ContactList({handleDeleteContact, contacts, handleEditContact, searchTerm }) {
  if (!contacts || contacts.length === 0) {
    return <p>Nenhum contato encontrado.</p>;
  }
  const filterContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <ul>
      {filterContacts.map((contact) => (
        <li key={contact.id}>
          <strong>{contact.name}</strong> — {contact.phone}
          <FaEdit onClick={()=> handleEditContact(contact)} />
          <FaWindowClose onClick={() => handleDeleteContact(contact.id)} className="delete"/>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
