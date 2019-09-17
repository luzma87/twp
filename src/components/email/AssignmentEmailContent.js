import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import EmailContent from './EmailContent';

const AssignmentEmailContent = ({ params, valuePerPerson, month }) => {
  const { accountInfo, emailText } = params;
  if (!emailText) return '';

  let replacedMailText = emailText.replace('{{cuota}}', `${numeral(valuePerPerson).format('$0,0.00')}`);
  replacedMailText = replacedMailText.replace('{{mes}}', month);

  return (
    <>
      <EmailContent text={replacedMailText} />
      <EmailContent text={accountInfo} />
    </>
  );
};

AssignmentEmailContent.propTypes = {
  params: PropTypes.any,
  valuePerPerson: PropTypes.number,
  month: PropTypes.string,
};

AssignmentEmailContent.defaultProps = {
  params: {},
  valuePerPerson: 0,
  month: '',
};

export default AssignmentEmailContent;
