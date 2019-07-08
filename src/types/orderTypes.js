import { shape, string, number } from 'prop-types';

export default shape({
  id: number,
  company: string,
  order1cNumber: string,
  coinsCount: number,
  envelopesCount: number,
  date: string,
  country: string,
  city: string,
  total: number,
});
