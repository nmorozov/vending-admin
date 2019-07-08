import React from 'react';

import AuthorizationBlock from '../../components/AuthorizationBlock';
import PasswordResetForm from './PasswordResetForm';

import './PasswordReset.css';

const PasswordReset = () => (
  <AuthorizationBlock blockCaption="Восстановление пароля">
    <PasswordResetForm />
  </AuthorizationBlock>
);

export default PasswordReset;
