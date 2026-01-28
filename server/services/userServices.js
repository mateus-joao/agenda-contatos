class UserService {
  constructor() {
    this.users = [{ id: "1", name: "mts", password: "123", contacts: [{ name: "mts", phone: "2321", id: "2132" }] },
  { id: "2", name: "jp", password: "234", contacts: [{ name: "ts", phone: "231", id: "132" }] },
  { id: "3", name: "mj", password: "222", contacts: [{ name: "ms", phone: "221", id: "213" }] },];
  }

    // USERS
  getUsers() {
    return this.users;
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  findUserByNome(name) {
    return this.users.find(u => u.name === name);
  }

  createUser(user) {
    this.users.push(user);
    return user;
  }

  // CONTATOS
  addContact(userId, contact) {
    const user = findUserById(userId);
    if (!user) return null;

    user.contacts.push(contact);
    return contact;
  }

  deleteContact(userId, contactId) {
    const user = findUserById(userId);
    if (!user) return null;

    user.contacts = user.contacts.filter(c => c.id !== contactId);
    return user.contacts;
  }

  updateContact(userId, contactId, object) {
    const user = findUserById(userId);
    if (!user) return null;

    user.contacts = user.contacts.map(c =>
      c.id === contactId ? { ...c, ...object } : c
    );

    return user.contacts;
  }
}


export default new UserService();
