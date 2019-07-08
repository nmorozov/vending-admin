import React from 'react';

import AuthorizationBlock from '../../components/AuthorizationBlock';
import LoginForm from './LoginForm';

import './Login.css';

class Login extends React.Component {
  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <AuthorizationBlock blockCaption="Авторизация">
        <LoginForm />
      </AuthorizationBlock>
    );
  }
}

export default Login;
