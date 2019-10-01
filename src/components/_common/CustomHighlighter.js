import { withTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Highlighter from 'react-highlight-words';

const CustomHighlighter = ({ filter, text, theme }) => (
  <Highlighter
    highlightStyle={{ background: theme.palette.primary[100] }}
    searchWords={filter}
    autoEscape
    textToHighlight={text}
  />
);

CustomHighlighter.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  text: PropTypes.string.isRequired,
  theme: PropTypes.any.isRequired,
};

CustomHighlighter.defaultProps = {};

export default withTheme(CustomHighlighter);
