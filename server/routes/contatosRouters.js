const router = require("express").Router();
const controller = require("../controllers/contatosControllers");

router.get("/:id", controller.getContatos);
router.post("/:id", controller.addContato);
router.delete("/:userId/:id", controller.deleteContato);
router.put("/:userId/:id", controller.updateContato);

module.exports = router;
