import React from 'react';
import Content from '../_common/Content';
import withAuthorization from '../Session/withAuthorization';

const HomePage = () => (
  <Content>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </Content>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
