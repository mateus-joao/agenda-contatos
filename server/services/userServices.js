let users = [
  { id: "1", nome: "mts", senha: "123", contatos: [{ nome: "mts", numero: "2321", id: "2132" }] },
  { id: "2", nome: "jp", senha: "234", contatos: [{ nome: "ts", numero: "231", id: "132" }] },
  { id: "3", nome: "mj", senha: "222", contatos: [{ nome: "ms", numero: "221", id: "213" }] },
];

// USERS
function getUsers() {
  return users;
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

function findUserByNome(nome) {
  return users.find(u => u.nome === nome);
}

function createUser(user) {
  users.push(user);
  return user;
}

// CONTATOS
function addContato(userId, contato) {
  const user = findUserById(userId);
  if (!user) return null;

  user.contatos.push(contato);
  return contato;
}

function deleteContato(userId, contatoId) {
  const user = findUserById(userId);
  if (!user) return null;

  user.contatos = user.contatos.filter(c => c.id !== contatoId);
  return user.contatos;
}

function updateContato(userId, contatoId, dados) {
  const user = findUserById(userId);
  if (!user) return null;

  user.contatos = user.contatos.map(c =>
    c.id === contatoId ? { ...c, ...dados } : c
  );

  return user.contatos;
}

module.exports = {
  getUsers,
  findUserById,
  findUserByNome,
  createUser,
  addContato,
  deleteContato,
  updateContato
};
