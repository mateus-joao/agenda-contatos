import { api } from '../api/api';
//login
export function userLogin(data) {
  return api('/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
//novo usuário
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

export function forgotPassword(email) {
  return api('/users/forgotPassword', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
export function resetPassword(token, password) {
  return api('/users/resetPassword', {
    method: 'PUT',
    body: JSON.stringify({ token, password }),
  });
}
