import { Typography } from '@material-ui/core';
import { startsWith } from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

const getContent = (text) => (
  <>
    {text.map((paragraph, index) => {
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

const splitContent = (startingText) => startingText.split('{{br}}');

const EmailContent = ({ params, valuePerPerson, month }) => {
  const { accountInfo, emailText } = params;
  if (!emailText) return '';

  const accountParts = splitContent(accountInfo);

  let mailParts = emailText.replace('{{cuota}}', `${numeral(valuePerPerson).format('$0,0.00')}`);
  mailParts = mailParts.replace('{{mes}}', month);
  mailParts = splitContent(mailParts);

  return (
    <>
      {getContent(mailParts)}
      {getContent(accountParts)}
    </>
  );
};

EmailContent.propTypes = {
  params: PropTypes.any,
  valuePerPerson: PropTypes.number,
  month: PropTypes.string,
};

EmailContent.defaultProps = {
  params: {},
  valuePerPerson: 0,
  month: '',
};

export default EmailContent;
