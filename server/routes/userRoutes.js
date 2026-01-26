const router = require("express").Router();
const controller = require("../controllers/userControllers");

router.get("/", controller.getUsers);
router.post("/login", controller.login);
router.post("/newUser", controller.createUser);
module.exports = router;
