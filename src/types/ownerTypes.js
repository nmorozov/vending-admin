import { shape, string, number, bool } from 'prop-types';

export default shape({
  id: number.isRequired,
  caretakerEmail: string.isRequired,
  caretakerFullName: string.isRequired,
  caretakerPhone: string.isRequired,
  city: string.isRequired,
  country: string.isRequired,
  created: string.isRequired,
  fullCompanyName: string.isRequired,
  ownerEmail: string.isRequired,
  ownerFullName: string.isRequired,
  ownerPhone: string.isRequired,
  password: string.isRequired,
  role: string.isRequired,
  shortCompanyName: string.isRequired,
  status: bool.isRequired,
  username: string.isRequired,
});
