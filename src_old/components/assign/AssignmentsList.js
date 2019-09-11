import React from 'react';
import PropTypes from 'prop-types';
import { withContext } from '../../context/WithContext';
import routes from '../../routes';
import Content from '../_common/Content';
import CreateButton from '../_common/CreateButton';

const AssignmentsList = ({ context }) => {
  console.log('1');
  const [values, setValues] = React.useState({
    people: {},
    buildings: {},
  });
  const { getAllPeople, getAllBuildings } = context;
  getAllPeople().then((snapshot) => {
    setValues({ ...values, people: snapshot.val() });
  });
  getAllBuildings().then((snapshot) => {
    setValues({ ...values, buildings: snapshot.val() });
  });

  // console.log(values);

  return (
    <Content>
      <CreateButton linkTo={routes.personForm()} />
      Aqui
    </Content>
  );
};

AssignmentsList.propTypes = {
  context: PropTypes.any.isRequired,
};

AssignmentsList.defaultProps = {};

export default withContext(AssignmentsList);
