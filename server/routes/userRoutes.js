import { Router } from 'express';
import { UserController } from '../controllers/index.js';
const UserControllerInstance = new UserController();
const usersRoutes = Router();

usersRoutes.get('/', (req, res) => UserControllerInstance.getUsers(req, res));
usersRoutes.post('/login', (req, res) =>
  UserControllerInstance.login(req, res)
);
usersRoutes.post('/newUser', (req, res) =>
  UserControllerInstance.createUser(req, res)
);
export { usersRoutes };
