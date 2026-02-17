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
usersRoutes.delete('/delete/:userId', (req, res) =>
  UserControllerInstance.deleteUser(req, res)
);
usersRoutes.put('/update/:userId', (req, res) =>
  UserControllerInstance.updateUser(req, res)
);
export { usersRoutes };
