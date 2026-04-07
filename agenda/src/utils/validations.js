export const validations = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Email inválido';
  },

  password: (password) => {
    if (!password || password.length === 0) {
      return 'Senha é obrigatória';
    }
    if (password.length < 6) {
      return 'Senha deve ter no mínimo 6 caracteres';
    }
    return null;
  },

  name: (name) => {
    if (!name || name.trim().length === 0) {
      return 'Nome é obrigatório';
    }
    if (name.trim().length < 2) {
      return 'Nome deve ter no mínimo 2 caracteres';
    }
    return null;
  },

  phone: (phone) => {
    if (!phone || phone.toString().trim().length === 0) {
      return 'Telefone é obrigatório';
    }
    const phoneRegex = /^[0-9]{10,11}$/;
    const onlyNumbers = phone.toString().replace(/\D/g, '');
    return phoneRegex.test(onlyNumbers)
      ? null
      : 'Telefone deve ter 10 ou 11 dígitos';
  },

  phoneOptional: (phone) => {
    if (!phone || phone.toString().trim().length === 0) {
      return null;
    }
    const phoneRegex = /^[0-9]{10,11}$/;
    const onlyNumbers = phone.toString().replace(/\D/g, '');
    return phoneRegex.test(onlyNumbers)
      ? null
      : 'Telefone deve ter 10 ou 11 dígitos';
  },
};
