import UsersService  from "../services/userServices.js";
const UserServiceInstance = new UsersService();


export default class UserController {
  getUsers(req, res) {
    res.json(UserServiceInstance.getUsers());
  }
  // login
  login(req, res) {
    const {userName, password } = req.body;

    const user = UserServiceInstance.findUserByNome(userName.trim());
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

    if (UserServiceInstance.findUserByNome(userName)) {
      return res.status(400).json({ error: "nome já utilizado" });
    }

    const user = {
      id: Date.now().toString(),
      name: userName,
      password: password,
      contacts: []
    };

    UserServiceInstance.createUser(user);
    res.status(201).json({ id: user.id, name: user.name });
  }

}

