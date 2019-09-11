import React from 'react';
import { withContext } from '../context/WithContext';
import Content from './_common/Content';

const Home = () => (
  <Content>
    Home
  </Content>
);

Home.propTypes = {
};

Home.defaultProps = {};

export default withContext(Home);
