import { useEffect, useState, useCallback } from 'react';
import {
  getContacts,
  deleteContact,
  createContact,
  updateContact,
} from '../services/contactServices';

export function useContacts(userId, setError) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!userId) return;

    async function fetchContacts() {
      try {
        const data = await getContacts(userId);
        setContacts(data);
      } catch (err) {
        setError?.(err.message);
      }
    }

    fetchContacts();
  }, [userId, setError]);

  const removeContact = useCallback(
    async (contactId) => {
      if (!userId) return;

      try {
        await deleteContact(contactId, userId);

        setContacts((prev) => prev.filter((c) => c.id !== contactId));
      } catch (err) {
        setError?.(err.message);
      }
    },
    [userId, setError]
  );

  const addContact = useCallback(
    async (contact) => {
      if (!userId) return;

      try {
        const data = await createContact(userId, contact);

        setContacts((prev) => [...prev, data]);
      } catch (err) {
        setError?.(err.message);
      }
    },
    [userId, setError]
  );

  const editContact = useCallback(
    async (contactId, contact) => {
      if (!userId) return;

      try {
        const data = await updateContact(contactId, userId, contact);

        setContacts((prev) =>
          prev.map((c) => (c.id === data.id ? { ...c, ...data } : c))
        );
      } catch (err) {
        setError?.(err.message);
      }
    },
    [userId, setError]
  );

  return {
    contacts,
    addContact,
    editContact,
    removeContact,
  };
}
