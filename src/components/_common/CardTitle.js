import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withTheme } from '@material-ui/styles';
import CustomHighlighter from './CustomHighlighter';

const getIconColor = (active, theme) => {
  if (active === null) return 'black';
  return (active ? theme.palette.active[500] : theme.palette.inactive[500]);
};

const CardTitle = ({
  label, icon, textFilter, isActive, theme,
}) => (
  <Typography variant="h5" gutterBottom>
    <FontAwesomeIcon icon={['far', icon]} style={{ marginRight: 16 }} color={getIconColor(isActive, theme)} />
    <CustomHighlighter filter={[textFilter]} text={label} />
  </Typography>
);

CardTitle.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  textFilter: PropTypes.string,
  theme: PropTypes.any.isRequired,
};

CardTitle.defaultProps = {
  textFilter: '',
  isActive: null,
};

export default withTheme(CardTitle);
