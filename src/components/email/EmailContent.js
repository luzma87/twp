import { Typography } from '@material-ui/core';
import { startsWith } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const splitContent = (startingText) => startingText.split('{{br}}');

const EmailContent = ({ text }) => {
  const parts = splitContent(text);
  return (
    <>
      {parts.map((paragraph, index) => {
        const key = `${paragraph}_${index}`;
        if (paragraph === '') {
          return <br key={key} />;
        }
        if (paragraph.includes('cuota')) {
          return (
            <Typography key={key}>
              <strong>{paragraph}</strong>
            </Typography>
          );
        }
        if (startsWith(paragraph, 'http')) {
          return (
            <a href={paragraph} target="_blank" rel="noopener noreferrer" key={key}>
              {paragraph}
            </a>
          );
        }
        return (
          <Typography key={key}>
            {paragraph}
          </Typography>
        );
      })}
    </>
  );
};

EmailContent.propTypes = {
  text: PropTypes.string,
};

EmailContent.defaultProps = {
  text: '',
};

export default EmailContent;
