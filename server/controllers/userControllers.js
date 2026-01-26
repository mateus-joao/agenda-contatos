const usersService = require("../services/userServices");

function getUsers(req, res) {
  console.log('testando ');
  res.json(usersService.getUsers());
}

function login(req, res) {
  console.log('user login')
  const { loginNome, loginsenha } = req.body;

  const usuario = usersService.findUserByNome(loginNome);
  if (!usuario) {
    return res.status(401).json({ error: "usuário inválido" });
  }

  if (usuario.senha !== loginsenha) {
    return res.status(401).json({ error: "senha inválida" });
  }

  res.json({
    id: usuario.id,
    nome: usuario.nome
  });
}

function createUser(req, res) {
  const { nome, senha } = req.body;

  if (usersService.findUserByNome(nome)) {
    return res.status(400).json({ error: "nome já utilizado" });
  }

  const user = {
    id: Date.now().toString(),
    nome,
    senha,
    contatos: []
  };

  usersService.createUser(user);
  res.status(201).json({ id: user.id, nome: user.nome });
}

module.exports = {
  getUsers,
  login,
  createUser
};
