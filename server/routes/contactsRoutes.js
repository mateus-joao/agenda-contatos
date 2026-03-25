import { Router } from 'express';
import { ContactController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const ContactControllerInstance = new ContactController();
const contactsRoutes = Router();
// contatos de um usuario
contactsRoutes.get('/user', authMiddleware, (req, res) =>
  ContactControllerInstance.getContacts(req, res)
);

// adicionar contato
contactsRoutes.post('/user', authMiddleware, (req, res) =>
  ContactControllerInstance.addContact(req, res)
);

// deletar contato
contactsRoutes.delete('/:contactId/user', authMiddleware, (req, res) =>
  ContactControllerInstance.deleteContact(req, res)
);

// atualizar contato
contactsRoutes.put('/:contactId/user', authMiddleware, (req, res) =>
  ContactControllerInstance.updateContact(req, res)
);

export { contactsRoutes };
