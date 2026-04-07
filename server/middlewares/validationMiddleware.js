import { body } from 'express-validator';

export const validateContactCreation = [
  body('name').isLength({ min: 1 }).withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('phone').optional().isMobilePhone().withMessage('Telefone inválido'),
];

export const validateContactUpdate = [
  body('name')
    .optional()
    .isLength({ min: 1 })
    .withMessage('Nome não pode ser vazio'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().isMobilePhone().withMessage('Telefone inválido'),
];
