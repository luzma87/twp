import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../constants/constants';
import CustomHighlighter from '../_common/CustomHighlighter';
import CustomIcon from '../_common/CustomIcon';

const UsersBank = ({ bank, label, textFilter }) => {
  if (label) {
    if (bank === 'otro') {
      return (
        <Typography variant="body2" component="p">
          <CustomIcon icon="university" fixedWidth style={{ marginRight: 8 }} />
          <CustomHighlighter filter={[textFilter]} text={constants.banks[bank].label} />
        </Typography>
      );
    }
    if (bank === 'produbanco') {
      return (
        <Typography variant="body2" component="p">
          <img
            src={constants.banks.promerica.image}
            alt={bank}
            style={{ width: 14, marginRight: 8 }}
          />
          <CustomHighlighter filter={[textFilter]} text={constants.banks.promerica.label} />
        </Typography>
      );
    }

    return (
      <Typography variant="body2" component="p">
        <img src={constants.banks[bank].image} alt={bank} style={{ width: 14, marginRight: 8 }} />
        <CustomHighlighter filter={[textFilter]} text={constants.banks[bank].label} />
      </Typography>
    );
  }
  if (bank === 'otro') {
    return (
      <CustomIcon icon="university" fixedWidth style={{ marginRight: 8 }} size="2x" />
    );
  }
  if (bank === 'produbanco') {
    return (
      <img src={constants.banks.promerica.image} alt={bank} style={{ width: 28, marginRight: 8 }} />
    );
  }

  return (
    <img src={constants.banks[bank].image} alt={bank} style={{ width: 28, marginRight: 8 }} />
  );
};

UsersBank.propTypes = {
  bank: PropTypes.string.isRequired,
  label: PropTypes.bool,
  textFilter: PropTypes.string,
};

UsersBank.defaultProps = {
  label: false,
  textFilter: '',
};

export default UsersBank;
