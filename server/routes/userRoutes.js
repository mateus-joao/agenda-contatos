import express from "express";
const router = express.Router();
import userController from "../controllers/userControllers.js"

router.get("/", (req, res) => userController.getUsers(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.post("/newUser", (req, res) => userController.createUser(req, res));
export default router;
