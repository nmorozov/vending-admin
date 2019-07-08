import { shape, string, number } from 'prop-types';

export default shape({
  id: number.isRequired,
  name: string.isRequired,
  picture: string.isRequired,
  note: string.isRequired,
});
