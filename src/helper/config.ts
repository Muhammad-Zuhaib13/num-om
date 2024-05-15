import { store } from '../store';

interface Headers {
  Accept: string;
  'Content-Type': string;
  Authorization?: string;
}

export const headers: Headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
export const headers2: Headers = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data'
  // 'Content-Typ e': 'application/json'
};
export const getHeaders = () => {
  //@ts-ignore
  const { token } = store.getState().auth;
  const temp = localStorage.getItem('token');
  // console.log(temp);
  // if (token) {
  headers.Authorization = `Bearer ${temp}`;
  // }

  return { ...headers };
};
export const getHeaders2 = () => {
  //@ts-ignore
  const { token } = store.getState().auth;
  const temp = localStorage.getItem('token');
  // console.log(temp);
  // if (token) {
  headers2.Authorization = `Bearer ${temp}`;
  // }

  return { ...headers2 };
};

export const logout = () => {};
export const addDecimal = (number: number) => {
  return parseFloat(number?.toString().slice(0, -3) + '.' + number?.toString()?.slice(-3))?.toFixed(3);
};
export const getPriceFromPriceText = (currencyString: any) => {
  const stringWithoutCurrency = currencyString.replace(/ر\.ع\s*/, '');
  const floatValue = parseFloat(stringWithoutCurrency);
  return isNaN(floatValue) ? null : floatValue;
};
export const addCharLimit = (sentence: string, limit: number) => {
  if (sentence.length <= limit) {
    return sentence;
  } else {
    return sentence.slice(0, limit) + ' ...';
  }
};
export const formatDate = (dateString: any) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
