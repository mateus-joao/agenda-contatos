import { api } from '../api/api';
export function userLogin(data) {
  return api('/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
export function createUser(data) {
  console.log(data);
  return api('/users/newUser', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
// atualizar usuário
export function updateUser(userId, data) {
  return api(`/users/update/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// deletar usuário
export function deleteUser(userId) {
  return api(`/users/delete/${userId}`, {
    method: 'DELETE',
  });
}
