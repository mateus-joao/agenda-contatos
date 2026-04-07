import { api } from '../api/api';

// listar contatos
export function getContacts() {
  return api(`/contacts/user`);
}

// adicionar contato
export function createContact(data) {
  return api(`/contacts/user`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// atualizar contato
export function updateContact(contactId, data) {
  return api(`/contacts/${contactId}/user`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// deletar contato
export function deleteContact(contactId) {
  return api(`/contacts/${contactId}/user`, {
    method: 'DELETE',
  });
}
