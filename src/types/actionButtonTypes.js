import { shape, string, func } from 'prop-types';

export default shape({
  buttonAction: func.isRequired,
  svgIcon: string.isRequired,
  title: string.isRequired,
});
