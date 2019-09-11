import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withFirebase from '../Firebase/withFirebase';

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    const { firebase } = this.props;
    const { email } = this.state;
    firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <input
          name="email"
          value={email}
          onChange={(event) => this.onChange(event)}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

PasswordForgetFormBase.propTypes = {
  firebase: PropTypes.any.isRequired,
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetForm;
