import { shape, string, number } from 'prop-types';

export default shape({
  id: number,
  name: string.isRequired,
  frontPicture: string.isRequired,
});
