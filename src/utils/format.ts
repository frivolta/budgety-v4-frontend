import numeral from 'numeral';
import { expenseType } from '../components/Card/ExpenseCard';
import moment from 'moment';

export const formatNetworkErrorMessages = (errorMessage: string) => errorMessage.replace('GraphQL error:', '').trim();

export const convertToCurrency = (value: string) => {
  // remove all characters that aren't digit or dot
  value = value.replace(/[^0-9.]/g, '');
  // replace multiple dots with a single dot
  value = value.replace(/\.+/g, '.');
  // only allow 2 digits after a dot
  value = value.replace(/(.*\.[0-9][0-9]?).*/g, '$1');
  // replace multiple zeros with a single one
  value = value.replace(/^0+(.*)$/, '0$1');
  // remove leading zero
  value = value.replace(/^0([^.].*)$/, '$1');

  return numeral(value).format('€ 0,0[.]00');
};

export const convertCurrencyToAmount = (currency: string) => {
  return numeral(currency).value();
};

export const convertAmountToCurrency = (value: number | string, expenseName?: string) => {
  let typeSymbol = '';
  if (expenseName) {
    typeSymbol = expenseName === expenseType.INCOME ? '+' : '-';
  }
  const covertedToCurrency = convertToCurrency(value.toString());
  const formattedAmount = `${typeSymbol} ${covertedToCurrency} €`;
  return formattedAmount;
};

export const convertDateToReadable = (date: string) => {
  return moment(date).format('MMMM Do YYYY');
};
