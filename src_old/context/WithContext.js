import React from 'react';
import GlobalContext from './MyContext';

// eslint-disable-next-line import/prefer-default-export
export function withContext(Component) {
  return function ConnectedComponent(props) {
    return (
      <GlobalContext.Consumer>
        {context => <Component {...props} context={context} />}
      </GlobalContext.Consumer>
    );
  };
}
