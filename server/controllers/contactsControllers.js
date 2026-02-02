import UsersService from "../services/userServices.js";
import { users } from "../data/usersData.js";
const ContactServiceInstance = new UsersService(users);
export default class ContactController {
   getContacts(req, res) {
    const user = ContactServiceInstance.findUserById(req.params.userId);
    res.json(user?.contacts || []);
  }

 addContact(req, res) {
    const { newContactName, newContactPhone } = req.body;
    const { userId } = req.params;

    if (!newContactName || !newContactPhone) {
      return res.status(400).json({ error: "nome e número obrigatórios" });
    }

    const contact = {
      id: Date.now().toString(),
      name: newContactName,
      phone: newContactPhone
    };

    const result = ContactServiceInstance.addContact(userId, contact);
    if (!result) {
      console.log(result)
      return res.status(404).json({ error: "usuário não encontrado" });
      
    }

    res.status(201).json(contact);
  }

  deleteContact(req, res) {
    const { userId, contactId } = req.params;
    const contacts = ContactServiceInstance.deleteContact(userId, contactId);
    if (!contacts) {
      return res.status(404).json({ error: "usuário não encontrado" });
    }

    res.json(contacts);
  }

  updateContact(req, res) {
    const { userId, contactId } = req.params;
    const { newContactName, newContactPhone } = req.body;

    const contacts = ContactServiceInstance.updateContact(userId, contactId, { name: newContactName, phone: newContactPhone });
    res.json(contacts);
  }

}


