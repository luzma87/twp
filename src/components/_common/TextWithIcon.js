import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Highlighter from 'react-highlight-words';

const TextWithIcon = ({ text, textFilter, icon }) => (
  <Typography variant="body2" component="p">
    <FontAwesomeIcon icon={['far', icon]} fixedWidth style={{ marginRight: 8 }} />
    <Highlighter
      highlightClassName="highlighter"
      searchWords={[textFilter]}
      autoEscape
      textToHighlight={text}
    />
  </Typography>
);

TextWithIcon.propTypes = {
  text: PropTypes.string,
  textFilter: PropTypes.string,
  icon: PropTypes.string,
};

TextWithIcon.defaultProps = {
  text: '',
  textFilter: '',
  icon: 'alicorn',
};

export default TextWithIcon;
