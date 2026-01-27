const usersService = require("../services/userServices");

function getUsers(req, res) {
  res.json(usersService.getUsers());
}
// login
function login(req, res) {
  const {userName, password } = req.body;

  const user = usersService.findUserByNome(userName);
  if (!user) {
    return res.status(401).json({ error: "usuário inválido" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "senha inválida" });
  }

  res.json({
    id: user.id,
    name: user.name
  });
}
// cadastro de usuario
function createUser(req, res) {
  const { userName, password } = req.body;

  if (usersService.findUserByNome(userName)) {
    return res.status(400).json({ error: "nome já utilizado" });
  }

  const user = {
    id: Date.now().toString(),
    name: userName,
    password: password,
    contacts: []
  };

  usersService.createUser(user);
  res.status(201).json({ id: user.id, name: user.name });
}

module.exports = {
  getUsers,
  login,
  createUser
};
