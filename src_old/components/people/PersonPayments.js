import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PersonPayments extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { personId } = match.params;
    this.state = {
      personId,
    };
  }

  render() {
    const { personId } = this.state;
    return (
      <div>
        {`Person ${personId} payments :)`}
      </div>
    );
  }
}

PersonPayments.propTypes = {
  match: PropTypes.object.isRequired,
};

PersonPayments.defaultProps = {};

export default PersonPayments;
