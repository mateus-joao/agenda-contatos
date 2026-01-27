const router = require("express").Router();
const controller = require("../controllers/contactsControllers");

router.get("/:id", controller.getContacts);
router.post("/:id", controller.addContact);
router.delete("/:userId/:id", controller.deleteContact);
router.put("/:userId/:id", controller.updateContact);

module.exports = router;
