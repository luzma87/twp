import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withFirebase from '../Firebase/withFirebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit(event) {
    const { firebase } = this.props;
    const { passwordOne } = this.state;
    firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={(event) => this.onChange(event)}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={(event) => this.onChange(event)}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

PasswordChangeForm.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default withFirebase(PasswordChangeForm);
