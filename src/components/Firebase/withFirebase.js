import React from 'react';
import FirebaseContext from './context';

const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default withFirebase;
