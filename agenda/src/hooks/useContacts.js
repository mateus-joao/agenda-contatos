import { useEffect, useState, useCallback } from 'react';
import {
  getContacts,
  deleteContact,
  createContact,
  updateContact,
} from '../services/contactServices';

export function useContacts(setError) {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    async function fetchContacts() {
      try {
        const data = await getContacts();
        setContacts(data);
      } catch (err) {
        setError?.(err.message);
      }
    }

    fetchContacts();
  }, [token, setError]);

  const removeContact = useCallback(
    async (contactId) => {
      if (!token) return;

      try {
        await deleteContact(contactId);

        setContacts((prev) => prev.filter((c) => c.id !== contactId));
      } catch (err) {
        setError?.(err.message);
      }
    },
    [token, setError]
  );

  const addContact = useCallback(
    async (contact) => {
      if (!token) return;

      try {
        const data = await createContact(contact);

        setContacts((prev) => [...prev, data]);
      } catch (err) {
        setError?.(err.message);
      }
    },
    [token, setError]
  );

  const editContact = useCallback(
    async (contactId, contact) => {
      if (!token) return;

      try {
        const data = await updateContact(contactId, contact);

        setContacts((prev) =>
          prev.map((c) => (c.id === data.id ? { ...c, ...data } : c))
        );
      } catch (err) {
        setError?.(err.message);
      }
    },
    [token, setError]
  );

  return {
    contacts,
    addContact,
    editContact,
    removeContact,
  };
}
