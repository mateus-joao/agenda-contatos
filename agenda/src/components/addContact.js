import { useEffect, useState } from 'react';
import { validations } from '../utils/validations';

function AddContact({
  addContact,
  editContact,
  editingContact,
  clearEditingContact,
}) {
  const [newContactName, setContactName] = useState('');
  const [newContactPhone, setContactPhone] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingContact) {
      setContactName(editingContact.name);
      setContactPhone(editingContact.phone);
    }
  }, [editingContact]);

  const validateForm = () => {
    const newErrors = {};
    const nameError = validations.name(newContactName);
    const phoneError = validations.phone(newContactPhone);

    if (nameError) newErrors.name = nameError;
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleAddContact(e) {
    e.preventDefault();

    if (!validateForm()) return;

    if (editingContact) {
      await editContact(editingContact.id, { newContactName, newContactPhone });

      clearEditingContact();
    } else {
      await addContact({ newContactName, newContactPhone });
    }

    setContactName('');
    setContactPhone('');
    setErrors({});
  }
  return (
    <div>
      <h1>Novo contato</h1>
      <form className="newContactForm" onSubmit={handleAddContact}>
        <input
          value={newContactName}
          onChange={(e) => {
            setContactName(e.target.value);
            setErrors({ ...errors, name: null });
          }}
          placeholder="Nome"
          type="text"
        />
        {errors.name && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>
        )}
        <input
          value={newContactPhone}
          onChange={(e) => {
            setContactPhone(e.target.value);
            setErrors({ ...errors, phone: null });
          }}
          placeholder="Numero"
          type="text"
        />
        {errors.phone && (
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</span>
        )}
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default AddContact;
