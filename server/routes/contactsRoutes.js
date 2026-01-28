import express from "express";
const router = express.Router();
import contactController from "../controllers/contactsControllers.js"


router.get("/:id", (req, res) => contactController.getContacts(req, res));
router.post("/:id", (req, res) => contactController.addContact(req, res));
router.delete("/:userId/:id", (req, res) => contactController.deleteContact(req, res));
router.put("/:userId/:id", (req, res) => contactController.updateContact(req, res));


export default router;
