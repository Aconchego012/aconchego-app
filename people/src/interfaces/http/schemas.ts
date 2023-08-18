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
  role: {
    isString: true,
    notEmpty: true,
  },
};

export const updatePersonSchema: Schema = {
  name: {
    notEmpty: false,
    isString: true,
  },
  email: {
    notEmpty: false,
    isEmail: true,
  },
  phone: {
    isString: true,
    notEmpty: false,
  },
  birthday: {
    isString: true,
    notEmpty: false,
  },
  cpf: {
    isString: true,
    notEmpty: false,
  },
  role: {
    isString: true,
    notEmpty: true,
  },
};
