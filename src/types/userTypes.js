import { shape, string, number } from 'prop-types';

export default shape({
  id: number,
  ownerEmail: string,
  ownerFullName: string,
  ownerPhone: string,
});
