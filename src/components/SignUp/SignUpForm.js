import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import roles from '../../constants/roles';
import routes from '../../constants/routes';
import withFirebase from '../Firebase/withFirebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChangeCheckbox(event) {
    this.setState({ [event.target.name]: event.target.checked });
  }

  onSubmit(event) {
    const {
      username, email, passwordOne, isAdmin,
    } = this.state;

    const { firebase, history } = this.props;

    const roles1 = {};

    if (isAdmin) {
      roles1[roles.ADMIN] = roles.ADMIN;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles: roles1,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo
      || passwordOne === ''
      || email === ''
      || username === '';

    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <input
          name="username"
          value={username}
          onChange={(event) => this.onChange(event)}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={(event) => this.onChange(event)}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={(event) => this.onChange(event)}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={(event) => this.onChange(event)}
          type="password"
          placeholder="Confirm Password"
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={(event) => this.onChangeCheckbox(event)}
          />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignUpFormBase.propTypes = {
  firebase: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
