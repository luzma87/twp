import { Card, CardActions, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../constants/routes';
import CardTitle from '../_common/CardTitle';
import CustomButton from '../_common/CustomButton';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import TextWithIcon from '../_common/TextWithIcon';

const getIcon = (isAdmin) => (isAdmin ? 'alicorn' : 'user-astronaut');

const UserCard = ({ person, index }) => (
  <Card>
    <CardContent>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <CardTitle
          label={`${index}. ${person.name}`}
          icon={getIcon(person.getIsAdmin())}
          isActive={person.isActive}
        />
        <MeteorRating id={person.uid} value={person.parkingMeteors} compact />
      </div>
      <TextWithIcon icon="at" text={person.email} />
      <TextWithIcon icon="id-card" text={person.id} />
      <TextWithIcon icon="rocket" text={person.getCarString()} />
    </CardContent>
    <CardActions>
      <CustomButton to={`${routes.USERS_EDIT_ID}${person.uid}`} size="small">
          Editar
      </CustomButton>
    </CardActions>
  </Card>
);

UserCard.propTypes = {
  person: PropTypes.any,
  index: PropTypes.number,
};

UserCard.defaultProps = {
  person: {},
  index: 0,
};

export default UserCard;
