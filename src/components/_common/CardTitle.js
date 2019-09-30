import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Highlighter from 'react-highlight-words';

const CardTitle = ({
  label, icon, iconColor, textFilter,
}) => (
  <Typography variant="h5" gutterBottom>
    <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 16 }} color={iconColor} />
    <Highlighter
      highlightClassName="highlighter"
      searchWords={[textFilter]}
      autoEscape
      textToHighlight={label}
    />
  </Typography>
);

CardTitle.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  textFilter: PropTypes.string,
};

CardTitle.defaultProps = {
  iconColor: 'black',
  textFilter: '',
};

export default CardTitle;
