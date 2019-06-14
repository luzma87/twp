import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardContent, Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import firebaseHelper from '../config/firebase/firebaseHelper';
import { withContext } from '../context/WithContext';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      message: '',
    };
  }

  componentDidMount() {
    firebaseHelper.auth.onAuthStateChanged((user) => {
      if (user) {
        const { email } = user;
        this.setState({
          email,
          isLoggedIn: true,
          password: '',
          message: '',
        });
      } else {
        this.setState({
          email: '',
          password: '',
          isLoggedIn: false,
          message: '',
        });
      }
    });
  }

  update(field, event) {
    this.setState({ [field]: event.target.value });
  }

  handleLoginError(error) {
    this.setState({ message: error.message });
  }

  handleLoginSuccess(user) {
    const { context } = this.props;
    context.setCurrentUser(user.user);
    this.setState({ isLoggedIn: true });
  }

  login(event) {
    event.preventDefault();
    const { email, password } = this.state;
    firebaseHelper.login(email, password)
      .then(user => this.handleLoginSuccess(user))
      .catch(error => this.handleLoginError(error));
  }

  render() {
    const {
      isLoggedIn, email, password, message,
    } = this.state;
    const { context, history, location } = this.props;
    if (isLoggedIn || context.isLoggedIn()) {
      const { from } = location.state || { from: { pathname: '/' } };
      history.push(from.pathname);
      // return <Redirect to="/" />;
    }
    const messageComponent = message
      ? (
        <Box
          bgcolor="error.main"
          color="error.contrastText"
          style={{ padding: 8, borderRadius: 8 }}
        >
          <Typography>
            {message}
          </Typography>
        </Box>
      )
      : null;
    return (
      <Paper
        style={{
          width: 400, margin: 'auto', marginTop: 40, textAlign: 'center',
        }}
      >
        <CardContent>
          <Typography gutterBottom color="textSecondary" variant="h4">
            Login
          </Typography>
          {messageComponent}
          <div>
            <TextField
              id="email"
              label="Email"
              onChange={event => this.update('email', event)}
              margin="normal"
              variant="outlined"
              type="email"
              name="email"
              value={email}
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              onChange={event => this.update('password', event)}
              margin="normal"
              variant="outlined"
              type="password"
              name="password"
              value={password}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '24px 0' }}
            onClick={event => this.login(event)}
          >
            <FontAwesomeIcon icon={['far', 'sign-in-alt']} style={{ marginRight: 16 }} />
            Log in
          </Button>
        </CardContent>
      </Paper>
    );
  }
}

Login.propTypes = {
  context: PropTypes.any.isRequired,
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

Login.defaultProps = {};

export default withContext(Login);
