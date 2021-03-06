import { Card, CardActions, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import routes from '../../constants/routes';
import CardTitle from '../_common/CardTitle';
import CustomButton from '../_common/CustomButton';
import MeteorRating from '../_common/meteorRating/MeteorRating';
import TextWithIcon from '../_common/TextWithIcon';
import UsersBank from './UsersBank';

const getIcon = (isAdmin) => (isAdmin ? 'admin' : 'user');

const UserCard = ({ person, index, textFilter }) => (
  <Card>
    <CardContent>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <CardTitle
          label={`${index}. ${person.name}`}
          icon={getIcon(person.getIsAdmin())}
          themed
          isActive={person.isActive}
          textFilter={textFilter}
        />
        <MeteorRating id={person.uid} value={person.parkingMeteors} compact />
      </div>
      <TextWithIcon icon="at" text={person.email} textFilter={textFilter} />
      <TextWithIcon icon="id-card" text={person.id} />
      <TextWithIcon icon="car" themed text={person.getCarString()} textFilter={textFilter} />
      <UsersBank bank={person.bank} label />
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
  textFilter: PropTypes.any,
};

UserCard.defaultProps = {
  person: {},
  index: 0,
  textFilter: '',
};

export default UserCard;
