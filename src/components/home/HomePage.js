import React from 'react';
import conditions from '../../constants/conditions';
import Content from '../_common/Content';
import withAuthorization from '../session/withAuthorization';

const HomePage = () => (
  <Content>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </Content>
);

export default withAuthorization(conditions.isLoggedUser)(HomePage);
