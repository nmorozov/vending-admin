import { shape, string, number } from 'prop-types';

import ownerTypes from './ownerTypes';

export default shape({
  id: number.isRequired,
  city: string.isRequired,
  country: string.isRequired,
  externalId: number.isRequired,
  model: string.isRequired,
  placementAddress: string.isRequired,
  serialNumber: string.isRequired,
  softwareVersion: string.isRequired,
  status: number.isRequired,
  user: ownerTypes,
});
