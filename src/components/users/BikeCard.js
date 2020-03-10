import { Card, CardActions, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../constants/routes';
import CardTitle from '../_common/CardTitle';
import CustomButton from '../_common/CustomButton';
import TextWithIcon from '../_common/TextWithIcon';

const getIcon = (person) => {
  if (person.bikeType === 'bike') {
    return ['far', 'bicycle'];
  }
  return ['fas', 'motorcycle'];
};

const BikeCard = ({ person, index, textFilter }) => (
  <Card>
    <CardContent>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <CardTitle
          label={`${index}. ${person.name}`}
          icon={getIcon(person)}
          themed
          isActive={person.isActive}
          textFilter={textFilter}
        />
      </div>
      {person.getIsAdmin() ? <TextWithIcon icon="alicorn" text="admin" /> : null}
      <TextWithIcon icon="at" text={person.email} textFilter={textFilter} />
      <TextWithIcon icon="id-card" text={person.id} />
    </CardContent>
    <CardActions>
      <CustomButton to={`${routes.BIKES_EDIT_ID}${person.uid}`} size="small">
        Editar
      </CustomButton>
    </CardActions>
  </Card>
);

BikeCard.propTypes = {
  person: PropTypes.any,
  index: PropTypes.number,
  textFilter: PropTypes.any,
};

BikeCard.defaultProps = {
  person: {},
  index: 0,
  textFilter: '',
};

export default BikeCard;
