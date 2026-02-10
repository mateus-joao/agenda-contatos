import UsersService from '../services/userServices.js';

const userService = new UsersService();

export default class ContactController {
  async getContacts(req, res) {
    const { userId } = req.params;

    const user = await userService.findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'usuário não encontrado' });
    }

    res.json(user.contacts);
  }

  async addContact(req, res) {
    const { userId } = req.params;
    const { newContactName, newContactPhone } = req.body;

    if (!newContactName || !newContactPhone) {
      return res.status(400).json({ error: 'nome e número obrigatórios' });
    }

    const contact = await userService.addContact(userId, {
      name: newContactName,
      phone: newContactPhone,
    });

    if (!contact) {
      return res.status(404).json({ error: 'usuário não encontrado' });
    }

    res.status(201).json(contact);
  }

  async deleteContact(req, res) {
    const { userId, contactId } = req.params;

    const result = await userService.deleteContact(userId, contactId);

    if (!result) {
      return res
        .status(404)
        .json({ error: 'contato ou usuário não encontrado' });
    }

    res.status(204).send();
  }

  async updateContact(req, res) {
    const { userId, contactId } = req.params;
    const { newContactName, newContactPhone } = req.body;

    const contact = await userService.updateContact(userId, contactId, {
      name: newContactName,
      phone: newContactPhone,
    });

    if (!contact) {
      return res
        .status(404)
        .json({ error: 'contato ou usuário não encontrado' });
    }

    res.json(contact);
  }
}
