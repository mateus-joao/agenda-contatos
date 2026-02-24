import prisma from '../database/prismaClient.js';
import crypto from 'crypto';
export default class UserService {
  // USERS
  async getUsers() {
    return prisma.user.findMany({
      include: { contacts: true },
    });
  }

  async findUserByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id) {
    return prisma.user.findUnique({
      where: { id },
      include: { contacts: true },
    });
  }

  async findUserByNome(name) {
    return prisma.user.findFirst({
      where: { name },
    });
  }

  async createUser(user) {
    return prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async updateUser(userId, data) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    await prisma.user.delete({
      where: { id: userId },
    });

    return true;
  }

  async generateResetToken(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const token = crypto.randomBytes(32).toString('hex');

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpires: new Date(Date.now() + 3600000), // 1 hora
      },
    });

    return token;
  }

  async resetUserPassword(token, newPassword) {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) return null;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: newPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    return true;
  }

  // CONTATOS
  async addContact(userId, contact) {
    return prisma.contact.create({
      data: {
        name: contact.name,
        phone: contact.phone,
        userId,
      },
    });
  }

  async deleteContact(userId, contactId) {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, userId },
    });

    if (!contact) return null;

    await prisma.contact.delete({
      where: { id: contactId },
    });

    return true;
  }

  async updateContact(userId, contactId, object) {
    const contact = await prisma.contact.findFirst({
      where: { id: contactId, userId },
    });

    if (!contact) return null;

    return prisma.contact.update({
      where: { id: contactId },
      data: object,
    });
  }
}
