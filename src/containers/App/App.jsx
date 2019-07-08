import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';
import locationShape from '../../types/locationTypes';

import Header from '../../components/Header';
import AuthWrapper from '../AuthWrapper';
import ConfirmPopup from '../Popups/ConfirmPopup';

import { LOGIN, PASSWORD_RESET } from '../../store/constants/routeConstants';
import { doGetUser } from '../../store/actions/AuthActions';

import pageTitles from '../../store/constants/pageTitles';

import { showProfileEditPopup } from '../../store/actions/ProfileEditActions';

import './App.css';

class App extends Component {
  locationsWithoutHeader = [LOGIN, PASSWORD_RESET];

  static propTypes = {
    location: locationShape.isRequired,
    children: PropTypes.node.isRequired,
    showProfileEditPopup: PropTypes.func.isRequired,
    doGetUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const pathname = this.getPathname();
    const { doGetUser } = this.props;

    if (this.locationsWithoutHeader.indexOf(pathname) === -1) {
      doGetUser();
    }
  }

  getPathname = () => {
    const { location } = this.props;
    const { pathname } = location;

    return pathname;
  };

  getChildren = () => {
    const { children } = this.props;

    return children;
  };

  getPageTitle = () => pageTitles[this.getPathname()];

  renderHeader = () => {
    const pathname = this.getPathname();
    const { showProfileEditPopup } = this.props;

    if (this.locationsWithoutHeader.indexOf(pathname) > -1) {
      return false;
    }

    return <Header editProfileMethod={showProfileEditPopup} currentPath={pathname} />;
  };

  render() {
    return (
      <div id="site-wrapper">
        <AuthWrapper currentPath={this.getPathname()}>
          <Helmet>
            <title>{this.getPageTitle()}</title>
          </Helmet>
          {this.renderHeader()}
          <main>
            {this.getChildren()}
            <ConfirmPopup />
          </main>
        </AuthWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
});

export default connect(
  mapStateToProps,
  { showProfileEditPopup, doGetUser },
)(App);
