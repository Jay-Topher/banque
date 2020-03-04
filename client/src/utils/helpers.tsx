import { format } from 'date-fns';

export const currencyFormat = (num: number) => {
  return '₦' + (num / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const dateFormat = (date: string) => {
  return format(new Date(date), 'do-MMMM-yyyy');
};
