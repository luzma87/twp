import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from "../_common/Content";

class PersonForm extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { personId } = match.params;
    const pId = personId === ':personId' ? null : personId;
    this.state = {
      personId: pId,
    };
  }

  render() {
    const { personId } = this.state;
    const title = personId ? `Person ${personId} form` : 'New person form!!';
    return (
      <Content>
        {title}
      </Content>
    );
  }
}

PersonForm.propTypes = {
  match: PropTypes.object.isRequired,
};

PersonForm.defaultProps = {};

export default PersonForm;
