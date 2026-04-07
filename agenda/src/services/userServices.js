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
  return api('/users/newUser', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
// usuário
export function getUser() {
  return api('/users/me', {
    method: 'GET',
  });
}
// atualizar usuário
export function updateUser(data) {
  return api(`/users/update`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// deletar usuário
export function deleteUser() {
  return api(`/users/delete`, {
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
