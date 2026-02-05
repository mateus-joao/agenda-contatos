import UsersService from "../services/userServices.js";

const userService = new UsersService();

export default class UserController {
  async getUsers(req, res) {
    const users = await userService.getUsers();
    res.json(users);
  }

  // login
  async login(req, res) {
    const { userName, password } = req.body;

    const user = await userService.findUserByNome(userName.trim());
    if (!user) {
      return res.status(401).json({ error: "usuário inválido" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "senha inválida" });
    }

    res.json({
      id: user.id,
      name: user.name,
    });
  }

  // cadastro de usuário
  async createUser(req, res) {
    const { userName, password } = req.body;

    if (await userService.findUserByNome(userName.trim())) {
      return res.status(400).json({ error: "nome já utilizado" });
    }

    const user = await userService.createUser({
      name: userName.trim(),
      password,
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
    });
  }
}

