import { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { PASSWORD_RESET } from '../../store/constants/routeConstants.js';

import Config from '../../core/config';

class AuthWrapper extends Component {
  pathsWioutAuthorization = [PASSWORD_RESET];

  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,
  };

  async componentWillMount() {
    const { dispatch, currentPath } = this.props;
    if (this.pathsWioutAuthorization.indexOf(currentPath) > -1) {
      return;
    }
    if (!(await Config.isLogged())) {
      dispatch(replace('/login'));
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default connect()(AuthWrapper);
