import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose } from 'recompose';
import roles from '../../constants/roles';
import withFirebase from '../Firebase/withFirebase';
import withAuthorization from '../Session/withAuthorization';
import UserList from './UserList';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const { firebase } = this.props;

    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    const { firebase } = this.props;
    firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

AdminPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};


const condition = (authUser) => authUser && !!authUser.roles[roles.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
