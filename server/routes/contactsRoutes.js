import express from "express";
const router = express.Router();
import contactController from "../controllers/contactsControllers.js"


// contatos de um usuario
router.get("/user/:userId",(req, res) => contactController.getContacts(req, res));

// adicionar contato 
router.post("/user/:userId", (req, res) => contactController.addContact(req, res));

// deletar contato 
router.delete("/:contactId/user/:userId",(req, res) => contactController.deleteContact(req, res));

// atualizar contato
router.put("/:contactId/user/:userId", (req, res) => contactController.updateContact(req, res));

export default router;
