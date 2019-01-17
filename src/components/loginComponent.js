import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setCookie } from '../utils/cookies';
import { loginUserAction } from '../actions/authenticationActions';
import LoginView from '../views/loginView';

class LoginComponent extends Component {
  state = {
    isSuccess: false,
    message: ''
  };

  onHandleLogin = (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };

    this.props.dispatch(loginUserAction(data));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.response.login.hasOwnProperty('response')) {
      if (nextProps.response.login.response.success !== prevState.isSuccess) {
        return {
          isSuccess: nextProps.response.login.response.success,
          message: nextProps.response.login.response.message
        };
      } else {
        return {
          isSuccess: nextProps.response.login.response.success,
          message: nextProps.response.login.response.message
        };
      }
    } else {
      return null;
    }
  }

  render() {
    if (this.isSuccess) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <LoginView handleLogin={this.onHandleLogin} success={this.state.isSuccess} message={this.state.message} />
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginComponent);