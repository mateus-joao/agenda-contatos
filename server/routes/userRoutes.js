import express from "express";
const router = express.Router();
import UserController from "../controllers/userControllers.js"
const UserControllerInstance = new UserController();

router.get("/", (req, res) => UserControllerInstance.getUsers(req, res));
router.post("/login", (req, res) => UserControllerInstance.login(req, res));
router.post("/newUser", (req, res) => UserControllerInstance.createUser(req, res));
export default router;
