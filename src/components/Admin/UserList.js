import PropTypes from 'prop-types';
import React from 'react';
import shapes from '../../constants/shapes';

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong>
          {` ${user.uid}; `}
        </span>
        <span>
          <strong>E-Mail:</strong>
          {` ${user.email}; `}
        </span>
        <span>
          <strong>Username:</strong>
          {` ${user.username}`}
        </span>
      </li>
    ))}
  </ul>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(shapes.user)),
};

UserList.defaultProps = {
  users: [],
};

export default UserList;
