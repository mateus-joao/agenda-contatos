import { Router } from 'express';
import ContactController from '../controllers/contactsControllers.js';
const ContactControllerInstance = new ContactController();
const contactsRoutes = Router();
// contatos de um usuario
contactsRoutes.get('/user/:userId', (req, res) =>
  ContactControllerInstance.getContacts(req, res)
);

// adicionar contato
contactsRoutes.post('/user/:userId', (req, res) =>
  ContactControllerInstance.addContact(req, res)
);

// deletar contato
contactsRoutes.delete('/:contactId/user/:userId', (req, res) =>
  ContactControllerInstance.deleteContact(req, res)
);

// atualizar contato
contactsRoutes.put('/:contactId/user/:userId', (req, res) =>
  ContactControllerInstance.updateContact(req, res)
);

export { contactsRoutes };
