import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card, CardContent, Checkbox, Typography,
} from '@material-ui/core';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import CardTitle from '../_common/CardTitle';
import TextWithIcon from '../_common/TextWithIcon';

const getIconColor = (active) => (active ? '#2E7D32' : '#B71C1C');

const PaymentCard = ({ payment, index, onPay }) => {
  const {
    owner, ownerInfo, ownerPayment, places, building, total, payed, id,
  } = payment;
  const placesCount = places.length;
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <CardTitle
            label={`${index}. ${owner}`}
            icon="money-check-edit-alt"
            iconColor={getIconColor(total > 0)}
          />
          <Checkbox
            name={id}
            checked={payed !== ''}
            onChange={(event) => onPay(event)}
            color="primary"
            inputProps={{
              'aria-label': 'secondary checkbox',
            }}
          />
        </div>
        <TextWithIcon icon="warehouse" text={building.name} />
        <TextWithIcon icon="at" text={ownerInfo} />
        <TextWithIcon icon="piggy-bank" text={ownerPayment} />
        <Typography style={{ marginTop: 16 }}>
          <strong>{`${placesCount} puesto${placesCount === 1 ? '' : 's'}: ${numeral(total).format('$0,0.00')}`}</strong>
        </Typography>
        <ul className="fa-ul">
          {places.map((place) => (
            <li key={place.id}>
              <FontAwesomeIcon
                icon={['far', 'draw-square']}
                listItem
                color={getIconColor(place.isActive)}
              />
              <span style={{ marginRight: 16 }}>
                {place.number}
              </span>
              {numeral(place.price).format('$0,0.00')}
            </li>
          ))}
        </ul>
        {payed !== ''
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
};

PaymentCard.defaultProps = {
  payment: {},
  index: 0,
};

export default PaymentCard;
