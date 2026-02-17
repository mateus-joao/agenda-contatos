import { UserService } from '../services/index.js';

const userService = new UserService();

export default class UserController {
  async getUsers(req, res) {
    const users = await userService.getUsers();
    res.json(users);
  }

  // login
  async login(req, res) {
    const { userEmail, password } = req.body;

    const user = await userService.findUserByEmail(userEmail.trim());
    if (!user) {
      return res.status(401).json({ error: 'Email inválido' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'senha inválida' });
    }

    res.json({
      id: user.id,
      name: user.name,
    });
  }

  // cadastro de usuário
  async createUser(req, res) {
    const { userName, email, password } = req.body;
    const userAlreadyExist = await userService.findUserByEmail(email.trim());
    if (userAlreadyExist) {
      return res.status(400).json({ error: 'este e-mail já está em uso' });
    }

    const user = await userService.createUser({
      name: userName.trim(),
      email,
      password,
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
    });
  }

  // editar usuário
  async updateUser(req, res) {
    const { userId } = req.params;
    const data = req.body;
    const user = await userService.updateUser(userId, data);
    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
      });
    } else {
      res.status(400).json({ error: 'usuário não encontrado' });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params;
    const result = await userService.deleteUser(userId);

    if (!result) {
      return res.status(404).json({ error: 'usuário não encontrado' });
    }

    res.status(204).send();
  }
}
