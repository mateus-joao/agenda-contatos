const usersService = require("../services/userServices");

function getContatos(req, res) {
  const user = usersService.findUserById(req.params.id);
  res.json(user?.contatos || []);
}

function addContato(req, res) {
  const { nome, numero } = req.body;
  const { id } = req.params;

  if (!nome || !numero) {
    return res.status(400).json({ error: "nome e número obrigatórios" });
  }

  const contato = {
    id: Date.now().toString(),
    nome,
    numero
  };

  const result = usersService.addContato(id, contato);
  if (!result) {
    return res.status(404).json({ error: "usuário não encontrado" });
  }

  res.status(201).json(contato);
}

function deleteContato(req, res) {
  const { userId, id } = req.params;

  const contatos = usersService.deleteContato(userId, id);
  if (!contatos) {
    return res.status(404).json({ error: "usuário não encontrado" });
  }

  res.json(contatos);
}

function updateContato(req, res) {
  const { userId, id } = req.params;
  const { nome, numero } = req.body;

  const contatos = usersService.updateContato(userId, id, { nome, numero });
  res.json(contatos);
}

module.exports = {
  getContatos,
  addContato,
  deleteContato,
  updateContato
};
