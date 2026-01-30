import { users } from "../data/usersData.js";

export default class UserService {


    // USERS
  getUsers() {
    return users;
  }

  findUserById(id) {
    return users.find(u => u.id === id);
  }

  findUserByNome(name) {
    return users.find(u => u.name === name);
  }

  createUser(user) {
    users.push(user);
    return user;
  }

  // CONTATOS
  addContact(userId, contact) {
    const user = this.findUserById(userId);
    if (!user) return null;

    user.contacts.push(contact);
    return contact;
  }

  deleteContact(userId, contactId) {
    const user = this.findUserById(userId);
    if (!user) return null;

    user.contacts = user.contacts.filter(c => c.id !== contactId);
    return user.contacts;
  }

  updateContact(userId, contactId, object) {
    const user = this.findUserById(userId);
    if (!user) return null;

    user.contacts = user.contacts.map(c =>
      c.id === contactId ? { ...c, ...object } : c
    );

    return user.contacts;
  }
}


