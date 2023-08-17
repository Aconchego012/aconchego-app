import { Schema } from "express-validator";

export const createPersonSchema: Schema = {
  name: {
    isString: true,
    notEmpty: true,
  },
  email: {
    isEmail: true,
    notEmpty: true,
  },
  phone: {
    isString: true,
    notEmpty: true,
  },
  birthday: {
    isString: true,
    notEmpty: true,
  },
  cpf: {
    isString: true,
    notEmpty: true,
  },
};
