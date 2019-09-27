import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import EmailContent from './EmailContent';

const ShameEmailContent = ({ params, valuePerPerson, month }) => {
  const { accountInfo, shameEmailText, shameGif } = params;
  if (!shameEmailText) return '';

  let replacedMailText = shameEmailText.replace('{{cuota}}', `${numeral(valuePerPerson).format('$0,0.00')}`);
  replacedMailText = replacedMailText.replace('{{mes}}', month);

  return (
    <>
      <img src={shameGif} alt="For shame" style={{ width: 250 }} />
      <EmailContent text={replacedMailText} />
      <EmailContent text={accountInfo} />
    </>
  );
};

ShameEmailContent.propTypes = {
  params: PropTypes.any,
  valuePerPerson: PropTypes.number,
  month: PropTypes.string,
};

ShameEmailContent.defaultProps = {
  params: {},
  valuePerPerson: 0,
  month: '',
};

export default ShameEmailContent;
