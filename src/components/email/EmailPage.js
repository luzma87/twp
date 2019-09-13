/* eslint-disable react/no-array-index-key */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-ui/core';
import { ceil, startsWith } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import constants from '../../constants/constants';
import Content from '../_common/Content';
import AssignmentsForEmailList from '../assignments/AssignmentsForEmailList';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const EmailPage = ({ firebase }) => {
  const [buildings, setBuildings] = useState({});
  const [users, setUsers] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingParams, setLoadingParams] = useState(false);
  const [emailText, setEmailText] = useState([]);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    setLoadingParams(true);
    let otherBanks = 0;
    let placePriceTotal = 0;
    let assignedUsers = 0;
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();
      let usersList = [];

      if (usersObject) {
        usersList = Object.values(usersObject).filter((u) => u.isActive);
        usersList = usersList.sort(constants.userSort);
        setUsers(usersList);
      }
      setLoadingUsers(false);
      firebase.buildings().on('value', (snapshot2) => {
        const buildingsObject = snapshot2.val();
        if (buildingsObject) {
          setBuildings(buildingsObject);
        }
        setLoadingBuildings(false);

        firebase.params().on('value', (snapshot3) => {
          const paramsObject = snapshot3.val();
          if (paramsObject) {
            usersList.forEach((user) => {
              if (user.place) {
                assignedUsers += 1;
                if (user.bank.value !== paramsObject.defaultBank) {
                  otherBanks += parseFloat(paramsObject.differentBank);
                }
                const userBuilding = buildingsObject[user.place.building];
                const userPlace = userBuilding.places[user.place.place];
                placePriceTotal += parseFloat(userPlace.price);
              }
            });

            const totalValue = placePriceTotal + otherBanks + parseFloat(paramsObject.hosting);
            const valuePerPerson = ceil(totalValue / assignedUsers, 2);

            let paramEmailText = paramsObject.emailText.replace('{{cuota}}', `$${valuePerPerson}`);
            paramEmailText = paramEmailText.split('{{br}}');
            setEmailText(paramEmailText);
          }

          setLoadingParams(false);
        });
      });
    });

    return function cleanup() {
      firebase.buildings().off();
      firebase.params().off();
      firebase.users().off();
    };
  }, [firebase]);

  return (
    <Content>
      {(loadingBuildings || loadingUsers || loadingParams) && (
        <Typography color="secondary">
          <FontAwesomeIcon
            icon={['far', 'spinner']}
            pulse
            size="4x"
          />
        </Typography>
      )}

      {emailText.map((paragraph, index) => {
        const key = `${paragraph}_${index}`;
        if (paragraph === '') {
          return <br key={key} />;
        }
        if (paragraph.includes('cuota')) {
          return (
            <Typography key={key}>
              <strong>{paragraph}</strong>
            </Typography>
          );
        }
        if (startsWith(paragraph, 'http')) {
          return (
            <a href={paragraph} target="_blank" rel="noopener noreferrer" key={key}>
              {paragraph}
            </a>
          );
        }
        return (
          <Typography key={key}>
            {paragraph}
          </Typography>
        );
      })}
      <AssignmentsForEmailList users={users} buildings={buildings} />
    </Content>
  );
};

EmailPage.propTypes = {
  firebase: PropTypes.any.isRequired,
};

export default compose(
  withAuthorization(conditions.isAdminUser),
  withFirebase,
)(EmailPage);
