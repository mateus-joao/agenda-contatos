import { UserService } from '../services/index.js';
//import nodemailer from 'nodemailer';
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
  //remover usuário
  async deleteUser(req, res) {
    const { userId } = req.params;
    const result = await userService.deleteUser(userId);

    if (!result) {
      return res.status(404).json({ error: 'usuário não encontrado' });
    }

    res.status(204).send();
  }
  // gerar link/token
  async forgotPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }
    const user = await userService.findUserByEmail(email.trim());
    if (user) {
      const token = await userService.generateResetToken(email);

      // link
      const resetLink = `http://localhost:3000/resetpassword?token=${token}`;
      console.log('clique no link para redefinir a senha:');
      console.log(resetLink);
    }
    /*
    // configurar envio de email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperação de senha',
      html: `
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
    });
  */
    return res.json({
      message: 'Se o email existir, um link será enviado.',
    });
  }
  //recuperar conta
  async resetPassword(req, res) {
    const { token, password } = req.body;
    const success = await userService.resetUserPassword(token, password);

    if (!success) {
      return res.status(400).json({ error: 'Token inválido ou expirado' });
    }

    res.json({ message: 'Senha atualizada com sucesso' });
  }
}
