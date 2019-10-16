import {
  Card, CardContent, Checkbox, Typography,
} from '@material-ui/core';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import { withTheme } from '@material-ui/styles';
import ActiveIndicator from '../_common/ActiveIndicator';
import CardTitle from '../_common/CardTitle';
import TextWithIcon from '../_common/TextWithIcon';

const PaymentCard = ({
  payment, index, onPay, theme,
}) => {
  const {
    owner, ownerInfo, ownerPayment, places, building, total, payed, id,
  } = payment;
  const placesCount = places.length;
  const checked = payed !== '';
  const background = checked ? theme.palette.primary[50] : 'inherit';
  return (
    <Card style={{ background }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <CardTitle
            label={`${index}. ${owner}`}
            icon="money-check-edit-alt"
            isActive={total > 0}
          />
          <Checkbox
            name={id}
            checked={checked}
            onChange={(event) => onPay(event)}
            color="primary"
            inputProps={{
              'aria-label': 'secondary checkbox',
            }}
          />
        </div>
        <TextWithIcon icon="building" text={building.name} themed />
        <TextWithIcon icon="at" text={ownerInfo} />
        <TextWithIcon icon="piggy-bank" text={ownerPayment} />
        <Typography style={{ marginTop: 16 }}>
          <strong>{`${placesCount} puesto${placesCount === 1 ? '' : 's'}: ${numeral(total).format('$0,0.00')}`}</strong>
        </Typography>
        <ul className="fa-ul">
          {places.map((place) => (
            <li key={place.id}>
              <ActiveIndicator isActive={place.isActive} icon="place" themed />
              <span style={{ marginRight: 16 }}>
                {place.number}
              </span>
              {numeral(place.price).format('$0,0.00')}
            </li>
          ))}
        </ul>
        {checked
          ? `Pagado el ${moment(payed).format('DD/MM/YYYY')}`
          : 'No pagado'}
      </CardContent>
    </Card>
  );
};

PaymentCard.propTypes = {
  payment: PropTypes.any,
  index: PropTypes.number,
  onPay: PropTypes.func.isRequired,
  theme: PropTypes.any.isRequired,
};

PaymentCard.defaultProps = {
  payment: {},
  index: 0,
};

export default withTheme(PaymentCard);
