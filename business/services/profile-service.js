import { getQuery, setQuery } from './utils';
import moment from 'moment';
moment.locale('pt-BR');

const dateToUTC = (date) => {
  return date ? moment(date).toISOString() : null;
};

const clearNull = (obj) => {
  for (let key in obj) {
    if (obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
};

export const me = async (apollo, input) => {
  return (await getQuery(apollo, 'Profile/me', input));
};

export const updateUserById = async (apollo, input) => {
  input.avatar = input.logo;
  input.avatar || delete input.avatar;
  delete input.logo;

  if (input.info && Object.keys(input.info).length > 0) {
    input.info.userId = input.id;
    input.info.birthDate = dateToUTC(input.info.birthDate);
    input.info = clearNull(input.info);
    input.info.phone || delete input.info.phone;
    delete input.info.__typename;
    input.info.cpf = input.info.cpf ? input.info.cpf.split('.').join('')
      .replace('-', '') : null;
    delete input.info.nickname;
    if (Object.keys(input.info).length > 1) {
      await updateUserInfoById(apollo, { ...input.info });
    }
  }
  delete input.info;

  if (input.address && Object.keys(input.address).length > 0) {
    input.address.userId = input.id;
    input.address = clearNull(input.address);
    input.address.postcode || delete input.address.postcode;
    delete input.address.__typename;
    if (Object.keys(input.address).length > 1) {
      await updateUserAddressById(apollo, { ...input.address });
    }
  }
  delete input.address;
  if (!input.password) {
    delete input.password;
  }
  input.userId = input.id;
  delete input.id;
  delete input.email;
  delete input.tags;
  delete input.__typename;
  console.log(input);
  return setQuery(apollo, 'Profile/updateUserById', input);
};

export const updateUserInfoById = async (apollo, input) => {
  console.log(input);
  return setQuery(apollo, 'Profile/updateUserInfoById', input);
};

export const updateUserAddressById = async (apollo, input) => {
  console.log(input);
  return setQuery(apollo, 'Profile/updateUserAddressById', input);
};

export const updateUserNickname = async (apollo, nickname) => {
  return setQuery(apollo, 'Profile/updateUserNickname', {
    nickname
  });
};

export const validatePhoneNumber = async (apollo, code) => {
  return setQuery(apollo, 'Profile/validatePhoneNumber', {
    code
  });
};
