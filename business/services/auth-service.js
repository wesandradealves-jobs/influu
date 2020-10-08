import { setQuery } from './utils';

export const login = async (apollo, input) => {
  return setQuery(apollo, 'Auth/login', {
    ...input,
    access: `APLICATIVO`,
  });
};

export const sendForgotPasswordEmail = async (apollo, input) => {
  return setQuery(apollo, 'Auth/sendForgotPasswordEmail', input);
};

export const resetUserPassword = async (apollo, input) => {
  return setQuery(apollo, 'Auth/resetUserPassword', {
    password: input.password1,
    token: input.token
  });
};

export const createInfluencer = async (apollo, input) => {
  return setQuery(apollo, 'Auth/createInfluencer', input);
};

export const createCompany = async (apollo, input) => {
  return setQuery(apollo, 'Auth/createCompany', input);
};

export const validateUser = async (apollo, input) => {
  return setQuery(apollo, 'Auth/validateUser', {
    email: input.email,
    token: input.token
  });
};
