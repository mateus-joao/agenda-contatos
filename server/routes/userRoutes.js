import express from "express";
const router = express.Router();
import controller from "../controllers/userControllers.js"

router.get("/", controller.getUsers);
router.post("/login", controller.login);
router.post("/newUser", controller.createUser);
export default router;
