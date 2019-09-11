import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import routes from '../../constants/routes';
import withFirebase from '../Firebase/withFirebase';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    const { firebase, history } = this.props;
    const { email, password } = this.state;
    firebase
      .doSignInWithEmailAndPassword(email, password)
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
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <input
          name="email"
          value={email}
          onChange={(event) => this.onChange(event)}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={(event) => this.onChange(event)}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignInFormBase.propTypes = {
  firebase: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
};

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm;
