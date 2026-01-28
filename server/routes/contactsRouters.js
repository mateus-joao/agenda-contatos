import express from "express";
const router = express.Router();
import controller from "../controllers/contactsControllers.js"

router.get("/:id", controller.getContacts);
router.post("/:id", controller.addContact);
router.delete("/:userId/:id", controller.deleteContact);
router.put("/:userId/:id", controller.updateContact);

export default router;
