import {
  Card, CardContent, Checkbox, FormControlLabel, Typography,
} from '@material-ui/core';
import { withTheme } from '@material-ui/styles';
import moment from 'moment';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import ActiveIndicator from '../_common/ActiveIndicator';
import CardTitle from '../_common/CardTitle';
import CustomIcon from '../_common/CustomIcon';
import TextWithIcon from '../_common/TextWithIcon';
import UsersBank from '../users/UsersBank';

const PaymentCard = ({
  payment, index, onToggle, theme,
}) => {
  const {
    owner, ownerInfo, ownerPayment, places, building, total, payed, id, noFunds,
  } = payment;
  const placesCount = places.length;
  const payedChecked = payed !== '';
  const noFundsChecked = noFunds !== undefined && noFunds !== '';
  const background = payedChecked ? theme.palette.primary[50] : 'inherit';
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
            name={`${id}::payed`}
            checked={payedChecked}
            onChange={onToggle}
            color="primary"
            inputProps={{
              'aria-label': 'secondary checkbox',
            }}
          />
        </div>
        <TextWithIcon icon="building" text={building.name} themed />
        <TextWithIcon icon="at" text={ownerInfo} />
        {ownerPayment ? <UsersBank bank={ownerPayment.toLowerCase()} label /> : null}
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
        <Typography>
          {payedChecked
            ? `Pagado el ${moment(payed).format('DD/MM/YYYY')}`
            : 'No pagado'}
        </Typography>
        <Typography color="primary">
          <FormControlLabel
            control={(
              <Checkbox
                name={`${id}::noFunds`}
                checked={noFundsChecked}
                onChange={onToggle}
                color="primary"
                icon={<CustomIcon icon="square" themed={false} />}
                checkedIcon={<CustomIcon icon="usd-square" themed={false} />}
                inputProps={{
                  'aria-label': 'secondary checkbox',
                }}
              />
          )}
            label="Sin fondos 😐"
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

PaymentCard.propTypes = {
  payment: PropTypes.any,
  index: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  theme: PropTypes.any.isRequired,
};

PaymentCard.defaultProps = {
  payment: {},
  index: 0,
};

export default withTheme(PaymentCard);
