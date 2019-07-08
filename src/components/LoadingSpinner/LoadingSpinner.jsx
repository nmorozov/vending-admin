import React from 'react';

import { SyncLoader } from 'react-spinners';

import './LoadingSpinner.css';

const LoadingSpinner = ({ loading, color, size }) => (
  <SyncLoader className="loading-spinner" sizeUnit="px" size={size} color={color} loading={loading} />
);

export default LoadingSpinner;
