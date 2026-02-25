import { api } from '../api/api';

// listar contatos
export function getContacts(userId) {
  return api(`/contacts/user/${userId}`);
}

// adicionar contato
export function createContact(userId, data) {
  return api(`/contacts/user/${userId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// atualizar contato
export function updateContact(contactId, userId, data) {
  return api(`/contacts/${contactId}/user/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// deletar contato
export function deleteContact(contactId, userId) {
  return api(`/contacts/${contactId}/user/${userId}`, {
    method: 'DELETE',
  });
}
