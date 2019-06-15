import Button from "@material-ui/core/Button";
import React from 'react';
import { Link } from "react-router-dom";
import routes from "../../routes";
import Content from "../_common/Content";

const PeopleList = () => {
  return (
    <Content>
      <Link to={routes.personForm()} style={{textDecoration: 'none'}}>
        <Button>
          New person
        </Button>
      </Link>
    </Content>
  );
};

PeopleList.propTypes = {};

PeopleList.defaultProps = {};

export default PeopleList;
