/* eslint-disable react/no-array-index-key */
import { Typography } from '@material-ui/core';
import { startsWith } from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import conditions from '../../constants/conditions';
import Assignments from '../../domain/Assignments';
import Content from '../_common/Content';
import CustomLoader from '../_common/CustomLoader';
import AssignmentsForEmailList from '../assignments/AssignmentsForEmailList';
import withFirebase from '../firebase/withFirebase';
import withAuthorization from '../session/withAuthorization';

const EmailPage = ({ firebase }) => {
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingParams, setLoadingParams] = useState(false);
  const [emailText, setEmailText] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setLoadingBuildings(true);
    setLoadingUsers(true);
    setLoadingParams(true);
    firebase.users().on('value', (snapshotUsers) => {
      const usersObject = snapshotUsers.val();
      setLoadingUsers(false);
      let asg;
      firebase.buildings().on('value', (snapshotBuildings) => {
        const buildingsObject = snapshotBuildings.val();
        const usersList = Object.values(usersObject).filter((u) => u.isActive);
        asg = new Assignments(usersList, buildingsObject);
        setLoadingBuildings(false);

        firebase.params().on('value', (snapshotParams) => {
          const paramsObject = snapshotParams.val();
          const a = asg.getListForEmail(paramsObject);
          setAssignments(a.list);
          let paramEmailText = paramsObject.emailText.replace('{{cuota}}', `${numeral(a.valuePerPerson).format('$0,0.00')}`);
          paramEmailText = paramEmailText.split('{{br}}');
          setEmailText(paramEmailText);
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

  const isLoading = loadingBuildings || loadingUsers || loadingParams;
  return (
    <Content>
      <CustomLoader isLoading={isLoading} />
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
      <AssignmentsForEmailList assignments={assignments} />
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
