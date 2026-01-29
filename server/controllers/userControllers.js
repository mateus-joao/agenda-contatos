import UsersService  from "../services/userServices.js";



export default class UserController {
  getUsers(req, res) {
    res.json(UsersService.getUsers());
  }
  // login
  login(req, res) {
    const {userName, password } = req.body;

    const user = UsersService.findUserByNome(userName.trim());
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
  createUser(req, res) {
    const { userName, password } = req.body;

    if (UsersService.findUserByNome(userName)) {
      return res.status(400).json({ error: "nome já utilizado" });
    }

    const user = {
      id: Date.now().toString(),
      name: userName,
      password: password,
      contacts: []
    };

    UsersService.createUser(user);
    res.status(201).json({ id: user.id, name: user.name });
  }

}

