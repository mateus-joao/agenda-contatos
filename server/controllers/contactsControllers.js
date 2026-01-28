import usersService from "../services/userServices.js";

  class ContactController {
   getContacts(req, res) {
    const user = usersService.findUserById(req.params.userId);
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

    const result = usersService.addContact(userId, contact);
    if (!result) {
      return res.status(404).json({ error: "usuário não encontrado" });
    }

    res.status(201).json(contact);
  }

  deleteContact(req, res) {
    const { userId, contactId } = req.params;
    const contacts = usersService.deleteContact(userId, contactId);
    if (!contacts) {
      return res.status(404).json({ error: "usuário não encontrado" });
    }

    res.json(contacts);
  }

  updateContact(req, res) {
    const { userId, contactId } = req.params;
    const { newContactName, newContactPhone } = req.body;

    const contacts = usersService.updateContact(userId, contactId, { name: newContactName, phone: newContactPhone });
    res.json(contacts);
  }

}

export default new ContactController();
