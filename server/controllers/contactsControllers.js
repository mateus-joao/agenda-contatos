import usersService from "../services/userServices.js";

  class ContactController {
   getContacts(req, res) {
    const user = usersService.findUserById(req.params.id);
    res.json(user?.contacts || []);
  }

 addContact(req, res) {
    const { newContactName, newContactPhone } = req.body;
    const { id } = req.params;

    if (!newContactName || !newContactPhone) {
      return res.status(400).json({ error: "nome e número obrigatórios" });
    }

    const contact = {
      id: Date.now().toString(),
      name: newContactName,
      phone: newContactPhone
    };

    const result = usersService.addContact(id, contact);
    if (!result) {
      return res.status(404).json({ error: "usuário não encontrado" });
    }

    res.status(201).json(contact);
  }

  deleteContact(req, res) {
    const { userId, id } = req.params;

    const contacts = usersService.deleteContact(userId, id);
    if (!contacts) {
      return res.status(404).json({ error: "usuário não encontrado" });
    }

    res.json(contacts);
  }

  updateContact(req, res) {
    const { userId, id } = req.params;
    const { newContactName, newContactPhone } = req.body;

    const contacts = usersService.updateContact(userId, id, { name: newContactName, phone: newContactPhone });
    res.json(contacts);
  }

}

export default new ContactController();
