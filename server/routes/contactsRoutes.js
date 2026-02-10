import express from 'express';
const router = express.Router();
import ContactController from '../controllers/contactsControllers.js';
const ContactControllerInstance = new ContactController();

// contatos de um usuario
router.get('/user/:userId', (req, res) =>
  ContactControllerInstance.getContacts(req, res)
);

// adicionar contato
router.post('/user/:userId', (req, res) =>
  ContactControllerInstance.addContact(req, res)
);

// deletar contato
router.delete('/:contactId/user/:userId', (req, res) =>
  ContactControllerInstance.deleteContact(req, res)
);

// atualizar contato
router.put('/:contactId/user/:userId', (req, res) =>
  ContactControllerInstance.updateContact(req, res)
);

export default router;
